import { createRequire } from 'module';
import antlr4 from 'antlr4';
const require = createRequire(import.meta.url);
const HospitalSchemaLexer = require('./HospitalSchemaLexer.cjs');
const HospitalSchemaParser = require('./HospitalSchemaParser.cjs');

const PRIMITIVE_TYPES = new Set([
  'String', 'Text', 'Integer', 'Number', 'Boolean', 'Date', 'DateTime', 'Email', 'Phone'
]);
const NUMERIC_TYPES = new Set(['Integer', 'Number']);
const STRING_LIKE_TYPES = new Set(['String', 'Text', 'Email', 'Phone', 'Date', 'DateTime']);
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function parseStringLiteral(raw) {
  return raw?.slice(1, -1) ?? raw;
}

function parseSchema(input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new HospitalSchemaLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new HospitalSchemaParser(tokens);

  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
      throw new Error(`Syntax error at line ${line}:${column} — ${msg}`);
    }
  });

  const tree = parser.hospital();
  const ast = buildAst(tree);
  const errors = validateSchema(ast);

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return ast;
}

function buildAst(ctx) {
  return visitHospital(ctx);
}

function visitHospital(ctx) {
  const name = ctx.ID().getText();
  return { name, ...visitHospitalBody(ctx.hospitalBody()) };
}

function visitHospitalBody(ctx) {
  const modules = [];
  const foreignModules = [];
  const roles = [];
  let auth = null;

  for (const moduleCtx of ctx.moduleDecl() || []) {
    modules.push(visitModuleDecl(moduleCtx));
  }
  for (const foreignCtx of ctx.foreignModuleDecl() || []) {
    foreignModules.push(visitForeignModuleDecl(foreignCtx));
  }
  for (const roleCtx of ctx.roleDecl() || []) {
    roles.push(visitRoleDecl(roleCtx));
  }
  if (ctx.authDecl()?.length > 0) {
    auth = visitAuthDecl(ctx.authDecl()[0]);
  }

  return { modules, foreignModules, roles, auth };
}

function visitModuleDecl(ctx) {
  const module = {
    id: ctx.ID().getText(),
    label: null,
    icon: null,
    color: null,
    fields: [],
    uniqueConstraints: [],
    apis: []
  };

  for (const item of ctx.moduleBody().moduleItem() || []) {
    if (item.fieldsDecl()) {
      const fieldsDecl = item.fieldsDecl();
      module.fields = (fieldsDecl.fieldDef() || []).map(visitFieldDef);
      module.uniqueConstraints = (fieldsDecl.uniqueConstraint() || []).map(visitUniqueConstraint);
    } else if (item.apisBlock()) {
      module.apis = visitApisBlock(item.apisBlock());
    } else if (item.STRING()) {
      const text = item.getText();
      if (text.startsWith('Label:')) {
        module.label = parseStringLiteral(item.STRING().getText());
      } else if (text.startsWith('Icon:')) {
        module.icon = parseStringLiteral(item.STRING().getText());
      }
    } else if (item.ID()) {
      const text = item.getText();
      if (text.startsWith('Color:')) {
        module.color = item.ID().getText();
      }
    }
  }

  return {
    id: module.id,
    label: module.label ?? module.id,
    icon: module.icon ?? '📋',
    color: module.color ?? 'blue',
    fields: module.fields,
    uniqueConstraints: module.uniqueConstraints,
    apis: module.apis
  };
}

function visitForeignModuleDecl(ctx) {
  const foreignModule = {
    id: ctx.ID().getText(),
    from: null,
    to: null,
    via: [],
    type: null,
    apis: []
  };

  for (const item of ctx.foreignModuleBody().foreignModuleItem() || []) {
    const text = item.getText();
    if (text.startsWith('from:')) {
      foreignModule.from = item.ID().getText();
    } else if (text.startsWith('to:')) {
      foreignModule.to = item.ID().getText();
    } else if (text.startsWith('via:')) {
      foreignModule.via = (item.ID() || []).map(token => token.getText());
    } else if (text.startsWith('type:')) {
      foreignModule.type = item.ID().getText();
    } else if (item.apisBlock()) {
      foreignModule.apis = visitApisBlock(item.apisBlock());
    }
  }

  return foreignModule;
}

