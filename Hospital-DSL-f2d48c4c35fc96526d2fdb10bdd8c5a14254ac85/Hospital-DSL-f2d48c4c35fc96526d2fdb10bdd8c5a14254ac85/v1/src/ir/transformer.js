import antlr4 from 'antlr4';
import HospitalSchemaLexer from '../grammar/HospitalSchemaLexer.js';
import HospitalSchemaParser from '../grammar/HospitalSchemaParser.js';
import HospitalSchemaVisitor from '../grammar/HospitalSchemaVisitor.js';

import HospitalViewsLexer from '../grammar/HospitalViewsLexer.js';
import HospitalViewsParser from '../grammar/HospitalViewsParser.js';
import HospitalViewsVisitor from '../grammar/HospitalViewsVisitor.js';

// ── Schema Transformer ─────────────────────────────────────────────

class SchemaTransformer extends HospitalSchemaVisitor {
  visitHospital(ctx) {
    const name = ctx.ID().getText();
    const body = this.visitHospitalBody(ctx.hospitalBody());
    return { name, ...body };
  }

  visitHospitalBody(ctx) {
    const result = { modules: [], foreignModules: [], roles: {}, auth: null };

    for (const m of ctx.moduleDecl() || []) {
      result.modules.push(this.visitModuleDecl(m));
    }

    for (const fm of ctx.foreignModuleDecl() || []) {
      result.foreignModules.push(this.visitForeignModuleDecl(fm));
    }

    for (const r of ctx.roleDecl() || []) {
      const role = this.visitRoleDecl(r);
      result.roles[role.name] = role;
    }

    if (ctx.authDecl()) {
      result.auth = this.visitAuthDecl(ctx.authDecl());
    }

    return result;
  }

