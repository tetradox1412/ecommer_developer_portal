import { JAVA_TYPE_MAP, COLUMN_EXTRAS, PRIMITIVES, pascalCase, camelCase, snakeCase, tableName, writeFile, getJavaImports } from './helpers.js';

const PKG = 'com.hospital';

export function generateEntities(schemaAST, symbolTable, outputDir) {
  console.log('\n📦 Backend — JPA Entities');

  // ── AppUser (auth table) ──────────────────────────────────
  const appUser = `package ${PKG}.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_users")
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String role;

    private Long profileId;

    private String name;

    public AppUser() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Long getProfileId() { return profileId; }
    public void setProfileId(Long profileId) { this.profileId = profileId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
`;
  writeFile(outputDir, 'backend/src/main/java/com/hospital/model/AppUser.java', appUser);

  // ── Domain entities ───────────────────────────────────────
  for (const mod of schemaAST.modules) {
    const entity = buildEntity(mod, symbolTable);
    writeFile(outputDir, `backend/src/main/java/com/hospital/model/${mod.id}.java`, entity);
  }
}

function buildEntity(mod, symbolTable) {
  const fields = mod.fields;
  const dateImports = getJavaImports(fields);
  const hasRelations = fields.some(f => !PRIMITIVES.has(f.type));
  const hasValidation = fields.some(f => f.required || f.min !== null || f.max !== null);

  let imports = `package ${PKG}.model;

import jakarta.persistence.*;
import lombok.*;`;

  if (hasValidation) imports += `\nimport jakarta.validation.constraints.*;`;
  if (dateImports.length > 0) imports += '\n' + dateImports.join('\n');
  if (hasRelations) imports += `\nimport com.fasterxml.jackson.annotation.JsonIgnoreProperties;`;

  imports += '\n';

  // Build field declarations
  const fieldLines = fields.map(f => {
    const lines = [];
    const isPrimitive = PRIMITIVES.has(f.type);

    if (!isPrimitive) {
      // Relationship field → @ManyToOne
      lines.push(`    @ManyToOne(fetch = FetchType.LAZY)`);
      lines.push(`    @JoinColumn(name = "${snakeCase(f.name)}_id")`);
      lines.push(`    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})`);
      if (f.required) lines.push(`    @NotNull`);
      lines.push(`    private ${pascalCase(f.type)} ${f.name};`);
    } else {
      // Primitive field
      const javaType = JAVA_TYPE_MAP[f.type];
      const colExtras = COLUMN_EXTRAS[f.type] || '';
      const nullable = f.required ? ', nullable = false' : '';

      if (f.unique) {
        lines.push(`    @Column(unique = true${nullable}${colExtras})`);
      } else if (nullable || colExtras) {
        lines.push(`    @Column(${(nullable + colExtras).replace(/^, /, '')})`);
      }

      if (f.required) lines.push(`    @NotNull`);
      if (f.min !== null) lines.push(`    @Min(${f.min})`);
      if (f.max !== null) lines.push(`    @Max(${f.max})`);

      lines.push(`    private ${javaType} ${f.name};`);
    }

    return lines.join('\n');
  });

  // Generate Getters and Setters
  const accessors = fields.map(f => {
    const javaType = PRIMITIVES.has(f.type) ? JAVA_TYPE_MAP[f.type] : pascalCase(f.type);
    const capitalizedName = f.name.charAt(0).toUpperCase() + f.name.slice(1);
    return `    public ${javaType} get${capitalizedName}() { return ${f.name}; }
    public void set${capitalizedName}(${javaType} ${f.name}) { this.${f.name} = ${f.name}; }`;
  }).join('\n');

  return `${imports.replace('import lombok.*;\n', '')}
@Entity
@Table(name = "${tableName(mod.id)}")
public class ${mod.id} {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

${fieldLines.join('\n\n')}

    public ${mod.id}() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
${accessors}
}
`;
}