function visitFieldDef(ctx) {
  const name = ctx.ID(0).getText();
  const typeDef = ctx.fieldType();
  const type = typeDef.ID().getText();
  const isArray = typeDef.getText().endsWith('[]');
  const foreignTarget = ctx.ID().length > 1 ? ctx.ID(1).getText() : null;
  const constraints = parseFieldConstraints(ctx.fieldConstraint() || []);

  return {
    name,
    type,
    isArray,
    foreign: foreignTarget,
    required: constraints.required,
    unique: constraints.unique,
    label: constraints.label ?? humanizeFieldName(name),
    default: constraints.default,
    min: constraints.min,
    max: constraints.max,
    options: constraints.options,
    rawConstraints: constraints.raw
  };
}

function humanizeFieldName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
}

function parseFieldConstraints(ctxs) {
  const result = {
    required: false,
    unique: false,
    label: null,
    default: null,
    min: null,
    max: null,
    options: [],
    raw: []
  };

  for (const ctx of ctxs) {
    const raw = ctx.getText();
    result.raw.push(raw);
    if (raw === 'required') {
      result.required = true;
    } else if (raw === 'optional') {
      result.required = false;
    } else if (raw === 'unique') {
      result.unique = true;
    } else if (raw.startsWith('label')) {
      result.label = parseStringLiteral(ctx.STRING().getText());
    } else if (raw.startsWith('default')) {
      result.default = parseStringLiteral(ctx.STRING().getText());
    } else if (raw.startsWith('min')) {
      result.min = parseInt(ctx.INT().getText(), 10);
    } else if (raw.startsWith('max')) {
      result.max = parseInt(ctx.INT().getText(), 10);
    } else if (raw.startsWith('options')) {
      result.options = (ctx.STRING() || []).map(token => parseStringLiteral(token.getText()));
    }
  }

  return result;
}

function visitUniqueConstraint(ctx) {
  return (ctx.ID() || []).map(token => token.getText());
}

function visitApisBlock(ctx) {
  return (ctx.apiEndpoint() || []).map(endpointCtx => visitApiEndpoint(endpointCtx));
}

function visitApiEndpoint(ctx) {
  const isStats = ctx.Stats() != null;
  const verb = isStats ? 'Stats' : ctx.apiVerb().getText();
  const path = ctx.PATH().getText();

  const endpoint = {
    verb,
    path,
    name: null,
    roleConfigs: [],
    filters: [],
    sets: [],
    expand: [],
    stats: []
  };

  if (isStats) {
    for (const item of ctx.statsEndpointItem() || []) {
      const text = item.getText();
      if (text.startsWith('name:')) {
        endpoint.name = item.ID().getText();
      } else if (text.startsWith('roles:')) {
        endpoint.roleConfigs.push(...(item.roleConfig() || []).map(parseRoleConfig));
      } else {
        endpoint.stats.push(visitStatsEndpointItem(item));
      }
    }
  } else {
    for (const item of ctx.apiEndpointItem() || []) {
      const text = item.getText();
      if (text.startsWith('name:')) {
        endpoint.name = item.ID().getText();
      } else if (text.startsWith('roles:')) {
        endpoint.roleConfigs.push(...(item.roleConfig() || []).map(parseRoleConfig));
      } else if (text.startsWith('filter')) {
        endpoint.filters.push({ field: item.ID()[0].getText(), expr: visitAuthExpr(item.authExpr()) });
      } else if (text.startsWith('set')) {
        endpoint.sets.push({ field: item.ID()[0].getText(), value: visitSetVal(item.setVal()) });
      } else if (text.startsWith('expand:')) {
        endpoint.expand = (item.ID() || []).map(token => token.getText());
      }
    }
  }

  endpoint.roles = endpoint.roleConfigs.map(rc => rc.role);
  return endpoint;
}

function parseRoleConfig(ctx) {
  const ids = (ctx.ID() || []).map(token => token.getText());
  const role = ids[0];
  const items = (ctx.roleConfigItem() || []).map(parseRoleConfigItem);
  return { role, items };
}

function parseRoleConfigItem(ctx) {
  if (ctx.authExpr()) {
    return {
      type: 'filter',
      field: ctx.ID()[0].getText(),
      expr: visitAuthExpr(ctx.authExpr())
    };
  }

  if (ctx.setVal()) {
    return {
      type: 'set',
      field: ctx.ID()[0].getText(),
      value: visitSetVal(ctx.setVal())
    };
  }

  return {
    type: 'unknown',
    raw: ctx.getText()
  };
}