  visitModuleDecl(ctx) {
    const id = ctx.ID().getText();
    const body = ctx.moduleBody();

    let label = id;
    let icon = '📋';
    let color = 'blue';
    let fields = [];
    let apis = [];

    for (const item of body.moduleItem() || []) {
      const text = item.getText();
      if (text.startsWith('Label:')) {
        label = item.STRING().getText().replace(/"/g, '');
      } else if (text.startsWith('Icon:')) {
        icon = item.STRING().getText().replace(/"/g, '');
      } else if (text.startsWith('Color:')) {
        color = item.ID(1).getText();
      } else if (item.fieldsDecl()) {
        fields = item.fieldsDecl().fieldDef().map(f => this.visitFieldDef(f));
        const uniques = item.fieldsDecl().uniqueConstraint() || [];
        fields.push(...uniques.map(u => ({ type: 'uniqueConstraint', fields: u.ID().map(i => i.getText()) })));
      } else if (item.apisBlock()) {
        apis = this.visitApisBlock(item.apisBlock());
      }
    }

    // Separate normal fields from unique constraints for cleaner IR
    const actualFields = fields.filter(f => f.type !== 'uniqueConstraint');
    const uniqueConstraints = fields.filter(f => f.type === 'uniqueConstraint').map(u => u.fields);

    return { id, label, icon, color, fields: actualFields, uniqueConstraints, apis };
  }

  visitForeignModuleDecl(ctx) {
    const id = ctx.ID().getText();
    const body = ctx.foreignModuleBody();
    
    let from = null;
    let to = null;
    let via = [];
    let type = null;
    let apis = [];

    for (const item of body.foreignModuleItem() || []) {
      const text = item.getText();
      if (text.startsWith('from:')) from = item.ID()[0].getText();
      else if (text.startsWith('to:')) to = item.ID()[0].getText();
      else if (text.startsWith('via:')) via = item.ID().map(i => i.getText());
      else if (text.startsWith('type:')) type = item.ID()[0].getText();
      else if (item.apisBlock()) apis = this.visitApisBlock(item.apisBlock());
    }
    
    return { id, from, to, via, type, apis };
  }

  visitFieldDef(ctx) {
    const name = ctx.ID(0).getText();
    const typeNode = ctx.fieldType();
    const type = typeNode.ID().getText();
    const isArray = typeNode.getText().endsWith('[]');
    
    let foreign = null;
    if (ctx.getText().includes('foreign')) {
       // foreign is the 3rd ID if present: ID ':' fieldType 'foreign' ID fieldConstraint*
       // To be safe, let's just parse the text or use ctx.ID()
       // By grammar: fieldDef : ID ':' fieldType ('foreign' ID)? fieldConstraint* ';'
       // ID(0) is name, type is in fieldType, ID(1) is foreign target if it exists
       if (ctx.ID().length > 1) {
          foreign = ctx.ID(1).getText();
       }
    }

    const constraints = ctx.fieldConstraint() || [];

    const field = {
      name,
      type,
      isArray,
      foreign,
      required: false,
      unique: false,
      label: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
      default: null,
      min: null,
      max: null,
      options: [],
    };

    for (const c of constraints) {
      const text = c.getText();
      if (text === 'required') field.required = true;
      else if (text === 'optional') field.required = false;
      else if (text === 'unique') field.unique = true;
      else if (text.startsWith('label')) field.label = c.STRING()[0].getText().replace(/"/g, '');
      else if (text.startsWith('default')) field.default = c.STRING()[0].getText().replace(/"/g, '');
      else if (text.startsWith('min')) field.min = parseInt(c.INT(0).getText());
      else if (text.startsWith('max')) field.max = parseInt(c.INT(0).getText());
      else if (text.startsWith('options')) field.options = c.STRING().map(s => s.getText().replace(/"/g, ''));
    }

    return field;
  }

  visitApisBlock(ctx) {
    const endpoints = [];
    for (const ep of ctx.apiEndpoint() || []) {
      if (ep.apiVerb()) {
        const verb = ep.apiVerb().getText();
        const path = ep.PATH().getText();
        
        let name = null;
        let roles = [];
        let inlineConfigs = {}; // roleName -> { filter, set }
        let expand = [];

        for (const item of ep.apiEndpointItem() || []) {
          const text = item.getText();
          if (text.startsWith('name:')) {
            name = item.ID(1).getText();
          } else if (text.startsWith('roles:')) {
            const roleConfigs = item.roleConfig() || [];
            for (const rc of roleConfigs) {
              if (rc.getChildCount() === 1) {
                 roles.push(rc.ID().getText());
              } else {
                 // '{' ID (',' roleConfigItem)* '}'
                 const roleName = rc.getChild(1).getText(); // The ID after '{'
                 roles.push(roleName);
                 const conf = { filter: null, set: null };
                 console.log("Parsing roleConfig for", roleName, "items:", (rc.roleConfigItem() || []).length);
                 for (const rci of rc.roleConfigItem() || []) {
                    console.log("  rci text:", rci.getText());
                    if (rci.getText().startsWith('filter')) {
                       conf.filter = { field: rci.ID(1).getText(), expr: rci.authExpr().getText() };
                    } else if (rci.getText().startsWith('set')) {
                       const val = rci.setVal() ? rci.setVal().getText() : rci.authExpr().getText();
                       conf.set = { field: rci.ID(1).getText(), val: val };
                    }
                 }
                 inlineConfigs[roleName] = conf;
              }
            }
          } else if (text.startsWith('filter')) {
             // global filter
             inlineConfigs['*'] = { filter: { field: item.ID(1).getText(), expr: item.authExpr().getText() } };
          } else if (text.startsWith('set')) {
             inlineConfigs['*'] = { ...(inlineConfigs['*']||{}), set: { field: item.ID(1).getText(), val: item.setVal().getText() } };
          } else if (text.startsWith('expand:')) {
             expand = item.ID().slice(1).map(i => i.getText());
          }
        }
        endpoints.push({ type: 'Standard', verb, path, name, roles, inlineConfigs, expand });
      } else if (ep.getText().startsWith('Stats')) {
        const path = ep.PATH().getText();
        let name = null;
        let roles = [];
        let inlineConfigs = {};
        const stats = [];

        for (const item of ep.statsEndpointItem() || []) {
          const text = item.getText();
          if (text.startsWith('name:')) {
            name = item.ID(1).getText();
          } else if (text.startsWith('roles:')) {
            const roleConfigs = item.roleConfig() || [];
            for (const rc of roleConfigs) {
              if (rc.getChildCount() === 1) {
                 roles.push(rc.ID().getText());
              } else {
                 const roleName = rc.getChild(1).getText();
                 roles.push(roleName);
                 const conf = { filter: null };
                 for (const rci of rc.roleConfigItem() || []) {
                    if (rci.getText().startsWith('filter')) {
                       conf.filter = { field: rci.ID().getText(), expr: rci.authExpr().getText() };
                    }
                 }
                 inlineConfigs[roleName] = conf;
              }
            }
          } else if (item.statsAggregation()) {
             // key : count Module(modifier)
             const key = item.ID(0).getText();
             const aggCtx = item.statsAggregation();
             // ('count' | 'sum' | 'avg' | 'min' | 'max') ID ('.' ID)? statsModifier?
             const func = aggCtx.getChild(0).getText();
             const moduleTarget = aggCtx.ID(0).getText();
             let fieldTarget = null;
             if (aggCtx.getChildCount() > 2 && aggCtx.getChild(2).getText() === '.') {
                 fieldTarget = aggCtx.ID(1).getText();
             }
             
             let modifiers = {};
             if (aggCtx.statsModifier()) {
                 for (const modItem of aggCtx.statsModifier().statsModifierItem() || []) {
                    if (modItem.getText().startsWith('groupedby')) {
                       // grouped by ID (. ID)*
                       // This is a bit complex in text, let's extract the field manually
                       const parts = modItem.getText().substring(9).split('.');
                       modifiers.groupedBy = parts;
                    } else if (modItem.STRING()) {
                       modifiers.filter = { field: modItem.ID(0).getText(), op: '==', val: modItem.STRING().getText().replace(/"/g, '') };
                    } else {
                       // ID op INT
                       const op = modItem.getChild(1).getText();
                       modifiers.filter = { field: modItem.ID(0).getText(), op, val: parseInt(modItem.INT().getText()) };
                    }
                 }
             }

             stats.push({ key, func, moduleTarget, fieldTarget, modifiers });
          }
        }
        endpoints.push({ type: 'Stats', verb: 'Stats', path, name, roles, inlineConfigs, stats });
      }
    }
    return endpoints;
  }

  visitRoleDecl(ctx) {
    const name = ctx.ID().getText();
    let meBinding = null;
    for (const item of ctx.roleBody().roleItem() || []) {
       if (item.getText().startsWith('Me:')) {
          meBinding = item.ID(1).getText();
       }
    }
    return { name, meBinding };
  }

  visitAuthDecl(ctx) {
    let type = 'JWT';
    let expiry = '7d';
    let roles = [];

    for (const item of ctx.authBody().authItem() || []) {
      const text = item.getText();
      if (text.startsWith('Type:')) type = item.ID(1).getText();
      else if (text.startsWith('Expiry:')) expiry = item.STRING().getText().replace(/"/g, '');
      else if (text.startsWith('Roles:')) roles = item.ID().slice(1).map(i => i.getText());
    }

    return { type, expiry, roles };
  }
}

// ── Views Transformer ─────────────────────────────────────────────

class ViewsTransformer extends HospitalViewsVisitor {
  visitViewsFile(ctx) {
    const imports = ctx.importDecl() ? ctx.importDecl().STRING().getText().replace(/"/g, '') : null;
    const loginGroups = ctx.loginGroupsDecl() ? this.visitLoginGroupsDecl(ctx.loginGroupsDecl()) : [];
    const portals = [];
    for (const p of ctx.portalDecl() || []) {
       portals.push(this.visitPortalDecl(p));
    }
    return { imports, loginGroups, portals };
  }

  visitLoginGroupsDecl(ctx) {
    const groups = [];
    for (const g of ctx.groupDecl() || []) {
       const name = g.STRING().getText().replace(/"/g, '');
       let roles = [];
       let selfRegister = false;
       let registerFields = [];
       for (const item of g.groupItem() || []) {
          if (item.getText().startsWith('roles:')) roles = item.idList().ID().map(i => i.getText());
          else if (item.getText().startsWith('selfRegister:')) selfRegister = item.BOOLEAN_LITERAL().getText() === 'true';
          else if (item.getText().startsWith('registerFields:')) registerFields = item.idList().ID().map(i => i.getText());
       }
       groups.push({ name, roles, selfRegister, registerFields });
    }
    return groups;
  }

  visitPortalDecl(ctx) {
    const name = ctx.ID().getText();
    let roles = [];
    const pages = [];

    for (const item of ctx.portalItem() || []) {
       if (item.getText().startsWith('for:')) {
          roles = item.idList().ID().map(i => i.getText());
       } else if (item.pageDecl()) {
          pages.push(this.visitPageDecl(item.pageDecl()));
       }
    }
    return { name, roles, pages };
  }

  visitPageDecl(ctx) {
    const name = ctx.ID().getText();
    let route = null;
    let title = name;
    const containers = [];

    for (const item of ctx.pageItem() || []) {
       if (item.getText().startsWith('Route:')) route = item.STRING().getText().replace(/"/g, '');
       else if (item.getText().startsWith('Title:')) title = item.STRING().getText().replace(/"/g, '');
       else if (item.containerDecl()) {
          containers.push(this.visitContainerDecl(item.containerDecl()));
       }
    }
    return { name, route, title, containers };
  }

  visitContainerDecl(ctx) {
     if (ctx.tableDecl()) return this.visitTableDecl(ctx.tableDecl());
     if (ctx.formDecl()) return this.visitFormDecl(ctx.formDecl());
     if (ctx.detailDecl()) return this.visitDetailDecl(ctx.detailDecl());
     if (ctx.metricGridDecl()) return this.visitMetricGridDecl(ctx.metricGridDecl());
     if (ctx.kanbanDecl()) return this.visitKanbanDecl(ctx.kanbanDecl());
     if (ctx.calendarDecl()) return this.visitCalendarDecl(ctx.calendarDecl());
     return null;
  }

  visitTableDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'Table', name, from: null, columns: [], view: null, edit: null, actions: [] };
     for (const item of ctx.tableItem() || []) {
        if (item.getText().startsWith('from:')) container.from = item.authExpr().getText();
        else if (item.getText().startsWith('columns:')) container.columns = item.idList().ID().map(i => i.getText());
        else if (item.viewBlock()) container.view = this.visitViewBlock(item.viewBlock());
        else if (item.editBlock()) container.edit = this.visitEditBlock(item.editBlock());
        else if (item.actionsDecl()) container.actions = this.visitActionsDecl(item.actionsDecl());
     }
     return container;
  }

  visitFormDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'Form', name, from: null, submit: null, fields: [], onSuccess: null, fieldConfigs: {} };
     for (const item of ctx.formItem() || []) {
        if (item.getText().startsWith('from:')) container.from = item.authExpr().getText();
        else if (item.getText().startsWith('submit:')) container.submit = item.authExpr().getText();
        else if (item.getText().startsWith('fields:')) container.fields = item.idList().ID().map(i => i.getText());
        else if (item.getText().startsWith('onSuccess:')) container.onSuccess = item.successAction().getText();
        else if (item.getText().startsWith('Field')) {
           container.fieldConfigs[item.ID(0).getText()] = { from: item.authExpr().getText() };
        }
     }
     return container;
  }

  visitDetailDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'Detail', name, from: null, fields: [], edit: null, actions: [] };
     for (const item of ctx.detailItem() || []) {
        if (item.getText().startsWith('from:')) container.from = item.authExpr().getText();
        else if (item.getText().startsWith('fields:')) container.fields = item.idList().ID().map(i => i.getText());
        else if (item.editBlock()) container.edit = this.visitEditBlock(item.editBlock());
        else if (item.actionsDecl()) container.actions = this.visitActionsDecl(item.actionsDecl());
     }
     return container;
  }

  visitMetricGridDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'MetricGrid', name, show: [] };
     for (const item of ctx.metricGridItem() || []) {
        if (item.getText().startsWith('show:')) container.show = item.authExprList().authExpr().map(i => i.getText());
     }
     return container;
  }

  visitKanbanDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'Kanban', name, from: null, groupBy: null, update: null, card: [], view: null, actions: [] };
     for (const item of ctx.kanbanItem() || []) {
        if (item.getText().startsWith('from:')) container.from = item.authExpr().getText();
        else if (item.getText().startsWith('groupBy:')) container.groupBy = item.ID(1).getText();
        else if (item.getText().startsWith('update:')) container.update = item.authExpr().getText();
        else if (item.getText().startsWith('card:')) container.card = item.idList().ID().map(i => i.getText());
        else if (item.viewBlock()) container.view = this.visitViewBlock(item.viewBlock());
        else if (item.actionsDecl()) container.actions = this.visitActionsDecl(item.actionsDecl());
     }
     return container;
  }

  visitCalendarDecl(ctx) {
     const name = ctx.ID() ? ctx.ID().getText() : null;
     const container = { type: 'Calendar', name, from: null, dateField: null, update: null, labelField: null, view: null, actions: [] };
     for (const item of ctx.calendarItem() || []) {
        if (item.getText().startsWith('from:')) container.from = item.authExpr().getText();
        else if (item.getText().startsWith('dateField:')) container.dateField = item.ID(1).getText();
        else if (item.getText().startsWith('update:')) container.update = item.authExpr().getText();
        else if (item.getText().startsWith('labelField:')) container.labelField = item.ID(1).getText();
        else if (item.viewBlock()) container.view = this.visitViewBlock(item.viewBlock());
        else if (item.actionsDecl()) container.actions = this.visitActionsDecl(item.actionsDecl());
     }
     return container;
  }

  visitViewBlock(ctx) {
     let get = null;
     let fields = [];
     for (const item of ctx.viewItem() || []) {
        if (item.getText().startsWith('get:')) get = item.authExpr().getText();
        else if (item.getText().startsWith('fields:')) fields = item.idList().ID().map(i => i.getText());
     }
     return { get, fields };
  }

  visitEditBlock(ctx) {
     let submit = null;
     let fields = [];
     for (const item of ctx.editItem() || []) {
        if (item.getText().startsWith('submit:')) submit = item.authExpr().getText();
        else if (item.getText().startsWith('fields:')) fields = item.idList().ID().map(i => i.getText());
     }
     return { submit, fields };
  }

  visitActionsDecl(ctx) {
     return ctx.actionItem().map(item => {
        const endpoint = item.authExpr().getText();
        const label = item.STRING().getText().replace(/"/g, '');
        let onSuccess = null;
        if (item.successAction()) {
           onSuccess = item.successAction().getText();
        }
        return { endpoint, label, onSuccess };
     });
  }
}

// ── Entry Points ──────────────────────────────────────────────────

class ThrowingErrorListener extends antlr4.error.ErrorListener {
  constructor(prefix) {
    super();
    this.prefix = prefix;
  }
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    throw new Error(`${this.prefix} Syntax error at line ${line}:${column} — ${msg}`);
  }
}

export function parseSchema(input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new HospitalSchemaLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new HospitalSchemaParser(tokens);

  parser.removeErrorListeners();
  parser.addErrorListener(new ThrowingErrorListener('Schema'));

  const tree = parser.hospital();
  const transformer = new SchemaTransformer();
  return transformer.visitHospital(tree);
}

export function parseViews(input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new HospitalViewsLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new HospitalViewsParser(tokens);

  parser.removeErrorListeners();
  parser.addErrorListener(new ThrowingErrorListener('Views'));

  const tree = parser.viewsFile();
  const transformer = new ViewsTransformer();
  return transformer.visitViewsFile(tree);
}
