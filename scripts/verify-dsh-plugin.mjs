import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const json = path => JSON.parse(readFileSync(join(root, path), 'utf8'))
const manifest = json('package.json')
const plugin = json('packages/plugin/package.json')
assert.equal(manifest.name, 'ds-harness-lan')
assert.equal(plugin.name, manifest.name)
assert.equal(plugin.version, manifest.version)
for (const field of ['description', 'keywords', 'homepage', 'repository', 'bugs', 'author', 'license']) {
  assert.deepEqual(plugin[field], manifest[field], `Package ${field} must match`)
}
for (const [base, pkg, entry] of [['', manifest, 'index.js'], ['packages/plugin/', plugin, 'dist/index.js']]) {
  const component = json(`${base}dsh-plugin.json`)
  assert.equal(component.name, pkg.name)
  assert.equal(component.version, pkg.version)
  assert.equal(component.facets.host.entry, entry)
  assert.equal(component.source.repository, 'https://github.com/cjb1234567/ds-harness-lan')
  const require = createRequire(join(root, base, 'package.json'))
  assert.equal(require.resolve(pkg.name), join(root, base, pkg.main))
}
assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
assert.equal(manifest.dsh.client.platform, 'web')
assert.equal(manifest.exports['./client'], './packages/plugin/dist/client.github.js')
for (const file of ['index.js', 'cordis.patch.yml', 'icon.svg', 'packages/plugin/dist/index.js',
  'packages/plugin/dist/client.github.js', 'packages/plugin/public.d.ts']) {
  assert.ok(existsSync(join(root, file)), `Missing installation artifact: ${file}`)
}
const patch = readFileSync(join(root, 'cordis.patch.yml'), 'utf8')
assert.match(patch, /id:\s*ds-harness-lan\s*$/m)
assert.match(patch, /name:\s*ds-harness-lan\s*$/m)
assert.match(readFileSync(join(root, 'index.js'), 'utf8'), /packages\/plugin\/dist\/index\.js/)
assert.match(readFileSync(join(root, 'packages/plugin/public.d.ts'), 'utf8'), /name:\s*'ds-harness-lan'/)
const host = readFileSync(join(root, 'packages/plugin/dist/index.js'), 'utf8')
assert.doesNotMatch(host, /(?:from\s+|require\()['"]@dsh-remote\//, 'Bundle must include unpublished workspace dependencies')
assert.match(host, /lan\/v1\/connect/)
for (const file of ['client.github.js', 'client.js']) {
  const code = readFileSync(join(root, 'packages/plugin/dist', file), 'utf8')
  let registration
  runInNewContext(code, { window: { __ModuleLoader__: { load: value => { registration = value } } } })
  assert.equal(registration?.id, manifest.name)
  assert.equal(typeof registration?.factory, 'function')
  assert.match(code, /lan\.settings\.set/)
  assert.match(code, /status\.events/)
  assert.match(code, /plugins\.row\.config/)
  assert.match(code, /plugins\.bundle\.config/)
}
const entry = await import(join(root, 'index.js'))
assert.equal(entry.name, manifest.name)
assert.equal(typeof entry.apply, 'function')
console.log(`Verified GitHub LAN bundle ${manifest.name}@${manifest.version}`)
