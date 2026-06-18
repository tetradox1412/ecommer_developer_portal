import fs from 'fs';
import path from 'path';

// ── DSL Type → Java Type ──────────────────────────────────────
export const JAVA_TYPE_MAP = {
  String:   'String',
  Text:     'String',
  Integer:  'Integer',
  Number:   'Double',
  Boolean:  'Boolean',
  Date:     'LocalDate',
  DateTime: 'LocalDateTime',
  Email:    'String',
  Phone:    'String',
};

// ── DSL Type → JPA Column annotation extras ───────────────────
export const COLUMN_EXTRAS = {
  Text: ', columnDefinition = "TEXT"',
};

// ── Primitive type set ────────────────────────────────────────
export const PRIMITIVES = new Set(Object.keys(JAVA_TYPE_MAP));

// ── Naming helpers ────────────────────────────────────────────

export function camelCase(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function pascalCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function snakeCase(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

export function pluralize(s) {
  if (s.endsWith('y') && !/[aeiou]y$/i.test(s)) return s.slice(0, -1) + 'ies';
  if (s.endsWith('s') || s.endsWith('x') || s.endsWith('ch') || s.endsWith('sh')) return s + 'es';
  return s + 's';
}

export function tableName(moduleId) {
  return snakeCase(pluralize(moduleId));
}

// ── HTTP verb mapping ─────────────────────────────────────────

export const VERB_TO_HTTP = {
  List:   'GET',
  Get:    'GET',
  Create: 'POST',
  Update: 'PUT',
  Delete: 'DELETE',
};

export const VERB_TO_ANNOTATION = {
  List:   '@GetMapping',
  Get:    '@GetMapping',
  Create: '@PostMapping',
  Update: '@PutMapping',
  Delete: '@DeleteMapping',
};

// ── File writer utility ───────────────────────────────────────

export function writeFile(outputDir, relativePath, content) {
  const fullPath = path.join(outputDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log(`  📄 ${relativePath}`);
}

// ── Java import helpers ───────────────────────────────────────

export function needsDateImport(fields) {
  return fields.some(f => f.type === 'Date' || f.type === 'DateTime');
}

export function getJavaImports(fields) {
  const imports = new Set();
  for (const f of fields) {
    if (f.type === 'Date') imports.add('import java.time.LocalDate;');
    if (f.type === 'DateTime') imports.add('import java.time.LocalDateTime;');
  }
  return Array.from(imports);
}
