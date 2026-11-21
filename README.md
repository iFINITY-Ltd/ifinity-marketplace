# iFINITY AgentZ: the AgentZ plugin

iFINITY AgentZ helps associations use iMIS with more confidence by turning membership, events, finance, fundraising, reporting, digital content, and operational work into guided, evidence-backed actions that staff can understand, review, and control.

The AgentZ plugin connects Claude to your iMIS site on iMIS EMS. It works in Claude Code, the Claude desktop app and Claude Cowork.

## What It Does

AgentZ lets your team ask for common association work in plain words, across:

- **Membership** — look up members, check renewal status, onboard, renew, reinstate, cancel, and review full member context across billing, groups, events, communications, and engagement
- **Events** — check registrations, attendee lists, capacity, waitlists, cancellations, and event revenue
- **Fundraising** — record donations, manage pledges, review donor history, and process Gift Aid
- **Billing and Finance** — review invoices, payments, balances, auto-pay, scheduled payments, and VAT
- **Reporting** — run existing queries, design new reports, and build dashboards
- **Content and Website** — create pages, manage navigation, configure iParts, and audit published content
- **Certification** — manage programmes, enrolments, progress, and experience logging
- **Communications** — review history, send approved emails, and track campaigns
- **Data Quality** — find duplicates, review merge candidates, and import data

AgentZ works as the signed-in user. Actions run with that user's iMIS permissions. The product is not a back door around access controls.

## Getting Started

### Prerequisites

- **Claude Code**, **Claude Desktop**, or **Claude Cowork**
- The **AgentZ app** on your computer (Windows and macOS list it as **iFINITY AgentZ**)
- An **iMIS site** on iMIS EMS, with a staff username and password

### Install in Cowork or Claude Desktop (recommended)

1. In Claude, click **Plugins** in the sidebar, then **Add** → **Add marketplace** → **Add from a repository**
2. In **URL**, enter `iFINITY-Ltd/ifinity-marketplace` and click **Sync**
3. In **Plugins**, search for `agentz`, choose **Agentz**, then click **Add**
4. To keep it up to date, go back to **Plugins**, then **Add** → **Manage marketplaces**, open the **…** menu on **ifinity-marketplace** and turn on **Sync automatically**

For step-by-step screenshots, see the [marketplace install guide](https://github.com/iFINITY-Ltd/ifinity-marketplace#install-in-cowork-or-claude-desktop).

### Install from the AgentZ app (Claude Code)

1. Download the AgentZ app from your organisation's iFINITY download page.
2. Open the AgentZ app and sign in.
3. Go to **Settings > AI apps**.
4. On the **Claude Code (command line)** card, click **Install Plugin**.

The AgentZ app adds the iFINITY marketplace, installs the AgentZ plugin and keeps it up to date.

### Install via Claude Code CLI

```bash
claude plugin marketplace add iFINITY-Ltd/ifinity-marketplace
claude plugin install agentz@ifinity
```

### Connect to iMIS

1. Open the AgentZ app and go to **Settings > iMIS**.
2. Sign in to your iMIS site with your iMIS username and password.
3. If this is the first time anyone in your organisation has used AgentZ with this iMIS site, your Organisation admin sets up the iMIS API connection on the same tab.

The AgentZ plugin connects to iMIS through the AgentZ app as soon as both are done. You do not configure anything in Claude.

Verify the connection by asking:

> "Check iMIS connection status"

## Usage

Use natural language. AgentZ auto-invokes the right skills and tools.

### Day-to-Day Examples

> "Show me the full story for this member."
>
> "Who's registered for the Annual Conference?"
>
> "Which members are due to renew in the next 30 days?"
>
> "Record a donation of £500 for Jane Smith."
>
> "Why can't this member access member-only content?"
>
> "Check Gift Aid status for donor 12345."

### Reporting and Dashboards

> "Build an active member report grouped by chapter."
>
> "Show event attendees with unpaid balances."
>
> "Prepare a board-pack view of membership, income, and engagement."

### Website and Content

> "Create a new events landing page."
>
> "Design a member dashboard showing upcoming renewals."
>
> "Audit the public site navigation structure."

## Working in Cowork

The AgentZ plugin works in Cowork. The AgentZ app runs on your computer and the AgentZ plugin connects to it there, so open the AgentZ app before you start working in Cowork.

If Cowork cannot reach your iMIS site, add your iMIS site's address to the allowed sites at [claude.ai/settings/capabilities](https://claude.ai/settings/capabilities).

## Safety and Governance

AgentZ is careful about the difference between "we found evidence", "we created a working item", "this is live", and "this still needs approval." That distinction matters because member data, financial records, website content, email sends, and navigation can all have real operational consequences.

- Actions run with the signed-in user's iMIS permissions
- AgentZ shows you a preview and asks you to approve a change before it deletes anything
- Creating a query needs its own approval
- AgentZ shows what it found before it changes anything
- The **Activity** page in the AgentZ app shows every step each agent takes

## Support

For help with the plugin, contact iFINITY support through your organisation's support channel or visit the [iFINITY community](https://github.com/iFINITY-Ltd).
