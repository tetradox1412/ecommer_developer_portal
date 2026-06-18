const PRIMITIVE_TYPES = new Set([
  'String', 'Text', 'Integer', 'Number', 'Boolean', 'Date', 'DateTime', 'Email', 'Phone'
]);

export class SemanticAnalyzer {
  constructor(schemaAST, viewsAST) {
    this.schema = schemaAST;
    this.views = viewsAST;
    this.errors = [];
    this.symbolTable = {
      modules: new Map(),
      roles: new Map(),
      auth: null
    };
  }

  error(msg) {
    this.errors.push(msg);
  }

  validate() {
    this.buildSymbolTable();
    this.phase1_ModulesAndFields();
    this.phase2_Relationships();
    this.phase3_AuthAndRoles();
    this.phase4_APIsAndEndpoints();
    this.phase5_Stats();
    if (this.views) {
      this.validateViews();
    }
    
    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      symbolTable: this.symbolTable
    };
  }

  buildSymbolTable() {
    // Register Modules
    for (const m of this.schema.modules) {
      const moduleSymbol = {
        ast: m,
        fields: new Map(),
        apis: new Map()
      };
      
      for (const f of m.fields) {
        moduleSymbol.fields.set(f.name, f);
      }
      
      for (const api of m.apis) {
        // Stats can have the same name as standard endpoints conceptually, but name: must be unique per module
        if (api.name) {
          moduleSymbol.apis.set(api.name, api);
        }
      }
      this.symbolTable.modules.set(m.id, moduleSymbol);
    }
    
    // Foreign modules
    for (const fm of this.schema.foreignModules || []) {
      const moduleSymbol = { ast: fm, fields: new Map(), apis: new Map() };
      for (const api of fm.apis) {
         if (api.name) moduleSymbol.apis.set(api.name, api);
      }
      this.symbolTable.modules.set(fm.id, moduleSymbol);
    }

    // Register Roles
    for (const [name, role] of Object.entries(this.schema.roles)) {
      this.symbolTable.roles.set(name, role);
    }

    // Register Auth
    this.symbolTable.auth = this.schema.auth;
  }

  phase1_ModulesAndFields() {
    for (const m of this.schema.modules) {
      for (const f of m.fields) {
        // 1. Primitive Type Validity
        if (!PRIMITIVE_TYPES.has(f.type) && !this.symbolTable.modules.has(f.type)) {
          this.error(`Error: Field '${f.name}' on Module '${m.id}' references unknown type '${f.type}'.`);
        }

        // 2. Array Constraints
        if (f.isArray && PRIMITIVE_TYPES.has(f.type)) {
          this.error(`Error: Array types ('[]') are only supported on relationship fields. Field '${f.name}' on Module '${m.id}' cannot be an array of primitive type '${f.type}'.`);
        }

        // 4. Field Constraint Validation
        if (f.min !== null || f.max !== null) {
          if (f.type !== 'Integer' && f.type !== 'Number') {
            this.error(`Error: Constraint 'min/max' on Field '${f.name}' is only allowed for Integer or Number fields.`);
          }
          if (f.min !== null && f.max !== null && f.min > f.max) {
             this.error(`Error: min constraint is greater than max on Field '${f.name}'.`);
          }
        }

        if (f.options.length > 0) {
          if (f.type !== 'String') {
            this.error(`Error: Options constraint on Field '${f.name}' is only allowed for String fields.`);
          }
        }
      }

      // 3. Composite Unique Key Constraints
      for (const uniqueFields of m.uniqueConstraints) {
        if (uniqueFields.length < 2) {
           this.error(`Error: Composite unique constraint in Module '${m.id}' must contain at least 2 fields.`);
        }
        for (const fieldName of uniqueFields) {
          if (!m.fields.find(f => f.name === fieldName)) {
            this.error(`Error: Composite unique constraint in Module '${m.id}' references non-existent field '${fieldName}'.`);
          }
        }
      }
    }
  }

  phase2_Relationships() {
    for (const m of this.schema.modules) {
      for (const f of m.fields) {
        if (!PRIMITIVE_TYPES.has(f.type)) {
          // It's a relationship
          if (f.default !== null) {
             this.error(`Error: Relationship field '${f.name}' on Module '${m.id}' cannot have a default constraint.`);
          }
          
          if (f.isArray) {
            // Desugaring Many-to-Many
            const targetModule = this.symbolTable.modules.get(f.type);
            if (targetModule) {
               // Find reverse relation
               const reverseField = Array.from(targetModule.fields.values()).find(tf => tf.type === m.id && tf.isArray);
               if (reverseField) {
                  const junctionId = `${m.id}To${targetModule.ast.id}`;
                  // Inject implicitly if not already present
                  if (!this.symbolTable.modules.has(junctionId)) {
                     this.symbolTable.modules.set(junctionId, {
                        ast: { id: junctionId, from: m.id, to: targetModule.ast.id, type: 'ManyToMany' },
                        fields: new Map(),
                        apis: new Map()
                     });
                  }
               }
            }
          }
        }
      }
    }
  }

  phase3_AuthAndRoles() {
    if (!this.schema.auth) {
      this.error("Error: Missing required 'Auth' configuration block.");
      return;
    }

    const authRoles = new Set(this.schema.auth.roles);
    const declaredRoles = new Set(this.symbolTable.roles.keys());

    for (const role of authRoles) {
      if (!declaredRoles.has(role)) {
        this.error(`Error: Role '${role}' is registered in Auth but is missing its 'Role ${role} { ... }' identity block.`);
      }
    }

    for (const role of declaredRoles) {
      if (!authRoles.has(role)) {
        this.error(`Error: Role '${role}' has a Role block but is not listed in the Auth Roles registry.`);
      }
    }

    for (const [roleName, roleData] of this.symbolTable.roles.entries()) {
      if (roleData.meBinding) {
        if (!this.symbolTable.modules.has(roleData.meBinding)) {
          this.error(`Error: Role '${roleName}' has Me binding to unknown module '${roleData.meBinding}'.`);
        }
      }
    }
  }

  phase4_APIsAndEndpoints() {
    for (const m of this.schema.modules) {
      const moduleSymbol = this.symbolTable.modules.get(m.id);
      
      for (const api of m.apis) {
        if (api.verb === 'Stats') continue;

        // 1. Verb and Path Consistency
        const hasId = api.path.includes('/:id');
        if (['Get', 'Update', 'Delete'].includes(api.verb)) {
          if (!hasId && api.path !== '/me') {
            this.error(`Error: Endpoint '${api.verb} ${api.path}' is a singular record operation and must contain '/:id' in its path (or be '/me').`);
          }
        } else if (['List', 'Create'].includes(api.verb)) {
          if (hasId) {
            this.error(`Error: Endpoint '${api.verb} ${api.path}' cannot contain an ':id' parameter. Use Get/Update/Delete instead.`);
          }
        }

        // 2. Role Verification
        for (const roleName of api.roles) {
          if (!this.symbolTable.roles.has(roleName)) {
            this.error(`Error: Endpoint '${api.verb} ${api.path}' references undeclared role '${roleName}'.`);
          }
        }

        // 3. Inline Role Configuration
        for (const [roleName, config] of Object.entries(api.inlineConfigs)) {
           if (roleName === '*') continue; // global rules

           const roleDef = this.symbolTable.roles.get(roleName);
           if (!roleDef) continue; // Already errored above

           if (!roleDef.meBinding) {
             this.error(`Error: System role '${roleName}' has no identity module ('Me:') and cannot declare inline filters or sets.`);
             continue;
           }

           // Check filter
           if (config.filter) {
             if (!['List', 'Get', 'Update', 'Delete'].includes(api.verb)) {
                this.error(`Error: 'filter' constraint is not allowed on '${api.verb}' endpoints. Did you mean 'set'?`);
             }
             const fDef = moduleSymbol.fields.get(config.filter.field);
             if (!fDef && config.filter.field !== 'id') {
                this.error(`Error: Inline config on endpoint '${api.verb} ${api.path}' targets non-existent field '${config.filter.field}' on Module '${m.id}'.`);
             } else if (fDef) {
                if (fDef.type !== roleDef.meBinding && config.filter.field !== 'id') {
                   this.error(`Error: Type mismatch: inline config for Role '${roleName}' targets field '${fDef.name}' of type '${fDef.type}' instead of '${roleDef.meBinding}'.`);
                }
             }
           }

           // Check set
           if (config.set) {
             if (!['Create', 'Update'].includes(api.verb)) {
                this.error(`Error: 'set' constraint is not allowed on '${api.verb}' endpoints. Did you mean 'filter'?`);
             }
             const fDef = moduleSymbol.fields.get(config.set.field);
             if (!fDef && config.set.field !== 'status') { 
                // Allow specific built in overwrites or check strict
                if (!moduleSymbol.fields.has(config.set.field)) {
                   this.error(`Error: Inline config on endpoint '${api.verb} ${api.path}' targets non-existent field '${config.set.field}' on Module '${m.id}'.`);
                }
             }
           }
        }

        // 4. expand: Validation
        if (api.expand && api.expand.length > 0) {
           for (const exp of api.expand) {
              // Should be a relationship field or a valid reverse relation. 
              // Simplification for V1 prototype: check if it matches a known reverse or forward relation
              let isValidRelation = false;
              if (moduleSymbol.fields.has(exp)) isValidRelation = true; // forward
              else {
                 // Check all other modules to see if they point to this one, allowing pluralized reverse relation
                 for (const other of this.symbolTable.modules.values()) {
                    for (const of of other.fields.values()) {
                       if (of.type === m.id) isValidRelation = true;
                    }
                 }
              }
              if (!isValidRelation) {
                 this.error(`Error: expand block on '${api.path}' references '${exp}' which is not a relationship field.`);
              }
           }
        }
      }
    }
  }

  phase5_Stats() {
    for (const m of this.schema.modules) {
      for (const api of m.apis) {
        if (api.verb === 'Stats') {
           const keys = new Set();
           for (const stat of api.stats) {
              if (keys.has(stat.key)) {
                 this.error(`Error: Duplicate metric key '${stat.key}' in Stats endpoint '${api.path}'.`);
              }
              keys.add(stat.key);

              const targetModule = this.symbolTable.modules.get(stat.moduleTarget);
              if (!targetModule) {
                 this.error(`Error: Stats metric '${stat.key}' references unknown module '${stat.moduleTarget}'.`);
                 continue;
              }

              if (['sum', 'avg', 'min', 'max'].includes(stat.func)) {
                 if (!stat.fieldTarget) {
                    this.error(`Error: Function '${stat.func}' requires a field target (e.g. ${stat.moduleTarget}.amount).`);
                 } else {
                    const fDef = targetModule.fields.get(stat.fieldTarget);
                    if (!fDef) {
                       this.error(`Error: Function '${stat.func}' targets non-existent field '${stat.fieldTarget}' on Module '${stat.moduleTarget}'.`);
                    } else if (stat.func === 'sum' || stat.func === 'avg') {
                       if (fDef.type !== 'Integer' && fDef.type !== 'Number') {
                          this.error(`Error: Function '${stat.func}' on '${stat.moduleTarget}.${stat.fieldTarget}' requires a numeric field (Integer or Number).`);
                       }
                    }
                 }
              }

              if (stat.modifiers && stat.modifiers.filter) {
                 const fDef = targetModule.fields.get(stat.modifiers.filter.field);
                 if (!fDef) {
                    this.error(`Error: Stats modifier references non-existent field '${stat.modifiers.filter.field}' on Module '${stat.moduleTarget}'.`);
                 } else if (fDef.options.length > 0 && typeof stat.modifiers.filter.val === 'string') {
                    if (!fDef.options.includes(stat.modifiers.filter.val)) {
                       this.error(`Error: Value '${stat.modifiers.filter.val}' is not a valid option for field '${fDef.name}'.`);
                    }
                 }
              }

              if (stat.modifiers && stat.modifiers.groupedBy) {
                 const gField = targetModule.fields.get(stat.modifiers.groupedBy[0]);
                 if (!gField) {
                    this.error(`Error: Cannot group by '${stat.modifiers.groupedBy[0]}'. Field does not exist.`);
                 } else if (gField.options.length === 0 && PRIMITIVE_TYPES.has(gField.type)) {
                    this.error(`Error: Cannot group by '${gField.name}'. Grouping is only allowed on relationship fields or option fields.`);
                 }
              }
           }
        }
      }
    }
  }

  validateViews() {
     // Validate LoginGroups
     const assignedRoles = new Set();
     const authRoles = new Set(this.schema.auth.roles);

     for (const group of this.views.loginGroups) {
        for (const role of group.roles) {
           if (assignedRoles.has(role)) {
              this.error(`Error: Role '${role}' assigned to multiple LoginGroups.`);
           }
           if (!authRoles.has(role)) {
              this.error(`Error: Role '${role}' in LoginGroup is not declared in schema Auth roles.`);
           }
           assignedRoles.add(role);
        }

        if (group.selfRegister) {
           // check if all roles have Me: binding to same required fields, or just use first
           const roleDef = this.symbolTable.roles.get(group.roles[0]);
           if (roleDef && roleDef.meBinding) {
              const moduleSymbol = this.symbolTable.modules.get(roleDef.meBinding);
              const regSet = new Set(group.registerFields);
              for (const f of moduleSymbol.fields.values()) {
                 if (f.required && !regSet.has(f.name)) {
                    this.error(`Error: Field '${f.name}' is required but missing from registerFields in group '${group.name}'.`);
                 }
              }
              for (const f of group.registerFields) {
                 if (f !== 'password' && f !== 'email' && !moduleSymbol.fields.has(f)) {
                    this.error(`Error: Field '${f}' does not exist on module '${roleDef.meBinding}'.`);
                 }
              }
           }
        }
     }

     for (const role of authRoles) {
        if (!assignedRoles.has(role)) {
           this.error(`Error: Role '${role}' is not assigned to any LoginGroup.`);
        }
     }

     const portalRoles = new Set();
     for (const portal of this.views.portals) {
        for (const role of portal.roles) {
           if (portalRoles.has(role)) {
              this.error(`Error: Role '${role}' is assigned to multiple Portals.`);
           }
           portalRoles.add(role);
        }

        for (const page of portal.pages) {
           for (const container of page.containers) {
              this.validateContainer(container, portal.roles);
           }
        }
     }
  }

  validateContainer(c, portalRoles) {
     if (c.from) this.validateEndpoint(c.from, ['List', 'Get']);
     if (c.submit) this.validateEndpoint(c.submit, ['Create', 'Update']);
     if (c.update) this.validateEndpoint(c.update, ['Update']);
     
     if (c.view && c.view.get) this.validateEndpoint(c.view.get, ['Get']);
     if (c.edit && c.edit.submit) this.validateEndpoint(c.edit.submit, ['Update']);
     
     if (c.actions) {
        for (const a of c.actions) {
           this.validateEndpoint(a.endpoint, null); // any verb allowed
        }
     }
  }

  validateEndpoint(authExpr, allowedVerbs) {
     if (!authExpr || !authExpr.includes('.')) return;
     const [moduleName, epName] = authExpr.split('.');
     const modSymbol = this.symbolTable.modules.get(moduleName);
     if (!modSymbol) {
        this.error(`Error: Endpoint reference '${authExpr}' targets unknown module '${moduleName}'.`);
        return;
     }
     const ep = modSymbol.apis.get(epName);
     if (!ep) {
        this.error(`Error: Endpoint '${epName}' does not exist on module '${moduleName}'.`);
        return;
     }
     if (allowedVerbs && !allowedVerbs.includes(ep.verb)) {
        this.error(`Error: '${authExpr}' is a ${ep.verb} endpoint, not ${allowedVerbs.join(' or ')}.`);
     }
  }
}