function visitStatsEndpointItem(ctx) {
  const key = ctx.ID()[0].getText();
  const aggregation = visitStatsAggregation(ctx.statsAggregation());
  return { key, aggregation };
}

function visitStatsAggregation(ctx) {
  const func = ctx.children[0].getText();
  const ids = (ctx.ID() || []).map(token => token.getText());
  const target = ids[0];
  const field = ids.length > 1 ? ids[1] : null;
  const modifier = ctx.statsModifier() ? visitStatsModifier(ctx.statsModifier()) : [];
  return { func, target, field, modifier };
}

function visitStatsModifier(ctx) {
  return (ctx.statsModifierItem() || []).map(parseStatsModifierItem);
}

function parseStatsModifierItem(ctx) {
  const text = ctx.getText();
  if (text.startsWith('groupedby')) {
    return {
      type: 'groupedBy',
      fields: (ctx.ID() || []).map(token => token.getText())
    };
  }

  if (ctx.STRING()) {
    return {
      type: 'filterString',
      field: ctx.ID()[0].getText(),
      value: parseStringLiteral(ctx.STRING().getText())
    };
  }

  if (ctx.INT()) {
    const field = ctx.ID()[0].getText();
    const match = text.match(/^(.*?)((?:>=|<=|==|>|<))(\d+)$/);
    return {
      type: 'filterNumber',
      field,
      op: match ? match[2] : null,
      value: match ? parseInt(match[3], 10) : parseInt(ctx.INT().getText(), 10)
    };
  }

  return { type: 'unknown', raw: text };
}

function visitAuthExpr(ctx) {
  const ids = (ctx.ID() || []).map(token => token.getText());
  return { left: ids[0], right: ids[1] };
}

function visitSetVal(ctx) {
  if (ctx.authExpr()) {
    return { type: 'authExpr', value: visitAuthExpr(ctx.authExpr()) };
  }

  if (ctx.STRING()) {
    return { type: 'string', value: parseStringLiteral(ctx.STRING().getText()) };
  }

  if (ctx.INT()) {
    return { type: 'int', value: parseInt(ctx.INT().getText(), 10) };
  }

  if (ctx.BOOLEAN_LITERAL()) {
    return { type: 'boolean', value: ctx.BOOLEAN_LITERAL().getText() === 'true' };
  }

  if (ctx.getText() === 'null') {
    return { type: 'null', value: null };
  }

  return { type: 'unknown', raw: ctx.getText() };
}

function visitRoleDecl(ctx) {
  const items = ctx.roleBody().roleItem() || [];
  return {
    id: ctx.ID().getText(),
    meBinding: items.length > 0 ? items[0].ID().getText() : null
  };
}

function visitAuthDecl(ctx) {
  const result = { type: 'JWT', expiry: '7d', roles: [] };
  for (const item of ctx.authBody().authItem() || []) {
    const text = item.getText();
    if (text.startsWith('Type:')) {
      result.type = item.ID().getText();
    } else if (text.startsWith('Expiry:')) {
      result.expiry = parseStringLiteral(item.STRING().getText());
    } else if (text.startsWith('Roles:')) {
      result.roles = (item.ID() || []).map(token => token.getText());
    }
  }
  return result;
}

