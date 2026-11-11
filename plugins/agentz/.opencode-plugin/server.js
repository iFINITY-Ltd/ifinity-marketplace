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

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalPath, isInside } from "./path-containment.js";

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
 * The runtime servers/agentz-mcp.cmd would pick on Windows, under the same
 * runtime-trust policy (src/config/runtime-trust.ts): the optional pin, the
 * AgentZ app's recorded runtime, the app's install, then node on PATH (PATH
 * and PATHEXT walked here, never a bare name), each counted by its canonical
 * target (realpath) and only when that is not inside the working directory or
 * its enclosing project root; USERPROFILE and the folders above it never
 * count. Nothing runs before a candidate passes; then, as the launchers do,
 * the candidate is asked for its real executable (process.execPath) from this
 * copy's folder, never the workspace, so a version manager's shim that
 * chooses by files in the working directory never reads the workspace's, and
 * that real path must pass too. It, never the shim, is what OpenCode starts.
 * The .cmd itself is not used: cmd.exe drops the quotes from a path that
 * holds both a space and "@" (every OpenCode install path holds "@ifinity"),
 * so C:\Users\Jim Smith\... would break. ELECTRON_RUN_AS_NODE=1 is set, as
 * the .cmd sets it (a plain Node ignores it). With nothing usable it names an
 * absolute path that does not exist, so the start fails plainly.
 */
export function windowsRuntime(root, env = process.env, probe = {}) {
  const chosen = selectWindowsRuntime(env, probe, root);
  if (chosen) return { file: chosen, electron: true };
  const home = env.USERPROFILE || os.homedir();
  return { file: path.win32.join(home, ".ifinity-agentz", "no-node-runtime-outside-this-workspace", "node.exe"), electron: false };
}

/**
 * The executable a runtime candidate really is, or stands in for: its
 * process.execPath, asked with the working directory `cwd` (this copy's
 * folder), stdin closed and the person's environment. A batch shim runs
 * through cmd.exe, by absolute path.
 */
export function askRealExecutable(file, cwd, env = process.env) {
  const script = "process.stdout.write(process.execPath)";
  const options = { cwd, env: { ...env, ELECTRON_RUN_AS_NODE: "1" }, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8", timeout: 15_000, windowsHide: true };
  if (/\.(?:cmd|bat)$/i.test(file)) {
    const systemRoot = env.SystemRoot || process.env.SystemRoot || "C:\\Windows";
    return execFileSync(path.win32.join(systemRoot, "System32", "cmd.exe"), ["/d", "/s", "/c", `""${file}" -e "${script}""`], { ...options, windowsVerbatimArguments: true }).trim();
  }
  return execFileSync(file, ["-e", script], options).trim();
}

/** The canonical path of the real runtime to use on Windows, or undefined. Runs only a candidate that passed, from `root`. */
export function selectWindowsRuntime(env = process.env, probe = {}, root = copyRoot()) {
  const win = path.win32;
  const absolute = (file) => typeof file === "string" && /^(?:[A-Za-z]:\\|\\\\)/.test(file);
  const realpath = probe.realpath ?? ((file) => realpathSync.native(file));
  const realExecutable = probe.realExecutable ?? ((file, cwd) => askRealExecutable(file, cwd, env));
  const isFile = probe.isFile ?? ((file) => { try { return statSync(file).isFile(); } catch { return false; } });
  const exists = probe.exists ?? existsSync;
  const read = probe.read ?? ((file) => readFileSync(file, "utf8"));
  // Both sides canonical first, one comparison (path-containment.js, shared with runtime-trust.ts).
  const canonical = (file) => canonicalPath(win.resolve(file), { platform: "win32", realpath });
  const inside = (child, parent) => isInside(child, parent, "win32");
  const home = env.USERPROFILE && absolute(env.USERPROFILE) ? canonical(env.USERPROFILE) : undefined;
  const homeOrAbove = (dir) => Boolean(home) && inside(home, dir);
  // The untrusted zone: the working directory and its enclosing project root.
  const zone = [];
  const cwd = canonical(probe.cwd ?? process.cwd());
  if (!homeOrAbove(cwd)) {
    zone.push(cwd);
    for (let dir = cwd; !homeOrAbove(dir); dir = win.dirname(dir)) {
      if (exists(win.join(dir, ".git")) || exists(win.join(dir, "package.json"))) {
        if (dir !== cwd) zone.push(dir);
        break;
      }
      if (win.dirname(dir) === dir) break;
    }
  }
  const trusted = (candidate) => {
    const file = String(candidate ?? "").trim().replace(/^"(.*)"$/, "$1").replaceAll("/", "\\");
    if (!absolute(file)) return undefined;
    let target;
    try {
      realpath(file);
      target = canonical(file);
    } catch {
      return undefined;
    }
    if (!isFile(target) || zone.some((dir) => inside(target, dir))) return undefined;
    return target;
  };
  const firstLine = (file) => { try { return read(file).split(/\r?\n/)[0]; } catch { return undefined; } };
  const candidates = [];
  if (absolute(env.USERPROFILE)) {
    candidates.push(() => firstLine(win.join(env.USERPROFILE, ".ifinity-agentz", "pinned-runtime")));
    candidates.push(() => firstLine(win.join(env.USERPROFILE, ".ifinity-agentz", "node-runtime")));
  }
  if (absolute(env.LOCALAPPDATA)) candidates.push(() => win.join(env.LOCALAPPDATA, "Programs", "@ifinitycompanion", "iFINITY AgentZ.exe"));
  const extensions = (env.PATHEXT || ".COM;.EXE;.BAT;.CMD").split(";").filter(Boolean);
  for (const entry of (env.PATH ?? env.Path ?? "").split(";")) {
    const dir = entry.trim().replace(/^"(.*)"$/, "$1");
    if (!absolute(dir)) continue;
    for (const extension of extensions) candidates.push(() => win.join(dir, `node${extension}`));
  }
  for (const candidate of candidates) {
    const chosen = trusted(candidate());
    if (!chosen) continue;
    // A shim stands in for something else: what it would run is what has to pass, and what runs.
    let real;
    try {
      real = trusted(realExecutable(chosen, root));
    } catch {
      real = undefined;
    }
    if (real) return real;
  }
  return undefined;
}

/**
 * How OpenCode starts a local MCP server from this copy: through its launcher
 * with /bin/sh on macOS and Linux (no executable bit needed), and on Windows
 * by running the launcher's script with the runtime the launcher would pick.
 */
export function launcherCommand(root, server, platform = process.platform, env = process.env, probe = {}) {
  const args = server.args ?? [];
  if (platform === "win32") {
    const runtime = windowsRuntime(root, env, probe);
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
      // Variables the person set on the entry are their own environment: kept, and the Windows selector runs with them.
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
