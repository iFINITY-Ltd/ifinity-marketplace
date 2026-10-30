---
name: hub-connection
description: >-
  Check and repair the iFINITY AgentZ connection for this plugin. Use when the
  user says "setup", "connect to iMIS", "AgentZ is not connected", "plugin not
  connected", "check connection", "MCP disconnected", "no token", "how do I
  sign in", or when Claude needs to verify that AgentZ has supplied
  iMIS instance and OAuth token state.
argument-hint: "[intent: check-status | guide-setup | guide-repair]"
---

# iFINITY AgentZ Connection

The iMIS plugin authenticates through the iFINITY AgentZ desktop app. There is no
manual credential entry in Claude, Cowork, or Claude Code.

This skill owns the AgentZ desktop link only. Configuring the iMIS Client
Application, security roles, or the API connection belongs to
system-configuration; classifying an iMIS task or choosing the right writer tool
belongs to imis-domain-knowledge.

The AgentZ desktop app is downloaded from the iFINITY licensing download page:

```text
https://ifinityagentz.co.uk/download
```

That page is gated by the organisation auth code or a magic-link email unlock,
and also exposes the current Claude Cowork plugin ZIP.

## Check Connection

Call `imis_connection_status`.

If connected, report:
- iMIS instance URL
- connection status (CONNECTED when AgentZ has supplied an OAuth token, else NOT_CONNECTED)

Both answers also say what this session runs. Quote these when reporting a problem:
- `plugin`: the AgentZ plugin version, which installed copy is running and which app started it
- `agentzApp`: whether the AgentZ app is connected, and its version when the app states one
- `imisBuild`: the tenant's iMIS build, when connected

A `runtimeWarning` means this computer's Node.js (or the AgentZ app) lacks a
security fix. It does not stop the connection: AgentZ keeps working safely.
Relay its `tellThePerson` sentence as written, once; it appears only on the
first status call of a session, and later calls carry `alreadyToldThePerson`
instead. `forTheAgent` is the technical detail (the advisory and the versions
to update to) for whoever manages the setup; do not read it to staff unless
they ask.

## If Not Connected

A NOT_CONNECTED answer carries `cause`, `message` and `whatToDo`. Tell the person
the `message` and the `whatToDo` steps in your own plain words; do not replace
them with the general setup list below. Causes you will see:

- `agentz_signed_out`: AgentZ is signed out on this computer. Its sign-in may
  have expired, since AgentZ asks for a new sign-in every 30 days. The person
  opens AgentZ and signs in with the emailed link.
- `agentz_not_reachable`: Claude's AgentZ connection cannot reach the AgentZ app.
  AgentZ is closed, showing its sign-in screen, or restarting.
- `staff_signed_out`, `setup_needed`, `network`, `no_answer`, `reconnecting`,
  `instance_switched`, `seat_identity_mismatch`, `token_refused`,
  `waiting_for_token`: AgentZ is running but has no iMIS token, and the message
  says why. `network` and `reconnecting` are expected to clear by themselves;
  for the rest the person acts as `whatToDo` says.

Any other iMIS tool that runs while not connected fails with error category
`not_connected` and the same explanation. Nothing was sent to iMIS, unless the
error carries `changesSentBeforeError`: then the connection went partway through
the call, and what it was changing must be read back before anything is retried.
Do not retry until `imis_connection_status` reports CONNECTED.

## If The Check Itself Fails

`imis_connection_status` always answers while the AgentZ server inside Claude is
running. If the call itself fails ("Tool execution failed", "Failed to call
tool", or no answer at all), that server is not running, and no AgentZ setting
can fix it from inside this conversation. Tell the person to:

1. Make sure AgentZ is open and signed in.
2. Quit Claude completely and open it again. On Windows, quit it from the
   system tray too. Closing the window is not enough.

On Windows this is expected after AgentZ installs an update, because the update
closes the AgentZ server that Claude started.

## First-Time Setup

Guide the user through AgentZ path:

1. If AgentZ is not installed, download it from `https://ifinityagentz.co.uk/download`.
2. Open iFINITY AgentZ on the local machine.
3. Sign in with the iFINITY licence magic link.
4. Save iMIS credentials in Settings > iMIS Account.
5. For org admins, use Settings > API Connection to create or repair the iMIS Client Application.
6. Keep AgentZ running while using Claude Code or Cowork.

Once AgentZ connects, it pushes the iMIS instance URL and OAuth token to the plugin over the localhost WebSocket bridge.

## Verify

After the user has AgentZ running, call `imis_connection_status` again. If connected, run a low-risk read such as:

```text
imis_find_member query="test" limit=1
```

Use a small limit and avoid write operations until the connection and target iMIS instance are confirmed.
