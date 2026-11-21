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

The AgentZ plugin signs in to iMIS through the AgentZ app. There is no manual
credential entry in Claude, Cowork, or Claude Code.

This skill owns the AgentZ desktop link only. Configuring the iMIS Client
Application, security roles, or the API connection belongs to
system-configuration; classifying an iMIS task or choosing the right writer tool
belongs to imis-domain-knowledge.

The AgentZ desktop app is downloaded from the iFINITY licensing download page:

```text
https://ifinityagentz.co.uk/download
```

That page is gated by the organisation auth code or an emailed sign-in link,
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

## If the AgentZ Tools Are Missing

When no `imis_` tool exists at all, the AgentZ server did not start. Its
launcher uses, in order: a Node the person pinned by writing its absolute path
on one line in `~/.ifinity-agentz/pinned-runtime` (Windows:
`%USERPROFILE%\.ifinity-agentz\pinned-runtime`), the runtime the AgentZ app
records when it opens, the app's own install, then a Node on PATH. It never
uses a Node that sits inside the project folder it was started in (or that
links into it), and a version manager's shim (asdf, mise, nodenv, volta, fnm)
is resolved from the plugin's own folder, so the project's own version file
never chooses the Node. The launcher's message says "no Node runtime outside this
workspace". The person installs Node.js or opens or installs AgentZ, then
restarts Claude. Pinning a runtime is optional.

## If Not Connected

A NOT_CONNECTED answer carries `cause`, `message` and `whatToDo`. Tell the person
the `message` and the `whatToDo` steps in your own plain words; do not replace
them with the general setup list below. Causes you will see:

- `agentz_signed_out`: AgentZ is signed out on this computer. Its sign-in may
  have expired, since AgentZ asks for a new sign-in every 30 days. The person
  opens AgentZ and signs in with the emailed link.
- `agentz_not_reachable`: Claude's AgentZ connection cannot reach the AgentZ app.
  AgentZ is closed, showing its sign-in screen, or restarting.
- `agentz_plugin_outdated`: AgentZ was updated after Claude started this AgentZ
  connection, and the updated AgentZ no longer accepts it. It will not recover by
  itself: the person reopens Claude ("Reopening Claude" below), so Claude starts
  the current plugin.
- `agentz_update_needed`: the AgentZ desktop app is older than this plugin and
  does not know its secure handshake, so they cannot connect. The person updates
  the AgentZ app, then reopens Claude ("Reopening Claude" below).
- `agentz_not_proven`: something answered on AgentZ's local port but could not
  prove it is the AgentZ app, so the plugin sent it nothing. The person quits
  and reopens AgentZ, then Claude; if it persists, their administrator checks
  what else is using that port.
- `agentz_token_refused`: iMIS no longer accepts the iMIS token AgentZ gave this
  session. iMIS can end a token before its hour is up, for example after a
  settings change. The plugin has told AgentZ, which gets a new one by itself:
  tell the person, wait a minute, then check again. It is not an iMIS
  permissions problem.
- `agentz_token_refused_app_cannot_renew`: the same, with an AgentZ app too old
  to be asked for a new token; it renews only on its own schedule, up to an hour
  later. The person quits the AgentZ app and opens it again.
- `renewal_waiting`: iMIS refused the token again after AgentZ had already asked
  for new ones several times that day, so AgentZ waits (within the hour) to stay
  inside its daily allowance. Reopening the AgentZ app asks now.
- `staff_signed_out`, `setup_needed`, `network`, `no_answer`, `reconnecting`,
  `instance_switched`, `seat_identity_mismatch`, `token_refused`,
  `waiting_for_token`: AgentZ is running but has no iMIS token, and the message
  says why. `network` and `reconnecting` are expected to clear by themselves;
  for the rest the person acts as `whatToDo` says.

A CONNECTED answer can carry `tokenNotRenewed`: this session still holds the
iMIS access token AgentZ gave it, but AgentZ is not connected to it, so no new
one comes when it ends (an iMIS access token lasts up to an hour). Tell the
person its `why` and `whatToDo` now, before the token runs out.

Any other iMIS tool that runs while not connected fails with error category
`not_connected` and the same explanation. So does a call iMIS answered 401
because it no longer accepts the AgentZ token (the plugin checks the token once
with a light read): the explanation says whether AgentZ is getting a new one or
cannot, and a later call on the refused token sends nothing to iMIS. A 401 to
one request while iMIS still accepts the token is that request's own refusal
(category `auth`), not an expired token. Nothing was sent to iMIS, unless the
error carries `changesSentBeforeError`: then the connection went partway through
the call, and what it was changing must be read back before anything is retried.
Do not retry until `imis_connection_status` reports CONNECTED.

## If The Check Itself Fails

`imis_connection_status` always answers while the AgentZ server inside Claude is
running. If the call itself fails ("Tool execution failed", "Failed to call
tool", or no answer at all), that server is not running, and no AgentZ setting
can fix it from inside this conversation. Tell the person to:

1. Make sure AgentZ is open and signed in.
2. Reopen Claude as described under "Reopening Claude" below.

On Windows this is expected after AgentZ installs an update, because the update
closes the AgentZ server that Claude started.

## Reopening Claude

Claude keeps the AgentZ plugin it started until it is quit. Closing Claude's
window leaves Claude and that plugin running, and opening Claude again then
shows the same Claude with the old plugin. Give the person the steps for their
computer, in these words:

- On a Mac: "Quit Claude completely: choose Claude, then Quit Claude (or press Command-Q). Then open Claude again. Closing its window is not enough."
- On Windows: "Quit Claude completely: right-click the Claude icon next to the clock (it may be behind the ^ arrow) and choose Exit. Then open Claude again. Closing its window is not enough."

To update the AgentZ plugin in the Claude desktop app itself: "In Claude, choose Plugins in the sidebar. Under Your plugins, choose Show all, then Agentz, then Update. If Update is greyed out and shows "On latest version", Claude already has the new version."
On Windows, if Claude says the plugin could not be updated, the person opens
the AgentZ app, goes to Settings > AI apps, chooses Let Claude update AgentZ on
the Claude desktop app card, updates the plugin in Claude again, and reopens
Claude.

## First-Time Setup

Guide the user in these words (the AgentZ app's own names; Windows and macOS
list the app as iFINITY AgentZ):

1. If the AgentZ app is not installed, download it from `https://ifinityagentz.co.uk/download`.
2. Open the AgentZ app on your computer.
3. Sign in to AgentZ with the sign-in link AgentZ emails you.
4. Go to **Settings > iMIS** and sign in to your iMIS site with your iMIS username and password.
5. If nobody in your organisation has used AgentZ with this iMIS site before, ask your Organisation admin to set up the iMIS API connection on the same tab.
6. Keep the AgentZ app open while you work in Claude Code or Cowork.

Once AgentZ connects, it pushes the iMIS instance URL and OAuth token to the plugin over the localhost WebSocket bridge.

## Verify

After the user has AgentZ running, call `imis_connection_status` again. If connected, run a low-risk read such as:

```text
imis_find_member query="test" limit=1
```

Use a small limit and avoid write operations until the connection and target iMIS instance are confirmed.
