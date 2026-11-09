"use strict";
(() => {
  // src/client-locale.ts
  var localeNamespace = "ds-harness-lan", en = {
    lanTitle: "LAN connections",
    lanShowToken: "Show access token",
    lanHideToken: "Hide access token",
    lanListenerTokenHint: "A custom token requires at least 16 characters, excluding leading and trailing spaces. Leave blank on the first save to generate one; clearing it later keeps the existing token. Show and copy the saved token into the connection settings on your other device.",
    lanTokenInvalid: "Connection refused. Check the Host access token.",
    lanManageConnections: "Manage connections",
    lanDirectHint: "Connect directly by IP address and port. No account or relay is required. Traffic is encrypted with Noise.",
    lanNoHosts: "No LAN hosts yet. Add an IP address and port in Manage connections.",
    lanListener: "Listen for LAN connections",
    lanListenHint: "Only enable on a trusted network. Use an access token to restrict incoming connections.",
    lanBindAddress: "Local listening address",
    lanAllIpv4: "All IPv4 interfaces \xB7 0.0.0.0",
    lanAllIpv6: "All IPv6 interfaces \xB7 ::",
    lanLoopback: "This computer only",
    lanUnavailableAddress: "Saved address; not currently detected",
    lanAddressSelectionHint: "These addresses belong to the computer running DSH, not the browser device. Choose the LAN interface shared with your other computer. With all interfaces selected, connect using a real interface IP, not 0.0.0.0. Reopen this panel after changing networks to refresh the list.",
    lanPort: "Port",
    lanAccessToken: "Access token",
    lanHostAddress: "Host IP or hostname",
    lanAddHost: "Add connection",
    lanEditHost: "Edit connection",
    lanDeleteHost: "Delete connection",
    lanDeleteConfirm: "Delete connection \u201C{name}\u201D?",
    lanCancel: "Cancel",
    lanSaved: "LAN settings saved",
    lanInvalidAddress: "Enter a host address without a URL scheme or path",
    lanInvalidPort: "Enter a port from 1 to 65535",
    lanHostName: "Connection name",
    lanOptionalToken: "Host access token (optional; at least 16 characters if provided)",
    lanTokenTooShort: "Access token must contain at least 16 characters, excluding leading and trailing spaces",
    lanEncrypted: "Encrypted direct connection. WebRTC and relay are not used.",
    lanConnect: "Save and connect",
    lanSaveListener: "Save listener settings",
    lanLoadFailed: "Could not load LAN settings. Try again.",
    remoteTools: "Inject Remote Tools",
    remoteToolsHint: "Expose remote_* tools in sessions. On by default; turn it off when you do not need them. Changes apply after restarting the Host.",
    remoteToolsSaved: "Remote Tools setting saved.",
    terminalRemote: "Remote terminal",
    terminalRemoteHint: "Allow trusted Remote devices to run an interactive shell as this Host user. On by default; independent of Agent approvals. Toggling saves and applies immediately.",
    terminalRemoteUnavailable: "Remote terminal is unavailable. Enable Remote terminal in the Host Remote settings; the switch applies immediately.",
    terminalSaved: "Remote terminal setting saved. Applies immediately.",
    previewOpen: "Preview service",
    previewPort: "Host port",
    previewLocalOnly: "Preview requires Desktop or a browser connected to Harness on this computer.",
    settings: "Settings",
    pluginTitle: "DSH LAN",
    pluginDescription: "Encrypted LAN access to Harness and agent workspaces using an IP address and port.",
    expandSettings: "Show settings: {name}",
    collapseSettings: "Hide settings: {name}",
    unsaved: "Unsaved",
    associated: "Authorized",
    authorizationComplete: "Authorization complete",
    loadingSettings: "Loading DeepSeek Remote settings\u2026",
    mode: "Mode",
    pluginMode: "Plugin mode",
    host: "Host",
    client: "Client",
    authorization: "Authorization",
    account: "Account",
    hostRegistrationCode: "One-time device authorization code",
    ownedDeviceAuthorization: "Owned device",
    authorizedOn: "{role} is authorized on {serverUrl}.",
    readOnly: "This DSH profile does not provide writable user settings.",
    discard: "Discard",
    save: "Save",
    saving: "Saving\u2026",
    signOut: "Sign out",
    signingOut: "Signing out\u2026",
    hostName: "Host name",
    deviceId: "Device ID",
    serverUrl: "Server URL",
    serverUrlHint: "HTTPS origin used for account authorization and encrypted relay.",
    serverSaved: "Server address saved. Restart DSH to apply it.",
    codexRemote: "Codex Remote",
    codexRemoteHint: "Connect to CodeX projects on this Host.",
    codexSaved: "Codex Remote setting saved. Restart DSH to apply it.",
    cursorRemote: "Cursor ACP adapter (experimental)",
    cursorRemoteHint: "Enable the Cursor `agent acp` backend for the Agent ACP gateway. Requires local `agent login`. Restart DSH after changing this setting.",
    cursorSaved: "Cursor ACP adapter setting saved. Restart DSH to apply it.",
    authorizeFromRemote: "Sign in to manage this device and connect to your remote Hosts.",
    signInAccount: "Sign in",
    saveServerBeforeSignIn: "Save the Server address before signing in.",
    authorizationMethod: "Authorization method",
    accountPassword: "Account password",
    registrationCode: "Device authorization code",
    registrationCodeHint: "Generate it after signing in on the Server website. Use it once to connect this device.",
    accountHint: "The account must belong to the selected Server.",
    password: "Password",
    passwordHint: "Used only for this HTTPS authorization request and never saved.",
    modeSavedNeedsAuthorization: "Mode saved. Authorize {role} before connecting. Existing registrations were kept.",
    modeSavedReused: "Mode saved. Existing registration reused. Restart Harness to apply.",
    modeSavedOwnedRole: "Mode saved. This owned device was authorized automatically. Restart Harness to apply.",
    enterRegistrationCode: "Enter the device authorization code.",
    enterAccountPassword: "Enter the Server account and password.",
    associationSaved: "Associated. Restart Harness to apply.",
    signedOut: "Signed out and disconnected from Remote.",
    remoteRequestFailed: "Remote mode request failed.",
    remoteControlUnavailable: "Remote plugin control is still starting. Restart DSH if it stays unavailable.",
    switchTarget: "Switch Local / Remote Harness target",
    harnessTarget: "Harness target",
    close: "Close",
    refreshRemote: "Refresh remote hosts",
    refreshRemoteShort: "Refresh",
    local: "Local",
    remoteTarget: "Remote \xB7 {name}",
    remoteHostMention: "Remote \xB7 {platform}",
    thisMachineLocal: "This machine (Local)",
    currentDevice: "Current device",
    noRemoteHosts: "No authorized remote Host for this account.",
    online: "Online",
    offline: "Offline",
    thisMachineHost: "This machine as Remote Host",
    connected: "Connected",
    connectedAs: "Connected as {account}",
    connection: "Connection",
    checkingConnection: "Checking connection\u2026",
    connecting: "Connecting",
    reconnecting: "Reconnecting",
    lastActive: "Last active: {time}",
    neverConnected: "No successful connection yet.",
    reconnect: "Reconnect",
    reconnectingAction: "Reconnecting\u2026",
    reconnectStarted: "Reconnect requested.",
    connectionAuthorizationExpired: "Authorization expired. Sign out and authorize this Host again.",
    connectionReplaced: "Another instance is using this Host identity. Stop it or use a separate DSH_HOME before reconnecting.",
    connectionCredentialsBusy: "Credential refresh is locked. Stop other instances. After a crash, stop all instances before removing server-credentials.json.refresh-lock and authorizing again.",
    connectionDeviceRevoked: "This Host was revoked on the Server. Sign out and authorize it again.",
    connectionOwnershipRequired: "The Server no longer recognizes this Host as an owned device.",
    connectionRateLimited: "The Server is receiving too many requests. Automatic retry will continue.",
    connectionVersionMismatch: "The Plugin and Server protocol versions are incompatible.",
    connectionInvalidResponse: "The Server returned an invalid control message.",
    connectionReachability: "Cannot reach the Host. Check its IP address, port and listener settings.",
    connectionUnexpected: "The connection stopped unexpectedly. Automatic retry will continue.",
    hostSignInHint: "Sign in to authorize this Host on the selected Server.",
    checkingHost: "Checking Host registration\u2026",
    hostUnavailable: "Host unavailable: {error}",
    serverAccountEmail: "Server account email",
    serverAccountPassword: "Server account password",
    signInRegisterHost: "Sign in and register Host",
    signingIn: "Signing in\u2026",
    useRegistrationCode: "Use connection code",
    registering: "Registering\u2026",
    remoteEntry: "LAN",
    remoteTitle: "DSH LAN \xB7 Workspaces",
    remoteDescription: "Choose one of your Hosts, then select a working directory. The Harness interface stays on this device.",
    starProject: "Open source project, stars welcome~",
    chooseHost: "Host",
    chooseDirectory: "Working directory",
    selectHostHint: "Select an online Host to browse its directories.",
    emptyDirectory: "This directory has no visible subdirectories.",
    openWorkspace: "Open workspace",
    openingWorkspace: "Opening\u2026",
    loadingDirectory: "Loading directories\u2026",
    remoteProgressCheckingHost: "Checking Host",
    remoteProgressCheckingHostDetail: "Finding the selected device and checking whether it is online.",
    remoteProgressAuthorizingPeer: "Verifying authorization",
    remoteProgressAuthorizingPeerDetail: "Verifying the access token and Host identity.",
    remoteProgressOpeningChannel: "Opening encrypted channel",
    remoteProgressOpeningChannelDetail: "Connecting directly to the configured IP address and port.",
    remoteProgressProbeLan: "Probing LAN",
    remoteProgressProbeLanDetail: "Checking whether the Host is reachable on the local network.",
    remoteProgressProbeP2p: "Probing P2P",
    remoteProgressProbeP2pDetail: "Checking direct internet candidates between this device and the Host.",
    remoteProgressProbeTurn: "Probing TURN",
    remoteProgressProbeTurnDetail: "Checking the TURN relay path for restricted networks.",
    remoteProgressProbeRelay: "Preparing Relay",
    remoteProgressProbeRelayDetail: "Preparing the encrypted Server Relay fallback if direct paths do not open.",
    remoteProgressTryingPrefix: "Trying ",
    remoteProgressUsingPrefix: "Using ",
    remoteProgressLoadingWorkspaces: "Loading workspaces",
    remoteProgressLoadingWorkspacesDetail: "Reading the remote Harness workspace list through the tunnel.",
    remoteProgressSwitchingWorkspace: "Switching interface",
    remoteProgressSwitchingWorkspaceDetail: "Handing the remote workspace to the local Harness UI.",
    remoteProgressReady: "Ready",
    remoteProgressReadyDetail: "The remote Host is connected and encrypted.",
    backToHosts: "Choose another Host",
    currentDirectory: "Selected directory",
    directoryTruncated: "Only part of this directory could be shown.",
    pluginVersion: "Plugin {version}",
    harnessVersion: "Harness {version}",
    existingWorkspaces: "DSH workspaces",
    remotePathPlaceholder: "/home/user/project",
    remotePathHint: "Enter an absolute directory path on the selected Host.",
    noRemoteWorkspaces: "No remote workspaces yet. Use + to add one.",
    activeRemote: "{name}",
    exitRemote: "Exit",
    addRemoteWorkspace: "Add remote workspace",
    addCodexWorkspace: "Add CodeX workspace",
    addCursorWorkspace: "Add Cursor workspace",
    addAntigravityWorkspace: "Add Antigravity workspace",
    addPiWorkspace: "Add Pi workspace",
    addOpencodeWorkspace: "Add OpenCode workspace",
    addClaudeWorkspace: "Add Claude workspace",
    noCodexWorkspaces: "No CodeX workspaces yet.",
    noCursorWorkspaces: "No Cursor workspaces yet. Add a project directory to start.",
    noAntigravityWorkspaces: "No Antigravity workspaces yet. Add a project directory to start.",
    noPiWorkspaces: "No Pi workspaces yet. Add a project directory to start.",
    noOpencodeWorkspaces: "No OpenCode workspaces yet. Add a project directory to start.",
    noClaudeWorkspaces: "No Claude workspaces yet. Add a project directory to start.",
    cancelAddWorkspace: "Cancel",
    confirmAddWorkspace: "Add and open",
    showAllWorkspaces: "Show all DSH workspaces",
    showAllCodexWorkspaces: "Show all CodeX workspaces",
    showAllCursorWorkspaces: "Show all Cursor workspaces",
    showAllAntigravityWorkspaces: "Show all Antigravity workspaces",
    showAllPiWorkspaces: "Show all Pi workspaces",
    showAllOpencodeWorkspaces: "Show all OpenCode workspaces",
    showAllClaudeWorkspaces: "Show all Claude workspaces",
    remoteModeLabel: "Remote mode \xB7 {name}",
    remoteNetworkP2p: "P2P",
    remoteNetworkTurn: "TURN",
    remoteNetworkRelay: "Relay",
    remoteNetworkLan: "LAN",
    remoteNetworkOffline: "Disconnected",
    remoteLinkEncrypted: "Noise encrypted",
    connectionRouteTitle: "Connection route",
    connectionRouteFrom: "From",
    connectionRouteVia: "Via",
    connectionRouteTo: "To",
    connectionRouteCurrentDevice: "This device",
    connectionRouteLan: "Local network",
    connectionRouteP2p: "Direct internet path",
    connectionRouteTurn: "TURN relay service",
    connectionRouteRelay: "Remote Server",
    connectionRouteHost: "Work computer running Harness",
    connectionRouteLanDetail: "Direct transfer over the local network",
    connectionRouteP2pDetail: "Direct transfer over the internet",
    connectionRouteTurnDetail: "Encrypted transfer through the TURN service",
    connectionRouteRelayDetail: "Encrypted transfer through the Remote Server",
    connectionRouteEncrypted: "Application data remains end-to-end encrypted along this route.",
    connectionDetailsConnection: "Connection",
    connectionDetailsWebRtc: "Network details \xB7 WebRTC / ICE",
    connectionId: "Connection ID",
    connectedAt: "Established",
    preferredTransports: "Attempt order",
    controlChannel: "Control channel",
    controlAddress: "Control address",
    controlStateConnecting: "Connecting",
    controlStateOpen: "Connected",
    controlStateClosing: "Closing",
    controlStateClosed: "Closed",
    peerState: "Peer connection",
    dataChannel: "DataChannel",
    localCandidate: "Local candidate",
    remoteCandidate: "Remote candidate",
    localAddress: "Local address",
    remoteAddress: "Remote address",
    networkProtocol: "Network protocol",
    relayProtocol: "TURN protocol",
    roundTripTime: "Round-trip time",
    availableBitrate: "Available outgoing bitrate",
    bytesSent: "WebRTC bytes sent",
    bytesReceived: "WebRTC bytes received",
    notProvided: "Not provided",
    candidateHost: "Local address \xB7 host",
    candidateSrflx: "Public address \xB7 srflx",
    candidatePrflx: "Peer address \xB7 prflx",
    candidateRelay: "TURN address \xB7 relay",
    openLocalWorkspaces: "Open local workspaces",
    clientSignInHint: "Sign in to this Server to list your remote Hosts.",
    signInClient: "DS Harness Remote:",
    signInClientDescription: "Connect once. Available anytime.",
    startSignIn: "Start sign-in",
    allowControlCurrentDevice: "Allow control of this device",
    allowControlDevice: "Allow control of device",
    connectedClientCount: "{count} connected",
    checkAcp: "Check backend",
    checkingAcp: "Checking ACP\u2026",
    acpAvailable: "ACP available",
    acpUnavailable: "ACP unavailable",
    agentBackends: "More Coding Agents",
    acpDocumentation: "Read the documentation.",
    acpHint: "Connect through ACP. ",
    acpCheckPassed: "Check passed",
    acpCheckFailed: "Check failed",
    addAcp: "Add ACP",
    acpName: "Service name",
    acpCommand: "Command",
    acpArguments: "Arguments",
    removeAcp: "Remove",
    currentConnectedDevices: "Currently connected devices",
    noConnectedClients: "No devices are currently connected to this Host.",
    unknownDevice: "Unknown device",
    exitRemoteAccount: "Sign out",
    githubLogin: "GitHub QR",
    providerLogin: "{provider} QR",
    scanWithProvider: "Scan to continue with {provider}",
    loadingLoginProviders: "Loading sign-in methods\u2026",
    retryLoginProviders: "Retry loading sign-in methods",
    serverApplied: "Server address applied.",
    noLoginProviders: "QR sign-in is unavailable. Use email and password.",
    zhihuLogin: "Zhihu QR",
    scanWithGitHub: "Scan to continue with GitHub",
    scanWithZhihu: "Scan to continue with Zhihu",
    openInBrowser: "Continue in browser",
    scanLoginHint: "Authorize on your phone. This window will continue automatically.",
    currentServiceAddress: "Authorization service domain:",
    editServiceAddress: "Edit service address",
    cancelServiceAddressEdit: "Cancel",
    accountPasswordLogin: "Password",
    qrLoginExpired: "This QR code expired. Refresh it to continue.",
    refreshQrCode: "Refresh QR code",
    codexVirtualWorkspace: "CodeX virtual workspace",
    cursorVirtualWorkspace: "Cursor virtual workspace",
    antigravityVirtualWorkspace: "Antigravity virtual workspace",
    piVirtualWorkspace: "Pi virtual workspace",
    opencodeVirtualWorkspace: "OpenCode virtual workspace",
    claudeVirtualWorkspace: "Claude virtual workspace",
    codexVirtualSessions: "Sessions"
  }, zh = {
    lanTitle: "\u5C40\u57DF\u7F51\u8FDE\u63A5",
    lanShowToken: "\u663E\u793A\u8BBF\u95EE\u4EE4\u724C",
    lanHideToken: "\u9690\u85CF\u8BBF\u95EE\u4EE4\u724C",
    lanListenerTokenHint: "\u81EA\u884C\u586B\u5199\u7684\u4EE4\u724C\u81F3\u5C11\u9700\u8981 16 \u4E2A\u5B57\u7B26\uFF08\u4E0D\u8BA1\u9996\u5C3E\u7A7A\u683C\uFF09\u3002\u9996\u6B21\u4FDD\u5B58\u65F6\u7559\u7A7A\u4F1A\u751F\u6210\u4EE4\u724C\uFF1B\u4E4B\u540E\u6E05\u7A7A\u4F1A\u4FDD\u7559\u539F\u4EE4\u724C\u3002\u663E\u793A\u5E76\u590D\u5236\u4FDD\u5B58\u540E\u7684\u4EE4\u724C\uFF0C\u586B\u5165\u53E6\u4E00\u53F0\u8BBE\u5907\u7684\u8FDE\u63A5\u8BBE\u7F6E",
    lanTokenInvalid: "\u8FDE\u63A5\u88AB\u62D2\u7EDD\uFF0C\u8BF7\u68C0\u67E5\u4E3B\u673A\u8BBF\u95EE\u4EE4\u724C",
    lanManageConnections: "\u7BA1\u7406\u8FDE\u63A5",
    lanDirectHint: "\u901A\u8FC7 IP \u548C\u7AEF\u53E3\u76F4\u8FDE\uFF0C\u65E0\u9700\u8D26\u53F7\u6216\u4E2D\u7EE7\uFF1B\u901A\u4FE1\u4F7F\u7528 Noise \u52A0\u5BC6",
    lanNoHosts: "\u6682\u65E0\u5C40\u57DF\u7F51\u4E3B\u673A\uFF0C\u8BF7\u5728\u300C\u7BA1\u7406\u8FDE\u63A5\u300D\u4E2D\u6DFB\u52A0 IP \u548C\u7AEF\u53E3",
    lanListener: "\u76D1\u542C\u5C40\u57DF\u7F51\u8FDE\u63A5",
    lanListenHint: "\u4EC5\u5728\u53EF\u4FE1\u7F51\u7EDC\u4E2D\u542F\u7528\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u8BBF\u95EE\u4EE4\u724C\u9650\u5236\u4F20\u5165\u8FDE\u63A5",
    lanBindAddress: "\u672C\u673A\u76D1\u542C\u5730\u5740",
    lanAllIpv4: "\u6240\u6709 IPv4 \u7F51\u5361 \xB7 0.0.0.0",
    lanAllIpv6: "\u6240\u6709 IPv6 \u7F51\u5361 \xB7 ::",
    lanLoopback: "\u4EC5\u672C\u673A\u53EF\u8BBF\u95EE",
    lanUnavailableAddress: "\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u5F53\u524D\u672A\u68C0\u6D4B\u5230\u6B64\u5730\u5740",
    lanAddressSelectionHint: "\u8FD9\u91CC\u663E\u793A\u8FD0\u884C DSH \u7684\u7535\u8111\u5730\u5740\uFF0C\u4E0D\u662F\u6D4F\u89C8\u5668\u6240\u5728\u8BBE\u5907\u7684\u5730\u5740\u3002\u8BF7\u9009\u62E9\u4E0E\u53E6\u4E00\u53F0\u7535\u8111\u540C\u4E00\u5C40\u57DF\u7F51\u7684\u7F51\u5361\uFF1B\u9009\u62E9\u6240\u6709\u7F51\u5361\u65F6\uFF0C\u53E6\u4E00\u53F0\u7535\u8111\u4ECD\u9700\u586B\u5199\u5B9E\u9645\u7F51\u5361 IP\uFF0C\u800C\u4E0D\u662F 0.0.0.0\u3002\u5207\u6362\u7F51\u7EDC\u540E\u91CD\u65B0\u6253\u5F00\u9762\u677F\u53EF\u5237\u65B0\u5217\u8868",
    lanPort: "\u7AEF\u53E3",
    lanAccessToken: "\u8BBF\u95EE\u4EE4\u724C",
    lanHostAddress: "\u4E3B\u673A IP \u6216\u57DF\u540D",
    lanAddHost: "\u6DFB\u52A0\u8FDE\u63A5",
    lanEditHost: "\u7F16\u8F91\u8FDE\u63A5",
    lanDeleteHost: "\u5220\u9664\u8FDE\u63A5",
    lanDeleteConfirm: "\u5220\u9664\u8FDE\u63A5\u300C{name}\u300D\uFF1F",
    lanCancel: "\u53D6\u6D88",
    lanSaved: "\u5C40\u57DF\u7F51\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",
    lanInvalidAddress: "\u8BF7\u8F93\u5165\u4E3B\u673A\u5730\u5740\uFF0C\u4E0D\u542B URL \u534F\u8BAE\u6216\u8DEF\u5F84",
    lanInvalidPort: "\u8BF7\u8F93\u5165 1 \u81F3 65535 \u7684\u7AEF\u53E3",
    lanHostName: "\u8FDE\u63A5\u540D\u79F0",
    lanOptionalToken: "\u4E3B\u673A\u8BBF\u95EE\u4EE4\u724C\uFF08\u53EF\u9009\uFF1B\u586B\u5199\u65F6\u81F3\u5C11 16 \u4E2A\u5B57\u7B26\uFF09",
    lanTokenTooShort: "\u8BBF\u95EE\u4EE4\u724C\u81F3\u5C11\u9700\u8981 16 \u4E2A\u5B57\u7B26\uFF08\u4E0D\u8BA1\u9996\u5C3E\u7A7A\u683C\uFF09",
    lanEncrypted: "\u52A0\u5BC6\u76F4\u8FDE\uFF0C\u4E0D\u4F7F\u7528 WebRTC \u6216\u4E2D\u7EE7",
    lanConnect: "\u4FDD\u5B58\u5E76\u8FDE\u63A5",
    lanSaveListener: "\u4FDD\u5B58\u76D1\u542C\u8BBE\u7F6E",
    lanLoadFailed: "\u65E0\u6CD5\u52A0\u8F7D\u5C40\u57DF\u7F51\u8BBE\u7F6E\uFF0C\u8BF7\u91CD\u8BD5",
    remoteTools: "\u6CE8\u5165 Remote Tools",
    remoteToolsHint: "\u5728\u4F1A\u8BDD\u4E2D\u6CE8\u5165 remote_* \u5DE5\u5177\u3002\u9ED8\u8BA4\u5F00\u542F\uFF1B\u4E0D\u9700\u8981\u65F6\u53EF\u5173\u95ED\uFF0C\u91CD\u542F Host \u540E\u751F\u6548\u3002",
    remoteToolsSaved: "Remote Tools \u8BBE\u7F6E\u5DF2\u4FDD\u5B58\u3002",
    terminalRemote: "\u8FDC\u7A0B\u7EC8\u7AEF",
    terminalRemoteHint: "\u5141\u8BB8\u53D7\u4FE1\u4EFB\u7684 Remote \u8BBE\u5907\u4EE5\u6B64 Host \u7528\u6237\u8EAB\u4EFD\u8FD0\u884C\u4EA4\u4E92\u5F0F Shell\u3002\u9ED8\u8BA4\u5F00\u542F\uFF0C\u72EC\u7ACB\u4E8E Agent \u5BA1\u6279\uFF1B\u5207\u6362\u540E\u7ACB\u5373\u4FDD\u5B58\u5E76\u751F\u6548\u3002",
    terminalRemoteUnavailable: "\u8FDC\u7A0B\u7EC8\u7AEF\u4E0D\u53EF\u7528\u3002\u8BF7\u5728 Host \u7684 Remote \u8BBE\u7F6E\u4E2D\u5F00\u542F\u300C\u8FDC\u7A0B\u7EC8\u7AEF\u300D\uFF0C\u5F00\u5173\u4F1A\u7ACB\u5373\u751F\u6548\u3002",
    terminalSaved: "\u8FDC\u7A0B\u7EC8\u7AEF\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u7ACB\u5373\u751F\u6548\u3002",
    previewOpen: "\u9884\u89C8\u670D\u52A1",
    previewPort: "Host \u7AEF\u53E3",
    previewLocalOnly: "\u9884\u89C8\u9700\u8981 Desktop\uFF0C\u6216\u8FDE\u63A5\u5230\u672C\u673A Harness \u7684\u6D4F\u89C8\u5668\u3002",
    settings: "\u8BBE\u7F6E",
    pluginTitle: "DSH \u5C40\u57DF\u7F51\u8FDE\u63A5",
    pluginDescription: "\u901A\u8FC7 IP \u548C\u7AEF\u53E3\u52A0\u5BC6\u76F4\u8FDE\u5C40\u57DF\u7F51\u4E2D\u7684 Harness \u4E0E Agent \u5DE5\u4F5C\u533A\u3002",
    expandSettings: "\u5C55\u5F00\u8BBE\u7F6E\uFF1A{name}",
    collapseSettings: "\u6536\u8D77\u8BBE\u7F6E\uFF1A{name}",
    unsaved: "\u672A\u4FDD\u5B58",
    associated: "\u5DF2\u6388\u6743",
    authorizationComplete: "\u5DF2\u5B8C\u6210\u6388\u6743",
    loadingSettings: "\u6B63\u5728\u52A0\u8F7D DeepSeek \u8FDC\u7A0B\u8FDE\u63A5\u8BBE\u7F6E\u2026",
    mode: "\u6A21\u5F0F",
    pluginMode: "\u63D2\u4EF6\u6A21\u5F0F",
    host: "\u4E3B\u673A",
    client: "Client",
    authorization: "\u6388\u6743",
    account: "\u8D26\u53F7",
    hostRegistrationCode: "\u4E00\u6B21\u6027\u8BBE\u5907\u6388\u6743\u7801",
    ownedDeviceAuthorization: "\u81EA\u6709\u8BBE\u5907",
    authorizedOn: "{role}\u5DF2\u7ECF\u5728 {serverUrl} \u5B8C\u6210\u6388\u6743\u3002",
    readOnly: "\u6B64 DSH profile \u4E0D\u63D0\u4F9B\u53EF\u5199\u7684\u7528\u6237\u8BBE\u7F6E\u3002",
    discard: "\u653E\u5F03\u4FEE\u6539",
    save: "\u4FDD\u5B58",
    saving: "\u4FDD\u5B58\u4E2D\u2026",
    signOut: "\u9000\u51FA\u6388\u6743",
    signingOut: "\u6B63\u5728\u9000\u51FA\u2026",
    hostName: "\u4E3B\u673A\u540D\u79F0",
    deviceId: "\u8BBE\u5907 ID",
    serverUrl: "Server \u5730\u5740",
    serverUrlHint: "\u7528\u4E8E\u8D26\u53F7\u6388\u6743\u548C\u52A0\u5BC6\u4E2D\u7EE7\u7684 HTTPS \u5730\u5740\u3002",
    serverSaved: "Server \u5730\u5740\u5DF2\u4FDD\u5B58\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002",
    codexRemote: "Codex Remote",
    codexRemoteHint: "\u8FDE\u63A5\u8FD9\u53F0 Host \u4E0A\u7684 CodeX \u9879\u76EE\u3002",
    codexSaved: "Codex Remote \u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002",
    cursorRemote: "Cursor ACP adapter\uFF08\u5B9E\u9A8C\u6027\uFF09",
    cursorRemoteHint: "\u4E3A Agent ACP gateway \u542F\u7528 Cursor `agent acp` backend\u3002\u9700\u672C\u673A\u5B8C\u6210 `agent login`\u3002\u4FEE\u6539\u540E\u9700\u91CD\u542F DSH \u751F\u6548\u3002",
    cursorSaved: "Cursor ACP adapter \u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002",
    authorizeFromRemote: "\u767B\u5F55\u540E\u53EF\u7BA1\u7406\u5F53\u524D\u8BBE\u5907\uFF0C\u5E76\u8FDE\u63A5\u8D26\u53F7\u4E0B\u7684\u8FDC\u7A0B\u4E3B\u673A\u3002",
    signInAccount: "\u767B\u5F55\u8D26\u53F7",
    saveServerBeforeSignIn: "\u8BF7\u5148\u4FDD\u5B58 Server \u5730\u5740\uFF0C\u518D\u767B\u5F55\u8D26\u53F7\u3002",
    authorizationMethod: "\u6388\u6743\u65B9\u5F0F",
    accountPassword: "\u8D26\u53F7\u5BC6\u7801",
    registrationCode: "\u8BBE\u5907\u6388\u6743\u7801",
    registrationCodeHint: "\u767B\u5F55 Server \u7F51\u9875\u540E\u751F\u6210\uFF0C\u7528\u4E00\u6B21\u5373\u53EF\u8FDE\u63A5\u8FD9\u53F0\u8BBE\u5907\u3002",
    accountHint: "\u8D26\u53F7\u5FC5\u987B\u5C5E\u4E8E\u6240\u9009 Server\u3002",
    password: "\u5BC6\u7801",
    passwordHint: "\u4EC5\u7528\u4E8E\u672C\u6B21 HTTPS \u6388\u6743\u8BF7\u6C42\uFF0C\u4E0D\u4F1A\u4FDD\u5B58\u3002",
    modeSavedNeedsAuthorization: "\u6A21\u5F0F\u5DF2\u4FDD\u5B58\u3002\u8FDE\u63A5\u524D\u8BF7\u5148\u6388\u6743 {role}\uFF1B\u5DF2\u6709\u6CE8\u518C\u4FE1\u606F\u5DF2\u4FDD\u7559\u3002",
    modeSavedReused: "\u6A21\u5F0F\u5DF2\u4FDD\u5B58\u5E76\u590D\u7528\u5DF2\u6709\u6CE8\u518C\u4FE1\u606F\u3002\u91CD\u542F Harness \u540E\u751F\u6548\u3002",
    modeSavedOwnedRole: "\u6A21\u5F0F\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u81EA\u52A8\u6388\u6743\u6B64\u81EA\u6709\u8BBE\u5907\u3002\u91CD\u542F Harness \u540E\u751F\u6548\u3002",
    enterRegistrationCode: "\u8BF7\u8F93\u5165\u8BBE\u5907\u6388\u6743\u7801\u3002",
    enterAccountPassword: "\u8BF7\u8F93\u5165 Server \u8D26\u53F7\u548C\u5BC6\u7801\u3002",
    associationSaved: "\u5173\u8054\u6210\u529F\u3002\u91CD\u542F Harness \u540E\u751F\u6548\u3002",
    signedOut: "\u5DF2\u9000\u51FA\u8D26\u53F7\u5E76\u65AD\u5F00 Remote \u8FDE\u63A5\u3002",
    remoteRequestFailed: "\u8FDC\u7A0B\u6A21\u5F0F\u8BF7\u6C42\u5931\u8D25\u3002",
    remoteControlUnavailable: "Remote \u63D2\u4EF6\u63A7\u5236\u901A\u9053\u4ECD\u5728\u542F\u52A8\uFF1B\u5982\u679C\u4E00\u76F4\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u542F DSH\u3002",
    switchTarget: "\u5207\u6362\u672C\u5730\u6216\u8FDC\u7A0B Harness",
    harnessTarget: "Harness \u76EE\u6807",
    close: "\u5173\u95ED",
    refreshRemote: "\u5237\u65B0\u8FDC\u7A0B\u4E3B\u673A",
    refreshRemoteShort: "\u5237\u65B0",
    local: "\u672C\u5730",
    remoteTarget: "\u8FDC\u7A0B \xB7 {name}",
    remoteHostMention: "Remote \xB7 {platform}",
    thisMachineLocal: "\u6B64\u8BBE\u5907\uFF08\u672C\u5730\uFF09",
    currentDevice: "\u5F53\u524D\u8BBE\u5907",
    noRemoteHosts: "\u6B64\u8D26\u53F7\u6CA1\u6709\u5DF2\u6388\u6743\u7684\u8FDC\u7A0B Host\u3002",
    online: "\u5728\u7EBF",
    offline: "\u79BB\u7EBF",
    thisMachineHost: "\u5C06\u6B64\u8BBE\u5907\u4F5C\u4E3A\u8FDC\u7A0B Host",
    connected: "\u5DF2\u8FDE\u63A5",
    connectedAs: "\u5DF2\u4F7F\u7528 {account} \u8FDE\u63A5",
    connection: "\u8FDE\u63A5\u72B6\u6001",
    checkingConnection: "\u6B63\u5728\u68C0\u67E5\u8FDE\u63A5\u2026",
    connecting: "\u6B63\u5728\u8FDE\u63A5",
    reconnecting: "\u6B63\u5728\u91CD\u8FDE",
    lastActive: "\u6700\u540E\u6D3B\u8DC3\uFF1A{time}",
    neverConnected: "\u5C1A\u672A\u6210\u529F\u8FDE\u63A5\u8FC7\u3002",
    reconnect: "\u624B\u52A8\u91CD\u8FDE",
    reconnectingAction: "\u6B63\u5728\u91CD\u8FDE\u2026",
    reconnectStarted: "\u5DF2\u53D1\u8D77\u91CD\u8FDE\u3002",
    connectionAuthorizationExpired: "\u6388\u6743\u5DF2\u5931\u6548\uFF0C\u8BF7\u9000\u51FA\u6388\u6743\u540E\u91CD\u65B0\u8FDE\u63A5\u6B64 Host\u3002",
    connectionReplaced: "\u53E6\u4E00\u5B9E\u4F8B\u6B63\u5728\u4F7F\u7528\u6B64 Host \u8EAB\u4EFD\u3002\u8BF7\u505C\u6B62\u8BE5\u5B9E\u4F8B\uFF0C\u6216\u4F7F\u7528\u72EC\u7ACB\u7684 DSH_HOME \u540E\u91CD\u65B0\u8FDE\u63A5\u3002",
    connectionCredentialsBusy: "\u51ED\u636E\u5237\u65B0\u88AB\u9501\u5B9A\uFF0C\u8BF7\u505C\u6B62\u5176\u4ED6\u5B9E\u4F8B\u3002\u82E5\u6B64\u524D\u5F02\u5E38\u9000\u51FA\uFF0C\u8BF7\u505C\u6B62\u6240\u6709\u5B9E\u4F8B\u540E\u79FB\u9664 server-credentials.json.refresh-lock \u5E76\u91CD\u65B0\u6388\u6743\u3002",
    connectionDeviceRevoked: "\u6B64 Host \u5DF2\u5728 Server \u4E0A\u88AB\u64A4\u9500\uFF0C\u8BF7\u9000\u51FA\u6388\u6743\u540E\u91CD\u65B0\u8FDE\u63A5\u3002",
    connectionOwnershipRequired: "Server \u5DF2\u4E0D\u518D\u5C06\u6B64 Host \u8BC6\u522B\u4E3A\u5F53\u524D\u8D26\u53F7\u7684\u8BBE\u5907\u3002",
    connectionRateLimited: "Server \u8BF7\u6C42\u8FC7\u591A\uFF0C\u63D2\u4EF6\u5C06\u7EE7\u7EED\u81EA\u52A8\u91CD\u8BD5\u3002",
    connectionVersionMismatch: "Plugin \u4E0E Server \u7684\u534F\u8BAE\u7248\u672C\u4E0D\u517C\u5BB9\u3002",
    connectionInvalidResponse: "Server \u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u63A7\u5236\u6D88\u606F\u3002",
    connectionReachability: "\u65E0\u6CD5\u8FDE\u63A5\u4E3B\u673A\uFF0C\u8BF7\u68C0\u67E5 IP\u3001\u7AEF\u53E3\u4E0E\u76D1\u542C\u8BBE\u7F6E",
    connectionUnexpected: "\u8FDE\u63A5\u610F\u5916\u4E2D\u65AD\uFF0C\u63D2\u4EF6\u5C06\u7EE7\u7EED\u81EA\u52A8\u91CD\u8BD5\u3002",
    hostSignInHint: "\u767B\u5F55\u540E\u5728\u6240\u9009 Server \u4E0A\u6388\u6743\u6B64 Host\u3002",
    checkingHost: "\u6B63\u5728\u68C0\u67E5 Host \u6CE8\u518C\u72B6\u6001\u2026",
    hostUnavailable: "Host \u4E0D\u53EF\u7528\uFF1A{error}",
    serverAccountEmail: "Server \u8D26\u53F7\u90AE\u7BB1",
    serverAccountPassword: "Server \u8D26\u53F7\u5BC6\u7801",
    signInRegisterHost: "\u767B\u5F55\u5E76\u6CE8\u518C Host",
    signingIn: "\u6B63\u5728\u767B\u5F55\u2026",
    useRegistrationCode: "\u4F7F\u7528\u8FDE\u63A5\u7801",
    registering: "\u6B63\u5728\u6CE8\u518C\u2026",
    remoteEntry: "LAN",
    remoteTitle: "DSH LAN \xB7 \u5DE5\u4F5C\u533A",
    remoteDescription: "\u9009\u62E9\u60F3\u8981\u8FDE\u63A5\u4E3B\u673A\u548C\u5DE5\u4F5C\u76EE\u5F55\u3002",
    starProject: "\u5F00\u6E90\u9879\u76EE\uFF0C\u6B22\u8FCEStar~",
    chooseHost: "\u4E3B\u673A",
    chooseDirectory: "\u5DE5\u4F5C\u76EE\u5F55",
    selectHostHint: "\u9009\u62E9\u4E00\u53F0\u5728\u7EBF\u4E3B\u673A\u4EE5\u6D4F\u89C8\u5176\u76EE\u5F55\u3002",
    emptyDirectory: "\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u89C1\u7684\u5B50\u76EE\u5F55\u3002",
    openWorkspace: "\u6253\u5F00\u5DE5\u4F5C\u533A",
    openingWorkspace: "\u6B63\u5728\u6253\u5F00\u2026",
    loadingDirectory: "\u6B63\u5728\u52A0\u8F7D\u76EE\u5F55\u2026",
    remoteProgressCheckingHost: "\u6B63\u5728\u68C0\u67E5 Host",
    remoteProgressCheckingHostDetail: "\u6B63\u5728\u67E5\u627E\u6240\u9009\u8BBE\u5907\u5E76\u786E\u8BA4\u662F\u5426\u5728\u7EBF\u3002",
    remoteProgressAuthorizingPeer: "\u6B63\u5728\u9A8C\u8BC1\u6388\u6743",
    remoteProgressAuthorizingPeerDetail: "\u6B63\u5728\u9A8C\u8BC1\u8BBF\u95EE\u4EE4\u724C\u4E0E\u4E3B\u673A\u8EAB\u4EFD",
    remoteProgressOpeningChannel: "\u6B63\u5728\u5EFA\u7ACB\u52A0\u5BC6\u901A\u9053",
    remoteProgressOpeningChannelDetail: "\u6B63\u5728\u76F4\u8FDE\u914D\u7F6E\u7684 IP \u5730\u5740\u4E0E\u7AEF\u53E3",
    remoteProgressProbeLan: "\u6B63\u5728\u63A2\u6D4B\u5C40\u57DF\u7F51",
    remoteProgressProbeLanDetail: "\u68C0\u67E5\u5F53\u524D\u8BBE\u5907\u662F\u5426\u80FD\u901A\u8FC7\u672C\u5730\u7F51\u7EDC\u76F4\u8FDE Host\u3002",
    remoteProgressProbeP2p: "\u6B63\u5728\u63A2\u6D4B P2P",
    remoteProgressProbeP2pDetail: "\u68C0\u67E5\u5F53\u524D\u8BBE\u5907\u548C Host \u4E4B\u95F4\u7684\u4E92\u8054\u7F51\u76F4\u8FDE\u5019\u9009\u8DEF\u5F84\u3002",
    remoteProgressProbeTurn: "\u6B63\u5728\u63A2\u6D4B TURN",
    remoteProgressProbeTurnDetail: "\u68C0\u67E5\u53D7\u9650\u7F51\u7EDC\u4E0B\u53EF\u7528\u7684 TURN \u4E2D\u7EE7\u8DEF\u5F84\u3002",
    remoteProgressProbeRelay: "\u6B63\u5728\u51C6\u5907 Relay",
    remoteProgressProbeRelayDetail: "\u5982\u679C\u76F4\u8FDE\u8DEF\u5F84\u672A\u6253\u5F00\uFF0C\u5C06\u56DE\u843D\u5230\u52A0\u5BC6\u7684 Server Relay\u3002",
    remoteProgressTryingPrefix: "\u6B63\u5728\u5C1D\u8BD5 ",
    remoteProgressUsingPrefix: "\u5DF2\u8FDE\u63A5 ",
    remoteProgressLoadingWorkspaces: "\u6B63\u5728\u52A0\u8F7D\u5DE5\u4F5C\u533A",
    remoteProgressLoadingWorkspacesDetail: "\u901A\u8FC7\u96A7\u9053\u8BFB\u53D6\u8FDC\u7AEF Harness \u5DE5\u4F5C\u533A\u5217\u8868\u3002",
    remoteProgressSwitchingWorkspace: "\u6B63\u5728\u5207\u6362\u754C\u9762",
    remoteProgressSwitchingWorkspaceDetail: "\u6B63\u5728\u628A\u8FDC\u7AEF\u5DE5\u4F5C\u533A\u4EA4\u7ED9\u672C\u5730 Harness UI\u3002",
    remoteProgressReady: "\u5DF2\u5C31\u7EEA",
    remoteProgressReadyDetail: "\u8FDC\u7AEF Host \u5DF2\u8FDE\u63A5\uFF0C\u7AEF\u5230\u7AEF\u52A0\u5BC6\u5DF2\u5EFA\u7ACB\u3002",
    backToHosts: "\u9009\u62E9\u5176\u4ED6\u4E3B\u673A",
    currentDirectory: "\u5DF2\u9009\u76EE\u5F55",
    directoryTruncated: "\u76EE\u5F55\u5185\u5BB9\u8F83\u591A\uFF0C\u76EE\u524D\u53EA\u663E\u793A\u4E86\u4E00\u90E8\u5206\u3002",
    pluginVersion: "\u63D2\u4EF6 {version}",
    harnessVersion: "Harness {version}",
    existingWorkspaces: "DSH \u5DE5\u4F5C\u533A",
    remotePathPlaceholder: "/home/user/project",
    remotePathHint: "\u8F93\u5165\u6240\u9009\u4E3B\u673A\u4E0A\u7684\u7EDD\u5BF9\u76EE\u5F55\u8DEF\u5F84\u3002",
    noRemoteWorkspaces: "\u8FD9\u53F0\u4E3B\u673A\u8FD8\u6CA1\u6709\u5DE5\u4F5C\u533A\uFF0C\u70B9\u51FB + \u6DFB\u52A0\u3002",
    activeRemote: "{name}",
    exitRemote: "\u9000\u51FA",
    addRemoteWorkspace: "\u6DFB\u52A0\u8FDC\u7A0B\u5DE5\u4F5C\u533A",
    addCodexWorkspace: "\u6DFB\u52A0 CodeX \u5DE5\u4F5C\u533A",
    addCursorWorkspace: "\u6DFB\u52A0 Cursor \u5DE5\u4F5C\u533A",
    addAntigravityWorkspace: "\u6DFB\u52A0 Antigravity \u5DE5\u4F5C\u533A",
    addPiWorkspace: "\u6DFB\u52A0 Pi \u5DE5\u4F5C\u533A",
    addOpencodeWorkspace: "\u6DFB\u52A0 OpenCode \u5DE5\u4F5C\u533A",
    addClaudeWorkspace: "\u6DFB\u52A0 Claude \u5DE5\u4F5C\u533A",
    noCodexWorkspaces: "\u8FD8\u6CA1\u6709 CodeX \u5DE5\u4F5C\u533A\u3002",
    noCursorWorkspaces: "\u8FD8\u6CA1\u6709 Cursor \u5DE5\u4F5C\u533A\u3002\u6DFB\u52A0\u9879\u76EE\u76EE\u5F55\u5373\u53EF\u5F00\u59CB\u3002",
    noAntigravityWorkspaces: "\u8FD8\u6CA1\u6709 Antigravity \u5DE5\u4F5C\u533A\u3002\u6DFB\u52A0\u9879\u76EE\u76EE\u5F55\u5373\u53EF\u5F00\u59CB\u3002",
    noPiWorkspaces: "\u8FD8\u6CA1\u6709 Pi \u5DE5\u4F5C\u533A\u3002\u6DFB\u52A0\u9879\u76EE\u76EE\u5F55\u5373\u53EF\u5F00\u59CB\u3002",
    noOpencodeWorkspaces: "\u8FD8\u6CA1\u6709 OpenCode \u5DE5\u4F5C\u533A\u3002\u6DFB\u52A0\u9879\u76EE\u76EE\u5F55\u5373\u53EF\u5F00\u59CB\u3002",
    noClaudeWorkspaces: "\u8FD8\u6CA1\u6709 Claude \u5DE5\u4F5C\u533A\u3002\u6DFB\u52A0\u9879\u76EE\u76EE\u5F55\u5373\u53EF\u5F00\u59CB\u3002",
    cancelAddWorkspace: "\u53D6\u6D88",
    confirmAddWorkspace: "\u786E\u8BA4\u5E76\u6253\u5F00",
    showAllWorkspaces: "\u663E\u793A\u5168\u90E8 DSH \u5DE5\u4F5C\u533A",
    showAllCodexWorkspaces: "\u663E\u793A\u5168\u90E8 CodeX \u5DE5\u4F5C\u533A",
    showAllCursorWorkspaces: "\u663E\u793A\u5168\u90E8 Cursor \u5DE5\u4F5C\u533A",
    showAllAntigravityWorkspaces: "\u663E\u793A\u5168\u90E8 Antigravity \u5DE5\u4F5C\u533A",
    showAllPiWorkspaces: "\u663E\u793A\u5168\u90E8 Pi \u5DE5\u4F5C\u533A",
    showAllOpencodeWorkspaces: "\u663E\u793A\u5168\u90E8 OpenCode \u5DE5\u4F5C\u533A",
    showAllClaudeWorkspaces: "\u663E\u793A\u5168\u90E8 Claude \u5DE5\u4F5C\u533A",
    remoteModeLabel: "\u8FDC\u7A0B\u6A21\u5F0F \xB7 {name}",
    remoteNetworkP2p: "P2P",
    remoteNetworkTurn: "TURN",
    remoteNetworkRelay: "\u4E2D\u7EE7",
    remoteNetworkLan: "\u5C40\u57DF\u7F51",
    remoteNetworkOffline: "\u5DF2\u65AD\u5F00",
    remoteLinkEncrypted: "Noise \u52A0\u5BC6",
    connectionRouteTitle: "\u8FDE\u63A5\u7EBF\u8DEF",
    connectionRouteFrom: "\u8D77\u70B9",
    connectionRouteVia: "\u7ECF\u8FC7",
    connectionRouteTo: "\u7EC8\u70B9",
    connectionRouteCurrentDevice: "\u5F53\u524D\u8BBE\u5907",
    connectionRouteLan: "\u540C\u4E00\u5C40\u57DF\u7F51",
    connectionRouteP2p: "\u4E92\u8054\u7F51\u76F4\u8FDE",
    connectionRouteTurn: "TURN \u4E2D\u7EE7\u670D\u52A1",
    connectionRouteRelay: "Remote Server",
    connectionRouteHost: "\u8FD0\u884C Harness \u7684\u5DE5\u4F5C\u7535\u8111",
    connectionRouteLanDetail: "\u5728\u672C\u5730\u7F51\u7EDC\u4E2D\u76F4\u63A5\u4F20\u8F93",
    connectionRouteP2pDetail: "\u901A\u8FC7\u4E92\u8054\u7F51\u76F4\u63A5\u4F20\u8F93",
    connectionRouteTurnDetail: "\u901A\u8FC7 TURN \u670D\u52A1\u8F6C\u53D1\u52A0\u5BC6\u6570\u636E",
    connectionRouteRelayDetail: "\u901A\u8FC7 Remote Server \u8F6C\u53D1\u52A0\u5BC6\u6570\u636E",
    connectionRouteEncrypted: "\u7EBF\u8DEF\u4E0A\u7684\u4E1A\u52A1\u6570\u636E\u4FDD\u6301\u7AEF\u5230\u7AEF\u52A0\u5BC6\u3002",
    connectionDetailsConnection: "\u8FDE\u63A5",
    connectionDetailsWebRtc: "\u7F51\u7EDC\u8BE6\u60C5 \xB7 WebRTC / ICE",
    connectionId: "\u8FDE\u63A5\u7F16\u53F7",
    connectedAt: "\u5EFA\u7ACB\u65F6\u95F4",
    preferredTransports: "\u5C1D\u8BD5\u987A\u5E8F",
    controlChannel: "\u63A7\u5236\u901A\u9053",
    controlAddress: "\u63A7\u5236\u5730\u5740",
    controlStateConnecting: "\u8FDE\u63A5\u4E2D",
    controlStateOpen: "\u5DF2\u8FDE\u63A5",
    controlStateClosing: "\u6B63\u5728\u5173\u95ED",
    controlStateClosed: "\u5DF2\u5173\u95ED",
    peerState: "\u8FDE\u63A5\u72B6\u6001",
    dataChannel: "DataChannel",
    localCandidate: "\u672C\u5730\u5019\u9009",
    remoteCandidate: "\u8FDC\u7AEF\u5019\u9009",
    localAddress: "\u672C\u5730\u5730\u5740",
    remoteAddress: "\u8FDC\u7AEF\u5730\u5740",
    networkProtocol: "\u4F20\u8F93\u534F\u8BAE",
    relayProtocol: "TURN \u534F\u8BAE",
    roundTripTime: "\u5F80\u8FD4\u65F6\u5EF6",
    availableBitrate: "\u53EF\u7528\u4E0A\u884C\u5E26\u5BBD",
    bytesSent: "WebRTC \u5DF2\u53D1\u9001",
    bytesReceived: "WebRTC \u5DF2\u63A5\u6536",
    notProvided: "\u672A\u63D0\u4F9B",
    candidateHost: "\u672C\u5730\u5730\u5740 \xB7 host",
    candidateSrflx: "\u516C\u7F51\u5730\u5740 \xB7 srflx",
    candidatePrflx: "\u5BF9\u7AEF\u5730\u5740 \xB7 prflx",
    candidateRelay: "TURN \u5730\u5740 \xB7 relay",
    openLocalWorkspaces: "\u6253\u5F00\u672C\u5730\u5DE5\u4F5C\u533A",
    clientSignInHint: "\u767B\u5F55 Server \u540E\u5373\u53EF\u67E5\u770B\u81EA\u5DF1\u7684\u8FDC\u7AEF\u4E3B\u673A\u3002",
    signInClient: "DS Harness Remote\uFF1A",
    signInClientDescription: "\u4E00\u6B21\u8FDE\u63A5\uFF0C\u968F\u65F6\u53EF\u7528\u3002",
    startSignIn: "\u5F00\u59CB\u767B\u5F55",
    allowControlCurrentDevice: "\u5141\u8BB8\u63A7\u5236\u5F53\u524D\u8BBE\u5907",
    allowControlDevice: "\u5141\u8BB8\u63A7\u5236\u8BBE\u5907",
    connectedClientCount: "{count} \u53F0\u5DF2\u8FDE\u63A5",
    checkAcp: "\u68C0\u6D4B\u540E\u7AEF",
    checkingAcp: "\u6B63\u5728\u68C0\u6D4B ACP\u2026",
    acpAvailable: "ACP \u53EF\u7528",
    acpUnavailable: "ACP \u4E0D\u53EF\u7528",
    agentBackends: "\u66F4\u591A Coding Agent",
    acpDocumentation: "\u8BE6\u7EC6\u8BF7\u67E5\u9605\u3002",
    acpHint: "\u901A\u8FC7 ACP \u7EDF\u4E00\u63A5\u5165\uFF0C",
    acpCheckPassed: "\u68C0\u6D4B\u901A\u8FC7",
    acpCheckFailed: "\u68C0\u6D4B\u5931\u8D25",
    addAcp: "\u6DFB\u52A0 ACP",
    acpName: "\u670D\u52A1\u540D\u79F0",
    acpCommand: "\u542F\u52A8\u547D\u4EE4",
    acpArguments: "\u547D\u4EE4\u53C2\u6570",
    removeAcp: "\u79FB\u9664",
    currentConnectedDevices: "\u5F53\u524D\u8FDE\u63A5\u7684\u8BBE\u5907",
    noConnectedClients: "\u76EE\u524D\u6CA1\u6709\u8BBE\u5907\u8FDE\u63A5\u5230\u8FD9\u53F0\u4E3B\u673A\u3002",
    unknownDevice: "\u672A\u77E5\u8BBE\u5907",
    exitRemoteAccount: "\u9000\u51FA\u8D26\u53F7",
    githubLogin: "GitHub \u626B\u7801",
    providerLogin: "{provider} \u626B\u7801",
    scanWithProvider: "\u4F7F\u7528 {provider} \u626B\u7801\u767B\u5F55",
    loadingLoginProviders: "\u6B63\u5728\u83B7\u53D6\u767B\u5F55\u65B9\u5F0F\u2026",
    retryLoginProviders: "\u91CD\u65B0\u83B7\u53D6\u767B\u5F55\u65B9\u5F0F",
    serverApplied: "Server \u5730\u5740\u5DF2\u751F\u6548\u3002",
    noLoginProviders: "\u6682\u65E0\u53EF\u7528\u7684\u626B\u7801\u767B\u5F55\u65B9\u5F0F\uFF0C\u8BF7\u4F7F\u7528\u90AE\u7BB1\u548C\u5BC6\u7801\u3002",
    zhihuLogin: "\u77E5\u4E4E\u626B\u7801",
    scanWithGitHub: "\u4F7F\u7528 GitHub \u626B\u7801\u767B\u5F55",
    scanWithZhihu: "\u4F7F\u7528\u77E5\u4E4E\u626B\u7801\u767B\u5F55",
    openInBrowser: "\u5728\u6D4F\u89C8\u5668\u4E2D\u7EE7\u7EED",
    scanLoginHint: "\u8BF7\u5728\u624B\u673A\u4E0A\u5B8C\u6210\u6388\u6743\uFF0C\u6B64\u7A97\u53E3\u4F1A\u81EA\u52A8\u7EE7\u7EED\u3002",
    currentServiceAddress: "\u6388\u6743\u670D\u52A1\u57DF\u540D\uFF1A",
    editServiceAddress: "\u4FEE\u6539\u670D\u52A1\u5730\u5740",
    cancelServiceAddressEdit: "\u53D6\u6D88",
    accountPasswordLogin: "\u8D26\u53F7\u5BC6\u7801",
    qrLoginExpired: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002",
    refreshQrCode: "\u5237\u65B0\u4E8C\u7EF4\u7801",
    codexVirtualWorkspace: "CodeX \u5DE5\u4F5C\u533A",
    cursorVirtualWorkspace: "Cursor \u5DE5\u4F5C\u533A",
    antigravityVirtualWorkspace: "Antigravity \u5DE5\u4F5C\u533A",
    piVirtualWorkspace: "Pi \u5DE5\u4F5C\u533A",
    opencodeVirtualWorkspace: "OpenCode \u5DE5\u4F5C\u533A",
    claudeVirtualWorkspace: "Claude \u5DE5\u4F5C\u533A",
    codexVirtualSessions: "Sessions"
  };

  // src/client/presentation.ts
  var defaultPreferredTransports = ["lan"];
  function normalizedPreferredTransports(value) {
    return value === void 0 || value.length === 0 ? [...defaultPreferredTransports] : [...value];
  }
  function formatLocalTime(value) {
    let date = new Date(value);
    return Number.isNaN(date.getTime()) ? "\u2014" : date.toLocaleString();
  }
  function formatByteSize(value) {
    if (value < 1024) return `${value.toLocaleString()} B`;
    let units = ["KiB", "MiB", "GiB"], amount = value, unit = "B";
    for (let nextUnit of units)
      if (amount /= 1024, unit = nextUnit, amount < 1024) break;
    return `${amount.toLocaleString(void 0, { maximumFractionDigits: 1 })} ${unit}`;
  }
  function formatBitrate(value) {
    let units = ["bit/s", "Kbit/s", "Mbit/s", "Gbit/s"], amount = value, unitIndex = 0;
    for (; amount >= 1e3 && unitIndex < units.length - 1; )
      amount /= 1e3, unitIndex += 1;
    return `${amount.toLocaleString(void 0, { maximumFractionDigits: 1 })} ${units[unitIndex]}`;
  }
  function shortDeviceId(value) {
    return value.length <= 14 ? value : `${value.slice(0, 8)}\u2026${value.slice(-4)}`;
  }
  function transportLabel(value, t) {
    return t(value === "lan" ? "remoteNetworkLan" : value === "p2p" ? "remoteNetworkP2p" : value === "turn" ? "remoteNetworkTurn" : "remoteNetworkRelay");
  }
  function transportDiagnosticLabel(value) {
    return value === "lan" ? "LAN" : value === "p2p" ? "P2P" : value === "turn" ? "TURN" : "Relay";
  }
  function transportProgressCopy(value) {
    return value === "lan" ? { label: "remoteProgressProbeLan", detail: "remoteProgressProbeLanDetail" } : value === "p2p" ? { label: "remoteProgressProbeP2p", detail: "remoteProgressProbeP2pDetail" } : value === "turn" ? { label: "remoteProgressProbeTurn", detail: "remoteProgressProbeTurnDetail" } : { label: "remoteProgressProbeRelay", detail: "remoteProgressProbeRelayDetail" };
  }
  function statusTransportPreference(status) {
    if (status?.transport === "LAN") return "lan";
    if (status?.transport === "P2P") return "p2p";
    if (status?.transport === "TURN") return "turn";
    if (status?.transport === "Relay") return "relay";
  }
  function connectedProgress(status) {
    let activeTransport = statusTransportPreference(status);
    if (activeTransport !== void 0)
      return {
        label: "remoteProgressReady",
        detail: "remoteProgressReadyDetail",
        percent: 100,
        transports: normalizedPreferredTransports(status?.preferredTransports),
        activeTransports: [activeTransport],
        routeVerb: "using"
      };
  }
  function loadingProgressPercent(elapsedMs) {
    return elapsedMs >= 6800 ? 96 : elapsedMs >= 3800 ? 93 : elapsedMs >= 1600 ? 89 : 84;
  }
  function observedConnectionProgress(status, targetDeviceId, preferredTransports, connectedStep, connectedAt) {
    let transports = normalizedPreferredTransports(status.preferredTransports ?? preferredTransports), connection = status.connectionProgress;
    if (connection?.targetDeviceId === targetDeviceId) {
      if (connection.phase === "checking-host")
        return { label: "remoteProgressCheckingHost", detail: "remoteProgressCheckingHostDetail", percent: 12 };
      if (connection.phase === "authorizing-peer")
        return { label: "remoteProgressAuthorizingPeer", detail: "remoteProgressAuthorizingPeerDetail", percent: 30 };
      let activeTransports = connection.activeTransports?.filter((transport) => transports.includes(transport)) ?? [];
      if (connection.phase === "probing") {
        let activeIndex = Math.max(0, ...activeTransports.map((transport) => transports.indexOf(transport)));
        return {
          ...activeTransports.length === 1 ? transportProgressCopy(activeTransports[0]) : { label: "remoteProgressOpeningChannel", detail: "remoteProgressOpeningChannelDetail" },
          percent: Math.min(76, 42 + activeIndex * 10),
          transports,
          activeTransports,
          routeVerb: "trying"
        };
      }
      return {
        ...connectedStep,
        percent: loadingProgressPercent(connectedAt === void 0 ? 0 : Date.now() - connectedAt),
        transports,
        activeTransports,
        routeVerb: "using"
      };
    }
    if (status.connectedTargetDeviceId !== targetDeviceId) return;
    let activeTransport = statusTransportPreference(status);
    return {
      ...connectedStep,
      percent: loadingProgressPercent(connectedAt === void 0 ? 0 : Date.now() - connectedAt),
      transports,
      ...activeTransport === void 0 ? {} : { activeTransports: [activeTransport], routeVerb: "using" }
    };
  }
  function connectionErrorMessage(code, t) {
    return t(code === "LAN_HOST_NOT_FOUND" ? "lanNoHosts" : code === "LAN_CONNECTION_FAILED" ? "connectionReachability" : code === "LAN_AUTH_INVALID" ? "lanTokenInvalid" : code === "ACCOUNT_AUTH_REQUIRED" ? "connectionReachability" : code === "AUTH_REQUIRED" || code === "AUTH_INVALID" || code === "TOKEN_EXPIRED" ? "lanTokenInvalid" : code === "CONNECTION_REPLACED" ? "connectionReplaced" : code === "SERVER_CREDENTIALS_BUSY" ? "connectionCredentialsBusy" : code === "DEVICE_REVOKED" ? "connectionDeviceRevoked" : code === "DEVICE_OWNERSHIP_REQUIRED" ? "connectionOwnershipRequired" : code === "RATE_LIMITED" ? "connectionRateLimited" : code === "UNSUPPORTED_VERSION" ? "connectionVersionMismatch" : code === "INVALID_MESSAGE" ? "connectionInvalidResponse" : code === "CONNECTION_FAILED" || code === "SERVER_NOT_CONFIGURED" ? "connectionReachability" : "connectionUnexpected");
  }
  function messageOf(reason) {
    return reason instanceof Error ? reason.message : String(reason);
  }
  function formatPlatform(value) {
    let normalized = value.toLowerCase();
    return normalized === "darwin" || normalized === "macos" ? "macOS" : normalized === "win32" || normalized === "windows" ? "Windows" : normalized === "linux" ? "Linux" : normalized === "android" ? "Android" : value;
  }
  function connectedClientModeLabel(mode, t) {
    return t(mode === "LAN" ? "remoteNetworkLan" : mode === "P2P" ? "remoteNetworkP2p" : mode === "TURN" ? "remoteNetworkTurn" : mode === "Relay" ? "remoteNetworkRelay" : "connected");
  }

  // src/client/header.ts
  function createRemoteSessionHeaderAction(React) {
    function RemoteSessionHeaderAction(props) {
      let { t } = props, status = React.useSyncExternalStore(
        props.statusFeed.subscribe,
        props.statusFeed.getSnapshot,
        props.statusFeed.getSnapshot
      ), [busy, setBusy] = React.useState(!1), [routeOpen, setRouteOpen] = React.useState(!1), [hostReference, setHostReference] = React.useState(void 0);
      React.useEffect(() => {
        let onReference = (event) => {
          let detail = event.detail;
          detail === null || typeof detail != "object" || typeof detail.label != "string" || typeof detail.platform != "string" || typeof detail.deviceId != "string" || typeof detail.invocation != "string" || setHostReference(detail);
        };
        return window.addEventListener("dsh-remote-host-reference", onReference), () => window.removeEventListener("dsh-remote-host-reference", onReference);
      }, []), React.useEffect(() => {
        if (status?.mode === "remote")
          return hideLocalSessionActions();
      }, [status?.mode]), React.useEffect(() => (document.documentElement.classList.toggle(
        "dshRemoteCodexTargetActive",
        status?.mode === "remote" && status.backend === "codex"
      ), document.documentElement.classList.toggle(
        "dshRemoteCursorTargetActive",
        status?.mode === "remote" && status.backend === "cursor"
      ), document.documentElement.classList.toggle(
        "dshRemoteAntigravityTargetActive",
        status?.mode === "remote" && status.backend === "antigravity"
      ), document.documentElement.classList.toggle(
        "dshRemotePiTargetActive",
        status?.mode === "remote" && status.backend === "pi"
      ), document.documentElement.classList.toggle(
        "dshRemoteOpencodeTargetActive",
        status?.mode === "remote" && status.backend === "opencode"
      ), () => {
        document.documentElement.classList.remove("dshRemoteCodexTargetActive"), document.documentElement.classList.remove("dshRemoteCursorTargetActive"), document.documentElement.classList.remove("dshRemoteAntigravityTargetActive"), document.documentElement.classList.remove("dshRemotePiTargetActive"), document.documentElement.classList.remove("dshRemoteOpencodeTargetActive");
      }), [status?.mode, status?.backend]), React.useEffect(() => {
        if (!routeOpen) return;
        let closeOnEscape = (event) => {
          event.key === "Escape" && setRouteOpen(!1);
        };
        return document.addEventListener("keydown", closeOnEscape), () => document.removeEventListener("keydown", closeOnEscape);
      }, [routeOpen]);
      let renderHostReference = () => hostReference === void 0 ? null : React.createElement(
        "aside",
        { className: "dshRemoteHostReferencePanel", role: "dialog", "aria-label": "Remote Host" },
        React.createElement(
          "header",
          null,
          React.createElement("strong", null, "Remote Host"),
          React.createElement("button", { type: "button", "aria-label": t("close"), onClick: () => setHostReference(void 0) }, "\xD7")
        ),
        React.createElement(
          "dl",
          null,
          React.createElement("div", null, React.createElement("dt", null, "\u540D\u79F0"), React.createElement("dd", null, hostReference.label)),
          React.createElement("div", null, React.createElement("dt", null, "\u7CFB\u7EDF"), React.createElement("dd", null, hostReference.platform)),
          React.createElement("div", null, React.createElement("dt", null, "\u8BBE\u5907 ID"), React.createElement("dd", { className: "isMono" }, hostReference.deviceId)),
          React.createElement("div", null, React.createElement("dt", null, "\u8C03\u7528\u5185\u5BB9"), React.createElement("dd", { className: "isMono" }, hostReference.invocation))
        )
      );
      if (status?.mode !== "remote") return renderHostReference();
      let exit = async () => {
        setBusy(!0);
        try {
          await props.control("mode.set", { mode: "local" }), window.location.reload();
        } finally {
          setBusy(!1);
        }
      }, transport = status.transport ?? "Disconnected", networkLabel = t(transport === "P2P" ? "remoteNetworkP2p" : transport === "TURN" ? "remoteNetworkTurn" : transport === "Relay" ? "remoteNetworkRelay" : transport === "LAN" ? "remoteNetworkLan" : "remoteNetworkOffline"), networkOnline = status.connected === !0 && transport !== "Disconnected", routeVia = t(transport === "P2P" ? "connectionRouteP2p" : transport === "TURN" ? "connectionRouteTurn" : transport === "Relay" ? "connectionRouteRelay" : "connectionRouteLan"), routeViaDetail = t(transport === "P2P" ? "connectionRouteP2pDetail" : transport === "TURN" ? "connectionRouteTurnDetail" : transport === "Relay" ? "connectionRouteRelayDetail" : "connectionRouteLanDetail"), network = status.network, webRtc = status.lan === void 0 ? network?.webRtc : void 0, controlStateLabel = network?.controlChannelState === "connecting" ? t("controlStateConnecting") : network?.controlChannelState === "open" ? t("controlStateOpen") : network?.controlChannelState === "closing" ? t("controlStateClosing") : t("controlStateClosed"), detailValue = (value) => value === void 0 || value === "" ? t("notProvided") : String(value), candidateLabel = (value) => value === "host" ? t("candidateHost") : value === "srflx" ? t("candidateSrflx") : value === "prflx" ? t("candidatePrflx") : value === "relay" ? t("candidateRelay") : detailValue(value), fact = (label, value, mono = !1) => React.createElement(
        "div",
        null,
        React.createElement("dt", null, label),
        React.createElement("dd", { className: mono ? "isMono" : void 0, title: mono ? value : void 0 }, value)
      );
      return React.createElement(
        "div",
        { className: "dshRemoteSessionHeader", role: "status" },
        React.createElement("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.7,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": !0
        }, React.createElement("rect", { x: 3, y: 4, width: 18, height: 13, rx: 2 }), React.createElement("path", { d: "M8 21h8M12 17v4" })),
        React.createElement("span", { className: "dshRemoteSessionTarget" }, t("remoteModeLabel", { name: status.target?.name ?? t("host") })),
        React.createElement("button", {
          type: "button",
          className: `dshRemoteNetwork${networkOnline ? " isOnline" : " isOffline"}`,
          title: networkLabel,
          disabled: !networkOnline,
          "aria-haspopup": "dialog",
          "aria-expanded": routeOpen,
          onClick: () => setRouteOpen((value) => !value)
        }, React.createElement("i", { "aria-hidden": !0 }), networkLabel),
        networkOnline ? React.createElement("span", { className: "dshRemoteEncrypted" }, t("remoteLinkEncrypted")) : null,
        renderHostReference(),
        React.createElement("button", { type: "button", className: "dshRemoteHeaderExitLink", disabled: busy, onClick: () => void exit() }, t("exitRemote")),
        routeOpen ? React.createElement("div", {
          className: "dshRemoteRouteBackdrop",
          role: "presentation",
          onMouseDown: (event) => {
            event.target === event.currentTarget && setRouteOpen(!1);
          }
        }, React.createElement(
          "section",
          {
            className: "dshRemoteRoutePanel",
            role: "dialog",
            "aria-label": t("connectionRouteTitle")
          },
          React.createElement(
            "header",
            null,
            React.createElement("strong", null, t("connectionRouteTitle")),
            React.createElement("button", { type: "button", "aria-label": t("close"), onClick: () => setRouteOpen(!1) }, "\xD7")
          ),
          React.createElement(
            "ol",
            null,
            React.createElement(
              "li",
              null,
              React.createElement("small", null, t("connectionRouteFrom")),
              React.createElement("strong", null, network?.local.name ?? t("connectionRouteCurrentDevice")),
              network === void 0 ? null : React.createElement("span", null, `${network.local.platform} \xB7 ${shortDeviceId(network.local.deviceId)}`)
            ),
            React.createElement(
              "li",
              null,
              React.createElement("small", null, t("connectionRouteVia")),
              React.createElement("strong", null, routeVia),
              React.createElement("span", null, routeViaDetail)
            ),
            React.createElement(
              "li",
              null,
              React.createElement("small", null, t("connectionRouteTo")),
              React.createElement("strong", null, network?.remote.name ?? status.target?.name ?? t("host")),
              React.createElement("span", null, network === void 0 ? t("connectionRouteHost") : `${network.remote.platform} \xB7 ${shortDeviceId(network.remote.deviceId)}`)
            )
          ),
          network === void 0 ? null : React.createElement(
            "section",
            { className: "dshRemoteRouteSection" },
            React.createElement("h3", null, t("connectionDetailsConnection")),
            React.createElement(
              "dl",
              null,
              fact(t("connectionId"), detailValue(network.connectionId), !0),
              fact(t("connectedAt"), network.connectedAt === void 0 ? t("notProvided") : formatLocalTime(network.connectedAt)),
              fact(t("preferredTransports"), network.preferredTransports.map((value) => transportLabel(value, t)).join(" \u2192 ")),
              fact(t("controlChannel"), `WebSocket \xB7 ${controlStateLabel}`),
              fact(t("controlAddress"), network.controlChannelUrl, !0)
            )
          ),
          webRtc === void 0 ? null : React.createElement(
            "section",
            { className: "dshRemoteRouteSection" },
            React.createElement("h3", null, t("connectionDetailsWebRtc")),
            React.createElement(
              "dl",
              null,
              fact(t("peerState"), `${webRtc.connectionState} \xB7 ICE ${webRtc.iceConnectionState}`),
              fact(t("dataChannel"), detailValue(webRtc.dataChannelState)),
              fact(t("localCandidate"), candidateLabel(webRtc.localCandidateType)),
              fact(t("remoteCandidate"), candidateLabel(webRtc.remoteCandidateType)),
              fact(t("localAddress"), detailValue(webRtc.localAddress), !0),
              fact(t("remoteAddress"), detailValue(webRtc.remoteAddress), !0),
              fact(t("networkProtocol"), detailValue(webRtc.protocol?.toUpperCase())),
              fact(t("relayProtocol"), detailValue(webRtc.relayProtocol?.toUpperCase())),
              fact(t("roundTripTime"), webRtc.currentRoundTripTimeMs === void 0 ? t("notProvided") : `${webRtc.currentRoundTripTimeMs.toLocaleString()} ms`),
              fact(t("availableBitrate"), webRtc.availableOutgoingBitrate === void 0 ? t("notProvided") : formatBitrate(webRtc.availableOutgoingBitrate)),
              fact(t("bytesSent"), webRtc.bytesSent === void 0 ? t("notProvided") : formatByteSize(webRtc.bytesSent)),
              fact(t("bytesReceived"), webRtc.bytesReceived === void 0 ? t("notProvided") : formatByteSize(webRtc.bytesReceived))
            )
          ),
          React.createElement("p", null, t(status.lan === void 0 ? "connectionRouteEncrypted" : "lanEncrypted"))
        )) : null
      );
    }
    return RemoteSessionHeaderAction;
  }
  function hideLocalSessionActions() {
    let selector = 'button,a,[role="button"]', hiddenAttribute = "data-dsh-remote-hidden-action", localAction = /(?:open|打开).{0,12}vs\s*code|vs\s*code.{0,12}(?:open|打开)|session\s*logs?|download.{0,12}session\s*logs?|会话日志|下载.{0,8}日志/i, inspect = (root) => {
      let candidates = root instanceof Element && root.matches(selector) ? [root, ...Array.from(root.querySelectorAll(selector))] : Array.from(root.querySelectorAll(selector));
      for (let candidate of candidates) {
        if (candidate.closest(".dshRemoteSessionHeader") !== null) continue;
        let label = [
          candidate.getAttribute("aria-label"),
          candidate.getAttribute("title"),
          candidate.getAttribute("data-tooltip"),
          candidate.textContent
        ].filter(Boolean).join(" ");
        localAction.test(label) && candidate.setAttribute(hiddenAttribute, "");
      }
    };
    inspect(document.body);
    let observer = new MutationObserver((records) => {
      for (let record of records) {
        record.type === "attributes" && inspect(record.target);
        for (let node of Array.from(record.addedNodes))
          node instanceof Element && inspect(node);
      }
    });
    return observer.observe(document.body, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeFilter: ["aria-label", "title", "data-tooltip"]
    }), () => {
      observer.disconnect(), document.querySelectorAll(`[${hiddenAttribute}]`).forEach((element) => element.removeAttribute(hiddenAttribute));
    };
  }

  // src/client/control-result.ts
  function unwrapControlResult(result, fallbackMessage) {
    if (!result.ok) {
      let remoteCode = result.error?.details?.remoteCode;
      throw Object.assign(new Error(result.error?.message ?? fallbackMessage), {
        code: typeof remoteCode == "string" ? remoteCode : result.error?.code,
        details: result.error?.details
      });
    }
    return result.value;
  }

  // src/client/navigation.ts
  var pendingWorkspaceSelectionKey = "dsh-remote:pending-workspace-selection";
  function storedWorkspaceSelection() {
    let raw = window.sessionStorage.getItem(pendingWorkspaceSelectionKey);
    if (raw !== null)
      try {
        let value = JSON.parse(raw);
        if (typeof value.targetDeviceId != "string" || typeof value.workspaceId != "string") throw new Error("invalid");
        if (value.backend !== void 0 && value.backend !== "harness" && value.backend !== "codex" && value.backend !== "cursor" && value.backend !== "antigravity" && value.backend !== "pi" && value.backend !== "claude" && value.backend !== "opencode") throw new Error("invalid");
        if (value.sessionId !== void 0 && typeof value.sessionId != "string") throw new Error("invalid");
        return value;
      } catch {
        window.sessionStorage.removeItem(pendingWorkspaceSelectionKey);
        return;
      }
  }
  function workspacesReady(snapshot) {
    return snapshot.baselinesReady === !0 || snapshot.phase === "ready";
  }

  // src/client/styles.ts
  var lanStyles = `
.dshLanSettings { display: grid; gap: 12px; min-width: 0; }
.dshLanSettings form, .dshLanListener { display: grid; gap: 12px; }
.dshLanFields { display: grid; grid-template-columns: minmax(0, 1fr) minmax(80px, .4fr); gap: 12px; }
.dshLanSettings label { display: grid; gap: 6px; min-width: 0; font-size: 13px; }
.dshLanSettings input { box-sizing: border-box; width: 100%; min-width: 0; padding: 8px 10px; color: inherit; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; font: inherit; }
.dshLanSettings input[type=checkbox] { width: auto; }
.dshLanSettings button { font: inherit; font-weight: 500; color: inherit; border: 1px solid var(--dsw-alias-border-l2); background: transparent; border-radius: 8px; padding: 6px 10px; }
.dshLanSettings button:disabled { opacity: .5; }
.dshLanActions, .dshLanRow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.dshLanRow { justify-content: space-between; }
.dshLanRow > span { min-width: 0; overflow-wrap: anywhere; }
.dshLanRow strong { font-weight: 500; }
.dshLanSettings strong { font-weight: 500; }
.dshLanSettings button:focus-visible, .dshLanSettings input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dshLanSettings button:not(:disabled):hover { background: var(--dsw-alias-interactive-bg-hover); cursor: pointer; }
.dshLanSettings [role=progressbar] { display: block; width: 20px; height: 20px; margin: 20px auto; border: 2px solid var(--dsw-alias-border-l2); border-top-color: var(--dsw-alias-brand-primary); border-radius: 50%; animation: dshLanSpin 1s linear infinite; }
@keyframes dshLanSpin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .dshLanSettings [role=progressbar] { animation: none; } }
.dshLanSettings p { margin: 0; font-size: 13px; }
.dshLanSettings > p:last-child { min-height: 20px; }
.dshLanSettings ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.dshLanManager { margin-block: 12px; }
.dshLanManager summary { cursor: pointer; margin-bottom: 12px; font-weight: 500; }
@media (max-width: 520px) { .dshLanFields { grid-template-columns: minmax(0, 1fr); } }
`;

  // src/client/settings.ts
  function createRemotePluginOptions(React) {
    function RemotePluginOptions(props) {
      let { t } = props, [remoteToolsBusy, setRemoteToolsBusy] = React.useState(!1), [remoteToolsEnabled, setRemoteToolsEnabled] = React.useState(!0), [loaded, setLoaded] = React.useState(!1), [writable, setWritable] = React.useState(!1), [busy, setBusy] = React.useState(!1), [terminalEnabled, setTerminalEnabled] = React.useState(!1), [terminalBusy, setTerminalBusy] = React.useState(!1), [acpBackends, setAcpBackends] = React.useState([]), [acpAvailability, setAcpAvailability] = React.useState({}), [acpChecking, setAcpChecking] = React.useState({}), [acpCheckResults, setAcpCheckResults] = React.useState({}), [notice, setNotice] = React.useState(void 0), [error, setError] = React.useState(void 0), [settingsView, setSettingsView] = React.useState(void 0), applyView = (view) => {
        setSettingsView(view), setTerminalEnabled(view.config.terminal?.enabled ?? !0), setRemoteToolsEnabled(view.config.remoteTools?.enabled ?? !0), setAcpBackends((view.config.acp?.backends ?? []).map((item) => ({ id: item.id, enabled: item.enabled !== !1 }))), setAcpAvailability(view.acpAvailability ?? {}), setWritable(view.writable), setLoaded(!0);
      };
      React.useEffect(() => {
        let active = !0;
        return props.control("settings.get").then((view) => {
          active && applyView(view);
        }).catch((reason) => {
          active && setError(messageOf(reason));
        }), () => {
          active = !1;
        };
      }, []);
      let setTerminalRemote = async (enabled) => {
        let previous = terminalEnabled;
        setTerminalEnabled(enabled), setTerminalBusy(!0), setError(void 0), setNotice(void 0);
        try {
          let view = await props.control("settings.development.set", { terminalEnabled: enabled });
          applyView(view), setNotice({ key: "terminalSaved" });
        } catch (reason) {
          setTerminalEnabled(previous), setError(messageOf(reason));
        } finally {
          setTerminalBusy(!1);
        }
      }, setRemoteTools = async (enabled) => {
        setRemoteToolsBusy(!0), setError(void 0), setNotice(void 0);
        try {
          let view = await props.control("settings.development.set", { remoteToolsEnabled: enabled, terminalEnabled });
          applyView(view), setNotice({ key: "remoteToolsSaved" });
        } catch (reason) {
          setRemoteToolsEnabled(!enabled), setError(messageOf(reason));
        } finally {
          setRemoteToolsBusy(!1);
        }
      }, checkAcp = async (backend) => {
        if (!acpChecking[backend]) {
          setAcpChecking((current) => ({ ...current, [backend]: !0 })), setAcpCheckResults((current) => ({ ...current, [backend]: void 0 })), setError(void 0);
          try {
            let view = await props.control("settings.get");
            applyView(view);
            let available = view.acpAvailability?.[backend] === !0;
            !available && view.writable && view.config.acp?.backends?.some((item) => item.id === backend && item.enabled !== !1) && applyView(await props.control("settings.acp.set", { backend, enabled: !1 })), setAcpCheckResults((current) => ({ ...current, [backend]: available })), setNotice({ key: available ? "acpAvailable" : "acpUnavailable" }), window.setTimeout(() => setAcpCheckResults((current) => ({ ...current, [backend]: void 0 })), 5e3);
          } catch (reason) {
            setError(messageOf(reason));
          } finally {
            setAcpChecking((current) => ({ ...current, [backend]: !1 }));
          }
        }
      }, removeAcp = async (backend) => {
        setBusy(!0), setError(void 0);
        try {
          let view = await props.control("settings.acp.remove", { id: backend });
          applyView(view);
        } catch (reason) {
          setError(messageOf(reason));
        } finally {
          setBusy(!1);
        }
      }, developmentSetting = React.createElement(
        "section",
        { className: "dshRemoteDevelopmentSettings" },
        React.createElement(
          "div",
          { className: "dshRemoteAuthorizationSetting" },
          React.createElement(
            "div",
            null,
            React.createElement("strong", null, t("terminalRemote")),
            React.createElement("p", null, t("terminalRemoteHint"))
          ),
          React.createElement("input", {
            type: "checkbox",
            role: "switch",
            checked: terminalEnabled,
            disabled: busy || terminalBusy || !writable,
            "aria-label": t("terminalRemote"),
            onChange: (event) => void setTerminalRemote(event.target.checked)
          })
        ),
        React.createElement(
          "div",
          { className: "dshRemoteAuthorizationSetting" },
          React.createElement("div", null, React.createElement("strong", null, t("remoteTools")), React.createElement("p", null, t("remoteToolsHint"))),
          React.createElement("input", { type: "checkbox", role: "switch", checked: remoteToolsEnabled, disabled: remoteToolsBusy || !writable, "aria-label": t("remoteTools"), onChange: (event) => {
            let enabled = event.target.checked;
            setRemoteToolsEnabled(enabled), setRemoteTools(enabled);
          } })
        )
      ), acpSetting = React.createElement(
        "details",
        { className: "dshRemoteAuthorizationSetting dshRemoteAcpSetting" },
        React.createElement(
          "summary",
          null,
          React.createElement(
            "div",
            { className: "dshRemoteAcpSummaryText" },
            React.createElement("strong", null, t("agentBackends")),
            React.createElement("p", null, t("acpHint"), React.createElement("a", {
              href: "https://github.com/liguobao/ds-harness-remote/blob/feat/cursor-remote/docs/acp-remote.md",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: (event) => event.stopPropagation()
            }, t("acpDocumentation")))
          )
        ),
        React.createElement(
          "div",
          { className: "dshRemoteAcpList" },
          acpBackends.map((item) => React.createElement(
            "div",
            { key: item.id, className: "dshRemoteAuthorizationSetting" },
            React.createElement("div", null, React.createElement("strong", null, item.id === "codex" ? "CodeX" : item.id === "cursor" ? "Cursor" : item.id === "antigravity" ? "AGY" : item.id === "claude" ? "Claude" : item.id === "pi" ? "Pi" : item.id === "opencode" ? "OpenCode" : item.id), null),
            React.createElement(
              "span",
              { className: "dshRemoteAcpCheckCell" },
              React.createElement(
                "a",
                { href: `#check-acp-${item.id}`, className: `dshRemoteAcpCheckLink${acpChecking[item.id] ? " isChecking" : acpCheckResults[item.id] === void 0 ? "" : acpCheckResults[item.id] ? " isPassed" : " isFailed"}`, onClick: (event) => {
                  event.preventDefault(), checkAcp(item.id);
                } },
                acpChecking[item.id] ? t("checkingAcp") : acpCheckResults[item.id] === void 0 ? t("checkAcp") : t(acpCheckResults[item.id] ? "acpCheckPassed" : "acpCheckFailed")
              )
            ),
            ["codex", "cursor", "antigravity", "pi", "claude", "opencode"].includes(item.id) ? null : React.createElement("a", { href: `#remove-acp-${item.id}`, className: "dshRemoteAcpRemoveLink", onClick: (event) => {
              event.preventDefault(), removeAcp(item.id);
            } }, t("removeAcp")),
            React.createElement("input", {
              type: "checkbox",
              role: "switch",
              checked: settingsView?.config.acp?.enabled === !0 && item.enabled && acpAvailability[item.id] === !0,
              "aria-label": item.id,
              disabled: busy || !writable || acpChecking[item.id] === !0 || acpAvailability[item.id] !== !0,
              onChange: (event) => void props.control("settings.acp.set", { backend: item.id, enabled: event.target.checked }).then((view) => {
                applyView(view), setAcpBackends((view.config.acp?.backends ?? []).map((v) => ({ id: v.id, enabled: v.enabled !== !1 })));
              }).catch((reason) => setError(messageOf(reason)))
            })
          ))
        )
      );
      return props.view === "summary" ? React.createElement("span", null, t("pluginDescription")) : React.createElement(
        "div",
        { className: "dshRemotePluginCard dshRemotePluginModern isOpen" },
        React.createElement(
          "div",
          { className: "dshRemotePluginCardHeader" },
          React.createElement("strong", null, t("lanTitle"))
        ),
        React.createElement(
          "div",
          { className: "dshRemotePluginCardBody" },
          React.createElement(LanSettingsPanel, { control: props.control, t }),
          loaded ? developmentSetting : null,
          loaded ? acpSetting : null,
          error === void 0 && notice === void 0 ? null : React.createElement("p", { className: error === void 0 ? "dshRemoteNotice" : "dshRemoteError", role: error === void 0 ? "status" : "alert" }, error ?? t(notice.key, notice.params))
        )
      );
    }
    let LanSettingsPanel = createLanSettingsPanel(React);
    return RemotePluginOptions;
  }
  function createLanSettingsPanel(React) {
    return function(props) {
      let { t } = props, [view, setView] = React.useState(void 0), [busy, setBusy] = React.useState(!1), [error, setError] = React.useState(void 0), [notice, setNotice] = React.useState(!1), [editing, setEditing] = React.useState(void 0), [deleting, setDeleting] = React.useState(void 0), [name, setName] = React.useState(""), [host, setHost] = React.useState(""), [port, setPort] = React.useState(""), [token, setToken] = React.useState(""), [listenerTokenVisible, setListenerTokenVisible] = React.useState(!1), load = async () => {
        try {
          setView(await props.control("lan.settings.get")), setError(void 0);
        } catch {
          setError(t("lanLoadFailed"));
        }
      };
      React.useEffect(() => {
        load();
      }, []);
      let validPort = (value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 65535, save = async (patch) => {
        setBusy(!0), setError(void 0), setNotice(!1);
        try {
          return await props.control("lan.settings.set", patch), setView(await props.control("lan.settings.get")), setNotice(!0), await props.onChanged?.(), !0;
        } catch (reason) {
          return setError(messageOf(reason)), !1;
        } finally {
          setBusy(!1);
        }
      }, editHost = (entry) => {
        setEditing(entry), setName(entry?.name ?? ""), setHost(entry?.host ?? ""), setPort(entry === void 0 ? "" : String(entry.port)), setToken(entry?.accessToken ?? ""), setError(void 0), setNotice(!1);
      }, submitHost = async (connect = !1) => {
        if (view === void 0) return;
        let address = host.trim();
        if (!address || /[\s/?#@]/.test(address) || address.includes("://")) {
          setError(t("lanInvalidAddress"));
          return;
        }
        if (!validPort(port)) {
          setError(t("lanInvalidPort"));
          return;
        }
        if (token !== "" && token.trim().length < 16) {
          setError(t("lanTokenTooShort"));
          return;
        }
        let entry = { id: editing?.id ?? crypto.randomUUID(), name: name.trim() || address, host: address, port: Number(port), ...token === "" ? {} : { accessToken: token } };
        if (await save({ hosts: editing === void 0 ? [...view.config.hosts, entry] : view.config.hosts.map((item) => item.id === entry.id ? entry : item) }) && (setEditing(void 0), setName(""), setHost(""), setPort(""), setToken(""), connect))
          try {
            await props.onConnect?.(entry.id);
          } catch (reason) {
            setError(messageOf(reason));
          }
      }, field = (label, value, change, type = "text") => React.createElement(
        "label",
        null,
        React.createElement("span", null, label),
        React.createElement("input", {
          type,
          value,
          disabled: busy || !view?.writable,
          autoComplete: "off",
          onChange: (event) => change(event.target.value)
        })
      );
      if (view === void 0) return React.createElement(
        "div",
        { className: "dshLanSettings" },
        error === void 0 ? React.createElement("span", { role: "progressbar", "aria-label": t("loadingSettings") }) : React.createElement(
          "div",
          null,
          React.createElement("p", { role: "alert" }, error),
          React.createElement("button", { type: "button", onClick: () => void load() }, t("refreshRemoteShort"))
        )
      );
      let config = view.config, update = (patch) => setView({ ...view, config: { ...config, ...patch } }), bindOptions = [
        { address: "0.0.0.0", label: t("lanAllIpv4") },
        ...(view.interfaces ?? []).filter((item) => item.family === "IPv4" && !item.internal && !item.address.startsWith("127.")).map((item) => ({ address: item.address, label: `${item.name} \xB7 ${item.address} \xB7 ${item.family}` }))
      ];
      return bindOptions.some((item) => item.address === config.bindAddress) || bindOptions.push({ address: config.bindAddress, label: `${config.bindAddress} \xB7 ${t("lanUnavailableAddress")}`, disabled: !0 }), React.createElement(
        "section",
        { className: "dshLanSettings" },
        React.createElement("style", null, lanStyles),
        React.createElement("p", null, t("lanDirectHint")),
        React.createElement("ul", null, config.hosts.map((entry) => React.createElement(
          "li",
          { className: "dshLanRow", key: entry.id },
          React.createElement("span", null, React.createElement("strong", null, entry.name), " \xB7 ", `${entry.host}:${entry.port}`),
          deleting === entry.id ? React.createElement(
            "div",
            { className: "dshLanActions" },
            React.createElement("span", null, t("lanDeleteConfirm", { name: entry.name })),
            React.createElement("button", { type: "button", disabled: busy || !view.writable, onClick: () => void save({ hosts: config.hosts.filter((item) => item.id !== entry.id) }).then((ok) => {
              ok && setDeleting(void 0);
            }) }, t("lanDeleteHost")),
            React.createElement("button", { type: "button", disabled: busy, onClick: () => setDeleting(void 0) }, t("lanCancel"))
          ) : React.createElement(
            "div",
            { className: "dshLanActions" },
            React.createElement("button", { type: "button", disabled: busy || !view.writable, onClick: () => editHost(entry) }, t("lanEditHost")),
            React.createElement("button", { type: "button", disabled: busy || !view.writable, onClick: () => setDeleting(entry.id) }, t("lanDeleteHost"))
          )
        ))),
        React.createElement(
          "form",
          { onSubmit: (event) => {
            event.preventDefault(), submitHost();
          } },
          React.createElement("strong", null, t(editing === void 0 ? "lanAddHost" : "lanEditHost")),
          field(t("lanHostName"), name, setName),
          React.createElement("div", { className: "dshLanFields" }, field(t("lanHostAddress"), host, setHost), field(t("lanPort"), port, setPort, "number")),
          field(t("lanOptionalToken"), token, setToken, "password"),
          React.createElement(
            "div",
            { className: "dshLanActions" },
            React.createElement("button", { type: "submit", disabled: busy || !view.writable || host.trim() === "" }, t(busy ? "saving" : "save")),
            props.onConnect === void 0 ? null : React.createElement("button", { type: "button", disabled: busy || !view.writable || host.trim() === "", onClick: () => void submitHost(!0) }, t("lanConnect")),
            editing === void 0 ? null : React.createElement("button", { type: "button", disabled: busy, onClick: () => editHost() }, t("lanCancel"))
          )
        ),
        React.createElement(
          "details",
          null,
          React.createElement("summary", null, t("lanListener")),
          React.createElement(
            "div",
            { className: "dshLanListener" },
            React.createElement("p", null, t("lanListenHint")),
            React.createElement("label", null, t("lanListener"), React.createElement("input", { type: "checkbox", role: "switch", "aria-checked": config.enabled, checked: config.enabled, disabled: busy || !view.writable, onChange: (event) => update({ enabled: event.target.checked }) })),
            React.createElement(
              "div",
              { className: "dshLanFields" },
              React.createElement(
                "label",
                null,
                React.createElement("span", null, t("lanBindAddress")),
                React.createElement(
                  "select",
                  {
                    value: config.bindAddress,
                    disabled: busy || !view.writable,
                    onChange: (event) => update({ bindAddress: event.target.value })
                  },
                  ...bindOptions.map((item, index) => React.createElement("option", { key: `${index}:${item.address}`, value: item.address, disabled: item.disabled }, item.label))
                )
              ),
              field(t("lanPort"), String(config.port), (value) => update({ port: Number(value) }), "number")
            ),
            React.createElement("p", null, t("lanAddressSelectionHint")),
            field(t("lanAccessToken"), config.accessToken, (value) => update({ accessToken: value }), listenerTokenVisible ? "text" : "password"),
            React.createElement(
              "div",
              { className: "dshLanActions" },
              React.createElement("button", { type: "button", "aria-pressed": listenerTokenVisible, onClick: () => setListenerTokenVisible((current) => !current) }, t(listenerTokenVisible ? "lanHideToken" : "lanShowToken"))
            ),
            React.createElement("p", null, t("lanListenerTokenHint")),
            React.createElement("button", { type: "button", disabled: busy || !view.writable, onClick: () => {
              if (!validPort(String(config.port))) {
                setError(t("lanInvalidPort"));
                return;
              }
              if (config.accessToken !== "" && config.accessToken.trim().length < 16) {
                setError(t("lanTokenTooShort"));
                return;
              }
              save({ enabled: config.enabled, bindAddress: config.bindAddress.trim(), port: config.port, accessToken: config.accessToken });
            } }, t("lanSaveListener"))
          )
        ),
        view.writable ? null : React.createElement("p", null, t("readOnly")),
        React.createElement("p", { className: error === void 0 ? "dshRemoteNotice" : "dshRemoteError", role: error === void 0 ? "status" : "alert", "aria-live": "polite" }, error ?? (notice ? t("lanSaved") : ""))
      );
    };
  }

  // src/client/shell.ts
  function installStyle(clientModuleId2) {
    let style = document.createElement("style");
    return style.dataset.plugin = clientModuleId2, style.dataset.pluginCss = "dsh-remote", style.textContent = [
      // Browser navigation still targets the Desktop machine until Harness exposes
      // a Remote URL resolver. Hide the native guide entry in Remote mode only.
      'html.dshLanBrowserUnavailable [data-sidebar-right-guide-entry="browser"]{display:none!important}',
      'html.dshRemoteTargetActive button[aria-label="\u6DFB\u52A0\u5DE5\u4F5C\u533A"],html.dshRemoteTargetActive button[aria-label="Add workspace"]{display:none!important}',
      'html.dshRemoteCodexTargetActive [data-composer-card] button[aria-haspopup="listbox"][aria-label="\u6307\u4EE4"],html.dshRemoteCodexTargetActive [data-composer-card] button[aria-haspopup="listbox"][aria-label="Commands"]{display:none!important}',
      "[data-dsh-remote-hidden-action]{display:none!important}",
      // The 0.1.6 right sidebar occupies the same shell header area as the
      // remote status strip. Hide the strip while that sidebar is expanded;
      // the sidebar itself remains the active context for terminal/files.
      ":has([data-sidebar-right-open]) .dshRemoteSessionHeader{display:none!important}",
      // TerminalRecovery renders a retry action in the conversation header.
      // A failed remote terminal is reported when its tab is opened/closed;
      // keeping this background recovery action out of the top-left header
      // avoids overlapping the session controls.
      '[title^="\u6062\u590D\u7EC8\u7AEF\u5931\u8D25"],[title^="Terminal recovery failed"]{display:none!important}',
      ".dshRemoteTerminalUnavailable{box-sizing:border-box;margin:12px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);font-size:13px;line-height:1.5}",
      ".dshRemoteModeButton{min-height:36px;border:0;background:transparent;color:var(--dsw-alias-label-primary);display:flex;align-items:center;gap:8px;padding:0 10px;border-radius:8px}.dshRemoteModeButton:is(button){cursor:pointer}",
      ".dshRemoteModeButton:is(button):hover{background:var(--dsw-alias-interactive-bg-hover)}",
      // The official sidebar.footer.action slot owns the surrounding layout.
      // Style only our entry so other footer actions, usage and Settings keep
      // their host-defined geometry, including third-party sidebar variants.
      // Match native workspace rows: 8px inset, 16px icon slot and 6px label gap.
      ".dshRemoteSidebarEntry{box-sizing:border-box;flex:none;width:36px;min-width:36px;display:block}.dshRemoteSidebarEntry .dshRemoteModeButton{box-sizing:border-box;width:36px;height:36px;min-height:36px;justify-content:center;gap:0;padding:0;border-radius:50%}.dshRemoteSidebarEntry.isWide{flex:0 1 auto;width:fit-content;min-width:36px;max-width:100%;height:36px;margin:0}.dshRemoteSidebarEntry.isWide .dshRemoteModeButton{width:auto;max-width:100%;min-width:0;justify-content:flex-start;gap:6px;padding:0 8px;border-radius:8px;font:inherit;font-size:14px;line-height:20px;text-align:start}.dshRemoteSidebarLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshRemoteSidebarEntry.isRail{height:36px}.dshRemoteSidebarEntry.isActive .dshRemoteComputerIcon{color:var(--dsw-alias-brand-primary)}.dshRemoteSidebarEntry .dshRemoteModeButton:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.dshRemoteSidebarEntry .dshRemoteModeButton:disabled{opacity:.45;cursor:default}",
      ".dshRemoteComputerIcon{box-sizing:border-box;width:18px;height:18px;flex:0 0 18px;color:var(--dsw-alias-label-secondary)}.dshRemoteSidebarEntry.isWide .dshRemoteComputerIcon{width:16px;height:16px;flex-basis:16px}",
      // Keep Exit in flow: an absolute action and reserved padding can overlap
      // the icon or adjacent plugins when the host shrinks this flex item.
      ".dshRemoteSidebarEntry.isWide.isActive{display:flex;align-items:center}.dshRemoteSidebarEntry.isWide.isActive .dshRemoteModeButton{flex:1 1 auto;width:auto;overflow:hidden;padding:0}.dshRemoteSidebarEntry.isWide.isActive .dshRemoteComputerIcon{margin-inline-start:8px}.dshRemoteExitLink{margin-inline-start:auto;flex:0 0 36px;min-width:36px;height:36px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);padding:0;font:inherit;font-size:12px;line-height:20px;white-space:nowrap;cursor:pointer}.dshRemoteExitLink:hover:not(:disabled){color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteExitLink:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.dshRemoteExitLink:disabled{opacity:.45;cursor:default}",
      // The strip sits inside the 40px Windows caption row, which the shell declares as the
      // window drag region. Without an explicit opt-out every press starts a window drag and
      // never reaches these buttons; the shell's own caption controls (sidebar toggle, new
      // session, the caption menus) opt out of that region the same way.
      '.dshRemoteSessionHeader{position:fixed;z-index:25;-webkit-app-region:no-drag;top:12px;left:50%;transform:translateX(-50%);max-width:calc(100vw - 360px);height:28px;display:inline-flex;align-items:center;gap:7px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap}.dshRemoteSessionHeader>svg{width:15px;height:15px;flex:0 0 auto}.dshRemoteSessionTarget{min-width:0;max-width:260px;overflow:hidden;text-overflow:ellipsis}.dshRemoteNetwork{flex:0 0 auto;border:0;background:transparent;color:inherit;font:inherit;padding:3px 2px;display:inline-flex;align-items:center;gap:5px;cursor:pointer}.dshRemoteNetwork:hover:not(:disabled){color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteNetwork:disabled{cursor:default}.dshRemoteNetwork>i{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-label-tertiary)}.dshRemoteNetwork.isOnline>i{background:var(--dsw-alias-state-success-primary)}.dshRemoteNetwork.isOffline{color:var(--dsw-alias-state-error-primary)}.dshRemoteNetwork.isOffline>i{background:currentColor}.dshRemoteEncrypted{flex:0 0 auto;color:var(--dsw-alias-label-tertiary)}.dshRemoteHeaderExitLink{flex:0 0 auto;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:3px 2px;font:inherit;text-decoration:none;cursor:pointer}.dshRemoteHeaderExitLink:hover{text-decoration:underline;color:var(--dsw-alias-label-primary)}.dshRemoteHeaderExitLink:disabled{opacity:.45;cursor:default;text-decoration:none}.dshRemoteNetwork:focus-visible,.dshRemoteHeaderExitLink:focus-visible,.dshRemoteRoutePanel>header button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dshRemoteRouteBackdrop{position:fixed;inset:0;z-index:26;-webkit-app-region:no-drag}.dshRemoteRoutePanel{box-sizing:border-box;position:absolute;top:48px;right:28px;width:min(680px,calc(100vw - 32px));max-height:calc(100vh - 72px);overflow:auto;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:16px;white-space:normal}.dshRemoteRoutePanel>header{position:sticky;top:-16px;z-index:1;display:flex;align-items:center;justify-content:space-between;margin:-16px -16px 0;padding:16px;background:var(--dsw-alias-bg-layer-1)}.dshRemoteRoutePanel>header strong{font-size:14px}.dshRemoteRoutePanel>header button{width:28px;height:28px;border:0;border-radius:7px;background:transparent;color:inherit;font-size:20px;cursor:pointer}.dshRemoteRoutePanel>header button:hover{background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteRoutePanel ol{display:flex;align-items:stretch;margin:12px 0 0;padding:0 0 16px;border-bottom:1px solid var(--dsw-alias-border-l2);list-style:none}.dshRemoteRoutePanel li{position:relative;min-width:0;flex:1;display:flex;flex-direction:column;gap:4px;padding-right:20px}.dshRemoteRoutePanel li:not(:last-child)::after{content:"\u2192";position:absolute;right:7px;top:21px;color:var(--dsw-alias-label-tertiary)}.dshRemoteRoutePanel li small{color:var(--dsw-alias-label-tertiary)}.dshRemoteRoutePanel li strong,.dshRemoteRoutePanel li span{overflow:hidden;text-overflow:ellipsis}.dshRemoteRoutePanel li strong{font-size:13px}.dshRemoteRoutePanel li span{color:var(--dsw-alias-label-secondary);font-size:11px}.dshRemoteRouteSection{padding-top:16px}.dshRemoteRouteSection h3{margin:0 0 10px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}.dshRemoteRouteSection dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px;margin:0}.dshRemoteRouteSection dl>div{min-width:0;display:grid;grid-template-columns:minmax(104px,auto) minmax(0,1fr);gap:10px;padding:7px 0;border-bottom:1px solid var(--dsw-alias-border-l2);font-size:12px;line-height:1.45}.dshRemoteRouteSection dt{color:var(--dsw-alias-label-tertiary)}.dshRemoteRouteSection dd{min-width:0;margin:0;text-align:right;overflow-wrap:anywhere}.dshRemoteRouteSection dd.isMono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px}.dshRemoteRoutePanel>p{margin:16px 0 0;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.5}@media(max-width:620px){.dshRemoteSessionHeader{top:8px;max-width:calc(100vw - 112px)}.dshRemoteSessionHeader>svg{display:none}.dshRemoteSessionTarget{max-width:130px}.dshRemoteEncrypted{display:none}.dshRemoteRoutePanel{top:42px;right:12px;max-height:calc(100vh - 56px)}.dshRemoteRoutePanel ol{flex-direction:column;gap:18px}.dshRemoteRoutePanel li:not(:last-child)::after{content:"\u2193";top:auto;right:auto;bottom:-16px;left:3px}.dshRemoteRouteSection dl{grid-template-columns:1fr}.dshRemoteRouteSection dl>div{grid-template-columns:1fr;gap:2px}.dshRemoteRouteSection dd{text-align:left}}',
      ".dshRemoteSessionHeader{left:auto;right:148px;transform:none;max-width:calc(100vw - 420px)}@media(max-width:760px){.dshRemoteSessionHeader{left:auto;right:104px;transform:none;max-width:calc(100vw - 124px)}}",
      ".dshRemoteHostReferencePanel{position:fixed;z-index:2147483000;top:56px;right:20px;bottom:auto;width:min(380px,calc(100vw - 40px));box-sizing:border-box;padding:16px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;box-shadow:0 12px 36px var(--dsw-alias-shadow-l2);}.dshRemoteHostReferencePanel header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.dshRemoteHostReferencePanel header button{border:0;background:transparent;color:inherit;font-size:20px;cursor:pointer}.dshRemoteHostReferencePanel dl{margin:0}.dshRemoteHostReferencePanel dl>div{display:grid;grid-template-columns:80px minmax(0,1fr);gap:12px;padding:8px 0;border-bottom:1px solid var(--dsw-alias-border-l2)}.dshRemoteHostReferencePanel dt{color:var(--dsw-alias-label-tertiary)}.dshRemoteHostReferencePanel dd{margin:0;overflow-wrap:anywhere}.dshRemoteHostReferencePanel .isMono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}",
      ".dshRemoteModeButton:focus-visible,.dshRemotePage button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}",
      ".dshRemotePage{width:min(720px,100%);max-height:min(760px,calc(100vh - 40px));display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:14px;overflow:hidden;animation:dshRemotePageIn .18s cubic-bezier(.25,1,.5,1);-webkit-app-region:no-drag}",
      ".dshRemotePageHeader{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px 24px;border-bottom:1px solid var(--dsw-alias-border-l2);-webkit-app-region:no-drag}.dshRemotePageIntro{min-width:0;flex:1;-webkit-app-region:no-drag}.dshRemotePageHeader strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:18px;line-height:1.4}.dshRemotePageHeader p{min-width:0;max-width:70ch;margin:3px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5}.dshRemoteStarLink{-webkit-app-region:no-drag}.dshRemotePageActions{flex:0 0 auto;display:flex;align-items:center;gap:4px;-webkit-app-region:no-drag;pointer-events:auto}.dshRemotePageActions>button{height:40px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;border:0;border-radius:8px;background:transparent;color:inherit;line-height:1;cursor:pointer;-webkit-app-region:no-drag;pointer-events:auto}.dshRemotePageActions>button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dshRemotePageActions>button:disabled{opacity:.45;cursor:default}.dshRemotePageBack,.dshRemotePageRefresh{min-width:48px;padding:0 10px;font:inherit;font-size:13px}.dshRemotePageBack{color:var(--dsw-alias-label-secondary)!important}.dshRemotePageClose{width:40px;padding:0;font-size:24px}",
      ".dshRemotePageBody{padding:24px;overflow:auto;display:flex;flex-direction:column;gap:24px}.dshRemotePageBody button{font:inherit;color:inherit}",
      ".dshRemotePageTitleRow{display:flex;align-items:center;gap:10px;min-width:0}.dshRemotePageTitleRow>strong{min-width:0;flex:0 1 auto}.dshRemoteStarLink{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:400;text-decoration:none}.dshRemoteStarLink:hover{color:var(--dsw-alias-label-primary);text-decoration:underline;text-underline-offset:3px}.dshRemoteStarLink:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px;border-radius:3px}",
      ".dshRemoteSectionHeading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:10px}.dshRemoteSectionTitle{min-width:0;display:flex;align-items:center;gap:10px}.dshRemoteSectionTitle>strong{font-size:14px}.dshRemoteSectionActions{display:flex;align-items:center;gap:14px}.dshRemoteSectionActions>button{border:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:5px 0;font-size:12px}.dshRemoteSectionActions>button:hover:not(:disabled){color:var(--dsw-alias-label-primary);text-decoration:underline}",
      ".dshRemoteSectionTitle{flex:1}.dshRemoteSectionTitle>.dshRemoteConnectedMenu{margin-left:auto}",
      '.dshRemoteAcpSetting{display:block!important;width:100%;padding:0}.dshRemoteAcpSetting>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;cursor:pointer;list-style:none}.dshRemoteAcpSetting>summary::-webkit-details-marker{display:none}.dshRemoteAcpSetting>summary::after{content:"\u2304";color:var(--dsw-alias-label-secondary);transition:transform .18s ease-out}.dshRemoteAcpSetting[open]>summary::after{transform:rotate(180deg)}.dshRemoteAcpSummaryText{min-width:0}.dshRemoteAcpSummaryText strong{display:block}.dshRemoteAcpSummaryText p{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.4}.dshRemoteAcpCheckLink{grid-column:2;grid-row:1;color:var(--dsw-alias-brand-primary);font-size:12px;text-decoration:underline;text-underline-offset:3px}.dshRemoteAcpCheckLink:hover{color:var(--dsw-alias-label-primary)}.dshRemoteAcpCheckResult{grid-column:3;grid-row:1;font-size:11px;line-height:1.4;white-space:nowrap}.dshRemoteAcpCheckResult.isPassed{color:var(--dsw-alias-state-success-primary)}.dshRemoteAcpCheckResult.isFailed{color:var(--dsw-alias-state-danger-primary)}.dshRemoteAcpList{display:flex;flex-direction:column;gap:0;margin-top:12px;padding-top:0;border-top:0}.dshRemoteAcpList>.dshRemoteAuthorizationSetting{display:grid;width:100%;grid-template-columns:minmax(0,1fr) auto auto auto auto;align-items:center;column-gap:18px;line-height:1.4}.dshRemoteAcpList>.dshRemoteAuthorizationSetting>span:first-child{min-width:0;line-height:1.4}.dshRemoteAcpList>.dshRemoteAuthorizationSetting>input{grid-column:4;grid-row:1}',
      ".dshRemoteAcpAddLink{align-self:flex-start;margin-top:12px;color:var(--dsw-alias-brand-primary);font-size:12px;text-decoration:underline;text-underline-offset:3px}.dshRemoteAcpAddForm{display:grid;grid-template-columns:minmax(100px,.8fr) minmax(140px,1fr) minmax(100px,1fr) auto;gap:8px;margin-top:12px}.dshRemoteAcpAddForm input{min-width:0;height:34px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:inherit;padding:0 10px}.dshRemoteAcpAddForm button{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary);padding:0 12px;cursor:pointer;font:inherit;font-size:12px}.dshRemoteAcpAddForm button:hover{background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteAcpRemoveLink{grid-column:3;grid-row:1;color:var(--dsw-alias-label-secondary);font-size:12px;text-decoration:underline;text-underline-offset:3px}.dshRemoteAcpRemoveLink:hover{color:var(--dsw-alias-state-danger-primary)}",
      ".dshRemoteAcpCheckResult.isPassed,.dshRemoteAcpCheckResult.isFailed{color:var(--dsw-alias-label-secondary)}",
      ".dshRemoteAcpList>.dshRemoteAuthorizationSetting{grid-template-columns:minmax(0,1fr) 190px 40px 56px;column-gap:18px}.dshRemoteAcpCheckCell{grid-column:2;display:flex;align-items:center;gap:10px;min-width:0}.dshRemoteAcpCheckLink,.dshRemoteAcpRemoveLink{justify-self:start}.dshRemoteAcpCheckResult{position:static}",
      ".dshRemoteAcpCheckLink.isPassed{color:var(--dsw-alias-state-success-primary)}.dshRemoteAcpCheckLink.isFailed{color:var(--dsw-alias-state-danger-primary)}.dshRemoteAcpCheckLink.isChecking{color:var(--dsw-alias-label-secondary)}",
      ".dshRemoteCancelWorkspace{min-height:36px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:6px 0;cursor:pointer}.dshRemoteCancelWorkspace:hover:not(:disabled){color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteCancelWorkspace:disabled{opacity:.5;cursor:default}",
      '.dshRemoteHostList{display:flex;flex-direction:column;border-top:1px solid var(--dsw-alias-border-l2);max-height:296px;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}.dshRemoteHostList.isCollapsed{max-height:none;overflow-y:visible}.dshRemoteHostList>button{min-height:58px;flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;text-align:left;border:0;border-bottom:1px solid var(--dsw-alias-border-l2);background:transparent;padding:10px 4px;cursor:pointer}.dshRemoteHostList>button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteHostList>button:disabled{opacity:.5;cursor:default}.dshRemoteHostList>button[aria-current="true"]{background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteHostList>button>span{min-width:0;display:flex;flex-direction:column;gap:3px}.dshRemoteHostList>button strong{font-size:14px;font-weight:500}.dshRemoteHostList small{color:var(--dsw-alias-label-secondary);font-size:12px}',
      '.dshRemoteConnectedMenu{position:relative;flex:0 0 auto;margin-right:4px}.dshRemoteConnectedCount{appearance:none;display:inline-flex;align-items:center;justify-content:center;height:22px;border:0;border-radius:999px;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);box-shadow:0 1px 2px rgba(0,0,0,.18),0 0 0 1px rgba(255,255,255,.04) inset;padding:0 10px;font:inherit;font-size:11px;font-weight:500;line-height:17px;white-space:nowrap;cursor:default}.dshRemoteConnectedCount.isOnline{color:var(--dsw-alias-state-success-primary)}.dshRemoteConnectedCount.isInteractive{cursor:pointer}.dshRemoteConnectedCount.isInteractive:hover{filter:brightness(1.08)}.dshRemoteConnectedCount:disabled{opacity:1;cursor:default}.dshRemoteConnectedCount:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dshRemoteConnectedPanel{position:absolute;top:calc(100% + 8px);right:0;z-index:4;width:min(320px,calc(100vw - 48px));max-height:min(280px,40vh);overflow:auto;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-2);box-shadow:0 10px 28px rgba(0,0,0,.28);padding:10px 12px}.dshRemoteConnectedPanelTitle{display:block;margin:0 0 6px;color:var(--dsw-alias-label-primary);font-size:12px;font-weight:600}.dshRemoteClientList{display:flex;flex-direction:column}.dshRemoteClientRow{min-height:44px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--dsw-alias-border-l2)}.dshRemoteClientRow:last-child{border-bottom:0}.dshRemoteClientRow>span{min-width:0;display:flex;flex-direction:column;gap:2px}.dshRemoteClientRow strong{font-size:13px;font-weight:500}.dshRemoteClientRow small{color:var(--dsw-alias-label-secondary);font-size:11px}.dshRemoteClientOnline{display:inline-flex;align-items:center;gap:6px;color:var(--dsw-alias-state-success-primary)!important}.dshRemoteClientOnline::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}',
      ".dshRemoteConnectedCount{height:auto;border-radius:0;background:transparent;box-shadow:none;padding:0 4px;text-decoration:underline;text-decoration-color:color-mix(in srgb,currentColor 45%,transparent);text-underline-offset:3px}.dshRemoteConnectedCount.isInteractive:hover{filter:none;text-decoration-color:currentColor}.dshRemoteConnectedCount:focus-visible{outline-offset:3px;border-radius:3px}",
      '.dshRemoteProgress{display:flex;flex-direction:column;gap:8px;margin:12px 0;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-2)}.dshRemoteProgressHeader{display:flex;align-items:center;justify-content:space-between;gap:12px}.dshRemoteProgressHeader strong{font-size:13px;font-weight:600}.dshRemoteProgressHeader span{color:var(--dsw-alias-label-secondary);font-size:12px}.dshRemoteProgressBar{height:6px;overflow:hidden;border-radius:999px;background:var(--dsw-alias-bg-layer-3)}.dshRemoteProgressBar>span{display:block;width:100%;height:100%;border-radius:inherit;background:var(--dsw-alias-brand-primary);transform-origin:left center;transition:transform .22s ease-out}[dir="rtl"] .dshRemoteProgressBar>span{transform-origin:right center}.dshRemoteProgress p{margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.45}.dshRemoteProgressRoute{font-weight:500}.dshRemoteProgressRoute .isActive{color:var(--dsw-alias-state-success-primary);font-weight:700}.dshRemoteProgressRouteArrow{color:var(--dsw-alias-label-tertiary)}@media(prefers-reduced-motion:reduce){.dshRemoteProgressBar>span{transition:none}}',
      '.dshRemoteBrowser{display:flex;flex-direction:column}.dshRemoteCrumbs{display:flex;align-items:center;gap:4px;overflow:auto;padding:2px 0 10px}.dshRemoteCrumbs>button{flex:0 0 auto;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:5px 7px;border-radius:6px;cursor:pointer}.dshRemoteCrumbs>button:not(:last-child)::after{content:" /";color:var(--dsw-alias-label-tertiary)}.dshRemoteCrumbs>button:disabled{color:var(--dsw-alias-label-primary);font-weight:600}',
      ".dshRemotePage.hasSelectedHost>.dshRemotePageHeader{flex-shrink:0}.dshRemotePage.hasSelectedHost>.dshRemotePageBody{min-height:0;overflow:hidden}.dshRemotePage.hasSelectedHost .dshRemotePageBody>button,.dshRemotePage.hasSelectedHost .dshRemotePageBody>p{flex-shrink:0}.dshRemotePage.hasSelectedHost .dshRemoteBrowser{min-height:0;flex:1 1 auto}.dshRemoteBrowser>.dshRemoteWorkspaceHeading{flex-shrink:0}.dshRemoteWorkspaceLists,.dshRemoteFolderBrowser{min-height:0;overflow:auto;overscroll-behavior:contain;flex:1 1 auto}",
      ".dshRemoteDirectoryList{min-height:72px;display:flex;flex-direction:column;border-top:1px solid var(--dsw-alias-border-l2)}.dshRemoteDirectoryList>button{min-height:52px;display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:10px;text-align:left;border:0;border-bottom:1px solid var(--dsw-alias-border-l2);background:transparent;padding:8px 4px;cursor:pointer}.dshRemoteDirectoryList>button:hover,.dshRemoteDirectoryList>button.isSelected{background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteDirectoryList>button.isSelected{color:var(--dsw-alias-label-primary)}.dshRemoteDirectoryList>button>span:first-child,.dshRemoteDirectoryList>button>.dshRemoteWorkspaceIcon{grid-row:1/3}.dshRemoteWorkspaceIcon{box-sizing:border-box;width:22px;height:22px;align-self:center;object-fit:contain}.dshRemoteWorkspaceIcon.isGpt{border-radius:6px}.dshRemoteDirectoryList>button>span:not(:first-child),.dshRemoteDirectoryList>button>small{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshRemoteDirectoryList>button>small{grid-column:2;color:var(--dsw-alias-label-secondary)}.dshRemoteDirectoryList>p,.dshRemoteHint{margin:12px 0;color:var(--dsw-alias-label-secondary);font-size:13px}",
      ".dshRemoteAddWorkspace{box-sizing:border-box;width:40px;height:40px;display:inline-grid;place-items:center;flex:0 0 auto;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);padding:0;cursor:pointer}.dshRemoteAddWorkspace:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteAddWorkspace:disabled{opacity:.5;cursor:default}.dshRemoteAddWorkspaceIcon{width:20px;height:20px}.dshRemoteCodexWorkspaceGroup{margin-top:16px}.dshRemoteWorkspaceSourceHeading{min-height:44px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 4px 7px}.dshRemoteWorkspaceSourceText{min-width:0;display:flex;flex-direction:column;gap:2px}.dshRemoteWorkspaceSourceText>strong{font-size:13px}.dshRemoteWorkspaceSourceText>small{color:var(--dsw-alias-label-secondary);font-size:11px}.dshRemoteCodexWorkspaceList{min-height:0}.dshRemoteDirectoryList>.dshRemoteWorkspaceMore,.dshRemoteCodexWorkspaceGroup>.dshRemoteWorkspaceMore{box-sizing:border-box;width:100%;min-height:48px;display:flex;align-items:center;justify-content:center;border:0;border-bottom:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);padding:8px 4px;text-align:center;font-size:16px;cursor:pointer}.dshRemoteWorkspaceMore>span{display:block;line-height:1;transform:translateY(-2px)}.dshRemoteWorkspaceMore:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:transparent}.dshRemoteWorkspaceMore:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.dshRemoteWorkspaceMore:disabled{opacity:.5;cursor:default}",
      ".dshRemotePreviewAction,.dshRemotePreviewForm{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap}.dshRemotePreviewForm input{width:90px;color:inherit;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);padding:6px}.dshRemotePreviewForm [role=alert]{max-width:360px;white-space:normal}.dshRemoteDevelopmentSettings{width:100%;margin:16px 0}.dshRemoteDevelopmentSettings .dshRemotePathField{display:flex;flex-direction:column;gap:6px;margin:8px 0}.dshRemoteDevelopmentSettings .dshRemotePathField>label{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:1.5}.dshRemoteDevelopmentSettings .dshRemotePortsRow{display:flex;gap:8px;align-items:stretch;width:100%}.dshRemoteDevelopmentSettings .dshRemotePortsRow>input{box-sizing:border-box;width:100%;flex:1;min-width:0;height:34px;border:.5px solid var(--dsw-alias-border-l4);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:inherit;padding:0 12px;font:inherit;font-size:13px;line-height:1.5}.dshRemoteDevelopmentSettings button{min-height:34px;color:inherit;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;padding:5px 14px;white-space:nowrap;font-size:13px;line-height:1.5}.dshRemoteAcpAddForm>label{display:flex;min-width:0;flex-direction:column;gap:5px;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:1.5}.dshRemoteAcpAddForm>label>input{box-sizing:border-box;width:100%;height:34px;border:.5px solid var(--dsw-alias-border-l4);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-primary);padding:0 12px;font:inherit;font-size:13px;line-height:1.5}",
      ".dshRemoteFolderBrowser{margin-top:14px}.dshRemoteFolderBrowser>p,.dshRemoteFolderList>p{margin:12px 0;color:var(--dsw-alias-label-secondary);font-size:13px}.dshRemoteFolderList{max-height:260px;overflow:auto;border-block:1px solid var(--dsw-alias-border-l2)}.dshRemoteFolderList>button{width:100%;min-height:42px;display:flex;align-items:center;gap:9px;border:0;border-bottom:1px solid var(--dsw-alias-border-l2);background:transparent;padding:7px 6px;text-align:left;cursor:pointer}.dshRemoteFolderList>button:hover{background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteFolderBrowser>small{display:block;margin-top:8px;color:var(--dsw-alias-state-warn-label)}",
      ".dshRemotePathField{display:flex;flex-direction:column;gap:6px;margin-top:20px}.dshRemotePathField>span{font-size:13px;font-weight:600}.dshRemotePathField>input{min-height:40px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:inherit;padding:0 12px;font:inherit}.dshRemotePathField>small{color:var(--dsw-alias-label-secondary)}",
      ".dshRemoteOpenBar{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:20px;padding:14px 0;background:var(--dsw-alias-bg-layer-1);border-top:1px solid var(--dsw-alias-border-l2)}.dshRemoteOpenBar>div{min-width:0;display:flex;flex-direction:column;gap:3px}.dshRemoteOpenBar span{color:var(--dsw-alias-label-secondary);font-size:12px}.dshRemoteOpenBar strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}.dshRemoteOpenBar>button,.dshRemoteEnable>button{min-height:40px;flex:0 0 auto;border:0;border-radius:8px;background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-1);padding:8px 16px;cursor:pointer}.dshRemoteOpenBar>button:disabled,.dshRemoteEnable>button:disabled{opacity:.5;cursor:default}",
      ".dshRemoteEnable{box-sizing:border-box;width:min(440px,100%);max-width:100%;min-height:388px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px}.dshRemoteEnable p{margin:0;color:var(--dsw-alias-label-secondary);line-height:1.5}",
      '.dshRemoteLoginTabs{width:min(440px,100%);display:flex;border-bottom:1px solid var(--dsw-alias-border-l2)}.dshRemoteLoginTabs>button{position:relative;min-height:38px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:6px 14px;font:inherit;font-size:13px;cursor:pointer}.dshRemoteLoginTabs>button:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.dshRemoteLoginTabs>button.isActive{color:var(--dsw-alias-label-primary);font-weight:600}.dshRemoteLoginTabs>button.isActive::after{content:"";position:absolute;right:12px;bottom:-1px;left:12px;height:2px;border-radius:2px 2px 0 0;background:var(--dsw-alias-brand-primary)}.dshRemoteLoginTabs>button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px;border-radius:6px}',
      ".dshRemoteLoginServer{display:flex;flex-wrap:nowrap;align-items:center;gap:8px;flex:0 1 680px;min-width:0;margin:0}.dshRemoteLoginServer button{font-size:12px}.dshRemoteLoginServer input{box-sizing:border-box;flex:1 1 220px;min-width:0;min-height:40px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:inherit;padding:0 12px;font:inherit}.dshRemoteLoginServer button{flex:0 0 auto;min-height:40px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:inherit;padding:8px 12px;font:inherit;cursor:pointer}",
      ".dshRemoteClientLogin{width:min(440px,100%);display:flex;flex-direction:column;gap:8px}.dshRemoteClientLogin input{min-height:40px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-3);color:inherit;padding:0 12px;font:inherit}.dshRemoteClientLogin button{align-self:flex-start;min-height:40px;border:0;border-radius:8px;background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-1);padding:8px 16px;cursor:pointer}",
      ".dshRemoteQrLogin{width:min(440px,100%);display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 0 2px;text-align:center}.dshRemoteQrLogin img,.dshRemoteQrPlaceholder{box-sizing:border-box;width:200px;height:200px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:#fff;padding:8px}.dshRemoteQrOpen{display:flex;flex-direction:column;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);font-size:12px;text-decoration:none}.dshRemoteQrOpen:hover{color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteQrOpen:hover img{border-color:var(--dsw-alias-label-dimmed)}.dshRemoteQrOpen:focus-visible{border-radius:12px;outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px}.dshRemoteQrPlaceholder{display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary)}.dshRemoteQrLogin>strong{font-size:14px}.dshRemoteQrLogin>p{max-width:48ch;margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.5}.dshRemoteServiceAddress{box-sizing:border-box;display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:6px;width:100%;height:44px;min-height:44px;margin:8px 0 0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:1.5}.dshRemoteServiceAddress>span{flex:0 0 auto;white-space:nowrap}.dshRemoteServiceAddress>a{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary);text-decoration:none}.dshRemoteServiceAddress>a:hover{color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteServiceAddressEdit{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:4px;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}.dshRemoteServiceAddressEdit:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.dshRemoteServiceAddressEdit:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dshRemoteServiceAddressEdit:disabled{opacity:.5;cursor:default}.dshRemoteQrLogin>button,.dshRemoteClientLogin>.dshRemoteLoginSwitch{min-height:32px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:4px 8px;font:inherit;font-size:12px;cursor:pointer}.dshRemoteQrLogin>button:hover,.dshRemoteClientLogin>.dshRemoteLoginSwitch:hover{color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteClientLogin>.dshRemoteLoginSwitch{align-self:flex-start;background:transparent;color:var(--dsw-alias-label-secondary);padding-left:0}",
      ".dshRemoteLoginHeading{box-sizing:border-box;width:100%;display:flex;align-items:baseline;justify-content:center;overflow:hidden;white-space:nowrap;font-size:14px}.dshRemoteLoginHeading>a{display:inline-flex;align-items:baseline;justify-content:center;gap:10px;min-width:0;color:var(--dsw-alias-label-primary);font-size:inherit;font-weight:700;text-decoration:none;border-bottom:1px solid transparent}.dshRemoteLoginHeading>a:hover{text-decoration:none;border-bottom-color:currentColor}.dshRemoteLoginHeading>a:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:3px}.dshRemoteLoginTitle{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshRemoteLoginHeading>a>span{flex:0 0 auto;color:inherit;font-size:inherit;font-weight:inherit}.dshRemoteLoginTabs{box-sizing:border-box;width:100%;flex-wrap:nowrap;overflow-x:auto}.dshRemoteLoginTabs>button{min-width:max-content;flex:1 0 auto;display:flex;align-items:center;justify-content:center;padding:6px 10px;white-space:nowrap;text-align:center}.dshRemoteLoginTabs>button.isActive::after{right:0;left:0;bottom:0;border-radius:0}.dshRemoteClientLogin,.dshRemoteQrLogin{box-sizing:border-box;width:100%;height:300px;min-height:300px}.dshRemoteClientLogin{align-items:stretch;padding-top:16px}.dshRemoteClientLogin>button{align-self:stretch;width:100%}.dshRemoteQrLogin{padding-top:12px}",
      '.dshRemoteHostControlToggle{display:flex;align-items:center;gap:7px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;white-space:nowrap;cursor:default}.dshRemoteHostControlToggle>input{appearance:none;box-sizing:border-box;position:relative;width:32px;height:18px;flex:0 0 auto;margin:0;border:1px solid var(--dsw-alias-label-secondary);border-radius:999px;background:var(--dsw-alias-bg-layer-3);cursor:pointer;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2);transition:background .16s ease-out,border-color .16s ease-out,box-shadow .16s ease-out}.dshRemoteHostControlToggle>input::after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:var(--dsw-alias-label-secondary);transition:transform .16s ease-out,background .16s ease-out}.dshRemoteHostControlToggle>input:checked{border-color:var(--dsw-alias-state-success-primary);background:var(--dsw-alias-state-success-primary);box-shadow:none}.dshRemoteHostControlToggle>input:checked::after{transform:translateX(14px);background:var(--dsw-alias-bg-layer-1)}.dshRemoteHostControlToggle>input:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dshRemoteHostControlToggle>input:disabled{opacity:.5;cursor:default}@media(prefers-reduced-motion:reduce){.dshRemoteHostControlToggle>input,.dshRemoteHostControlToggle>input::after{transition:none}}',
      ".dshRemoteAccountFooter{display:flex;align-items:center;justify-content:flex-start;gap:12px;border-top:1px solid var(--dsw-alias-border-l2);padding-top:14px;color:var(--dsw-alias-label-secondary);font-size:12px}.dshRemoteAccountSettings{flex:0 0 auto;border:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:5px 0;font:inherit;line-height:1.5;white-space:nowrap}.dshRemoteAccountSettings:hover{color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteAccountExit{flex:0 0 auto;margin-left:auto;border:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:5px 0;font-size:12px;line-height:1.5;white-space:nowrap}.dshRemoteAccountExit:hover:not(:disabled){color:var(--dsw-alias-label-primary);text-decoration:underline}.dshRemoteAccountExit:disabled{opacity:.5;cursor:default;text-decoration:none}",
      ".dshRemoteLocalLink{align-self:flex-start;border:0;background:transparent;color:var(--dsw-alias-label-secondary);padding:4px 0;cursor:pointer}.dshRemoteLocalLink:hover{color:var(--dsw-alias-label-primary)}",
      "@keyframes dshRemotePageIn{from{opacity:0;transform:translateY(6px) scale(.99)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){.dshRemotePage{animation:none}}@media(max-width:620px){.dshRemoteBackdrop{padding:12px}.dshRemotePage{max-height:calc(100vh - 24px)}.dshRemotePageHeader{gap:8px;padding:12px 16px}.dshRemotePage.hasSelectedHost .dshRemotePageBack{max-width:112px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshRemoteSectionHeading{align-items:flex-start;flex-direction:column;gap:8px}.dshRemoteWorkspaceHeading{align-items:center;flex-direction:row}.dshRemoteSectionActions{width:100%;justify-content:space-between}.dshRemotePageBody{padding:20px 16px}.dshRemoteOpenBar{align-items:flex-end}.dshRemoteOpenBar>button{min-height:48px}}",
      ".dshRemoteBackdrop{position:fixed;inset:0;z-index:1000;background:var(--dsw-alias-bg-mask-3);display:grid;place-items:center;padding:20px;-webkit-app-region:no-drag}",
      ".dshRemoteDialog{width:min(460px,100%);max-height:80vh;overflow:auto;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;padding:18px;display:grid;gap:12px;box-shadow:var(--dsw-shadow-lv2)}",
      ".dshRemoteDialog button,.dshRemoteDialog input{font:inherit;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:9px 10px;background:transparent;color:inherit}",
      ".dshRemoteDialog button:not(:disabled){cursor:pointer}.dshRemoteDialog button:disabled{opacity:.5}",
      ".dshRemoteHeader{display:flex;align-items:center;justify-content:space-between}.dshRemoteHeader button{border:0;font-size:22px;padding:0 6px}",
      ".dshRemoteDevices{display:grid;gap:8px}.dshRemoteDevices p{margin:4px 0;color:var(--dsw-alias-label-secondary)}",
      ".dshRemoteError{margin:0;color:var(--dsw-alias-state-error-primary)}",
      ".dshRemoteHostAccount{display:grid;gap:8px;border-top:1px solid var(--dsw-alias-border-l3);padding-top:12px}.dshRemoteHostAccount p{margin:0;color:var(--dsw-alias-label-secondary);font-size:13px}",
      ".dshRemoteLogin{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dshRemoteLogin button{grid-column:1/-1}",
      // The plugin manager already supplies DSH's detail page chrome and
      // spacing for `view: page`. Keep the legacy card only for older hosts;
      // current DSH must not get a second, old-style card inside that page.
      ".dshRemotePluginCard{list-style:none;border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);border-radius:var(--dsw-radius-xl,16px);transition:border-color .16s,background .16s}",
      ".dshRemotePluginModern{box-sizing:border-box;width:100%;max-width:none;box-shadow:none;border:0;background:transparent;border-radius:0}.dshRemotePluginModern>.dshRemotePluginCardHeader{display:none}.dshRemotePluginModern>.dshRemotePluginCardBody{border-top:0;margin:0;padding:0}",
      ".dshRemotePluginCard:hover{border-color:var(--dsw-alias-label-dimmed)}.dshRemotePluginCard.isOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}",
      ".dshRemotePluginCard.dshRemotePluginModern:hover,.dshRemotePluginCard.dshRemotePluginModern.isOpen{border-color:transparent;background:transparent}",
      ".dshRemotePluginCardHeader{display:flex;align-items:center}.dshRemotePluginCardToggle{appearance:none;width:100%;min-width:0;font:inherit;color:inherit;text-align:left;cursor:pointer;background:transparent;border:0;border-radius:12px;display:flex;align-items:center;gap:12px;padding:14px 16px}.dshRemotePluginCardToggle:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}",
      ".dshRemotePluginCardHeading{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1}.dshRemotePluginCardHeading>strong{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.dshRemotePluginCardHeading>span{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.dshRemotePluginCardStatus{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.dshRemotePluginCardStatus.isOnline{color:var(--dsw-alias-state-success-primary)}.dshRemotePluginCardStatus.isReconnecting{color:var(--dsw-alias-state-warn-label)}.dshRemotePluginCardStatus.isOffline{color:var(--dsw-alias-state-error-primary)}.dshRemotePluginCardChevron{color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:14px;transition:transform .16s}.dshRemotePluginCard.isOpen .dshRemotePluginCardChevron{transform:rotate(180deg)}",
      ".dshRemotePluginCardBody{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.dshRemoteSettings{display:flex;flex-direction:column;max-width:none}.dshRemoteSettingsTop{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:0 0 12px}.dshRemoteSettingsState{margin:0;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}",
      ".dshRemotePluginModern .dshRemoteField input{border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md,8px);height:40px}.dshRemotePluginModern .dshRemoteSettingsFooter button{border-radius:var(--dsw-radius-md,8px);min-height:32px}",
      ".dshRemoteSettingsSignIn{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-top:4px;padding:16px 0 12px;border-top:1px solid var(--dsw-alias-border-l2)}.dshRemoteSettingsSignIn p{max-width:70ch}.dshRemoteSettingsSignIn button{flex-shrink:0}",
      ".dshRemoteHostIdentity{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:12px 0;border-top:1px solid var(--dsw-alias-border-l2);border-bottom:1px solid var(--dsw-alias-border-l2)}.dshRemoteHostIdentity>div{min-width:0;display:flex;flex-direction:column;gap:3px}.dshRemoteHostIdentity span{color:var(--dsw-alias-label-tertiary);font-size:12px}.dshRemoteHostIdentity strong,.dshRemoteHostIdentity code{min-width:0;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500}.dshRemoteHostIdentity code{font-family:var(--dsw-font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-weight:400}",
      ".dshRemoteField{display:flex;flex-direction:column;gap:6px;padding:12px 0}.dshRemoteField+.dshRemoteField{border-top:1px solid var(--dsw-alias-border-l2)}.dshRemoteField label{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:1.5}.dshRemoteField input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.dshRemoteField input:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.dshRemoteField input:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.dshRemoteFieldValue{min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5;overflow-wrap:anywhere}.dshRemoteField p{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}",
      '.dshRemoteAuthorizationSetting{border-top:1px solid var(--dsw-alias-border-l2);display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px 0}.dshRemoteAuthorizationSetting>div{min-width:0}.dshRemoteAuthorizationSetting strong{font-size:13px;font-weight:500}.dshRemoteAuthorizationSetting p{margin:3px 0 0;color:var(--dsw-alias-label-tertiary);font-size:12px}.dshRemoteAuthorizationSetting>input{appearance:none;position:relative;width:38px;height:22px;flex:0 0 auto;margin:0;border:1px solid var(--dsw-alias-label-secondary);border-radius:999px;background:var(--dsw-alias-bg-layer-3);cursor:pointer;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2);transition:background .16s ease-out,border-color .16s ease-out,box-shadow .16s ease-out}.dshRemoteAuthorizationSetting>input::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--dsw-alias-label-secondary);transition:transform .16s ease-out,background .16s ease-out}.dshRemoteAuthorizationSetting>input:checked{border-color:var(--dsw-alias-state-success-primary);background:var(--dsw-alias-state-success-primary);box-shadow:none}.dshRemoteAuthorizationSetting>input:checked::after{transform:translateX(16px);background:var(--dsw-alias-bg-layer-1)}.dshRemoteAuthorizationSetting>input:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dshRemoteAuthorizationSetting>input:disabled{opacity:.5;cursor:default}@media(prefers-reduced-motion:reduce){.dshRemoteAuthorizationSetting>input,.dshRemoteAuthorizationSetting>input::after{transition:none}}',
      ".dshRemoteAssociation{min-width:0;flex:1;display:grid;grid-template-columns:minmax(0,auto) minmax(0,1fr);align-items:baseline;column-gap:12px;row-gap:4px}.dshRemoteAssociation>span{grid-column:1/-1;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:1.5}.dshRemoteAssociation strong{grid-column:1;min-width:0;color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:1.5;overflow-wrap:anywhere}.dshRemoteAssociation p{grid-column:2;color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}",
      ".dshRemoteConnection{border-top:1px solid var(--dsw-alias-border-l2);display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.dshRemoteConnectionSummary{min-width:0;display:flex;flex-direction:column;gap:4px}.dshRemoteConnectionSummary>span{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:1.5}.dshRemoteConnectionSummary strong{display:flex;align-items:center;gap:7px;color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:1.5}.dshRemoteConnectionSummary p,.dshRemoteConnectionIssue{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.dshRemoteConnectionDot{width:8px;height:8px;flex:0 0 auto;border-radius:999px;background:var(--dsw-alias-label-tertiary)}.dshRemoteConnectionDot.isOnline{background:var(--dsw-alias-state-success-primary)}.dshRemoteConnectionDot.isReconnecting{background:var(--dsw-alias-state-warn-primary)}.dshRemoteConnectionDot.isOffline{background:var(--dsw-alias-state-error-primary)}.dshRemoteConnectionIssue{color:var(--dsw-alias-state-error-primary);padding:0 0 12px}.dshRemoteReconnect{appearance:none;flex:0 0 auto;font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);min-height:34px;padding:5px 14px;font-size:13px;line-height:1.5}.dshRemoteReconnect:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed);background:var(--dsw-alias-interactive-bg-hover)}.dshRemoteReconnect:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.dshRemoteReconnect:disabled{opacity:.4;cursor:default}",
      ".dshRemoteSettingsFooter{border-top:1px solid var(--dsw-alias-border-l2);display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px}.dshRemoteSettingsFooter .dshRemoteError,.dshRemoteNotice{min-width:0;flex:1;margin:0;font-size:12px;line-height:1.5}.dshRemoteNotice{color:var(--dsw-alias-label-tertiary)}.dshRemoteDiscard,.dshRemoteSave{appearance:none;font:inherit;cursor:pointer;border:1px solid transparent;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.dshRemoteDiscard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:transparent}.dshRemoteDiscard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.dshRemoteSave{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.dshRemoteDiscard:disabled,.dshRemoteSave:disabled{opacity:.4;cursor:default}.dshRemoteDiscard:focus-visible,.dshRemoteSave:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}",
      "@media(max-width:620px){.dshRemotePluginCardStatus{display:none}.dshRemoteSettingsTop{gap:10px}.dshRemoteConnection{align-items:flex-start}.dshRemoteReconnect{min-height:40px}.dshRemotePortsRow{flex-direction:column}.dshRemoteAcpAddForm{grid-template-columns:1fr}.dshRemoteAcpAddForm button{min-height:40px}}"
    ].join(""), document.head.append(style), () => style.remove();
  }
  function installTerminalAvailabilityNotice(feed, t) {
    let latest, notice, update = () => {
      let terminal = document.querySelector("[data-sidebar-terminal]"), unavailable = latest?.mode === "remote" && latest.remoteFeatures?.terminal !== !0;
      if (!terminal || !unavailable) {
        notice?.remove(), notice = void 0;
        return;
      }
      notice !== void 0 && notice.isConnected || (notice = document.createElement("div"), notice.className = "dshRemoteTerminalUnavailable", notice.setAttribute("role", "alert"), notice.textContent = t("terminalRemoteUnavailable"), terminal.prepend(notice));
    }, unsubscribe = feed.subscribe((status) => {
      latest = status, update();
    }), observer = new MutationObserver(update);
    return observer.observe(document.body, { childList: !0, subtree: !0 }), update(), () => {
      unsubscribe(), observer.disconnect(), notice?.remove();
    };
  }

  // src/client/icons.ts
  var deepSeekWorkspaceIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAACVBMVEUAAADy8vXx8fUsA3vyAAAAAXRSTlMAQObYZgAAAOxJREFUWMPtlsEOwyAMQxP+/6OnTZMGxHGcot3wDYgfhkJbs6urprzveGtu9d1NgEdto8w93GuA7zPS2RFg7ynsCOAokbtAmLr2YaeKgJ6fxpT8jCAC0qSqPyNoO5DXdvyouj4ClFAdYaDxK09uiBDCIYBf6CxLesnR0uF2pG+JmhCqrUb0AOvjjoQaYDTCEAAgMg5grhAeAQIB+/M15IcKlnUIp4CkTCd0AKb4zVsRSJVGYEVzT0agK107IMGMEurvromEpaX4wzk/IKw378kq4LafED6Oowxfk7AP2q8W16EdM3p29Eyvrv6vF0WIBfBziKyCAAAAAElFTkSuQmCC", gptWorkspaceIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAclBMVEX////v7+++wMf////s7O3k5OTExcrX2Ny6vMTv8PPW19yXmqRqboJmaHd3eoaqrLPs7fGMjpfb3eKlpq1eYXOxs7pWWWd+gY5HSVdRVGVub3k+QU74+Pg4OkcvMT1ISlUoKjUiIy4fICueoKkaGyUSFB21Bp+qAAAAAXRSTlMAQObYZgAABChJREFUWMPtl916qjoQhlsdEwIECEgMYCBxx/u/xT1DrFUL1LO1DtY8LSLJvPnmB4gfH//sr7TPDfvdebf/xXZbkE/4zZ0MVhGHd9zJDsv+7F3//Z69tT5wljAu3tXw+TIlzXKJlhflYmJ+5uF5WpWhb54X+C/zZCmT2wJA4dJZwus0UYjIGqWyMhVbEp4yKNRRqlv0opW5PJLJ4rFJXvP4JKDRMqturBZjkMVJFYjR6iHQDQDI4+k2k51wZbWrqwp4mR/1CVYATyko9TFGxBUqL5IvMbXSWt0T8bkGgFLqgqZBI/Uxbx5UAxLaNcCNLBpttM7wbCc1pmJOpWAsDtey68UaQMyrFgb9uxLPjqg3+nGluyKN0XUdWw0BJ0NvTFFqgzpr9J+Dh4w0Ga1qkqBNswagxdRgFPAbgHRQG5jumGWyMxrTIaRRa4AzFs0YrNMXgI4MJWnsKYFhGNMnIh/mBOPsV8CZBFjN9w8ArowxnZzDr5IcvxTaKpxJCVsoI3SWysz1UM4AqQdzlCgho1IKrK+x1mKFzisANtgEU8E7GwHDgOqxe4w9tnM166wbaA2xBMBLrTWcAGYGdCiYVUJUrMCF+7l6gklrW1RwPi8ByjuActANqhKzVWoYrFGcCFzbDgNaBrTWpncFQMcI2DfWoAiDqRCiHcYM/ZdCEKkZqfR8spj4F0CiJjv2gHL6URNoCQDaYacL6O1oFDO2eQDUFP7AKdCRdC4CRDZaNifbjA41l/uYb/SZMAFNTBGzY7sG4J2jTsJgToOzIzXF3HZqBpSOAGduXbkGEKV1OqVGqRJpRxtvwbSw5IqAiUJItwBCOT9R32FCGo3nCkAN3t0UTBRC6zDONcBeOee9pr4T+ASbnDOdc5OmtREwEEB5w8Wqgt4bOV5c7Lt9iiK8zdP/IsBbutUGX4gNwEVCqd3FUt/xYnRWt7BvPBYQjwjAGXa3ASguHVAZ/WXKlA3eZDX1wRegFsr7E2wAlB9xFbx/7MV70kFT8aqNgLL3F8nFBmA3hrn/IJHjKJOK2oj1WI4Z4FzwN/81AOhgYD6v2xbIvaZIurLC9AfvB1WLTYAoXejF1xeBL5cpBIyEbmxkZymIXwDQh1BAfOrhI1lfwtgz8tozF5T4ttf3+32AyxC6klwAgw/YVTHpoK82xYt3wLP/Bw4AAI4D7/01TLKXBj9NEz2wEuGiKpoy68S/FwCLMQAZ3gXhihaCa25vQo6RyToOz9PE6wYjJgGi1YnqZX8qMIK+TDlnargGzSv4NvFjlwXf/nfLLMrAB4O/Xl3BH0d+RIASFgDA8IYMIXgr2+cBsbDdPSwAAHjSZFmb3txETCKIxc0uWwI8rxsLJcTiVndNwyMgKljbbNN2/zcEAja2+4RgIDYN2Bu/WtAOaEodnu2dnzz/7I/Y/w/LaEcX/MdfAAAAAElFTkSuQmCC";

  // src/client/progress.ts
  function createRemoteProgressView(React) {
    function RemoteProgressView(props) {
      let progress = props.progress;
      if (progress === void 0) return null;
      let percent = Math.max(0, Math.min(100, Math.round(progress.percent))), activeTransports = new Set(progress.activeTransports ?? []), detail = progress.transports !== void 0 && activeTransports.size > 0 ? React.createElement(
        "span",
        { className: "dshRemoteProgressRoute" },
        props.t(progress.routeVerb === "using" ? "remoteProgressUsingPrefix" : "remoteProgressTryingPrefix"),
        progress.transports.map((transport, index) => React.createElement(
          React.Fragment,
          { key: `${transport}:${index}` },
          index === 0 ? null : React.createElement("span", { className: "dshRemoteProgressRouteArrow", "aria-hidden": !0 }, " -> "),
          React.createElement("span", {
            className: activeTransports.has(transport) ? "isActive" : void 0
          }, transportDiagnosticLabel(transport))
        ))
      ) : props.t(progress.detail);
      return React.createElement(
        "div",
        {
          className: "dshRemoteProgress",
          role: "status",
          "aria-live": "polite"
        },
        React.createElement(
          "div",
          { className: "dshRemoteProgressHeader" },
          React.createElement("strong", null, props.t(progress.label)),
          React.createElement("span", null, `${percent}%`)
        ),
        React.createElement("p", null, detail),
        React.createElement("div", {
          className: "dshRemoteProgressBar",
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": percent,
          "aria-label": props.t(progress.label)
        }, React.createElement("span", { style: { transform: `scaleX(${percent / 100})` } }))
      );
    }
    return RemoteProgressView;
  }
  async function runConnectHostProgress(preferredTransports, targetDeviceId, control, connectedStep, setProgress, progressRun, action, readyProgress) {
    let runId = progressRun.current + 1;
    progressRun.current = runId;
    let polling = !0, pollTimer, connectedAt, apply = (next) => {
      progressRun.current === runId && setProgress(next);
    }, poll = async () => {
      try {
        let status = await control("status");
        if (!polling || progressRun.current !== runId) return;
        (status.connectionProgress?.phase === "connected" || status.connectedTargetDeviceId === targetDeviceId) && connectedAt === void 0 && (connectedAt = Date.now());
        let next = observedConnectionProgress(status, targetDeviceId, preferredTransports, connectedStep, connectedAt);
        next !== void 0 && apply(next);
      } catch {
      } finally {
        polling && progressRun.current === runId && (pollTimer = window.setTimeout(() => {
          poll();
        }, 300));
      }
    };
    apply({ label: "remoteProgressCheckingHost", detail: "remoteProgressCheckingHostDetail", percent: 12 });
    let pending = action();
    poll();
    try {
      let result = await pending;
      return polling = !1, pollTimer !== void 0 && window.clearTimeout(pollTimer), apply(readyProgress?.(result) ?? { label: "remoteProgressReady", detail: "remoteProgressReadyDetail", percent: 100 }), await new Promise((resolve) => window.setTimeout(resolve, 520)), result;
    } finally {
      polling = !1, pollTimer !== void 0 && window.clearTimeout(pollTimer), progressRun.current === runId && setProgress(void 0);
    }
  }

  // src/client/workspaces.ts
  function createRemoteWorkspaceAction(React) {
    let RemoteProgressView = createRemoteProgressView(React), LanSettingsPanel = createLanSettingsPanel(React);
    function RemoteWorkspaceAction(props) {
      let { t } = props, connectionErrorMessageFor = (reason, translate) => {
        if (typeof reason == "object" && reason !== null && "code" in reason) {
          let code = reason.code;
          if (typeof code == "string") return connectionErrorMessage(code, translate);
        }
        return messageOf(reason);
      }, [open, setOpen] = React.useState(!1), [status, setStatus] = React.useState(void 0), [devices, setDevices] = React.useState([]), [selectedHost, setSelectedHost] = React.useState(void 0), [connectingHost, setConnectingHost] = React.useState(void 0), [workspaces, setWorkspaces] = React.useState([]), [codexWorkspaces, setCodexWorkspaces] = React.useState([]), [cursorWorkspaces, setCursorWorkspaces] = React.useState([]), [antigravityWorkspaces, setAntigravityWorkspaces] = React.useState([]), [piWorkspaces, setPiWorkspaces] = React.useState([]), [opencodeWorkspaces, setOpencodeWorkspaces] = React.useState([]), [claudeWorkspaces, setClaudeWorkspaces] = React.useState([]), [workspaceBackend, setWorkspaceBackend] = React.useState("harness"), [codexWorkspaceId, setCodexWorkspaceId] = React.useState(void 0), [cursorWorkspaceId, setCursorWorkspaceId] = React.useState(void 0), [antigravityWorkspaceId, setAntigravityWorkspaceId] = React.useState(void 0), [piWorkspaceId, setPiWorkspaceId] = React.useState(void 0), [opencodeWorkspaceId, setOpencodeWorkspaceId] = React.useState(void 0), [claudeWorkspaceId, setClaudeWorkspaceId] = React.useState(void 0), [directory, setDirectory] = React.useState(void 0), [path, setPath] = React.useState(""), [addingWorkspace, setAddingWorkspace] = React.useState(!1), [showAllWorkspaces, setShowAllWorkspaces] = React.useState(!1), [showAllCodexWorkspaces, setShowAllCodexWorkspaces] = React.useState(!1), [devicesOpen, setDevicesOpen] = React.useState(!1), [showAllCursorWorkspaces, setShowAllCursorWorkspaces] = React.useState(!1), [showAllAntigravityWorkspaces, setShowAllAntigravityWorkspaces] = React.useState(!1), [showAllPiWorkspaces, setShowAllPiWorkspaces] = React.useState(!1), [showAllOpencodeWorkspaces, setShowAllOpencodeWorkspaces] = React.useState(!1), [showAllClaudeWorkspaces, setShowAllClaudeWorkspaces] = React.useState(!1), workspaceListId = "dsh-remote-workspace-list", codexWorkspaceHeadingId = "dsh-remote-codex-workspace-heading", codexWorkspaceListId = "dsh-remote-codex-workspace-list", cursorWorkspaceHeadingId = "dsh-remote-cursor-workspace-heading", cursorWorkspaceListId = "dsh-remote-cursor-workspace-list", antigravityWorkspaceHeadingId = "dsh-remote-antigravity-workspace-heading", piWorkspaceHeadingId = "dsh-remote-pi-workspace-heading", opencodeWorkspaceHeadingId = "dsh-remote-opencode-workspace-heading", claudeWorkspaceHeadingId = "dsh-remote-claude-workspace-heading", antigravityWorkspaceListId = "dsh-remote-antigravity-workspace-list", piWorkspaceListId = "dsh-remote-pi-workspace-list", opencodeWorkspaceListId = "dsh-remote-opencode-workspace-list", claudeWorkspaceListId = "dsh-remote-claude-workspace-list", [busy, setBusy] = React.useState(!1), [progress, setProgress] = React.useState(void 0), progressRun = React.useRef(0), pageRef = React.useRef(null), [notice, setNotice] = React.useState(void 0), [error, setError] = React.useState(void 0);
      React.useEffect(() => {
        open || (setDevicesOpen(!1), setBusy(!1));
      }, [open]), React.useEffect(() => {
        if (!open) return;
        let frame = window.requestAnimationFrame(() => pageRef.current?.focus());
        return () => window.cancelAnimationFrame(frame);
      }, [open]), React.useEffect(() => {
        if (!open) return;
        let closeOnEscape = (event) => {
          if (event.key === "Escape") {
            if (devicesOpen) {
              event.stopPropagation(), setDevicesOpen(!1);
              return;
            }
            setOpen(!1);
          }
        };
        return window.addEventListener("keydown", closeOnEscape), () => window.removeEventListener("keydown", closeOnEscape);
      }, [open, devicesOpen]), React.useEffect(() => {
        if (!devicesOpen) return;
        let closeOnPointer = (event) => {
          let target = event.target;
          target instanceof Element && target.closest(".dshRemoteConnectedMenu") === null && setDevicesOpen(!1);
        };
        return window.addEventListener("mousedown", closeOnPointer), () => window.removeEventListener("mousedown", closeOnPointer);
      }, [devicesOpen]), React.useEffect(() => {
        (status?.host?.connectedClients?.length ?? 0) === 0 && setDevicesOpen(!1);
      }, [status?.host?.connectedClients?.length]), React.useEffect(() => {
        props.control("status").then(setStatus).catch(() => {
        });
      }, []), React.useEffect(() => {
        let remoteActive = status?.mode === "remote";
        return document.documentElement.classList.toggle("dshRemoteTargetActive", remoteActive), () => {
          remoteActive && document.documentElement.classList.remove("dshRemoteTargetActive");
        };
      }, [status?.mode]);
      let selectHost = async (host) => {
        setBusy(!0), setError(void 0), setConnectingHost(host), setCodexWorkspaces([]), setCursorWorkspaces([]), setAntigravityWorkspaces([]), setPiWorkspaces([]), setOpencodeWorkspaces([]), setClaudeWorkspaces([]), setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1);
        try {
          let result = await runConnectHostProgress(
            status?.preferredTransports,
            host.deviceId,
            props.control,
            { label: "remoteProgressLoadingWorkspaces", detail: "remoteProgressLoadingWorkspacesDetail" },
            setProgress,
            progressRun,
            async () => {
              let nextWorkspaces = await props.control("workspaces.list", {
                targetDeviceId: host.deviceId
              }), nextCodexWorkspaces = await props.control("codex.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextCursorWorkspaces = await props.control("cursor.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextAntigravityWorkspaces = await props.control("antigravity.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextPiWorkspaces = await props.control("pi.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextOpencodeWorkspaces = await props.control("opencode.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextClaudeWorkspaces = await props.control("claude.workspaces.list", {
                targetDeviceId: host.deviceId
              }).catch(() => []), nextStatus = await props.control("status").catch(() => {
              });
              return nextStatus !== void 0 && setStatus(nextStatus), {
                workspaces: nextWorkspaces,
                codexWorkspaces: nextCodexWorkspaces,
                cursorWorkspaces: nextCursorWorkspaces,
                antigravityWorkspaces: nextAntigravityWorkspaces,
                piWorkspaces: nextPiWorkspaces,
                opencodeWorkspaces: nextOpencodeWorkspaces,
                claudeWorkspaces: nextClaudeWorkspaces,
                status: nextStatus
              };
            },
            (result2) => connectedProgress(result2.status)
          );
          setWorkspaces(result.workspaces), setCodexWorkspaces(result.codexWorkspaces), setCursorWorkspaces(result.cursorWorkspaces), setAntigravityWorkspaces(result.antigravityWorkspaces), setPiWorkspaces(result.piWorkspaces), setOpencodeWorkspaces(result.opencodeWorkspaces), setClaudeWorkspaces(result.claudeWorkspaces), setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setSelectedHost(host), setPath(""), setAddingWorkspace(!1), setDirectory(void 0);
        } catch (reason) {
          setError(connectionErrorMessageFor(reason, t));
        } finally {
          setConnectingHost(void 0), setBusy(!1);
        }
      }, browseDirectory = async (nextPath) => {
        if (selectedHost !== void 0) {
          setBusy(!0), setError(void 0);
          try {
            let listing = await props.control("directory.list", {
              targetDeviceId: selectedHost.deviceId,
              ...nextPath === void 0 ? {} : { path: nextPath }
            });
            setDirectory(listing), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setPath(listing.path);
          } catch (reason) {
            setError(connectionErrorMessageFor(reason, t));
          } finally {
            setBusy(!1);
          }
        }
      }, startAddingWorkspace = (backend) => {
        setAddingWorkspace(!0), setWorkspaceBackend(backend), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1), setDirectory(void 0), setPath(""), browseDirectory();
      }, cancelAddingWorkspace = () => {
        setAddingWorkspace(!1), setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setDirectory(void 0), setPath("");
      }, refreshRemote = async () => {
        setBusy(!0), setNotice(void 0), setError(void 0);
        try {
          let nextStatus = await props.control("status");
          if (setStatus(nextStatus), nextStatus.controlUnavailable) {
            setError(t("remoteControlUnavailable"));
            return;
          }
          if (!nextStatus.available) {
            setDevices([]), setSelectedHost(void 0), setWorkspaces([]), setCodexWorkspaces([]), setCursorWorkspaces([]), setAntigravityWorkspaces([]), setPiWorkspaces([]), setOpencodeWorkspaces([]), setClaudeWorkspaces([]), setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1), setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setPath(""), setAddingWorkspace(!1), setDirectory(void 0);
            return;
          }
          try {
            let nextDevices = await props.control("devices");
            if (setDevices(nextDevices), selectedHost !== void 0) {
              let nextSelectedHost = nextDevices.find((device) => device.deviceId === selectedHost.deviceId);
              nextSelectedHost === void 0 ? (setSelectedHost(void 0), setWorkspaces([]), setCodexWorkspaces([]), setCursorWorkspaces([]), setAntigravityWorkspaces([]), setPiWorkspaces([]), setOpencodeWorkspaces([]), setClaudeWorkspaces([]), setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1), setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setPath(""), setAddingWorkspace(!1), setDirectory(void 0)) : (setSelectedHost(nextSelectedHost), props.control("workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setWorkspaces(w)).catch(() => {
              }), props.control("codex.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setCodexWorkspaces(w)).catch(() => {
              }), props.control("cursor.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setCursorWorkspaces(w)).catch(() => {
              }), props.control("antigravity.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setAntigravityWorkspaces(w)).catch(() => {
              }), props.control("pi.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setPiWorkspaces(w)).catch(() => {
              }), props.control("opencode.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setOpencodeWorkspaces(w)).catch(() => {
              }), props.control("claude.workspaces.list", { targetDeviceId: nextSelectedHost.deviceId }).then((w) => setClaudeWorkspaces(w)).catch(() => {
              }));
            }
          } catch (reason) {
            setError(connectionErrorMessageFor(reason, t));
          }
        } catch (reason) {
          setError(connectionErrorMessageFor(reason, t));
        } finally {
          setBusy(!1);
        }
      }, show = async () => {
        setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1), setOpen(!0), await refreshRemote();
      };
      React.useEffect(() => props.subscribeOpen(() => {
        show();
      }), [props.subscribeOpen, show]), React.useEffect(() => {
        if (!(!open || selectedHost !== void 0))
          return props.statusFeed.subscribe(setStatus);
      }, [open, selectedHost]);
      let chooseAnotherHost = () => {
        setSelectedHost(void 0), setWorkspaces([]), setCodexWorkspaces([]), setCursorWorkspaces([]), setAntigravityWorkspaces([]), setPiWorkspaces([]), setOpencodeWorkspaces([]), setClaudeWorkspaces([]), setShowAllWorkspaces(!1), setShowAllCodexWorkspaces(!1), setShowAllCursorWorkspaces(!1), setShowAllAntigravityWorkspaces(!1), setShowAllPiWorkspaces(!1), setShowAllOpencodeWorkspaces(!1), setShowAllClaudeWorkspaces(!1), setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setDirectory(void 0), setPath(""), setAddingWorkspace(!1), setError(void 0);
      }, openLocalWorkspaces = async () => {
        setBusy(!0), setError(void 0);
        try {
          await props.control("mode.set", { mode: "local" }), window.location.reload();
        } catch (reason) {
          setError(messageOf(reason)), setBusy(!1);
        }
      }, openWorkspace = async (selection) => {
        let targetBackend = selection?.backend ?? workspaceBackend, targetPath = (selection?.path ?? path).trim(), targetCodexWorkspaceId = selection?.backend === "codex" ? selection.workspaceId : selection === void 0 ? codexWorkspaceId : void 0, targetCursorWorkspaceId = selection?.backend === "cursor" ? selection.workspaceId : selection === void 0 ? cursorWorkspaceId : void 0, targetAntigravityWorkspaceId = selection?.backend === "antigravity" ? selection.workspaceId : selection === void 0 ? antigravityWorkspaceId : void 0, targetPiWorkspaceId = selection?.backend === "pi" ? selection.workspaceId : selection === void 0 ? piWorkspaceId : void 0, targetOpencodeWorkspaceId = selection?.backend === "opencode" ? selection.workspaceId : selection === void 0 ? opencodeWorkspaceId : void 0, targetClaudeWorkspaceId = selection?.backend === "claude" ? selection.workspaceId : selection === void 0 ? claudeWorkspaceId : void 0, createWorkspace = selection === void 0 && addingWorkspace;
        if (!(selectedHost === void 0 || targetPath === "" || !createWorkspace && targetBackend === "codex" && targetCodexWorkspaceId === void 0 || !createWorkspace && targetBackend === "cursor" && targetCursorWorkspaceId === void 0 && targetPath === "" || !createWorkspace && targetBackend === "antigravity" && targetAntigravityWorkspaceId === void 0 && targetPath === "")) {
          setBusy(!0), setError(void 0);
          try {
            let nextStatus = await (targetBackend === "codex" ? createWorkspace ? props.control("codex.workspace.create", {
              targetDeviceId: selectedHost.deviceId,
              path: targetPath
            }) : props.control("codex.workspace.open", {
              targetDeviceId: selectedHost.deviceId,
              workspaceId: targetCodexWorkspaceId
            }) : targetBackend !== "harness" ? (() => {
              let workspaceId = {
                cursor: targetCursorWorkspaceId,
                antigravity: targetAntigravityWorkspaceId,
                pi: targetPiWorkspaceId,
                opencode: targetOpencodeWorkspaceId,
                claude: targetClaudeWorkspaceId
              }[targetBackend];
              return createWorkspace || workspaceId === void 0 ? props.control(`${targetBackend}.workspace.create`, { targetDeviceId: selectedHost.deviceId, path: targetPath }) : props.control(`${targetBackend}.workspace.open`, { targetDeviceId: selectedHost.deviceId, workspaceId });
            })() : props.control("workspace.open", {
              targetDeviceId: selectedHost.deviceId,
              path: targetPath
            }));
            setStatus(nextStatus), nextStatus.workspaceSelection !== void 0 && window.sessionStorage.setItem(pendingWorkspaceSelectionKey, JSON.stringify(nextStatus.workspaceSelection)), window.location.reload();
          } catch (reason) {
            setError(messageOf(reason)), setBusy(!1);
          }
        }
      }, remoteLabel = status?.mode === "remote" ? t("activeRemote", { name: status.target?.name ?? t("host") }) : t("remoteEntry"), remoteActionLabel = status?.mode === "remote" ? `${remoteLabel} \xB7 ${t("exitRemote")}` : remoteLabel, visibleWorkspaces = showAllWorkspaces ? workspaces : workspaces.slice(0, 3), visibleCodexWorkspaces = showAllCodexWorkspaces ? codexWorkspaces : codexWorkspaces.slice(0, 3), visibleCursorWorkspaces = showAllCursorWorkspaces ? cursorWorkspaces : cursorWorkspaces.slice(0, 3), visibleAntigravityWorkspaces = showAllAntigravityWorkspaces ? antigravityWorkspaces : antigravityWorkspaces.slice(0, 3), visiblePiWorkspaces = showAllPiWorkspaces ? piWorkspaces : piWorkspaces.slice(0, 3), visibleOpencodeWorkspaces = showAllOpencodeWorkspaces ? opencodeWorkspaces : opencodeWorkspaces.slice(0, 3), visibleClaudeWorkspaces = showAllClaudeWorkspaces ? claudeWorkspaces : claudeWorkspaces.slice(0, 3), codexAvailable = status?.remoteFeatures?.codex === !0, cursorAvailable = status?.remoteFeatures?.cursor === !0, antigravityAvailable = status?.remoteFeatures?.antigravity === !0, piAvailable = status?.remoteFeatures?.pi === !0, opencodeAvailable = status?.remoteFeatures?.opencode === !0, claudeAvailable = status?.remoteFeatures?.claude === !0, selectedHostDetails = selectedHost === void 0 ? void 0 : [
        formatPlatform(selectedHost.platform),
        selectedHost.harnessVersion === void 0 ? void 0 : t("harnessVersion", { version: selectedHost.harnessVersion }),
        selectedHost.clientVersion === void 0 ? void 0 : t("pluginVersion", { version: selectedHost.clientVersion })
      ].filter(Boolean).join(" \xB7 "), connectedClients = status?.host?.connectedClients ?? [], connectedCount = connectedClients.length, connectedCountLabel = t("connectedClientCount", { count: connectedCount }), connectedMenu = status?.hostAuthorizationAvailable === !0 ? React.createElement(
        "div",
        {
          className: `dshRemoteConnectedMenu${devicesOpen ? " isOpen" : ""}`
        },
        React.createElement("a", {
          href: connectedCount > 0 ? "#connected-devices" : void 0,
          className: `dshRemoteConnectedCount${connectedCount > 0 ? " isOnline isInteractive" : ""}`,
          "aria-expanded": connectedCount > 0 ? devicesOpen : void 0,
          "aria-haspopup": connectedCount > 0 ? "dialog" : void 0,
          title: connectedCountLabel,
          "aria-label": connectedCountLabel,
          onClick: (event) => {
            event.preventDefault(), connectedCount !== 0 && setDevicesOpen((current) => !current);
          }
        }, connectedCountLabel),
        devicesOpen && connectedCount > 0 ? React.createElement(
          "div",
          {
            className: "dshRemoteConnectedPanel",
            id: "connected-devices",
            role: "dialog",
            "aria-label": t("currentConnectedDevices")
          },
          React.createElement("strong", { className: "dshRemoteConnectedPanelTitle" }, t("currentConnectedDevices")),
          React.createElement(
            "div",
            { className: "dshRemoteClientList", "aria-label": t("currentConnectedDevices") },
            ...connectedClients.map((client) => React.createElement(
              "div",
              {
                key: client.deviceId,
                className: "dshRemoteClientRow"
              },
              React.createElement(
                "span",
                null,
                React.createElement("strong", null, client.name.trim() === "" ? t("unknownDevice") : client.name),
                React.createElement("small", null, [
                  client.platform === void 0 ? void 0 : formatPlatform(client.platform),
                  connectedClientModeLabel(client.mode, t)
                ].filter(Boolean).join(" \xB7 "))
              ),
              React.createElement("small", { className: "dshRemoteClientOnline" }, t("connected"))
            ))
          )
        ) : null
      ) : null, listedHosts = connectingHost === void 0 ? devices : [connectingHost];
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: `dshRemoteSidebarEntry${status?.mode === "remote" ? " isActive" : ""}${props.wide ? " isWide" : " isRail"}` },
          React.createElement(status?.mode === "remote" && props.wide ? "div" : "button", {
            ...status?.mode === "remote" && props.wide ? {} : {
              type: "button",
              disabled: status?.mode === "remote" && busy,
              onClick: () => void (status?.mode === "remote" ? openLocalWorkspaces() : show())
            },
            className: "dshRemoteModeButton",
            title: props.wide ? remoteLabel : remoteActionLabel,
            "aria-label": props.wide ? remoteLabel : remoteActionLabel
          }, React.createElement(
            "svg",
            {
              className: "dshRemoteComputerIcon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 1.7,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": !0
            },
            React.createElement("rect", { x: 3, y: 4, width: 18, height: 13, rx: 2 }),
            React.createElement("path", { d: "M8 21h8M12 17v4" })
          ), props.wide ? React.createElement("span", { className: "dshRemoteSidebarLabel" }, remoteLabel) : null),
          status?.mode === "remote" && props.wide ? React.createElement("button", {
            type: "button",
            className: "dshRemoteExitLink",
            disabled: busy,
            onClick: () => void openLocalWorkspaces()
          }, t("exitRemote")) : null
        ),
        open ? React.createElement("div", {
          className: "dshRemoteBackdrop",
          role: "presentation",
          onMouseDown: (event) => {
            event.target === event.currentTarget && setOpen(!1);
          }
        }, React.createElement(
          "section",
          {
            className: `dshRemotePage${selectedHost === void 0 ? "" : " hasSelectedHost"}`,
            role: "dialog",
            "aria-modal": !0,
            "aria-label": selectedHost?.name ?? t("remoteTitle"),
            tabIndex: -1,
            ref: pageRef
          },
          React.createElement(
            "header",
            { className: "dshRemotePageHeader" },
            React.createElement(
              "div",
              { className: "dshRemotePageIntro" },
              React.createElement(
                "div",
                { className: "dshRemotePageTitleRow" },
                React.createElement("strong", null, selectedHost?.name ?? t("remoteTitle")),
                selectedHost === void 0 ? React.createElement("a", {
                  className: "dshRemoteStarLink",
                  href: "https://github.com/liguobao/ds-harness-remote",
                  target: "_blank",
                  rel: "noreferrer"
                }, t("starProject")) : null
              ),
              React.createElement("p", null, selectedHostDetails ?? t("remoteDescription"))
            ),
            React.createElement(
              "div",
              { className: "dshRemotePageActions" },
              selectedHost === void 0 ? null : React.createElement("button", {
                type: "button",
                className: "dshRemotePageBack",
                disabled: busy,
                title: t("backToHosts"),
                onClick: chooseAnotherHost
              }, t("backToHosts")),
              React.createElement("button", {
                type: "button",
                className: "dshRemotePageRefresh",
                disabled: busy,
                title: t("refreshRemote"),
                "aria-label": t("refreshRemote"),
                onClick: () => void refreshRemote()
              }, t("refreshRemoteShort")),
              React.createElement("button", { type: "button", className: "dshRemotePageClose", onClick: () => setOpen(!1), "aria-label": t("close") }, "\xD7")
            )
          ),
          React.createElement(
            "main",
            { className: "dshRemotePageBody" },
            status?.mode === "remote" ? React.createElement("button", {
              type: "button",
              className: "dshRemoteLocalLink",
              disabled: busy,
              onClick: () => void openLocalWorkspaces()
            }, t("openLocalWorkspaces")) : null,
            React.createElement(
              React.Fragment,
              null,
              React.createElement(
                React.Fragment,
                null,
                selectedHost === void 0 ? React.createElement(
                  "section",
                  { className: "dshRemoteHosts", "aria-label": t("chooseHost") },
                  React.createElement(
                    "details",
                    { className: "dshLanManager" },
                    React.createElement("summary", null, t("lanManageConnections")),
                    React.createElement(LanSettingsPanel, { control: props.control, t, onChanged: refreshRemote, onConnect: async (id) => {
                      let entry = (await props.control("devices")).find((item) => item.deviceId === id);
                      if (entry === void 0 || !entry.online) throw new Error(t("connectionReachability"));
                      await selectHost(entry);
                    } })
                  ),
                  React.createElement("p", { className: "dshRemoteHint" }, t("lanDirectHint")),
                  React.createElement(
                    "div",
                    { className: "dshRemoteSectionHeading" },
                    React.createElement(
                      "div",
                      { className: "dshRemoteSectionTitle" },
                      React.createElement("strong", null, t("chooseHost")),
                      connectedMenu
                    )
                  ),
                  React.createElement("div", {
                    className: `dshRemoteHostList${connectingHost === void 0 ? "" : " isCollapsed"}`,
                    "aria-busy": connectingHost === void 0 ? void 0 : !0
                  }, listedHosts.length === 0 ? error !== void 0 ? null : React.createElement("p", null, t(busy ? "checkingConnection" : "lanNoHosts")) : listedHosts.map((device) => React.createElement(
                    "button",
                    {
                      type: "button",
                      key: device.deviceId,
                      disabled: busy || !device.online,
                      "aria-current": connectingHost?.deviceId === device.deviceId ? "true" : void 0,
                      onClick: () => void selectHost(device)
                    },
                    React.createElement(
                      "span",
                      null,
                      React.createElement("strong", null, device.name),
                      React.createElement("small", null, [
                        formatPlatform(device.platform),
                        device.harnessVersion === void 0 ? void 0 : t("harnessVersion", { version: device.harnessVersion }),
                        device.clientVersion === void 0 ? void 0 : t("pluginVersion", { version: device.clientVersion })
                      ].filter(Boolean).join(" \xB7 "))
                    ),
                    React.createElement("small", null, t(device.online ? "online" : "offline"))
                  )))
                ) : null,
                React.createElement(RemoteProgressView, { progress, t }),
                selectedHost === void 0 ? connectingHost === void 0 ? React.createElement(
                  React.Fragment,
                  null,
                  React.createElement("p", { className: "dshRemoteHint" }, t("selectHostHint")),
                  React.createElement(
                    "footer",
                    { className: "dshRemoteAccountFooter" },
                    React.createElement("span", null, t("lanTitle")),
                    props.openSettings === void 0 ? null : React.createElement("button", {
                      type: "button",
                      className: "dshRemoteAccountSettings",
                      onClick: props.openSettings,
                      "aria-label": t("settings"),
                      title: t("settings")
                    }, t("settings")),
                    null
                  )
                ) : null : React.createElement(
                  "section",
                  { className: "dshRemoteBrowser", "aria-label": t("chooseDirectory") },
                  React.createElement(
                    "div",
                    { className: "dshRemoteSectionHeading dshRemoteWorkspaceHeading" },
                    React.createElement("strong", null, t(addingWorkspace ? workspaceBackend === "codex" ? "addCodexWorkspace" : workspaceBackend === "cursor" ? "addCursorWorkspace" : workspaceBackend === "antigravity" ? "addAntigravityWorkspace" : workspaceBackend === "pi" ? "addPiWorkspace" : workspaceBackend === "claude" ? "addClaudeWorkspace" : workspaceBackend === "opencode" ? "addOpencodeWorkspace" : "addRemoteWorkspace" : "existingWorkspaces")),
                    addingWorkspace ? React.createElement("button", {
                      type: "button",
                      className: "dshRemoteCancelWorkspace",
                      disabled: busy,
                      onClick: cancelAddingWorkspace
                    }, t("cancelAddWorkspace")) : React.createElement("button", {
                      type: "button",
                      className: "dshRemoteAddWorkspace",
                      disabled: busy,
                      title: t("addRemoteWorkspace"),
                      "aria-label": t("addRemoteWorkspace"),
                      onClick: () => startAddingWorkspace("harness")
                    }, React.createElement("svg", {
                      className: "dshRemoteAddWorkspaceIcon",
                      viewBox: "0 0 16 16",
                      "aria-hidden": !0,
                      focusable: !1
                    }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })))
                  ),
                  addingWorkspace ? React.createElement(
                    "div",
                    { className: "dshRemoteFolderBrowser" },
                    directory === void 0 ? React.createElement("p", null, t("loadingDirectory")) : React.createElement(
                      React.Fragment,
                      null,
                      React.createElement(
                        "nav",
                        { className: "dshRemoteCrumbs", "aria-label": t("currentDirectory") },
                        directory.crumbs.map((crumb) => React.createElement("button", {
                          type: "button",
                          key: crumb.path,
                          disabled: busy || crumb.path === directory.path,
                          onClick: () => void browseDirectory(crumb.path)
                        }, crumb.path === directory.home ? "\u2302" : crumb.name))
                      ),
                      React.createElement("div", { className: "dshRemoteFolderList" }, directory.entries.filter((entry) => !entry.hidden).length === 0 ? React.createElement("p", null, t("emptyDirectory")) : directory.entries.filter((entry) => !entry.hidden).map((entry) => React.createElement("button", {
                        type: "button",
                        key: entry.path,
                        disabled: busy,
                        onClick: () => void browseDirectory(entry.path)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u25B1"), React.createElement("span", null, entry.name)))),
                      directory.truncated ? React.createElement("small", null, t("directoryTruncated")) : null
                    )
                  ) : React.createElement(
                    "div",
                    { className: "dshRemoteWorkspaceLists" },
                    React.createElement(
                      React.Fragment,
                      null,
                      React.createElement(
                        "div",
                        { id: workspaceListId, className: "dshRemoteDirectoryList" },
                        workspaces.length === 0 ? React.createElement("p", null, t("noRemoteWorkspaces")) : visibleWorkspaces.map((workspace) => React.createElement(
                          "button",
                          {
                            type: "button",
                            key: workspace.workspaceId,
                            disabled: busy,
                            className: workspaceBackend === "harness" && path === workspace.path ? "isSelected" : "",
                            "aria-pressed": workspaceBackend === "harness" && path === workspace.path,
                            onClick: () => {
                              setWorkspaceBackend("harness"), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setPath(workspace.path);
                            },
                            onDoubleClick: () => void openWorkspace({ backend: "harness", path: workspace.path })
                          },
                          React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                          React.createElement("span", null, workspace.title),
                          React.createElement("small", null, workspace.path)
                        )),
                        workspaces.length <= 3 || showAllWorkspaces ? null : React.createElement("button", {
                          type: "button",
                          className: "dshRemoteWorkspaceMore",
                          disabled: busy,
                          "aria-controls": workspaceListId,
                          "aria-label": t("showAllWorkspaces"),
                          onClick: () => setShowAllWorkspaces(!0)
                        }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                      )
                    ),
                    codexAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: codexWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement(
                          "span",
                          { className: "dshRemoteWorkspaceSourceText" },
                          React.createElement("strong", null, t("codexVirtualWorkspace"))
                        ),
                        codexAvailable ? React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addCodexWorkspace"),
                          "aria-label": t("addCodexWorkspace"),
                          onClick: () => startAddingWorkspace("codex")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }))) : null
                      ),
                      React.createElement("div", {
                        id: codexWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": codexWorkspaceHeadingId
                      }, visibleCodexWorkspaces.length === 0 ? React.createElement("p", null, t("noCodexWorkspaces")) : visibleCodexWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "codex" && codexWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "codex" && codexWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("codex"), setCodexWorkspaceId(workspace.workspaceId), setCursorWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "codex",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon isGpt", src: gptWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      codexWorkspaces.length <= 3 || showAllCodexWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": codexWorkspaceListId,
                        "aria-label": t("showAllCodexWorkspaces"),
                        onClick: () => setShowAllCodexWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null,
                    cursorAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: cursorWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement(
                          "span",
                          { className: "dshRemoteWorkspaceSourceText" },
                          React.createElement("strong", null, t("cursorVirtualWorkspace"))
                        ),
                        cursorAvailable ? React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addCursorWorkspace"),
                          "aria-label": t("addCursorWorkspace"),
                          onClick: () => startAddingWorkspace("cursor")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }))) : null
                      ),
                      React.createElement("div", {
                        id: cursorWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": cursorWorkspaceHeadingId
                      }, visibleCursorWorkspaces.length === 0 ? React.createElement("p", null, t("noCursorWorkspaces")) : visibleCursorWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "cursor" && cursorWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "cursor" && cursorWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("cursor"), setCursorWorkspaceId(workspace.workspaceId), setCodexWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "cursor",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      cursorWorkspaces.length <= 3 || showAllCursorWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": cursorWorkspaceListId,
                        "aria-label": t("showAllCursorWorkspaces"),
                        onClick: () => setShowAllCursorWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null,
                    antigravityAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: antigravityWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement(
                          "span",
                          { className: "dshRemoteWorkspaceSourceText" },
                          React.createElement("strong", null, t("antigravityVirtualWorkspace"))
                        ),
                        antigravityAvailable ? React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addAntigravityWorkspace"),
                          "aria-label": t("addAntigravityWorkspace"),
                          onClick: () => startAddingWorkspace("antigravity")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }))) : null
                      ),
                      React.createElement("div", {
                        id: antigravityWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": antigravityWorkspaceHeadingId
                      }, visibleAntigravityWorkspaces.length === 0 ? React.createElement("p", null, t("noAntigravityWorkspaces")) : visibleAntigravityWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "antigravity" && antigravityWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "antigravity" && antigravityWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("antigravity"), setAntigravityWorkspaceId(workspace.workspaceId), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "antigravity",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      antigravityWorkspaces.length <= 3 || showAllAntigravityWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": antigravityWorkspaceListId,
                        "aria-label": t("showAllAntigravityWorkspaces"),
                        onClick: () => setShowAllAntigravityWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null,
                    piAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: piWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement(
                          "span",
                          { className: "dshRemoteWorkspaceSourceText" },
                          React.createElement("strong", null, t("piVirtualWorkspace"))
                        ),
                        piAvailable ? React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addPiWorkspace"),
                          "aria-label": t("addPiWorkspace"),
                          onClick: () => startAddingWorkspace("pi")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }))) : null
                      ),
                      React.createElement("div", {
                        id: piWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": piWorkspaceHeadingId
                      }, visiblePiWorkspaces.length === 0 ? React.createElement("p", null, t("noPiWorkspaces")) : visiblePiWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "pi" && piWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "pi" && piWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("pi"), setPiWorkspaceId(workspace.workspaceId), setAntigravityWorkspaceId(void 0), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "pi",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      piWorkspaces.length <= 3 || showAllPiWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": piWorkspaceListId,
                        "aria-label": t("showAllPiWorkspaces"),
                        onClick: () => setShowAllPiWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null,
                    opencodeAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: opencodeWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement("span", { className: "dshRemoteWorkspaceSourceText" }, React.createElement("strong", null, t("opencodeVirtualWorkspace"))),
                        React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addOpencodeWorkspace"),
                          "aria-label": t("addOpencodeWorkspace"),
                          onClick: () => startAddingWorkspace("opencode")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })))
                      ),
                      React.createElement("div", {
                        id: opencodeWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": opencodeWorkspaceHeadingId
                      }, visibleOpencodeWorkspaces.length === 0 ? React.createElement("p", null, t("noOpencodeWorkspaces")) : visibleOpencodeWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "opencode" && opencodeWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "opencode" && opencodeWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("opencode"), setOpencodeWorkspaceId(workspace.workspaceId), setPiWorkspaceId(void 0), setClaudeWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "opencode",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      opencodeWorkspaces.length <= 3 || showAllOpencodeWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": opencodeWorkspaceListId,
                        "aria-label": t("showAllOpencodeWorkspaces"),
                        onClick: () => setShowAllOpencodeWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null,
                    claudeAvailable ? React.createElement(
                      "section",
                      { className: "dshRemoteCodexWorkspaceGroup" },
                      React.createElement(
                        "div",
                        {
                          id: claudeWorkspaceHeadingId,
                          className: "dshRemoteWorkspaceSourceHeading"
                        },
                        React.createElement("span", { className: "dshRemoteWorkspaceSourceText" }, React.createElement("strong", null, t("claudeVirtualWorkspace"))),
                        React.createElement("button", {
                          type: "button",
                          className: "dshRemoteAddWorkspace",
                          disabled: busy,
                          title: t("addClaudeWorkspace"),
                          "aria-label": t("addClaudeWorkspace"),
                          onClick: () => startAddingWorkspace("claude")
                        }, React.createElement("svg", {
                          className: "dshRemoteAddWorkspaceIcon",
                          viewBox: "0 0 16 16",
                          "aria-hidden": !0,
                          focusable: !1
                        }, React.createElement("path", { d: "M8 3v10M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })))
                      ),
                      React.createElement("div", {
                        id: claudeWorkspaceListId,
                        className: "dshRemoteDirectoryList dshRemoteCodexWorkspaceList",
                        "aria-labelledby": claudeWorkspaceHeadingId
                      }, visibleClaudeWorkspaces.length === 0 ? React.createElement("p", null, t("noClaudeWorkspaces")) : visibleClaudeWorkspaces.map((workspace) => React.createElement(
                        "button",
                        {
                          type: "button",
                          key: workspace.workspaceId,
                          disabled: busy,
                          className: workspaceBackend === "claude" && claudeWorkspaceId === workspace.workspaceId ? "isSelected" : "",
                          "aria-pressed": workspaceBackend === "claude" && claudeWorkspaceId === workspace.workspaceId,
                          onClick: () => {
                            setWorkspaceBackend("claude"), setClaudeWorkspaceId(workspace.workspaceId), setPiWorkspaceId(void 0), setOpencodeWorkspaceId(void 0), setAntigravityWorkspaceId(void 0), setCodexWorkspaceId(void 0), setCursorWorkspaceId(void 0), setPath(workspace.path);
                          },
                          onDoubleClick: () => void openWorkspace({
                            backend: "claude",
                            path: workspace.path,
                            workspaceId: workspace.workspaceId
                          })
                        },
                        React.createElement("img", { className: "dshRemoteWorkspaceIcon", src: deepSeekWorkspaceIcon, alt: "", "aria-hidden": !0 }),
                        React.createElement("span", null, workspace.title),
                        React.createElement("small", null, `${workspace.path} \xB7 ${workspace.sessionCount}`)
                      ))),
                      claudeWorkspaces.length <= 3 || showAllClaudeWorkspaces ? null : React.createElement("button", {
                        type: "button",
                        className: "dshRemoteWorkspaceMore",
                        disabled: busy,
                        "aria-controls": claudeWorkspaceListId,
                        "aria-label": t("showAllClaudeWorkspaces"),
                        onClick: () => setShowAllClaudeWorkspaces(!0)
                      }, React.createElement("span", { "aria-hidden": !0 }, "\u2026"))
                    ) : null
                  ),
                  React.createElement(
                    "footer",
                    { className: "dshRemoteOpenBar" },
                    React.createElement("div", null, React.createElement("span", null, t("currentDirectory")), React.createElement("strong", null, path || "\u2014")),
                    React.createElement("button", {
                      type: "button",
                      disabled: busy || path.trim() === "" || !addingWorkspace && workspaceBackend === "codex" && codexWorkspaceId === void 0 || !addingWorkspace && workspaceBackend === "cursor" && cursorWorkspaceId === void 0 && path === "" || !addingWorkspace && workspaceBackend === "antigravity" && antigravityWorkspaceId === void 0 && path === "" || !addingWorkspace && workspaceBackend === "pi" && piWorkspaceId === void 0 && path === "" || !addingWorkspace && workspaceBackend === "opencode" && opencodeWorkspaceId === void 0 && path === "" || !addingWorkspace && workspaceBackend === "claude" && claudeWorkspaceId === void 0 && path === "",
                      onClick: () => void openWorkspace()
                    }, t(busy ? "openingWorkspace" : addingWorkspace ? "confirmAddWorkspace" : "openWorkspace"))
                  )
                )
              )
            ),
            notice === void 0 ? null : React.createElement("p", { className: "dshRemoteNotice", role: "status" }, notice),
            error === void 0 ? null : React.createElement("p", { className: "dshRemoteError", role: "alert" }, error)
          )
        )) : null
      );
    }
    return RemoteWorkspaceAction;
  }

  // src/control-route.ts
  var CONTROL_RPC_PREFIX = "/dsh-lan", STATUS_STREAM_ENDPOINT = "status.events", STATUS_STREAM_PATH = `${CONTROL_RPC_PREFIX}/${STATUS_STREAM_ENDPOINT}`;

  // src/plugin-route-client.ts
  var PluginRouteFailure = class extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
    }
  };
  function createPluginRouteFetch(original, baseUrl, options = {}) {
    let routeUrl = new URL("api/bot", baseUrl), nextRpcId = 0, control = async (method, payload, signal) => {
      let rpcId = `plugin-route-${++nextRpcId}`, response = await original(new URL(`${CONTROL_RPC_PREFIX.slice(1)}/${method}`, baseUrl), {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "client-request", rpcId, method, payload }),
        signal
      });
      if (!response.ok) throw new PluginRouteFailure("remote-plugin/control-unavailable", `The local Remote control request failed (HTTP ${response.status}). Reload the Remote plugin.`);
      let envelope = await response.json();
      if (!isRecord(envelope) || envelope.type !== "server-response" || envelope.rpcId !== rpcId || !isRecord(envelope.result))
        throw new PluginRouteFailure("remote-plugin/control-invalid", "The local Remote control response is invalid. Reload the Remote plugin.");
      if (envelope.result.ok !== !0) {
        let error = isRecord(envelope.result.error) ? envelope.result.error : void 0, code = (isRecord(error?.details) ? error.details : void 0)?.remoteCode ?? error?.code;
        throw code === "FEATURE_NOT_SUPPORTED" || code === "METHOD_NOT_FOUND" ? new PluginRouteFailure("remote-plugin/host-unsupported", "The selected Host does not support plugin route forwarding. Update and reload Remote on the Host, then reconnect.") : code === "REMOTE_NOT_CONNECTED" || code === "TRANSPORT_CLOSED" ? new PluginRouteFailure("remote-plugin/disconnected", "The Remote Host is disconnected. Reconnect to load DS Bot.") : code === "INVALID_MESSAGE" ? new PluginRouteFailure("remote-plugin/operation-not-allowed", "This DS Bot operation is not allowed over Remote. Use the Host locally.") : new PluginRouteFailure("remote-plugin/control-rejected", "The Remote plugin route request was rejected by the control channel.");
      }
      return envelope.result.value;
    };
    return async (input, init) => {
      let requestUrl = new URL(input instanceof Request ? input.url : String(input), baseUrl);
      if ((init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase() !== "POST" || requestUrl.href !== routeUrl.href) return original(input, init);
      let lifetime = (init?.signal !== void 0 ? init.signal ?? void 0 : input instanceof Request ? input.signal : void 0) ?? AbortSignal.timeout(45e3);
      try {
        lifetime.throwIfAborted();
        let status = await control("status", {}, AbortSignal.any([lifetime, AbortSignal.timeout(1e4)]));
        if (lifetime.throwIfAborted(), !isRecord(status)) throw new PluginRouteFailure("remote-plugin/authority-unavailable", "The Remote plugin route authority is unavailable.");
        if (status.mode === "local") return original(input, init);
        if (status.mode !== "remote") throw new PluginRouteFailure("remote-plugin/authority-unavailable", "The Remote plugin route authority is unavailable.");
        if (status.connected !== !0) throw new PluginRouteFailure("remote-plugin/disconnected", "The Remote Host is disconnected. Reconnect to load DS Bot.");
        if (!isRecord(status.remoteFeatures) || status.remoteFeatures.pluginRoute !== !0) throw new PluginRouteFailure("remote-plugin/host-unsupported", "The selected Host does not support plugin route forwarding. Update and reload Remote on the Host, then reconnect.");
        if (status.backend !== void 0 && status.backend !== "harness") throw new PluginRouteFailure("remote-plugin/backend-unsupported", "DS Bot requires the Remote Harness catalog. Select a Harness workspace on this Host.");
        let body = await (input instanceof Request ? new Request(input, init) : new Request(requestUrl, init)).clone().json();
        if (!isRecord(body)) throw new Error("The plugin route body must be a JSON object.");
        let result = await control("plugin.route", { route: "api/bot", body }, lifetime);
        if (!isRecord(result) || !Number.isInteger(result.status) || result.status < 200 || result.status > 599)
          throw new Error("The plugin route response is invalid.");
        let statusCode = result.status;
        if (statusCode === 404) throw new PluginRouteFailure("remote-plugin/bot-not-loaded", "The Host has no DS Bot route. Enable ds-bot in the same DSH instance/profile as the connected Host.");
        if (statusCode === 503) throw new PluginRouteFailure("remote-plugin/host-carrier-unavailable", "The Host plugin route carrier is unavailable. Update and reload Remote on the Host.");
        if (statusCode >= 200 && statusCode < 300 && options.beforeResponse !== void 0)
          try {
            await waitWithSignal(options.beforeResponse(status, body, result.json, lifetime), lifetime);
          } catch {
            throw lifetime.throwIfAborted(), new PluginRouteFailure("remote-plugin/catalog-unavailable", "The Remote Harness Session catalog is not ready. Reconnect before loading DS Bot.");
          }
        return lifetime.throwIfAborted(), new Response([204, 205, 304].includes(statusCode) ? null : JSON.stringify(result.json ?? null), {
          status: statusCode,
          headers: { "content-type": "application/json" }
        });
      } catch (error) {
        return lifetime.throwIfAborted(), new Response(JSON.stringify({
          ok: !1,
          error: {
            code: error instanceof PluginRouteFailure ? error.code : "remote-plugin/unavailable",
            message: error instanceof PluginRouteFailure ? error.message : "The Remote plugin route is unavailable.",
            details: {}
          }
        }), { status: 200, headers: { "content-type": "application/json" } });
      }
    };
  }
  function createPluginRouteCatalogGuard(readSessions) {
    return async (_status, body, json, signal) => {
      if (!isRecord(json) || json.ok !== !0 || !isRecord(json.value)) return;
      let required = botSessionIds(body.endpoint, json.value);
      if (required.size === 0) return;
      let sessions = await readSessions(), containsSessions = () => {
        let snapshot = sessions.list.getSnapshot(), known = new Set(snapshot.ids);
        return snapshot.phase === "ready" && [...required].every((id) => known.has(id));
      };
      for (let attempt = 0; attempt < 2; attempt++) {
        if (signal.throwIfAborted(), containsSessions()) return;
        if (sessions.refresh === void 0) break;
        await sessions.refresh();
      }
      if (signal.throwIfAborted(), !containsSessions()) throw new Error("The Remote Session catalog does not contain the published Sessions.");
    };
  }
  function botSessionIds(endpoint, value) {
    let ids = /* @__PURE__ */ new Set(), add = (id) => {
      if (id != null) {
        if (typeof id != "string" || id.length === 0) throw new Error("Invalid Bot Session identity.");
        ids.add(id);
      }
    }, addArray = (input) => {
      if (input !== void 0) {
        if (!Array.isArray(input)) throw new Error("Invalid Bot Session identities.");
        input.forEach(add);
      }
    }, bot = (input) => {
      if (!isRecord(input)) throw new Error("Invalid Bot catalog entry.");
      add(input.id), add(input.sessionId), addArray(input.parts), Array.isArray(input.segments) && input.segments.forEach((segment) => {
        if (!isRecord(segment)) throw new Error("Invalid Bot Session segment.");
        add(segment.sessionId);
      });
    }, room = (input) => {
      if (!isRecord(input)) throw new Error("Invalid Bot room entry.");
      add(input.id), addArray(input.parts), isRecord(input.sessions) && Object.values(input.sessions).forEach(add);
    }, agent = (input) => {
      if (!isRecord(input)) throw new Error("Invalid Bot agent entry.");
      addArray(input.sessions);
    }, roster = () => {
      for (let [key, visit] of [["bots", bot], ["rooms", room], ["agents", agent]])
        if (value[key] !== void 0) {
          if (!Array.isArray(value[key])) throw new Error("Invalid Bot roster.");
          value[key].forEach(visit);
        }
    };
    switch (endpoint) {
      case "state":
      case "delete-bot":
      case "delete-room":
      case "set-main":
      case "remove-agent":
        roster();
        break;
      case "create-bot":
      case "duplicate-bot":
      case "update-bot":
        bot(value);
        break;
      case "create-room":
        room(value);
        break;
      case "update-room":
        room(value.room);
        break;
      case "add-agent":
        agent(value);
        break;
      case "agent-session":
      case "agent-adopt":
        add(value.sessionId);
        break;
      case "set-flags":
        Array.isArray(value.sessions) ? agent(value) : Array.isArray(value.members) ? room(value) : bot(value);
        break;
    }
    return ids;
  }
  function waitWithSignal(pending, signal) {
    return new Promise((resolve, reject) => {
      let onAbort = () => reject(signal.reason);
      signal.addEventListener("abort", onAbort, { once: !0 }), signal.aborted && onAbort(), pending.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
    });
  }
  function isRecord(value) {
    return typeof value == "object" && value !== null && !Array.isArray(value);
  }

  // src/remote-file-content-provider.ts
  function shouldUseRemoteFileViewer(status) {
    return status.mode === "remote" && status.remoteFeatures?.fileViewer === !0;
  }
  var REMOTE_FILE_SAVE_AS_MAX_BYTES = 100 * 1024 * 1024, REMOTE_FILE_FAST_SAVE_AS_MAX_BYTES = 1024 * 1024 * 1024;
  function shouldAllowRemoteFileSaveAs(status) {
    return shouldUseRemoteFileViewer(status) && (status.transport === "LAN" || status.transport === "P2P" || status.transport === "TURN");
  }
  function remoteFileSaveAsMaxBytes(status) {
    return status.transport === "LAN" || status.transport === "P2P" ? REMOTE_FILE_FAST_SAVE_AS_MAX_BYTES : REMOTE_FILE_SAVE_AS_MAX_BYTES;
  }
  function createRemoteFileContentProvider(call, options = {}) {
    return {
      id: "dsh-remote-files",
      priority: 1e4,
      supports: () => !0,
      saveAsAllowed: () => ({
        allowed: currentSaveAsAllowed(options.saveAsAllowed),
        maxBytes: currentSaveAsMaxBytes(options.saveAsMaxBytes)
      }),
      async stat(locator, signal) {
        let value = await call("fileviewer.stat", { path: locator }, signal);
        if (value.exists)
          return {
            name: value.name,
            size: value.isDirectory ? 0 : value.size,
            mime: value.mime,
            mtimeMs: value.mtimeMs,
            isDirectory: value.isDirectory
          };
      },
      async read(locator, request) {
        if (!Number.isInteger(request.offset) || request.offset < 0) throw new Error("A non-negative integer offset is required.");
        if (!Number.isInteger(request.length) || request.length <= 0) throw new Error("A positive integer length is required.");
        let chunks = [], received = 0;
        for (; received < request.length; ) {
          request.signal.throwIfAborted();
          let length = Math.min(524288, request.length - received), offset = request.offset + received, range = await call("fileviewer.readRange", { path: locator, offset, length }, request.signal);
          if (range.offset !== offset) throw new Error("The Remote Host returned a mismatched file range.");
          let bytes = decodeBase64(range.data);
          if (bytes.byteLength > length) throw new Error("The Remote Host returned more file bytes than requested.");
          if (chunks.push(bytes), received += bytes.byteLength, range.eof || bytes.byteLength === 0) break;
        }
        let merged = new Uint8Array(received), cursor = 0;
        for (let chunk of chunks)
          merged.set(chunk, cursor), cursor += chunk.byteLength;
        return merged;
      },
      async list(locator, signal) {
        return (await call("fileviewer.list", { path: locator }, signal)).entries.map((entry) => ({
          locator: entry.path,
          name: entry.name,
          size: entry.isDirectory ? 0 : entry.size ?? 0,
          mtimeMs: entry.mtimeMs,
          isDirectory: entry.isDirectory
        }));
      }
    };
  }
  function currentSaveAsAllowed(value) {
    return typeof value == "function" ? value() : value === !0;
  }
  function currentSaveAsMaxBytes(value) {
    return typeof value == "function" ? value() : value ?? REMOTE_FILE_SAVE_AS_MAX_BYTES;
  }
  function decodeBase64(value) {
    let binary = atob(value), bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  // src/status-stream.ts
  function parseStatus(data) {
    if (typeof data == "string")
      try {
        let parsed = JSON.parse(data);
        return parsed === null || typeof parsed != "object" ? void 0 : parsed;
      } catch {
        return;
      }
  }
  function createStatusFeed(options) {
    let listeners = /* @__PURE__ */ new Set(), pollIntervalMs = options.pollIntervalMs ?? 1500, openTimeoutMs = options.openTimeoutMs ?? 4e3, createSource = options.createSource ?? ((url) => new EventSource(url)), status, source, openTimer, pollTimer, publish = (next) => {
      status = next;
      for (let listener of [...listeners]) listener(next);
    }, teardown = () => {
      openTimer !== void 0 && (clearTimeout(openTimer), openTimer = void 0), pollTimer !== void 0 && (clearInterval(pollTimer), pollTimer = void 0), source?.close(), source = void 0;
    }, poll = () => {
      options.readStatus().then((next) => {
        pollTimer !== void 0 && publish(next);
      }).catch(() => {
      });
    }, fallbackToPolling = (reason) => {
      pollTimer !== void 0 || listeners.size === 0 || (openTimer !== void 0 && (clearTimeout(openTimer), openTimer = void 0), source?.close(), source = void 0, options.onFallback?.(reason), poll(), pollTimer = setInterval(poll, pollIntervalMs));
    }, openStream = () => {
      let opened;
      try {
        opened = createSource(options.url);
      } catch {
        fallbackToPolling("unsupported");
        return;
      }
      source = opened;
      let received = !1;
      openTimer = setTimeout(() => {
        received || fallbackToPolling("silent");
      }, openTimeoutMs), opened.onmessage = (event) => {
        received = !0, openTimer !== void 0 && (clearTimeout(openTimer), openTimer = void 0);
        let next = parseStatus(event.data);
        next !== void 0 && publish(next);
      }, opened.onerror = () => {
        opened.readyState === 2 && fallbackToPolling("unavailable");
      };
    };
    return {
      getSnapshot: () => status,
      subscribe: (listener) => (listeners.add(listener), status !== void 0 && listener(status), listeners.size === 1 && openStream(), () => {
        listeners.delete(listener), listeners.size === 0 && teardown();
      }),
      close: () => {
        listeners.clear(), teardown();
      }
    };
  }

  // src/client-recovery.ts
  function subscribeRemoteRecovery(feed, reconnect) {
    let previous;
    return feed.subscribe((status) => {
      let recovered = status.mode === "remote" && status.connected === !0 && previous?.mode === "remote" && previous.target?.deviceId === status.target?.deviceId && status.recoveryGeneration !== void 0 && status.recoveryGeneration !== previous.recoveryGeneration;
      previous = status, recovered && reconnect();
    });
  }

  // src/client.ts
  var clientModuleId = "ds-harness-lan", controlRouteBackoffStepsMs = [1e3, 2e3, 5e3, 1e4, 3e4], ControlRouteUnavailableError = class extends Error {
    constructor(message) {
      super(message), this.name = "ControlRouteUnavailableError";
    }
  }, originalPluginFetch = window.fetch, readyPluginSessions, pluginSessions = new Promise((resolve) => {
    readyPluginSessions = resolve;
  }), pluginRouteFetch = typeof originalPluginFetch == "function" && typeof document < "u" ? createPluginRouteFetch(originalPluginFetch.bind(window), document.baseURI, {
    beforeResponse: createPluginRouteCatalogGuard(() => pluginSessions)
  }) : void 0;
  pluginRouteFetch !== void 0 && (window.fetch = pluginRouteFetch);
  function controlRouteUnavailableStatus() {
    return {
      mode: "local",
      available: !1,
      controlUnavailable: !0,
      connected: !1,
      transport: "Disconnected",
      remoteFeatures: { commandList: !1, fileViewer: !1, terminal: !1, codex: !1, pluginRoute: !1, cursor: !1, antigravity: !1, pi: !1, opencode: !1 },
      hostAuthorizationAvailable: !1
    };
  }
  window.__ModuleLoader__.load({
    id: clientModuleId,
    factory: (require2) => {
      let module = { exports: {} }, React = require2("react"), RemotePluginOptions = createRemotePluginOptions(React), RemoteWorkspaceAction = createRemoteWorkspaceAction(React), RemoteSessionHeaderAction = createRemoteSessionHeaderAction(React), openHarnessSettings;
      function RemoteSettingsLauncher(props) {
        return openHarnessSettings = props.openSettings, null;
      }
      let inject = [
        "connection",
        "slots",
        "locale",
        "workspaces",
        "sessions"
      ];
      function apply(ctx) {
        if (window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__) return;
        window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__ = !0, readyPluginSessions(ctx.sessions), ctx.effect(() => () => {
          window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__ = !1;
        }, "ds-harness-lan: client singleton"), ctx.effect(() => () => {
          pluginRouteFetch !== void 0 && window.fetch === pluginRouteFetch && (window.fetch = originalPluginFetch);
        }, "ds-harness-lan: plugin route fetch");
        let t = ctx.locale.bind(localeNamespace), remoteOpenListeners = /* @__PURE__ */ new Set(), openRemote = () => {
          for (let listener of remoteOpenListeners) listener();
        }, subscribeOpen = (listener) => (remoteOpenListeners.add(listener), () => {
          remoteOpenListeners.delete(listener);
        }), controlRouteRetryAfter = 0, controlRouteBackoffIndex = 0, control = async (endpoint, payload = {}) => {
          if (endpoint === "status" && Date.now() < controlRouteRetryAfter)
            return controlRouteUnavailableStatus();
          let result;
          try {
            result = await ctx.connection.rpc.call(CONTROL_RPC_PREFIX, endpoint, payload), controlRouteRetryAfter = 0, controlRouteBackoffIndex = 0;
          } catch (reason) {
            if (!isMissingControlRoute(reason)) throw reason;
            let delayMs = controlRouteBackoffStepsMs[Math.min(controlRouteBackoffIndex, controlRouteBackoffStepsMs.length - 1)];
            if (controlRouteBackoffIndex += 1, controlRouteRetryAfter = Date.now() + delayMs, endpoint === "status") return controlRouteUnavailableStatus();
            throw new ControlRouteUnavailableError(t("remoteControlUnavailable"));
          }
          return unwrapControlResult(result, t("remoteRequestFailed"));
        }, statusFeed = createStatusFeed({
          url: STATUS_STREAM_PATH.slice(1),
          readStatus: () => control("status"),
          onFallback: (reason) => {
            console.warn("ds-harness-lan: status event stream unavailable, polling status instead:", reason);
          }
        });
        ctx.effect(() => () => statusFeed.close(), "ds-harness-lan: status stream"), ctx.effect(() => {
          let unsubscribe = statusFeed.subscribe((status) => {
            document.documentElement.classList.toggle("dshLanBrowserUnavailable", status.mode === "remote");
          });
          return () => {
            unsubscribe(), document.documentElement.classList.remove("dshLanBrowserUnavailable");
          };
        }, "ds-harness-lan: hide local browser entry in remote mode"), ctx.effect(() => subscribeRemoteRecovery(statusFeed, () => ctx.connection.reconnect?.()), "ds-harness-lan: carrier recovery"), ctx.effect(() => {
          let disposed = !1, unsubscribeWorkspaces, unsubscribeSessions, selection, opening = !1, reconcile = () => {
            if (disposed || opening || selection === void 0) return;
            let pending = selection, workspaceSnapshot = ctx.workspaces.list.getSnapshot();
            if (!workspacesReady(workspaceSnapshot) || !workspaceSnapshot.items.some((workspace) => workspace.workspaceId === pending.workspaceId)) return;
            let sessionSnapshot = ctx.sessions.list.getSnapshot(), isVirtualBackend = pending.backend === "codex" || pending.backend === "cursor" || pending.backend === "antigravity" || pending.backend === "pi" || pending.backend === "opencode" || pending.backend === "claude";
            if (isVirtualBackend && pending.sessionId !== void 0 && sessionSnapshot.phase !== "ready") return;
            opening = !0, unsubscribeWorkspaces?.(), unsubscribeSessions?.(), unsubscribeWorkspaces = void 0, unsubscribeSessions = void 0;
            let navigation = ctx.get("uiWorkspace"), connectWorkspace = (workspaceId) => navigation !== void 0 ? navigation.connectWorkspace(workspaceId) : ctx.workspaces.connectWorkspace(workspaceId);
            (isVirtualBackend && pending.sessionId !== void 0 && sessionSnapshot.ids.includes(pending.sessionId) ? Promise.resolve(pending.sessionId) : connectWorkspace(pending.workspaceId)).then(async (sessionId) => {
              if (!disposed) {
                if (navigation !== void 0)
                  navigation.openSession(sessionId);
                else if (typeof ctx.workspaces.openSession == "function")
                  ctx.workspaces.openSession(sessionId);
                else if (typeof ctx.sessions.open == "function")
                  ctx.sessions.open(sessionId);
                else
                  throw new Error("No supported Session open API is available.");
                window.sessionStorage.removeItem(pendingWorkspaceSelectionKey), await control("workspace.selection.consume", pending).catch(() => {
                });
              }
            }).catch((reason) => {
              disposed || console.warn("remote workspace selection failed:", reason);
            });
          };
          return control("status").then((status) => {
            let pending = status.workspaceSelection ?? storedWorkspaceSelection();
            disposed || status.mode !== "remote" || pending === void 0 || status.target?.deviceId !== pending.targetDeviceId || (selection = pending, unsubscribeWorkspaces = ctx.workspaces.list.subscribe(reconcile), unsubscribeSessions = ctx.sessions.list.subscribe(reconcile), reconcile());
          }).catch(() => {
          }), () => {
            disposed = !0, unsubscribeWorkspaces?.(), unsubscribeSessions?.();
          };
        }, "ds-harness-lan: resume selected workspace"), ctx.inject(["fileViewer"], (fileViewerContext) => {
          let viewer = fileViewerContext.get("fileViewer");
          viewer !== void 0 && fileViewerContext.effect(() => {
            let unregister, latestSaveAsAllowed = !1, latestSaveAsMaxBytes = REMOTE_FILE_SAVE_AS_MAX_BYTES, unsubscribe = statusFeed.subscribe((status) => {
              let supported = shouldUseRemoteFileViewer(status);
              latestSaveAsAllowed = shouldAllowRemoteFileSaveAs(status), latestSaveAsMaxBytes = remoteFileSaveAsMaxBytes(status), supported && unregister === void 0 ? unregister = viewer.registerContentProvider(createRemoteFileContentProvider(
                (endpoint, payload) => control(endpoint, payload),
                { saveAsAllowed: () => latestSaveAsAllowed, saveAsMaxBytes: () => latestSaveAsMaxBytes }
              )) : !supported && unregister !== void 0 && (unregister(), unregister = void 0, latestSaveAsAllowed = !1, latestSaveAsMaxBytes = REMOTE_FILE_SAVE_AS_MAX_BYTES);
            });
            return () => {
              unsubscribe(), unregister?.();
            };
          }, "ds-harness-lan: remote file viewer provider");
        });
        let RemoteMentionIcon = (props) => React.createElement(
          "svg",
          {
            width: props.size ?? 18,
            height: props.size ?? 18,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: props.color ?? "currentColor",
            strokeWidth: 1.8,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": !0,
            className: "dshRemoteComputerIcon"
          },
          React.createElement("rect", { x: 3, y: 4, width: 18, height: 13, rx: 2 }),
          React.createElement("path", { d: "M8 21h8M12 17v4" })
        );
        ctx.inject(["inputTriggers"], (inputContext) => {
          let hostCache = /* @__PURE__ */ new Map();
          inputContext.effect(() => {
            let inputTriggers = inputContext.inputTriggers, source = {
              trigger: "@",
              name: "\u4E3B\u673A",
              order: -20,
              showGroupTitle: !0,
              candidates: async (_session, request) => {
                if ((await control("settings.get").catch(() => {
                }))?.config?.remoteTools?.enabled === !1) return [];
                let devices = await control("devices").catch(() => []), query = request.query.trim().toLocaleLowerCase();
                return devices.filter((device) => device.online && (query === "" || `${device.name} ${device.deviceId}`.toLocaleLowerCase().includes(query))).map((device) => (hostCache.set(device.name, device), {
                  name: device.name,
                  label: device.name,
                  description: t("remoteHostMention", { platform: device.platform }),
                  icon: RemoteMentionIcon,
                  value: JSON.stringify({ deviceId: device.deviceId, label: device.name, platform: device.platform })
                }));
              },
              onPick: (pick) => ({ text: `@${pick.candidate.label ?? pick.candidate.name} ` })
            }, stopHostFileOpen = (event) => {
              let target = event.target instanceof Element ? event.target.closest('button,[role="button"],a') ?? event.target : void 0;
              if (!(target instanceof Element)) return;
              let text = target.textContent?.trim().replace(/^@/, "") ?? "", device = hostCache.get(text);
              if (!device) return;
              event.preventDefault(), event.stopImmediatePropagation();
              let invocation = `@${device.name}`, container = target;
              for (let depth = 0; depth < 20 && container !== null; depth += 1) {
                let candidate = container.textContent?.trim() ?? "";
                candidate.includes(device.name) && candidate.length > invocation.length && candidate.length < 4e3 && (invocation = candidate), container = container.parentElement;
              }
              window.dispatchEvent(new CustomEvent("dsh-remote-host-reference", {
                detail: { label: device.name, platform: device.platform, deviceId: device.deviceId, invocation }
              }));
            };
            document.addEventListener("click", stopHostFileOpen, !0);
            let unregister = inputTriggers.registerSource(source);
            return () => {
              document.removeEventListener("click", stopHostFileOpen, !0), unregister();
            };
          }, "ds-harness-lan: host mention source");
        }), ctx.effect(() => ctx.locale.register(localeNamespace, { zh, en }), "ds-harness-lan: dictionaries"), ctx.effect(() => installStyle(clientModuleId), "ds-harness-lan: client styles"), ctx.effect(() => installTerminalAvailabilityNotice(statusFeed, t), "ds-harness-lan: terminal availability notice"), ctx.slots.inject("shell.overlay", () => ctx.slots.register({
          name: "shell.overlay",
          id: "ds-harness-lan-global-context",
          order: 20,
          locale: localeNamespace,
          inject: () => ({ control, statusFeed })
        }, RemoteSessionHeaderAction)), ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
          name: "sidebar.footer.action",
          id: "ds-harness-lan-workspace",
          order: -20,
          locale: localeNamespace,
          inject: () => ({
            control,
            statusFeed,
            subscribeOpen,
            openSettings: void 0
          })
        }, RemoteWorkspaceAction)), ctx.slots.inject("plugins.row.config", () => ctx.slots.register({
          name: "plugins.row.config",
          key: "ds-harness-lan#ds-harness-lan",
          locale: localeNamespace,
          inject: () => ({ control, statusFeed, onSignIn: openRemote })
        }, RemotePluginOptions)), ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register({
          name: "plugins.bundle.config",
          key: "ds-harness-lan",
          locale: localeNamespace,
          inject: () => ({ control, statusFeed, onSignIn: openRemote })
        }, RemotePluginOptions));
      }
      function isMissingControlRoute(reason) {
        return reason instanceof Error && reason.message.startsWith(`transport failure for ${CONTROL_RPC_PREFIX}/`) && (reason.message.endsWith(": HTTP 404") || reason.message.endsWith(": HTTP 405"));
      }
      return module.exports.apply = apply, module.exports.inject = inject, module.exports;
    }
  });
})();
