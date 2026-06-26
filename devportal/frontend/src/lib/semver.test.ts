import { describe, it, expect } from 'vitest';
import { parseSemver, bumpVersion, compareSemver, validateSemver } from './semver';

describe('semver', () => {
  it('parses a release version', () => {
    expect(parseSemver('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3, prerelease: null });
  });

  it('parses a prerelease version', () => {
    expect(parseSemver('0.1.0-beta.1')).toEqual({
      major: 0, minor: 1, patch: 0, prerelease: 'beta.1',
    });
  });

  it('returns null for an invalid version', () => {
    expect(parseSemver('not-a-version')).toBeNull();
  });

  it('bumps patch', () => {
    expect(bumpVersion('1.2.3', 'patch')).toBe('1.2.4');
  });

  it('bumps minor and resets patch', () => {
    expect(bumpVersion('1.2.3', 'minor')).toBe('1.3.0');
  });

  it('bumps major and resets minor and patch', () => {
    expect(bumpVersion('1.2.3', 'major')).toBe('2.0.0');
  });

  it('bumps from a prerelease patch', () => {
    expect(bumpVersion('1.2.3-beta.1', 'patch')).toBe('1.2.4');
  });

  it('returns null when bumping an invalid version', () => {
    expect(bumpVersion('bad', 'patch')).toBeNull();
  });

  it('compares versions: greater, equal, less', () => {
    expect(compareSemver('1.2.3', '1.2.2')).toBeGreaterThan(0);
    expect(compareSemver('1.2.3', '1.2.3')).toBe(0);
    expect(compareSemver('1.2.2', '1.2.3')).toBeLessThan(0);
    expect(compareSemver('2.0.0', '1.99.99')).toBeGreaterThan(0);
  });

  it('validates semver strings', () => {
    expect(validateSemver('1.0.0')).toBe(true);
    expect(validateSemver('1.0.0-beta+x')).toBe(true);
    expect(validateSemver('1.0')).toBe(false);
    expect(validateSemver('')).toBe(false);
  });
});
