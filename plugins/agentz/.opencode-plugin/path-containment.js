// GENERATED from scripts/path-containment.js by scripts/generate-opencode-adapter.ts. Do not edit.
/**
 * The one JavaScript path-containment check of the runtime-trust policy
 * (src/config/runtime-trust.ts, which bundles it, and the OpenCode entry,
 * whose generated copy sits beside .opencode-plugin/server.js). Plain
 * JavaScript, no dependencies.
 *
 * Containment is only ever decided between paths in the same canonical form:
 * both sides go through canonicalPath first (every symlink, junction and
 * Windows 8.3 short name resolved by the file system's own realpath), and the
 * comparison ignores case where the file system does (Windows, macOS).
 * "Inside" means equal, or the parent followed by the path separator: never a
 * bare string prefix (/work/repo2 is not inside /work/repo) and never a bare
 * ".." prefix test (a child folder named "..payload" is inside).
 */

/**
 * The canonical form of `target`: the file system's realpath (links,
 * junctions and 8.3 short names resolved), else the absolute path as given.
 */
export function canonicalPath(target, { platform = process.platform, realpath }) {
  const sep = platform === "win32" ? "\\" : "/";
  let resolved;
  try {
    resolved = realpath(target);
  } catch {
    resolved = target;
  }
  // No trailing separator, except at a root ("/" or "C:\").
  if (resolved.length > 1 && resolved.endsWith(sep) && !/^[A-Za-z]:\\$/.test(resolved)) resolved = resolved.slice(0, -1);
  return resolved;
}

/** Case is ignored where the file system ignores it. */
export function foldsCase(platform) {
  return platform === "win32" || platform === "darwin";
}

/** `child` is `parent` or inside it. Both must already be canonical (canonicalPath). */
export function isInside(child, parent, platform = process.platform) {
  const sep = platform === "win32" ? "\\" : "/";
  const fold = foldsCase(platform) ? (value) => value.toLowerCase() : (value) => value;
  const c = fold(child);
  let p = fold(parent);
  if (c === p) return true;
  if (!p.endsWith(sep)) p += sep;
  return c.startsWith(p);
}