function validateSchema(ast) {
  const errors = [];
  const moduleMap = new Map();
  const roleMap = new Map();

  for (const module of ast.modules) {
    if (moduleMap.has(module.id)) {
      errors.push(`Duplicate Module declaration '${module.id}'.`);
    } else {
      moduleMap.set(module.id, module);
    }
  }

  for (const role of ast.roles) {
    if (roleMap.has(role.id)) {
      errors.push(`Duplicate Role declaration '${role.id}'.`);
    } else {
      roleMap.set(role.id, role);
    }
  }

  if (!ast.auth) {
    errors.push("Error: Missing required 'Auth' configuration block.");
  }

  const authRoles = new Set(ast.auth?.roles || []);

  for (const role of ast.roles) {
    if (!ast.auth) continue;
    if (!authRoles.has(role.id)) {
      errors.push(`Error: Role '${role.id}' has a Role block but is not listed in the Auth Roles registry.`);
    }
  }

  for (const roleName of authRoles) {
    if (!roleMap.has(roleName)) {
      errors.push(`Error: Role '${roleName}' is registered in Auth but is missing its 'Role ${roleName} { ... }' identity block.`);
    }
  }

  const moduleRoleBindings = new Map();
  for (const role of ast.roles) {
    if (!role.meBinding) continue;
    if (!moduleMap.has(role.meBinding)) {
      errors.push(`Error: Role '${role.id}' Me binding references unknown Module '${role.meBinding}'.`);
    } else {
      const existing = moduleRoleBindings.get(role.meBinding);
      if (existing) {
        errors.push(`Error: Module '${role.meBinding}' is bound to multiple roles ('${existing}' and '${role.id}').`);
      } else {
        moduleRoleBindings.set(role.meBinding, role.id);
      }
    }
  }

  for (const module of ast.modules) {
    const fieldNames = new Set();
    for (const field of module.fields) {
      if (fieldNames.has(field.name)) {
        errors.push(`Error: Duplicate field '${field.name}' declared in Module '${module.id}'.`);
      }
      fieldNames.add(field.name);
    }

    for (const unique of module.uniqueConstraints) {
      if (unique.length < 2) {
        errors.push(`Error: Composite unique constraint in Module '${module.id}' must contain at least 2 fields.`);
      }
      const seen = new Set();
      for (const fieldName of unique) {
        if (seen.has(fieldName)) continue;
        seen.add(fieldName);
        if (!fieldNames.has(fieldName)) {
          errors.push(`Error: Composite unique constraint in Module '${module.id}' references non-existent field '${fieldName}'.`);
        }
      }
    }

    for (const field of module.fields) {
      validateField(module, field, moduleMap, errors);
    }
  }

  for (const module of ast.modules) {
    for (const endpoint of module.apis) {
      validateEndpoint(endpoint, module.id, moduleMap, roleMap, authRoles, errors);
    }
  }

  return errors;
}

function validateField(module, field, moduleMap, errors) {
  if (!PRIMITIVE_TYPES.has(field.type) && !moduleMap.has(field.type)) {
    errors.push(`Error: Field '${field.name}' on Module '${module.id}' references unknown type '${field.type}'.`);
    return;
  }

  if (field.isArray && PRIMITIVE_TYPES.has(field.type)) {
    errors.push(`Error: Array types ('[]') are only supported on relationship fields. Field '${field.name}' on Module '${module.id}' cannot be an array of primitive type '${field.type}'.`);
  }

  if (!PRIMITIVE_TYPES.has(field.type) && field.default !== null) {
    errors.push(`Error: Relationship field '${field.name}' on Module '${module.id}' cannot declare a default value.`);
  }

  if (field.min !== null || field.max !== null) {
    if (!NUMERIC_TYPES.has(field.type)) {
      errors.push(`Error: Constraint '<min/max>' on Field '${field.name}' is only allowed for Integer or Number fields.`);
    }
    if (field.min !== null && field.max !== null && field.min > field.max) {
      errors.push(`Error: Constraint 'min' cannot be greater than 'max' on Field '${field.name}' in Module '${module.id}'.`);
    }
  }

  if (field.options.length > 0 && field.type !== 'String') {
    errors.push(`Error: Options constraint on Field '${field.name}' is only allowed for String fields.`);
  }

  if (field.default !== null) {
    validateDefaultValue(module, field, errors);
  }
}

function validateDefaultValue(module, field, errors) {
  const raw = field.default;
  if (field.type === 'Boolean') {
    if (raw !== 'true' && raw !== 'false') {
      errors.push(`Error: Default value for Field '${field.name}' on Module '${module.id}' must be 'true' or 'false'.`);
    }
  } else if (field.type === 'Integer') {
    if (!/^[-+]?[0-9]+$/.test(raw)) {
      errors.push(`Error: Default value for Field '${field.name}' on Module '${module.id}' must be a valid integer.`);
    }
  } else if (field.type === 'Number') {
    if (!/^[-+]?[0-9]*\.?[0-9]+$/.test(raw)) {
      errors.push(`Error: Default value for Field '${field.name}' on Module '${module.id}' must be a valid number.`);
    }
  } else if (field.type === 'Email') {
    if (!EMAIL_REGEX.test(raw)) {
      errors.push(`Error: Default value for Field '${field.name}' on Module '${module.id}' must be a valid email.`);
    }
  }

  if (field.options.length > 0 && !field.options.includes(raw)) {
    errors.push(`Error: Default value for Field '${field.name}' on Module '${module.id}' must be one of the declared options.`);
  }
}

