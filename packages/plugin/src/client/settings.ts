import type { LocalizedMessage, Translate } from '../client-locale.js'
import { lanStyles } from './styles.js'
import type { StatusFeed } from '../status-stream.js'
import { messageOf } from './presentation.js'
import type { ClientReact, PluginSettingsView, RemoteStatus } from './types.js'

export function createRemotePluginOptions(React: ClientReact) {
  function RemotePluginOptions(props: {
    control: <T>(endpoint: string, payload?: unknown) => Promise<T>
    statusFeed: StatusFeed<RemoteStatus>
    onSignIn: () => void
    t: Translate
    view?: 'summary' | 'page'
  }): unknown {
    const { t } = props
    const [remoteToolsBusy, setRemoteToolsBusy] = React.useState(false)
    const [remoteToolsEnabled, setRemoteToolsEnabled] = React.useState(true)
    const [loaded, setLoaded] = React.useState(false)
    const [writable, setWritable] = React.useState(false)
    const [busy, setBusy] = React.useState(false)
    const [terminalEnabled, setTerminalEnabled] = React.useState(false)
    const [terminalBusy, setTerminalBusy] = React.useState(false)
    const [acpBackends, setAcpBackends] = React.useState<Array<{ id: string; enabled: boolean }>>([])
    const [acpAvailability, setAcpAvailability] = React.useState<Record<string, boolean>>({})
    const [acpChecking, setAcpChecking] = React.useState<Record<string, boolean>>({})
    const [acpCheckResults, setAcpCheckResults] = React.useState<Record<string, boolean | undefined>>({})
    const [notice, setNotice] = React.useState<LocalizedMessage | undefined>(undefined)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [settingsView, setSettingsView] = React.useState<PluginSettingsView | undefined>(undefined)
    const applyView = (view: PluginSettingsView): void => {
      setSettingsView(view)
      setTerminalEnabled(view.config.terminal?.enabled ?? true)
      setRemoteToolsEnabled(view.config.remoteTools?.enabled ?? true)
      setAcpBackends((view.config.acp?.backends ?? []).map(item => ({ id: item.id, enabled: item.enabled !== false })))
      setAcpAvailability(view.acpAvailability ?? {})
      setWritable(view.writable)
      setLoaded(true)
    }

    React.useEffect(() => {
      let active = true
      void props.control<PluginSettingsView>('settings.get').then(view => { if (active) applyView(view) }).catch(reason => { if (active) setError(messageOf(reason)) })
      return () => { active = false }
    }, [])

    const setTerminalRemote = async (enabled: boolean): Promise<void> => {
      const previous = terminalEnabled
      setTerminalEnabled(enabled)
      setTerminalBusy(true)
      setError(undefined)
      setNotice(undefined)
      try {
        const view = await props.control<PluginSettingsView>('settings.development.set', { terminalEnabled: enabled })
        applyView(view)
        setNotice({ key: 'terminalSaved' })
      } catch (reason) {
        setTerminalEnabled(previous)
        setError(messageOf(reason))
      } finally {
        setTerminalBusy(false)
      }
    }

    const setRemoteTools = async (enabled: boolean): Promise<void> => {
      setRemoteToolsBusy(true); setError(undefined); setNotice(undefined)
      try {
        // Include the terminal value for compatibility with older Hosts whose
        // development settings endpoint requires one of the legacy fields.
        const view = await props.control<PluginSettingsView>('settings.development.set', { remoteToolsEnabled: enabled, terminalEnabled })
        applyView(view)
        setNotice({ key: 'remoteToolsSaved' })
      }
      catch (reason) { setRemoteToolsEnabled(!enabled); setError(messageOf(reason)) }
      finally { setRemoteToolsBusy(false) }
    }

    const checkAcp = async (backend: string): Promise<void> => {
      if (acpChecking[backend]) return
      setAcpChecking(current => ({ ...current, [backend]: true }))
      setAcpCheckResults(current => ({ ...current, [backend]: undefined }))
      setError(undefined)
      try {
        const view = await props.control<PluginSettingsView>('settings.get')
        applyView(view)
        const available = view.acpAvailability?.[backend] === true
        if (!available && view.writable && view.config.acp?.backends?.some(item => item.id === backend && item.enabled !== false)) {
          applyView(await props.control<PluginSettingsView>('settings.acp.set', { backend, enabled: false }))
        }
        setAcpCheckResults(current => ({ ...current, [backend]: available }))
        setNotice({ key: available ? 'acpAvailable' : 'acpUnavailable' })
        window.setTimeout(() => setAcpCheckResults(current => ({ ...current, [backend]: undefined })), 5_000)
      } catch (reason) {
        setError(messageOf(reason))
      } finally {
        setAcpChecking(current => ({ ...current, [backend]: false }))
      }
    }

    const removeAcp = async (backend: string): Promise<void> => {
      setBusy(true)
      setError(undefined)
      try {
        const view = await props.control<PluginSettingsView>('settings.acp.remove', { id: backend })
        applyView(view)
      } catch (reason) {
        setError(messageOf(reason))
      } finally {
        setBusy(false)
      }
    }

    const developmentSetting = React.createElement('section', { className: 'dshRemoteDevelopmentSettings' },
      React.createElement('div', { className: 'dshRemoteAuthorizationSetting' },
        React.createElement('div', null, React.createElement('strong', null, t('terminalRemote')),
          React.createElement('p', null, t('terminalRemoteHint'))),
        React.createElement('input', {
          type: 'checkbox', role: 'switch', checked: terminalEnabled,
          disabled: busy || terminalBusy || !writable, 'aria-label': t('terminalRemote'),
          onChange: (event: Event) => void setTerminalRemote((event.target as HTMLInputElement).checked)
        })),
      React.createElement('div', { className: 'dshRemoteAuthorizationSetting' },
        React.createElement('div', null, React.createElement('strong', null, t('remoteTools')), React.createElement('p', null, t('remoteToolsHint'))),
        React.createElement('input', { type: 'checkbox', role: 'switch', checked: remoteToolsEnabled, disabled: remoteToolsBusy || !writable, 'aria-label': t('remoteTools'), onChange: (event: Event) => { const enabled = (event.target as HTMLInputElement).checked; setRemoteToolsEnabled(enabled); void setRemoteTools(enabled) } })),
      )

    const acpSetting = React.createElement('details', { className: 'dshRemoteAuthorizationSetting dshRemoteAcpSetting' },
      React.createElement('summary', null,
        React.createElement('div', { className: 'dshRemoteAcpSummaryText' },
          React.createElement('strong', null, t('agentBackends')),
          React.createElement('p', null, t('acpHint'), React.createElement('a', {
            href: 'https://github.com/liguobao/ds-harness-remote/blob/feat/cursor-remote/docs/acp-remote.md',
            target: '_blank', rel: 'noopener noreferrer',
            onClick: (event: Event) => event.stopPropagation(),
          }, t('acpDocumentation'))))),
      React.createElement('div', { className: 'dshRemoteAcpList' }, acpBackends.map(item => React.createElement('div', { key: item.id, className: 'dshRemoteAuthorizationSetting' },
        React.createElement('div', null, React.createElement('strong', null, item.id === 'codex' ? 'CodeX' : item.id === 'cursor' ? 'Cursor' : item.id === 'antigravity' ? 'AGY' : item.id === 'claude' ? 'Claude' : item.id === 'pi' ? 'Pi' : item.id === 'opencode' ? 'OpenCode' : item.id), null),
        React.createElement('span', { className: 'dshRemoteAcpCheckCell' },
          React.createElement('a', { href: `#check-acp-${item.id}`, className: `dshRemoteAcpCheckLink${acpChecking[item.id] ? ' isChecking' : acpCheckResults[item.id] === undefined ? '' : acpCheckResults[item.id] ? ' isPassed' : ' isFailed'}`, onClick: (event: Event) => { event.preventDefault(); void checkAcp(item.id) } },
            acpChecking[item.id] ? t('checkingAcp') : acpCheckResults[item.id] === undefined ? t('checkAcp') : t(acpCheckResults[item.id] ? 'acpCheckPassed' : 'acpCheckFailed'))),
        ['codex', 'cursor', 'antigravity', 'pi', 'claude', 'opencode'].includes(item.id) ? null : React.createElement('a', { href: `#remove-acp-${item.id}`, className: 'dshRemoteAcpRemoveLink', onClick: (event: Event) => { event.preventDefault(); void removeAcp(item.id) } }, t('removeAcp')),
        React.createElement('input', {
          type: 'checkbox', role: 'switch', checked: settingsView?.config.acp?.enabled === true && item.enabled && acpAvailability[item.id] === true, 'aria-label': item.id, disabled: busy || !writable || acpChecking[item.id] === true || acpAvailability[item.id] !== true,
          onChange: (event: Event) => void props.control<PluginSettingsView>('settings.acp.set', { backend: item.id, enabled: (event.target as HTMLInputElement).checked }).then(view => { applyView(view); setAcpBackends((view.config.acp?.backends ?? []).map(v => ({ id: v.id, enabled: v.enabled !== false }))) }).catch(reason => setError(messageOf(reason)))
        }))),
        ))

    if (props.view === 'summary') return React.createElement('span', null, t('pluginDescription'))

    return React.createElement('div', { className: 'dshRemotePluginCard dshRemotePluginModern isOpen' },
      React.createElement('div', { className: 'dshRemotePluginCardHeader' },
        React.createElement('strong', null, t('lanTitle'))),
      React.createElement('div', { className: 'dshRemotePluginCardBody' },
        React.createElement(LanSettingsPanel, { control: props.control, t }),
        loaded ? developmentSetting : null,
        loaded ? acpSetting : null,
        error === undefined && notice === undefined ? null : React.createElement('p', { className: error === undefined ? 'dshRemoteNotice' : 'dshRemoteError', role: error === undefined ? 'status' : 'alert' }, error ?? t(notice!.key, notice!.params))))
  }

  const LanSettingsPanel = createLanSettingsPanel(React)
  return RemotePluginOptions
}

