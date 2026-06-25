import JSZip from 'jszip';
import type { DslState, ModulePackage } from '../types';

const PACKAGE_VERSION = 1;

// ── Full module package ──────────────────────────────────────────

export async function buildPackageZip(pkg: ModulePackage): Promise<Blob> {
  const zip = new JSZip();
  const moduleFolder = zip.folder('module')!;

  moduleFolder.file('project.schema', pkg.dsl.schema);
  moduleFolder.file('project.views', pkg.dsl.views);
  moduleFolder.file('module-manifest.xml', pkg.manifestXml);
  moduleFolder.file('module-metadata.json', JSON.stringify({
    name: pkg.manifest.name,
    displayName: pkg.metadata.displayName,
    version: pkg.manifest.version,
    description: pkg.manifest.description,
    longDescription: pkg.metadata.longDescription,
    contextPath: pkg.manifest.contextPath,
    category: pkg.metadata.category,
    industry: pkg.metadata.industry,
    iconName: pkg.metadata.iconName,
    tagline: pkg.metadata.tagline,
    color: pkg.metadata.color,
    features: pkg.metadata.features,
    price: pkg.metadata.price,
    changelog: pkg.metadata.changelog,
    releaseNotes: pkg.metadata.releaseNotes,
  }, null, 2));

  moduleFolder.file('package.json', JSON.stringify({
    packageVersion: PACKAGE_VERSION,
    moduleName: pkg.moduleName,
    version: pkg.version,
    createdAt: pkg.createdAt,
    files: {
      schema: 'project.schema',
      views: 'project.views',
      manifest: 'module-manifest.xml',
      metadata: 'module-metadata.json',
    },
  }, null, 2));

  return zip.generateAsync({ type: 'blob' });
}

export async function parsePackageZip(input: Blob | ArrayBuffer): Promise<ModulePackage> {
  const data = input instanceof Blob ? await input.arrayBuffer() : input;
  const zip = await JSZip.loadAsync(data);

  const pkgJsonRaw = await readOptional(zip, 'module/package.json');
  if (!pkgJsonRaw) throw new Error('Invalid package: missing module/package.json');
  const pkgMeta = JSON.parse(pkgJsonRaw);
  if (pkgMeta.packageVersion !== PACKAGE_VERSION) {
    throw new Error(`Unsupported packageVersion ${pkgMeta.packageVersion}. Expected ${PACKAGE_VERSION}.`);
  }

  const schema = await readRequired(zip, 'module/project.schema', 'project.schema');
  const views = await readRequired(zip, 'module/project.views', 'project.views');
  const manifestXml = await readRequired(zip, 'module/module-manifest.xml', 'module-manifest.xml');
  const metadataRaw = await readRequired(zip, 'module/module-metadata.json', 'module-metadata.json');
  const metadataJson = JSON.parse(metadataRaw);

  return {
    packageVersion: PACKAGE_VERSION,
    moduleName: pkgMeta.moduleName ?? metadataJson.name ?? '',
    version: pkgMeta.version ?? metadataJson.version ?? '0.0.0',
    createdAt: pkgMeta.createdAt ?? new Date().toISOString(),
    dsl: { schema, views },
    manifestXml,
    manifest: {
      name: metadataJson.name ?? '',
      version: metadataJson.version ?? '0.1.0',
      description: metadataJson.description ?? '',
      contextPath: metadataJson.contextPath ?? '',
      publicApis: [],
      dependencies: [],
    },
    metadata: {
      displayName: metadataJson.displayName ?? '',
      longDescription: metadataJson.longDescription ?? '',
      category: metadataJson.category ?? '',
      industry: metadataJson.industry ?? '',
      iconName: metadataJson.iconName ?? '',
      tagline: metadataJson.tagline ?? '',
      color: metadataJson.color ?? '',
      features: Array.isArray(metadataJson.features) ? metadataJson.features : [],
      price: typeof metadataJson.price === 'number' ? metadataJson.price : 0,
      changelog: metadataJson.changelog ?? '',
      releaseNotes: metadataJson.releaseNotes ?? '',
    },
  };
}

// ── DSL-only zip ─────────────────────────────────────────────────

export async function buildDslZip(dsl: DslState): Promise<Blob> {
  const zip = new JSZip();
  zip.file('project.schema', dsl.schema);
  zip.file('project.views', dsl.views);
  return zip.generateAsync({ type: 'blob' });
}

export async function parseDslZip(input: Blob | ArrayBuffer): Promise<DslState> {
  const data = input instanceof Blob ? await input.arrayBuffer() : input;
  const zip = await JSZip.loadAsync(data);
  const schema = await readRequired(zip, 'project.schema', 'project.schema');
  const views = await readRequired(zip, 'project.views', 'project.views');
  return { schema, views };
}

// ── helpers ──────────────────────────────────────────────────────

async function readRequired(zip: JSZip, path: string, label: string): Promise<string> {
  const file = zip.file(path);
  if (!file) throw new Error(`Invalid package: missing ${label} at ${path}`);
  return file.async('string');
}

async function readOptional(zip: JSZip, path: string): Promise<string | null> {
  const file = zip.file(path);
  if (!file) return null;
  return file.async('string');
}

// ── File download/upload utilities ───────────────────────────────

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
  return file.text();
}
