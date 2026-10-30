// GENERATED from scripts/opencode-plugin-entry.js by scripts/generate-opencode-adapter.ts. Do not edit.
/**
 * The OpenCode plugin entry for iFINITY AgentZ (OpenCode 2 plugin API).
 *
 * scripts/generate-opencode-adapter.ts copies this file to
 * .opencode-plugin/server.js; the marketplace's `opencode` branch exports it as
 * the package's `./server` entry, so `opencode plugin add
 * github:iFINITY-Ltd/ifinity-marketplace#opencode` installs AgentZ as one
 * plugin that OpenCode lists, checks for updates and updates.
 *
 * OpenCode loads this module inside its own process, so it must stay small:
 * it never imports the AgentZ server. It reads the generated
 * .opencode-plugin/registrations.json and registers, from this copy:
 * - the MCP servers (AgentZ starts from this copy: through its launcher with
 *   /bin/sh on macOS and Linux, and on Windows with the runtime its .cmd
 *   launcher would pick; see windowsRuntime);
 * - the skills, read from skills/<name>/SKILL.md;
 * - the agents and commands, from the generated OpenCode markdown;
 * - the always-on instructions, added to each session's system prompt.
 *
 * Plain JavaScript with no dependencies: a Git install runs no build.
 */

import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** The markdown after its frontmatter block, as OpenCode's own loaders read it. */
export function markdownBody(text) {
  return text.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, "").replace(/^(?:[ \t]*\r?\n)+/, "");
}

/** A command template with what the person typed after the command, as OpenCode expands $ARGUMENTS. */
export function expandCommand(template, input) {
  const typed = typeof input === "string" ? input : "";
  if (template.includes("$ARGUMENTS")) return template.replaceAll("$ARGUMENTS", () => typed).trim();
  return (typed.trim() ? `${template}\n\n${typed}` : template).trim();
}

/**
 * The runtime servers/agentz-mcp.cmd would pick on Windows, in its order: an
 * explicit AGENTZ_NODE, the runtime the iFINITY AgentZ app records in
 * %USERPROFILE%\.ifinity-agentz\node-runtime, the app's usual install, then
 * a Node on PATH. The .cmd itself is not used: cmd.exe drops the quotes from
 * a path that holds both a space and "@" (every OpenCode install path holds
 * "@ifinity"), so C:\Users\Jim Smith\... would break. Electron runtimes need
 * ELECTRON_RUN_AS_NODE=1, as the .cmd sets.
 */
export function windowsRuntime(env = process.env, exists = existsSync, read = (file) => readFileSync(file, "utf8")) {
  if (env.AGENTZ_NODE && exists(env.AGENTZ_NODE)) return { file: env.AGENTZ_NODE, electron: true };
  const home = env.USERPROFILE || os.homedir();
  try {
    const recorded = read(path.win32.join(home, ".ifinity-agentz", "node-runtime")).split(/\r?\n/)[0].trim().replaceAll("/", "\\");
    if (recorded && exists(recorded)) return { file: recorded, electron: true };
  } catch {
    // No runtime recorded: try the app's usual install.
  }
  if (env.LOCALAPPDATA) {
    const app = path.win32.join(env.LOCALAPPDATA, "Programs", "@ifinitycompanion", "iFINITY AgentZ.exe");
    if (exists(app)) return { file: app, electron: true };
  }
  return { file: "node", electron: false };
}

/**
 * How OpenCode starts a local MCP server from this copy: through its launcher
 * with /bin/sh on macOS and Linux (no executable bit needed), and on Windows
 * by running the launcher's script with the runtime the launcher would pick.
 */
export function launcherCommand(root, server, platform = process.platform, env = process.env, probe = {}) {
  const args = server.args ?? [];
  if (platform === "win32") {
    const runtime = windowsRuntime(env, probe.exists, probe.read);
    return {
      command: [runtime.file, path.win32.join(root, ...server.windowsScript.split("/")), ...args],
      environment: runtime.electron ? { ELECTRON_RUN_AS_NODE: "1" } : {},
    };
  }
  return { command: ["/bin/sh", path.posix.join(root, ...server.launcher.split("/")), ...args], environment: {} };
}

/** OpenCode 2 MCP settings (schema/mcp.ts) that belong to the person, not to where this copy runs. */
const KEPT_SERVER_SETTINGS = {
  local: ["disabled", "codemode", "timeout", "protocol"],
  remote: ["disabled", "codemode", "timeout", "protocol", "headers", "oauth"],
};

/** Everything this copy registers, read from its files. */
export function loadRegistrations(root, read = (file) => readFileSync(file, "utf8")) {
  const file = (relative) => path.join(root, ...relative.split("/"));
  const data = JSON.parse(read(file(".opencode-plugin/registrations.json")));
  return {
    id: data.id,
    mcp: data.mcp,
    skills: data.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      path: file(skill.file),
      content: markdownBody(read(file(skill.file))),
    })),
    agents: data.agents.map((agent) => ({ ...agent, system: markdownBody(read(file(agent.file))).trim() })),
    commands: data.commands.map((command) => ({ ...command, template: markdownBody(read(file(command.file))).trim() })),
    instructions: read(file(data.instructions)).trim(),
  };
}

/** Registers a copy's servers, skills, agents, commands and instructions with OpenCode. */
export async function register(ctx, root, options = {}) {
  const registrations = loadRegistrations(root, options.read);
  await ctx.mcp.transform((editor) => {
    for (const [name, server] of Object.entries(registrations.mcp)) {
      const previous = editor.get(name);
      // The person's own settings on an existing entry of this name are kept:
      // whether it is turned off, its timeouts and protocol, and for a remote
      // server its headers and OAuth; this copy decides where it runs.
      const kept = {};
      for (const key of previous?.type === server.type ? KEPT_SERVER_SETTINGS[server.type] : ["disabled"]) {
        if (previous?.[key] !== undefined) kept[key] = previous[key];
      }
      if (server.type !== "local") {
        editor.set(name, { ...kept, type: "remote", url: server.url });
        continue;
      }
      // An AGENTZ_NODE (or any other variable) the person set on the entry also decides the Windows runtime.
      const env = { ...(options.env ?? process.env), ...previous?.environment };
      const launch = launcherCommand(root, server, options.platform, env, options.probe);
      editor.set(name, { ...kept, type: "local", command: launch.command, environment: { ...previous?.environment, ...server.environment, ...launch.environment } });
    }
  });
  await ctx.skill.transform((editor) => {
    for (const skill of registrations.skills) editor.add(skill);
  });
  await ctx.agent.transform((editor) => {
    for (const agent of registrations.agents) {
      editor.update(agent.id, (current) => {
        current.description = agent.description;
        current.mode = agent.mode;
        current.system = agent.system;
        current.permissions.push(...agent.permissions);
      });
    }
  });
  await ctx.command.transform((editor) => {
    for (const command of registrations.commands) {
      editor.add({
        name: command.name,
        description: command.description,
        execute: (input) =>
          ctx.session.prompt({
            ...input.prompt,
            sessionID: input.sessionID,
            text: expandCommand(command.template, input.prompt?.text),
            delivery: input.delivery,
          }),
      });
    }
  });
  await ctx.session.hook("context", (event) => {
    event.system.push({ type: "text", text: registrations.instructions });
  });
  return registrations;
}

/** This copy's root: the entry sits in <root>/.opencode-plugin/. */
export function copyRoot(moduleUrl = import.meta.url) {
  return path.dirname(path.dirname(fileURLToPath(moduleUrl)));
}

export default {
  id: "agentz",
  setup: async (ctx) => {
    await register(ctx, copyRoot());
  },
};