interface LanHost { id: string; name: string; host: string; port: number; accessToken?: string }
interface LanSettingsView {
  interfaces?: Array<{ name: string; address: string; family: string; internal: boolean }>
  config: { enabled: boolean; bindAddress: string; port: number; accessToken: string; hosts: LanHost[] }
  writable: boolean
}

export function createLanSettingsPanel(React: ClientReact) {
  return function LanSettingsPanel(props: {
    control: <T>(endpoint: string, payload?: unknown) => Promise<T>
    t: Translate
    onChanged?: () => Promise<void>
    onConnect?: (id: string) => Promise<void>
  }): unknown {
    const { t } = props
    const [view, setView] = React.useState<LanSettingsView | undefined>(undefined)
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [notice, setNotice] = React.useState(false)
    const [editing, setEditing] = React.useState<LanHost | undefined>(undefined)
    const [deleting, setDeleting] = React.useState<string | undefined>(undefined)
    const [name, setName] = React.useState('')
    const [host, setHost] = React.useState('')
    const [port, setPort] = React.useState('')
    const [token, setToken] = React.useState('')
    const [listenerTokenVisible, setListenerTokenVisible] = React.useState(false)
    const load = async (): Promise<void> => {
      try { setView(await props.control<LanSettingsView>('lan.settings.get')); setError(undefined) }
      catch { setError(t('lanLoadFailed')) }
    }
    React.useEffect(() => { void load() }, [])
    const validPort = (value: string): boolean => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 65535
    const save = async (patch: Partial<LanSettingsView['config']>): Promise<boolean> => {
      setBusy(true); setError(undefined); setNotice(false)
      try {
        await props.control('lan.settings.set', patch)
        setView(await props.control<LanSettingsView>('lan.settings.get'))
        setNotice(true)
        await props.onChanged?.()
        return true
      } catch (reason) { setError(messageOf(reason)); return false }
      finally { setBusy(false) }
    }
    const editHost = (entry?: LanHost): void => {
      setEditing(entry); setName(entry?.name ?? ''); setHost(entry?.host ?? '')
      setPort(entry === undefined ? '' : String(entry.port)); setToken(entry?.accessToken ?? '')
      setError(undefined); setNotice(false)
    }
    const submitHost = async (connect = false): Promise<void> => {
      if (view === undefined) return
      const address = host.trim()
      if (!address || /[\s/?#@]/.test(address) || address.includes('://')) { setError(t('lanInvalidAddress')); return }
      if (!validPort(port)) { setError(t('lanInvalidPort')); return }
      if (token !== '' && token.trim().length < 16) { setError(t('lanTokenTooShort')); return }
      const entry: LanHost = { id: editing?.id ?? crypto.randomUUID(), name: name.trim() || address, host: address, port: Number(port), ...(token === '' ? {} : { accessToken: token }) }
      if (await save({ hosts: editing === undefined ? [...view.config.hosts, entry] : view.config.hosts.map(item => item.id === entry.id ? entry : item) })) {
        setEditing(undefined); setName(''); setHost(''); setPort(''); setToken('')
        if (connect) { try { await props.onConnect?.(entry.id) } catch (reason) { setError(messageOf(reason)) } }
      }
    }
    const field = (label: string, value: string, change: (value: string) => void, type = 'text'): unknown => React.createElement('label', null,
      React.createElement('span', null, label), React.createElement('input', {
        type, value, disabled: busy || !view?.writable, autoComplete: 'off',
        onChange: (event: Event) => change((event.target as HTMLInputElement).value),
      }))
    if (view === undefined) return React.createElement('div', { className: 'dshLanSettings' },
      error === undefined ? React.createElement('span', { role: 'progressbar', 'aria-label': t('loadingSettings') }) : React.createElement('div', null,
        React.createElement('p', { role: 'alert' }, error), React.createElement('button', { type: 'button', onClick: () => void load() }, t('refreshRemoteShort'))))
    const config = view.config
    const update = (patch: Partial<LanSettingsView['config']>): void => setView({ ...view, config: { ...config, ...patch } })
    const bindOptions: { address: string; label: string; disabled?: boolean }[] = [
      { address: '0.0.0.0', label: t('lanAllIpv4') },
      ...(view.interfaces ?? [])
        .filter(item => item.family === 'IPv4' && !item.internal && !item.address.startsWith('127.'))
        .map(item => ({ address: item.address, label: `${item.name} · ${item.address} · ${item.family}` })),
    ]
    if (!bindOptions.some(item => item.address === config.bindAddress)) {
      bindOptions.push({ address: config.bindAddress, label: `${config.bindAddress} · ${t('lanUnavailableAddress')}`, disabled: true })
    }
    return React.createElement('section', { className: 'dshLanSettings' },
      React.createElement('style', null, lanStyles),
      React.createElement('p', null, t('lanDirectHint')),
      React.createElement('ul', null, config.hosts.map(entry => React.createElement('li', { className: 'dshLanRow', key: entry.id },
        React.createElement('span', null, React.createElement('strong', null, entry.name), ' · ', `${entry.host}:${entry.port}`),
        deleting === entry.id ? React.createElement('div', { className: 'dshLanActions' },
          React.createElement('span', null, t('lanDeleteConfirm', { name: entry.name })),
          React.createElement('button', { type: 'button', disabled: busy || !view.writable, onClick: () => void save({ hosts: config.hosts.filter(item => item.id !== entry.id) }).then(ok => { if (ok) setDeleting(undefined) }) }, t('lanDeleteHost')),
          React.createElement('button', { type: 'button', disabled: busy, onClick: () => setDeleting(undefined) }, t('lanCancel')))
          : React.createElement('div', { className: 'dshLanActions' },
            React.createElement('button', { type: 'button', disabled: busy || !view.writable, onClick: () => editHost(entry) }, t('lanEditHost')),
            React.createElement('button', { type: 'button', disabled: busy || !view.writable, onClick: () => setDeleting(entry.id) }, t('lanDeleteHost')))))),
      React.createElement('form', { onSubmit: (event: Event) => { event.preventDefault(); void submitHost() } },
        React.createElement('strong', null, t(editing === undefined ? 'lanAddHost' : 'lanEditHost')),
        field(t('lanHostName'), name, setName),
        React.createElement('div', { className: 'dshLanFields' }, field(t('lanHostAddress'), host, setHost), field(t('lanPort'), port, setPort, 'number')),
        field(t('lanOptionalToken'), token, setToken, 'password'),
        React.createElement('div', { className: 'dshLanActions' },
          React.createElement('button', { type: 'submit', disabled: busy || !view.writable || host.trim() === '' }, t(busy ? 'saving' : 'save')),
          props.onConnect === undefined ? null : React.createElement('button', { type: 'button', disabled: busy || !view.writable || host.trim() === '', onClick: () => void submitHost(true) }, t('lanConnect')),
          editing === undefined ? null : React.createElement('button', { type: 'button', disabled: busy, onClick: () => editHost() }, t('lanCancel')))),
      React.createElement('details', null, React.createElement('summary', null, t('lanListener')),
        React.createElement('div', { className: 'dshLanListener' },
          React.createElement('p', null, t('lanListenHint')),
          React.createElement('label', null, t('lanListener'), React.createElement('input', { type: 'checkbox', role: 'switch', 'aria-checked': config.enabled, checked: config.enabled, disabled: busy || !view.writable, onChange: (event: Event) => update({ enabled: (event.target as HTMLInputElement).checked }) })),
          React.createElement('div', { className: 'dshLanFields' },
            React.createElement('label', null, React.createElement('span', null, t('lanBindAddress')),
              React.createElement('select', { value: config.bindAddress, disabled: busy || !view.writable,
                onChange: (event: Event) => update({ bindAddress: (event.target as HTMLSelectElement).value }) },
              ...bindOptions.map((item, index) => React.createElement('option', { key: `${index}:${item.address}`, value: item.address, disabled: item.disabled }, item.label)))),
            field(t('lanPort'), String(config.port), value => update({ port: Number(value) }), 'number')),
          React.createElement('p', null, t('lanAddressSelectionHint')),
          field(t('lanAccessToken'), config.accessToken, value => update({ accessToken: value }), listenerTokenVisible ? 'text' : 'password'),
          React.createElement('div', { className: 'dshLanActions' },
            React.createElement('button', { type: 'button', 'aria-pressed': listenerTokenVisible, onClick: () => setListenerTokenVisible(current => !current) }, t(listenerTokenVisible ? 'lanHideToken' : 'lanShowToken'))),
          React.createElement('p', null, t('lanListenerTokenHint')),
          React.createElement('button', { type: 'button', disabled: busy || !view.writable, onClick: () => {
            if (!validPort(String(config.port))) { setError(t('lanInvalidPort')); return }
            if (config.accessToken !== '' && config.accessToken.trim().length < 16) { setError(t('lanTokenTooShort')); return }
            void save({ enabled: config.enabled, bindAddress: config.bindAddress.trim(), port: config.port, accessToken: config.accessToken })
          } }, t('lanSaveListener')))),
      !view.writable ? React.createElement('p', null, t('readOnly')) : null,
      React.createElement('p', { className: error === undefined ? 'dshRemoteNotice' : 'dshRemoteError', role: error === undefined ? 'status' : 'alert', 'aria-live': 'polite' }, error ?? (notice ? t('lanSaved') : '')))
  }
}
