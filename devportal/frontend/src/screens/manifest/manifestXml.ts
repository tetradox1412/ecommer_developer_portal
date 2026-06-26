import type { ManifestState, ModuleMetadata, ManifestApi } from '../../types';

export type { ManifestApi };

export function escapeXml(s: string): string {
  return (s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Wrap arbitrary text in a CDATA section that is safe even if the content
 * contains the literal `]]>` sequence: that sequence is split across two
 * adjacent CDATA sections so it can never prematurely terminate the block.
 */
function cdata(text: string): string {
  const safe = text.replace(/]]>/g, ']]]]><![CDATA[>');
  return `<![CDATA[${safe}]]>`;
}

/**
 * Build the XML manifest string from the enhanced manifest + metadata.
 * Shared by workspaceStore.exportPackage and ManifestFormCore so the
 * package, the live preview, and the submission payload always agree.
 */
export function buildManifestXmlString(m: ManifestState, meta: ModuleMetadata): string {
  const apisXml = m.publicApis
    .filter((a) => a.path.trim())
    .map((a) => {
      const req = a.requestSchema
        ? `\n            <requestSchema>${cdata(JSON.stringify(a.requestSchema))}</requestSchema>` : '';
      const res = a.responseSchema
        ? `\n            <responseSchema>${cdata(JSON.stringify(a.responseSchema))}</responseSchema>` : '';
      const ex = a.exampleResponse
        ? `\n            <exampleResponse>${cdata(JSON.stringify(a.exampleResponse))}</exampleResponse>` : '';
      return `        <api>
            <path>${a.path.trim()}</path>
            <method>${a.method}</method>
            <description>${escapeXml(a.description || 'Exposed API')}</description>
            <requiredRole>${escapeXml(a.requiredRole || 'ANY')}</requiredRole>${req}${res}${ex}
        </api>`;
    })
    .join('\n');

  const depsXml = m.dependencies
    .filter((d) => d.name.trim())
    .map((d) => `        <dependency>
            <name>${d.name.trim()}</name>
            <versionRange>${d.versionRange.trim() || 'latest'}</versionRange>
            <accessedApis>
                <!-- accessed APIs go here -->
            </accessedApis>
        </dependency>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<ModuleManifest>
    <!-- 1. General Metadata -->
    <name>${escapeXml(m.name)}</name>
    <version>${escapeXml(m.version)}</version>
    <displayName>${escapeXml(meta.displayName)}</displayName>
    <description>${escapeXml(m.description)}</description>
    <longDescription>${escapeXml(meta.longDescription)}</longDescription>
    <contextPath>${escapeXml(m.contextPath)}</contextPath>
    <category>${escapeXml(meta.category)}</category>
    <industry>${escapeXml(meta.industry)}</industry>
    <iconName>${escapeXml(meta.iconName)}</iconName>
    <tagline>${escapeXml(meta.tagline)}</tagline>
    <color>${escapeXml(meta.color)}</color>
    <features>${escapeXml(meta.features.join(', '))}</features>
    <price>${meta.price ?? 0}</price>

    <!-- 2. Exposed Public APIs -->
    <publicApis>
${apisXml || '        <!-- No public APIs defined -->'}
    </publicApis>

    <!-- 3. Declared External Dependencies -->
    <dependencies>
${depsXml || '        <!-- No dependencies defined -->'}
    </dependencies>

    <!-- 4. Version Notes -->
    <changelog>${escapeXml(meta.changelog)}</changelog>
    <releaseNotes>${escapeXml(meta.releaseNotes)}</releaseNotes>
</ModuleManifest>`;
}
