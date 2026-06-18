import { PRIMITIVES, camelCase, writeFile } from './helpers.js';

const PKG = 'com.hospital';

export function generateRepositories(schemaAST, symbolTable, outputDir) {
  console.log('\n📦 Backend — Repositories');

  // AppUser repo
  const appUserRepo = `package ${PKG}.repository;

import ${PKG}.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    boolean existsByEmail(String email);
}
`;
  writeFile(outputDir, 'backend/src/main/java/com/hospital/repository/AppUserRepository.java', appUserRepo);

  for (const mod of schemaAST.modules) {
    const repo = buildRepo(mod, symbolTable);
    writeFile(outputDir, `backend/src/main/java/com/hospital/repository/${mod.id}Repository.java`, repo);
  }
}

function buildRepo(mod, symbolTable) {
  const imports = new Set();
  imports.add(`import ${PKG}.model.${mod.id};`);
  imports.add(`import org.springframework.data.jpa.repository.JpaRepository;`);

  const methods = [];

  // Scan all APIs for filter fields → generate findBy methods
  const filterFields = new Set();
  for (const api of mod.apis) {
    if (api.verb === 'Stats') continue;
    // Inline configs per role
    for (const [roleName, config] of Object.entries(api.inlineConfigs || {})) {
      if (config.filter) filterFields.add(config.filter.field);
    }
  }

  for (const fieldName of filterFields) {
    const field = mod.fields.find(f => f.name === fieldName);
    if (!field) continue;

    const isPrimitive = PRIMITIVES.has(field.type);
    const paramType = isPrimitive ? 'Long' : 'Long'; // filter by ID in all cases
    const methodName = `findBy${fieldName === 'id' ? 'Id' : field.name.charAt(0).toUpperCase() + field.name.slice(1) + 'Id'}`;

    // Avoid duplicate findById (already in JpaRepository)
    if (fieldName === 'id') continue;

    imports.add(`import java.util.List;`);
    methods.push(`    List<${mod.id}> ${methodName}(Long ${camelCase(field.name)}Id);`);
  }

  // Stats: check if any stats endpoint exists, add @Query methods
  for (const api of mod.apis) {
    if (api.verb !== 'Stats') continue;
    imports.add(`import org.springframework.data.jpa.repository.Query;`);

    for (const stat of api.stats || []) {
      const target = stat.moduleTarget;
      const func = stat.func;
      let jpql = '';
      let returnType = 'Long';

      if (func === 'count') {
        jpql = `SELECT COUNT(e) FROM ${target} e`;
      } else if (['sum', 'avg'].includes(func)) {
        jpql = `SELECT ${func.toUpperCase()}(e.${stat.fieldTarget}) FROM ${target} e`;
        returnType = 'Double';
      } else if (['min', 'max'].includes(func)) {
        jpql = `SELECT ${func.toUpperCase()}(e.${stat.fieldTarget}) FROM ${target} e`;
        returnType = 'Object';
      }

      // Apply filter modifier
      if (stat.modifiers && stat.modifiers.filter) {
        const f = stat.modifiers.filter;
        const val = typeof f.val === 'string' ? `'${f.val}'` : f.val;
        jpql += ` WHERE e.${f.field} = ${val}`;
      }

      methods.push(`    @Query("${jpql}")\n    ${returnType} stat_${stat.key}();`);
    }
  }

  return `package ${PKG}.repository;

${Array.from(imports).join('\n')}

public interface ${mod.id}Repository extends JpaRepository<${mod.id}, Long> {
${methods.join('\n\n')}
}
`;
}
