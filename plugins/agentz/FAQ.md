# FAQ: the AgentZ plugin

## General

### What is iFINITY AgentZ?

iFINITY's product for doing work in iMIS through an AI app. The AgentZ plugin connects Claude to your iMIS site, so staff can ask questions, look up members, run reports, manage events, record donations, create content and carry out everyday tasks in plain words.

### What iMIS versions does it support?

iMIS EMS, the cloud version of iMIS. The AgentZ plugin uses the iMIS API, which iMIS 20 and later provide. iMIS EMS On Premise with the iMIS API turned on may also work, but iFINITY does not test it.

### Does it work with Claude Code, the Claude desktop app and Cowork?

Yes. The AgentZ plugin runs in Claude Code (in a terminal or an editor), the Claude desktop app and Claude Cowork.

## Setup and Connection

### How do I set it up?

Install the AgentZ app, sign in to your iMIS site on its **Settings > iMIS** tab, then add the AgentZ plugin to your AI app from **Settings > AI apps**. The AgentZ app signs the AgentZ plugin in to iMIS and keeps it up to date.

### Can I install the AgentZ plugin without the AgentZ app?

Yes, from a terminal with Claude Code:

```bash
claude plugin marketplace add iFINITY-Ltd/ifinity-marketplace
claude plugin install agentz@ifinity
```

The AgentZ app must still be open, because it is what signs the AgentZ plugin in to iMIS.

### How does the AgentZ plugin sign in to iMIS?

Only through the AgentZ app. You never type an iMIS username, password or key into Claude, and there are no files to edit. The AgentZ app signs in to iMIS as you and gives the AgentZ plugin a short-lived iMIS access token.

### Are my credentials sent to Claude or Anthropic?

No. You enter your iMIS sign-in in the AgentZ app, not in Claude. The AgentZ plugin only receives an iMIS access token, never your username or password.

### How do I connect in Cowork?

Open the AgentZ app on your computer before you start working in Cowork. If Cowork cannot reach your iMIS site, add your iMIS site's address to the allowed sites at [claude.ai/settings/capabilities](https://claude.ai/settings/capabilities).

### Can I work with more than one iMIS site?

Yes. Add each iMIS site in the AgentZ app's **Settings** and switch between them there. The AgentZ plugin then connects to the iMIS site you switched to.

## Capabilities

### What can it do?

The AgentZ plugin covers membership, events, fundraising, billing, content management, reporting, certification, communications, forms, advertising, AgentZ Design, data quality and system configuration. It can find, read, create and update records of most kinds in iMIS.

### Can it create IQA queries?

Yes. The AgentZ plugin can design, check and create new IQA queries from a plain description of what you want. It supports columns, filters, sorts, totals, grouping, calculated columns, relations between sources, and template output.

### Can it modify website content?

Yes. It can create content pages, manage folders in the iMIS Document System, configure layouts and iParts, set up navigation and check published pages. It shows each website change clearly, publishes only when you ask it to, and checks whether publishing worked.

### Can it send emails?

Yes, when you approve it. The AgentZ plugin can send emails through iMIS, but only after you approve each one. It never sends one by itself.

## Safety

### Can it delete data?

Yes, but AgentZ shows you a preview and asks you to approve every deletion first. It works with your own iMIS permissions: if you cannot delete something in iMIS, AgentZ cannot either.

### What safeguards are in place?

- Every step runs with your own iMIS permissions
- Every deletion needs your approval
- Creating an IQA query needs its own approval
- AgentZ checks where a new item goes and what kind it is before it saves it
- AgentZ shows what it found before it changes anything
- The **Activity** page in the AgentZ app shows every step each agent takes

### Is my data safe?

The AgentZ plugin talks to your iMIS site directly, over an encrypted connection. It does not store your iMIS data. It keeps the iMIS access token in memory only, and only while Claude is open.

## Connectors

### What does the AgentZ plugin connect to?

| Connector | Description |
|-----------|-------------|
| **iMIS** | Your iMIS site, which AgentZ reads and changes as you, through the iMIS API |
| **iMIS Help** | Search across ASI's iMIS help articles |
| **iMIS Developer Docs** | ASI's iMIS API reference and developer guides |

The two documentation connectors only read ASI's public pages and need no sign-in.

## Troubleshooting

### The AgentZ plugin says it is not connected

Open the AgentZ app and make sure it is signed in. Then ask Claude to "check the AgentZ connection": the answer says what is wrong and the one thing to do.

### I get permission errors

AgentZ works with your own iMIS permissions. If you cannot see or change something in iMIS, AgentZ gets the same refusal from iMIS.

### Queries or reports return no data

Check that the query source exists and that you can open it in iMIS. iMIS security groups restrict some IQA sources.