function validateEndpoint(endpoint, moduleId, moduleMap, roleMap, authRoles, errors) {
  const verb = endpoint.verb;
  const path = endpoint.path;
  const resource = `Endpoint '${verb} ${path}'`;
  const roles = new Set(endpoint.roles);

  if (roles.size === 0) {
    errors.push(`Error: ${resource} must declare permitted roles via 'roles:'.`);
  }

  for (const roleName of roles) {
    if (!authRoles.has(roleName)) {
      errors.push(`Error: ${resource} references undeclared role '${roleName}'.`);
    }
  }

  if (['Get', 'Update', 'Delete'].includes(verb)) {
    if (!path.includes('/:id')) {
      errors.push(`Error: ${resource} is a singular record operation and must contain '/:id' in its path.`);
    }
  }

  if (['List', 'Create', 'Stats'].includes(verb)) {
    if (path.includes('/:id')) {
      errors.push(`Error: ${resource} cannot contain an ':id' parameter. Use Get/Update/Delete instead.`);
    }
  }

  if (verb === 'Stats') {
    validateStatsEndpoint(endpoint, moduleMap, errors);
    return;
  }

  const module = moduleMap.get(moduleId);
  const fieldNames = new Set((module?.fields || []).map(field => field.name));

  for (const roleConfig of endpoint.roleConfigs) {
    const roleSymbol = roleMap.get(roleConfig.role);
    if (!roleSymbol) {
      continue;
    }
    const isSystemRole = !roleSymbol.meBinding;
    for (const item of roleConfig.items) {
      if (isSystemRole) {
        errors.push(`Error: System role '${roleConfig.role}' has no identity module ('Me:') and cannot declare inline filters or sets.`);
        continue;
      }
      validateInlineConfig(item, endpoint, module, roleSymbol, fieldNames, errors);
    }
  }

  for (const filter of endpoint.filters) {
    if (endpoint.verb === 'Create') {
      errors.push(`Error: 'filter' constraint is not allowed on 'Create' endpoints. Did you mean 'set'?`);
    }
    validateInlineConfig(filter, endpoint, module, null, fieldNames, errors);
  }

  for (const setItem of endpoint.sets) {
    if (!['Create', 'Update'].includes(endpoint.verb)) {
      errors.push(`Error: 'set' constraint is not allowed on '${endpoint.verb}' endpoints. Did you mean 'filter'?`);
    }
    validateInlineConfig(setItem, endpoint, module, null, fieldNames, errors);
  }

  if (endpoint.expand.length > 0) {
    if (verb !== 'Get') {
      errors.push(`Error: expand block on '${path}' references '${endpoint.expand.join(', ')}' which is only valid on 'Get' endpoints.`);
    }
    for (const item of endpoint.expand) {
      if (!fieldNames.has(item) && !hasReverseRelationship(moduleId, item, moduleMap)) {
        errors.push(`Error: expand block on '${path}' references '${item}' which is not a relationship field.`);
      }
    }
  }
}

function validateInlineConfig(item, endpoint, module, roleSymbol, fieldNames, errors) {
  const path = `${endpoint.verb} ${endpoint.path}`;
  const target = item.field;
  if (!fieldNames.has(target)) {
    errors.push(`Error: Inline config on endpoint '${path}' targets non-existent field '${target}' on Module '${module?.id || module}'.`);
    return;
  }

  const field = module.fields.find(f => f.name === target);
  if (!field) {
    return;
  }

  if (roleSymbol && field.type !== roleSymbol.meBinding) {
    errors.push(`Error: Type mismatch: inline config for Role '${roleSymbol.id}' targets field '${target}' of type '${field.type}' instead of '${roleSymbol.meBinding}'.`);
  }

  if (item.expr && (item.expr.left !== 'auth' || item.expr.right !== 'id')) {
    errors.push(`Error: Inline config on endpoint '${path}' must assign auth.id.`);
  }
}

function validateStatsEndpoint(endpoint, moduleMap, errors) {
  const path = endpoint.path;
  const resource = `Stats endpoint '${path}'`;
  const roleNames = endpoint.roleConfigs.map(rc => rc.role);

  if (roleNames.length === 0) {
    errors.push(`Error: ${resource} must declare permitted roles via 'roles:'.`);
  }

  if (!endpoint.name) {
    errors.push(`Error: Stats endpoint '${path}' must declare a unique 'name:'.`);
  }

  if (path.includes('/:id')) {
    errors.push(`Error: ${resource} cannot contain an ':id' parameter in its path.`);
  }

  const statsKeys = new Set();
  for (const item of endpoint.stats) {
    if (statsKeys.has(item.key)) {
      errors.push(`Error: Duplicate metric key '${item.key}' in Stats endpoint '${path}'.`);
    }
    statsKeys.add(item.key);
    validateStatsAggregation(item.aggregation, moduleMap, path, errors);
  }
}

