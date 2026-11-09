## 中文

**DSH LAN v0.5.23-lan.1 — 社区测试预发布**

- 基于 [liguobao/ds-harness-remote](https://github.com/liguobao/ds-harness-remote) 的社区分支，保留上游作者署名及 MIT 许可，非 DeepSeek 官方产品。
- 在两台已有 Harness 的电脑之间，使用 Host 局域网 IP、端口及共享 token 直连；保留可用后端的 Harness、CodeX 与 ACP 工作区访问。
- 在插件管理中从 GitHub 仓库 `cjb1234567/ds-harness-lan` 安装，选择 tag `v0.5.23-lan.1`，两端安装相同版本并重启 Harness；不通过 npm 发布，也不提供 Android LAN 客户端。
- LAN 监听默认关闭。仅在可信局域网显式开启并设置强 token，禁止公网端口转发。首次 descriptor/token 交换使用明文 HTTP，后续业务流量使用 Noise IK 加密；终端以 Host 系统用户权限执行。

完整安装和安全说明见仓库 README 与 `packages/plugin/README.md`。

## English

**DSH LAN v0.5.23-lan.1 — community testing prerelease**

- Community fork of [liguobao/ds-harness-remote](https://github.com/liguobao/ds-harness-remote), retaining upstream author attribution and the MIT license; not an official DeepSeek product.
- Connect two computers running Harness through the Host's LAN IP, port and shared token, retaining Harness, CodeX and ACP workspace access where the backends are available.
- In Plugin management, install from GitHub repository `cjb1234567/ds-harness-lan`, select tag `v0.5.23-lan.1`, and restart Harness after installing the same version on both computers. This release does not publish to npm or provide an Android LAN client.
- LAN listening is disabled by default. Enable it only on a trusted LAN with a strong token; do not forward the port publicly. Initial descriptor/token exchange uses plain HTTP; subsequent business traffic uses Noise IK encryption. Terminals execute with the Host OS user's privileges.

See the repository README and `packages/plugin/README.md` for installation and security details.
