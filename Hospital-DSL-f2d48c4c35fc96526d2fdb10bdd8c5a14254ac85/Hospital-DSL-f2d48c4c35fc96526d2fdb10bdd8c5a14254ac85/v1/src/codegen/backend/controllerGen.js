import { camelCase, pascalCase, VERB_TO_ANNOTATION, writeFile, PRIMITIVES } from './helpers.js';

const PKG = 'com.hospital';

export function generateControllers(schemaAST, symbolTable, outputDir) {
  console.log('\n📦 Backend — Controllers');

  for (const mod of schemaAST.modules) {
    const ctrl = buildController(mod, symbolTable);
    writeFile(outputDir, `backend/src/main/java/com/hospital/controller/${mod.id}Controller.java`, ctrl);
  }
}

function buildController(mod, symbolTable) {
  const entity = mod.id;
  const svc = `${camelCase(entity)}Service`;
  const basePath = `/api/${camelCase(entity)}`;

  const methods = [];
  for (const api of mod.apis) {
    methods.push(buildControllerMethod(api, mod, symbolTable));
  }

  return `package ${PKG}.controller;

import ${PKG}.model.${entity};
import ${PKG}.service.${entity}Service;
import ${PKG}.security.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("${basePath}")
public class ${entity}Controller {

    @Autowired
    private ${entity}Service ${svc};

${methods.join('\n\n')}
}
`;
}

function buildControllerMethod(api, mod, symbolTable) {
  const entity = mod.id;
  const svc = `${camelCase(entity)}Service`;
  let name = api.name;
  if (name === 'new') name = 'createRecord';

  if (api.verb === 'Stats') {
    return buildStatsControllerMethod(api, mod);
  }

  // Build role string for @PreAuthorize
  const roleCheck = buildRoleCheck(api.roles);

  // Detect filter/set
  const hasFilter = Object.values(api.inlineConfigs || {}).some(c => c.filter);
  const hasRoleFilter = Object.entries(api.inlineConfigs || {}).some(([k, c]) => k !== '*' && c.filter);
  const filterConfig = hasRoleFilter
    ? Object.entries(api.inlineConfigs).find(([k, c]) => k !== '*' && c.filter)
    : null;
  const filterField = filterConfig ? filterConfig[1].filter.field : null;
  const filterRole = filterConfig ? filterConfig[0] : null;

  const hasSet = Object.values(api.inlineConfigs || {}).some(c => c.set);

  // Determine annotation
  const annotation = VERB_TO_ANNOTATION[api.verb];
  const pathValue = api.path === '/' ? '' : api.path.replace(/:(\w+)/g, '{$1}');

  switch (api.verb) {
    case 'List': {
      if (hasRoleFilter) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<List<${entity}>> ${name}(@AuthenticationPrincipal AuthenticatedUser user) {
        if ("${filterRole}".equals(user.getRole())) {
            return ResponseEntity.ok(${svc}.${name}(user.getProfileId(), user.getRole()));
        }
        return ResponseEntity.ok(${svc}.${name}All());
    }`;
      }
      return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<List<${entity}>> ${name}() {
        return ResponseEntity.ok(${svc}.${name}());
    }`;
    }

    case 'Get': {
      const isMe = api.path === '/me';
      if (isMe) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@AuthenticationPrincipal AuthenticatedUser user) {
        return ${svc}.${name}(user.getProfileId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
      }
      if (hasRoleFilter) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser user) {
        return ${svc}.${name}(id, user.getProfileId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
      }
      return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@PathVariable Long id) {
        return ${svc}.${name}(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
    }

    case 'Create': {
      if (hasSet) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@RequestBody ${entity} entity, @AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(${svc}.${name}(entity, user.getProfileId()));
    }`;
      }
      return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@RequestBody ${entity} entity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(${svc}.${name}(entity));
    }`;
    }

    case 'Update': {
      const isMe = api.path === '/me';
      if (isMe) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@RequestBody ${entity} updates, @AuthenticationPrincipal AuthenticatedUser user) {
        return ${svc}.${name}(user.getProfileId(), updates, user.getProfileId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
      }
      if (hasRoleFilter) {
        return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@PathVariable Long id, @RequestBody ${entity} updates, @AuthenticationPrincipal AuthenticatedUser user) {
        return ${svc}.${name}(id, updates, user.getProfileId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
      }
      return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<${entity}> ${name}(@PathVariable Long id, @RequestBody ${entity} updates) {
        return ${svc}.${name}(id, updates)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }`;
    }

    case 'Delete': {
      return `    ${roleCheck}
    ${annotation}("${pathValue}")
    public ResponseEntity<Void> ${name}(@PathVariable Long id) {
        ${svc}.${name}(id);
        return ResponseEntity.noContent().build();
    }`;
    }

    default:
      return `    // Unsupported verb: ${api.verb}`;
  }
}

function buildStatsControllerMethod(api, mod) {
  const svc = `${camelCase(mod.id)}Service`;
  const roleCheck = buildRoleCheck(api.roles);
  const pathValue = api.path;

  return `    ${roleCheck}
    @GetMapping("${pathValue}")
    public ResponseEntity<Map<String, Object>> ${api.name}() {
        return ResponseEntity.ok(${svc}.${api.name}());
    }`;
}

function buildRoleCheck(roles) {
  if (!roles || roles.length === 0) return '@PreAuthorize("isAuthenticated()")';
  const expr = roles.map(r => `hasRole('${r}')`).join(' or ');
  return `@PreAuthorize("${expr}")`;
}