function validateStatsAggregation(agg, moduleMap, path, errors) {
  if (agg.func === 'count') {
    if (agg.field) {
      errors.push(`Error: Function 'count' on Stats endpoint '${path}' does not accept a field path.`);
    }
    if (!moduleMap.has(agg.target)) {
      errors.push(`Error: Function 'count' on Stats endpoint '${path}' references unknown Module '${agg.target}'.`);
    }
    validateStatsModifiers(agg.modifier, agg.target, moduleMap, path, errors);
    return;
  }

  if (!['sum', 'avg', 'min', 'max'].includes(agg.func)) {
    errors.push(`Error: Unknown Stats function '${agg.func}' on '${path}'.`);
    return;
  }

  if (!agg.field) {
    errors.push(`Error: Function '${agg.func}' on Stats endpoint '${path}' requires a module.field target.`);
    return;
  }

  if (!moduleMap.has(agg.target)) {
    errors.push(`Error: Function '${agg.func}' on Stats endpoint '${path}' references unknown Module '${agg.target}'.`);
    return;
  }

  const targetModule = moduleMap.get(agg.target);
  const targetField = targetModule.fields.find(f => f.name === agg.field);
  if (!targetField) {
    errors.push(`Error: Function '${agg.func}' on Stats endpoint '${path}' references unknown field '${agg.field}' on Module '${agg.target}'.`);
    return;
  }

  if (['sum', 'avg'].includes(agg.func) && !NUMERIC_TYPES.has(targetField.type)) {
    errors.push(`Error: Function '${agg.func}' on '${agg.target}.${agg.field}' requires a numeric field (Integer or Number).`);
  }

  validateStatsModifiers(agg.modifier, agg.target, moduleMap, path, errors);
}

function validateStatsModifiers(modifiers, targetModuleName, moduleMap, path, errors) {
  const module = moduleMap.get(targetModuleName);
  if (!module) return;

  for (const modifier of modifiers) {
    if (modifier.type === 'filterString') {
      const field = module.fields.find(f => f.name === modifier.field);
      if (!field) {
        errors.push(`Error: Cannot filter by unknown field '${modifier.field}' on Module '${targetModuleName}'.`);
        continue;
      }
      if (!STRING_LIKE_TYPES.has(field.type)) {
        errors.push(`Error: Filter modifier on '${modifier.field}' requires a string-compatible field type.`);
      }
      if (field.options.length > 0 && !field.options.includes(modifier.value)) {
        errors.push(`Error: Cannot filter by '${modifier.value}' on field '${modifier.field}'. Value must be one of the declared options.`);
      }
    } else if (modifier.type === 'filterNumber') {
      const field = module.fields.find(f => f.name === modifier.field);
      if (!field) {
        errors.push(`Error: Cannot filter by unknown field '${modifier.field}' on Module '${targetModuleName}'.`);
        continue;
      }
      if (!NUMERIC_TYPES.has(field.type)) {
        errors.push(`Error: Filter comparator on '${modifier.field}' requires an Integer or Number field.`);
      }
    } else if (modifier.type === 'groupedBy') {
      for (const fieldName of modifier.fields) {
        const field = module.fields.find(f => f.name === fieldName);
        if (!field) {
          errors.push(`Error: Cannot group by unknown field '${fieldName}' on Module '${targetModuleName}'.`);
          continue;
        }
        const isRelationship = !PRIMITIVE_TYPES.has(field.type);
        if (field.options.length === 0 && !isRelationship) {
          errors.push(`Error: Cannot group by '${fieldName}'. Grouping is only allowed on relationship fields or option fields.`);
        }
      }
    }
  }
}

function hasReverseRelationship(moduleId, fieldName, moduleMap) {
  for (const module of moduleMap.values()) {
    if (module.id === moduleId) continue;
    for (const field of module.fields) {
      if (field.name === fieldName && field.type === moduleId) {
        return true;
      }
    }
  }
  return false;
}

export { parseSchema };
