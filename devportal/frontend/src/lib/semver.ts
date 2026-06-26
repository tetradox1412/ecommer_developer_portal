import type { VersionBump } from '../types';

const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

export interface ParsedSemver {
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
}

export function validateSemver(v: string): boolean {
  return SEMVER_RE.test(v.trim());
}

export function parseSemver(v: string): ParsedSemver | null {
  const m = v.trim().match(SEMVER_RE);
  if (!m) return null;
  return {
    major: parseInt(m[1], 10),
    minor: parseInt(m[2], 10),
    patch: parseInt(m[3], 10),
    prerelease: m[4] ?? null,
  };
}

export function bumpVersion(current: string, bump: VersionBump): string | null {
  if (bump === 'custom') return current;
  const p = parseSemver(current);
  if (!p) return null;
  switch (bump) {
    case 'patch': return `${p.major}.${p.minor}.${p.patch + 1}`;
    case 'minor': return `${p.major}.${p.minor + 1}.0`;
    case 'major': return `${p.major + 1}.0.0`;
    default: return null;
  }
}

export function compareSemver(a: string, b: string): number {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return 0;
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  if (pa.patch !== pb.patch) return pa.patch - pb.patch;
  // Prerelease: a version WITHOUT prerelease is GREATER than one WITH.
  if (pa.prerelease && !pb.prerelease) return -1;
  if (!pa.prerelease && pb.prerelease) return 1;
  if (pa.prerelease && pb.prerelease) return pa.prerelease.localeCompare(pb.prerelease);
  return 0;
}
