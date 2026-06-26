import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { buildPackageZip, parsePackageZip, buildDslZip, parseDslZip } from './package-io';
import type { ModulePackage } from '../types';

const samplePkg: ModulePackage = {
  packageVersion: 1,
  moduleName: 'acme-cardiology',
  version: '1.2.4',
  createdAt: '2026-06-25T00:00:00.000Z',
  dsl: { schema: 'Hospital X { }', views: 'import "x";' },
  manifestXml: '<ModuleManifest></ModuleManifest>',
  manifest: {
    name: 'acme-cardiology', version: '1.2.4', description: 'd', contextPath: '/api/acme/cardiology',
    publicApis: [], dependencies: [],
  },
  metadata: {
    displayName: 'Acme', longDescription: 'long', category: 'Clinical', industry: 'healthcare',
    iconName: 'Heartbeat', tagline: 'tag', color: 'rose', features: ['A', 'B'], price: 0,
    changelog: 'cl', releaseNotes: 'rn',
  },
};

describe('package-io', () => {
  it('round-trips a full package losslessly', async () => {
    const blob = await buildPackageZip(samplePkg);
    const parsed = await parsePackageZip(blob);
    expect(parsed).toEqual(samplePkg);
  });

  it('rejects a zip missing required module files', async () => {
    const zip = new JSZip();
    zip.file('module/package.json', JSON.stringify({ packageVersion: 1 }));
    const blob = await zip.generateAsync({ type: 'blob' });
    await expect(parsePackageZip(blob)).rejects.toThrow(/Invalid package: missing/);
  });

  it('rejects an unknown packageVersion', async () => {
    const zip = new JSZip();
    zip.file('module/package.json', JSON.stringify({ packageVersion: 99 }));
    const blob = await zip.generateAsync({ type: 'blob' });
    await expect(parsePackageZip(blob)).rejects.toThrow(/packageVersion/);
  });

  it('round-trips DSL files', async () => {
    const blob = await buildDslZip({ schema: 'A', views: 'B' });
    const parsed = await parseDslZip(blob);
    expect(parsed).toEqual({ schema: 'A', views: 'B' });
  });
});
