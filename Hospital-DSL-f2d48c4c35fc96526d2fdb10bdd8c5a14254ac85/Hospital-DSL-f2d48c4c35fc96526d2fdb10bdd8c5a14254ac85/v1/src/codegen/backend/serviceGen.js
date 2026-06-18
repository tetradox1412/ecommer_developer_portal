import { PRIMITIVES, camelCase, pascalCase, writeFile } from './helpers.js';

const PKG = 'com.hospital';

export function generateServices(schemaAST, symbolTable, outputDir) {
  console.log('\n📦 Backend — Services');

  for (const mod of schemaAST.modules) {
    const svc = buildService(mod, symbolTable);
    writeFile(outputDir, `backend/src/main/java/com/hospital/service/${mod.id}Service.java`, svc);
  }
}

function buildService(mod, symbolTable) {
  const repo = `${camelCase(mod.id)}Repository`;
  const entity = mod.id;
  const methods = [];

  for (const api of mod.apis) {
    if (api.verb === 'Stats') {
      methods.push(buildStatsMethod(api, mod));
      continue;
    }
    methods.push(buildEndpointMethod(api, mod, symbolTable));
  }

  return `package ${PKG}.service;

import ${PKG}.model.*;
import ${PKG}.repository.${entity}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import static ${PKG}.util.BeanHelper.getNullPropertyNames;

@Service
public class ${entity}Service {

    @Autowired
    private ${entity}Repository ${repo};

${methods.join('\n\n')}
}
`;
}

function buildEndpointMethod(api, mod, symbolTable) {
  const entity = mod.id;
  const repo = `${camelCase(mod.id)}Repository`;
  let name = api.name;
  if (name === 'new') name = 'createRecord';

  // Determine if this endpoint has role-based filtering
  const hasFilter = Object.values(api.inlineConfigs || {}).some(c => c.filter);
  const hasSet = Object.values(api.inlineConfigs || {}).some(c => c.set);
  const globalSet = api.inlineConfigs?.['*']?.set;

  switch (api.verb) {
    case 'List': {
      if (hasFilter) {
        // Find the filter field (take first role's filter)
        const filterConfig = Object.values(api.inlineConfigs).find(c => c.filter);
        const filterField = filterConfig.filter.field;
        const finderMethod = filterField === 'id'
          ? 'findById'
          : `findBy${pascalCase(filterField)}Id`;

        return `    // ${api.verb} ${api.path} — name: ${name}
    public List<${entity}> ${name}(Long userId, String role) {
        return ${repo}.${finderMethod}(userId);
    }

    public List<${entity}> ${name}All() {
        return ${repo}.findAll();
    }`;
      }
      return `    // ${api.verb} ${api.path} — name: ${name}
    public List<${entity}> ${name}() {
        return ${repo}.findAll();
    }`;
    }

    case 'Get': {
      if (api.path === '/me' || hasFilter) {
        return `    // ${api.verb} ${api.path} — name: ${name}
    public Optional<${entity}> ${name}(Long id, Long userId) {
        Optional<${entity}> item = ${repo}.findById(id);
        // Ownership check is applied at controller level
        return item;
    }

    public Optional<${entity}> ${name}(Long id) {
        return ${repo}.findById(id);
    }`;
      }
      return `    // ${api.verb} ${api.path} — name: ${name}
    public Optional<${entity}> ${name}(Long id) {
        return ${repo}.findById(id);
    }`;
    }

    case 'Create': {
      if (hasSet) {
        const setConfig = Object.values(api.inlineConfigs).find(c => c.set);
        const setField = setConfig.set.field;
        const fieldDef = mod.fields.find(f => f.name === setField);
        const fieldType = fieldDef ? pascalCase(fieldDef.type) : pascalCase(setField);
        return `    // ${api.verb} ${api.path} — name: ${name}
    public ${entity} ${name}(${entity} entity, Long userId) {
        // Auto-set: ${setField} = authenticated user's profile
        ${fieldType} ref = new ${fieldType}();
        ref.setId(userId);
        entity.set${pascalCase(setField)}(ref);
        return ${repo}.save(entity);
    }`;
      }
      return `    // ${api.verb} ${api.path} — name: ${name}
    public ${entity} ${name}(${entity} entity) {
        return ${repo}.save(entity);
    }`;
    }

    case 'Update': {
      const forcedSets = [];
      if (globalSet) {
        forcedSets.push({ field: globalSet.field, val: globalSet.val.replace(/"/g, '') });
      }

      const forceLines = forcedSets.map(s =>
        `        existing.set${pascalCase(s.field)}("${s.val}");`
      ).join('\n');

      if (hasFilter || api.path === '/me') {
        return `    // ${api.verb} ${api.path} — name: ${name}
    public Optional<${entity}> ${name}(Long id, ${entity} updates, Long userId) {
        return ${repo}.findById(id).map(existing -> {
            // Merge non-null fields from updates
            org.springframework.beans.BeanUtils.copyProperties(updates, existing, getNullPropertyNames(updates));
            existing.setId(id);
${forceLines ? forceLines + '\n' : ''}            return ${repo}.save(existing);
        });
    }`;
      }

      return `    // ${api.verb} ${api.path} — name: ${name}
    public Optional<${entity}> ${name}(Long id, ${entity} updates) {
        return ${repo}.findById(id).map(existing -> {
            org.springframework.beans.BeanUtils.copyProperties(updates, existing, getNullPropertyNames(updates));
            existing.setId(id);
${forceLines ? forceLines + '\n' : ''}            return ${repo}.save(existing);
        });
    }`;
    }

    case 'Delete': {
      return `    // ${api.verb} ${api.path} — name: ${name}
    public void ${name}(Long id) {
        ${repo}.deleteById(id);
    }`;
    }

    default:
      return `    // Unknown verb: ${api.verb}`;
  }
}

function buildStatsMethod(api, mod) {
  const repo = `${camelCase(mod.id)}Repository`;
  const lines = [];

  lines.push(`    // Stats ${api.path} — name: ${api.name}`);
  lines.push(`    public Map<String, Object> ${api.name}() {`);
  lines.push(`        Map<String, Object> stats = new LinkedHashMap<>();`);

  for (const stat of api.stats || []) {
    lines.push(`        stats.put("${stat.key}", ${repo}.stat_${stat.key}());`);
  }

  lines.push(`        return stats;`);
  lines.push(`    }`);

  return lines.join('\n');
}
