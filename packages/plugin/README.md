# DSH LAN / DSH 局域网连接

`ds-harness-lan@0.5.23-lan.1` is an independent community LAN fork of
[liguobao/ds-harness-remote](https://github.com/liguobao/ds-harness-remote), not an official DeepSeek product.
The upstream author attribution and MIT license are retained; the network-node icon is original artwork for this fork.
The fork repository and installation source are [cjb1234567/ds-harness-lan](https://github.com/cjb1234567/ds-harness-lan); upstream does not publish or support this fork.

## Direct LAN use

Load this fork as a plugin in an existing Harness installation on both machines; it is not a standalone app and exports no CLI executable.
In Plugin management, install from GitHub repository `cjb1234567/ds-harness-lan`, selecting tag `v0.5.23-lan.1` after it is published, then restart Harness. Install the same revision on both machines. Until publication, use a local package/directory; no npm availability is claimed. This fork does not release Android clients or claim Android LAN support.
Connect to the Host's private LAN IP address and port instead of an account/relay server.
Existing Harness, CodeX and ACP workspace/session business flows remain subject to each backend's availability and permissions.

The plugin's top-level `enabled` switch and the LAN listener's `lan.enabled` switch are separate.
The supplied bundle keeps the plugin enabled but sets **`lan.enabled: false`**, with **port `59090`**.
On the Host, explicitly enable LAN and configure a strong, private shared token; for example, the plugin entry's configuration is:

```yaml
enabled: true
role: host
lan:
  enabled: true
  bindAddress: 192.168.1.10 # Replace with this Host's LAN interface address.
  port: 59090
  accessToken: REPLACE_WITH_A_LONG_RANDOM_SECRET
terminal:
  enabled: true
loopback:
  ports: [] # Explicitly add only the preview ports you intend to expose.
```

On the client, enter that Host's IP, port and shared token in the LAN connection UI.
Permit the selected port only on trusted LAN interfaces in the Host firewall; do not expose it using router forwarding or a public tunnel.
The default bind address, if omitted, is `0.0.0.0`; choose a specific trusted interface where possible. The listening-address selector offers all IPv4 interfaces or a detected non-loopback IPv4 address; IPv6 and loopback addresses are not selectable. Saved addresses outside this list remain visible as disabled entries and are not automatically replaced.
Enable/disable interactive terminals in the Host-local settings. Terminals run with the **actual Host OS user's privileges**, independently of Agent tool approvals.
Development previews require an explicit `loopback.ports` allowlist (for example `[3000]`), and forward only authorized Host loopback services.
Existing Host path, session and backend permission boundaries still apply; LAN access does not grant broader authority.

## Security boundary

A shared token authenticates LAN pairing, and the existing **Noise IK** channel encrypts business traffic.
However, **initial descriptor/token exchange uses plain HTTP on the LAN**, not HTTPS: it is not protected against LAN eavesdropping or an active intermediary during first contact.
Use only a trusted, controlled network; do not treat Noise business encryption as protection for that initial exchange.
Treat anyone who learns the shared token as potentially able to connect; keep it out of logs, screenshots and version control, and rotate it if exposed.
This guide does not claim build, test or cross-device validation has passed.

## 中文快速说明

这是基于 [ds-harness-remote 上游](https://github.com/liguobao/ds-harness-remote) 的独立社区 LAN fork，非 DeepSeek 官方插件；保留上游作者与 [MIT 许可](<./LICENSE>)，并使用原创网络连接图标。
本分支仓库及安装源为 [cjb1234567/ds-harness-lan](https://github.com/cjb1234567/ds-harness-lan)，不表示上游发布或支持此 fork。

- 在插件管理中选择从 GitHub 安装，填写 `cjb1234567/ds-harness-lan`，待 tag 发布后选择 `v0.5.23-lan.1`；两端安装相同修订后重启 Harness。未发布时使用本地包，不声称 npm 已有此版本，也不发布 Android 客户端或宣称 Android LAN 支持。
- 在两端已有的 Harness 中加载插件，用 Host 的局域网 **IP + 端口**直连，不依赖账号/中继服务；不提供独立 app 或 CLI 启动入口。
- 插件总开关 `enabled` 与 LAN 开关分开；随包配置的总开关为 `true`，**`lan.enabled` 默认为 `false`，端口为 `59090`**。在 Host 本地显式开启 LAN、配置足够强的共享 token，再在客户端填写同一 IP、端口和 token。上方 YAML 为启用示例，不是默认开启声明。
- 使用可信局域网网卡和防火墙规则，不做公网端口转发；未指定 `bindAddress` 时默认为 `0.0.0.0`，建议绑定具体可信网卡 IP。本机监听地址只可选择所有 IPv4 网卡或检测到的非回环 IPv4 地址，不提供 IPv6 和仅本机可访问地址；列表之外的已保存地址保留为禁用项，不自动替换。
- **共享 token + Noise IK 保护配对认证与业务加密，但首次 descriptor/token 交换经过明文 HTTP LAN，不具备 HTTPS 保护**。只在可信网络使用，不能声称业务加密可防护首次交换时的窃听或中间人攻击。token 泄露后应更换，不记录到日志或提交到仓库。
- 保留 Harness、CodeX、ACP 工作区及会话等原有业务，实际可用性取决于 Host 后端。终端由 Host 本地 `terminal.enabled` 控制，以 **Host 实际系统用户权限**运行，独立于 Agent 工具审批。
- 开发预览必须在 `loopback.ports` 中明确放行端口（例如 `[3000]`）；默认空列表不开放预览服务。LAN 不扩大原有目录、会话、后端或 Host 权限边界。
- 本文不表示构建、测试或跨设备验收已通过。
