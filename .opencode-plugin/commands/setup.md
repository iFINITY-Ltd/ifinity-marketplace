---
description: "Check iMIS connection status and guide the user to the AgentZ app if not connected"
---

# iMIS Connection Setup

The AgentZ plugin signs in to iMIS through the AgentZ app. There is no manual credential entry in Claude.

## Check Connection

Call the `imis_connection_status` tool to check whether the AgentZ app has supplied an iMIS access token.

If connected, you're ready to use all iMIS tools.

## If Not Connected

A NOT_CONNECTED answer carries `message` and `whatToDo`: relay those first. For a first-time setup, guide the user in these words:

1. Open the AgentZ app on your computer. Windows and macOS list it as **iFINITY AgentZ**.
2. Sign in to AgentZ with the sign-in link AgentZ emails you.
3. Go to **Settings > iMIS** and sign in to your iMIS site with your iMIS username and password.
4. If nobody in your organisation has used AgentZ with this iMIS site before, ask your Organisation admin to set up the iMIS API connection on the same tab. It is done once for each iMIS site.

The AgentZ app then connects the AgentZ plugin to iMIS by itself, and every AgentZ tool works without restarting Claude.

## Verify

> "List the first 3 contacts in iMIS"
