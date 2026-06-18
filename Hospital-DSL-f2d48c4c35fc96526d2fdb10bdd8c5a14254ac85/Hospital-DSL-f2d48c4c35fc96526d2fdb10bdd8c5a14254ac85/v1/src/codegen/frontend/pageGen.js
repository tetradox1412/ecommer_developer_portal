import { camelCase, writeFile } from '../backend/helpers.js';

export function generatePages(viewsAST, schemaAST, symbolTable, outputDir) {
  if (!viewsAST) return;
  console.log('\n📦 Frontend — Page Components');

  for (const portal of viewsAST.portals) {
    const portalDir = portal.roles[0].toLowerCase();
    for (const page of portal.pages) {
      const comp = buildPage(page, portal, schemaAST, symbolTable);
      writeFile(outputDir, `frontend/src/pages/${portalDir}/${page.name}.jsx`, comp);
    }
  }
}

function buildPage(page, portal, schemaAST, symbolTable) {
  const imports = new Set();
  imports.add(`import api from '../../api';`);

  const containerJSX = [];

  for (const container of page.containers) {
    const { jsx, neededImports } = buildContainerJSX(container, schemaAST, symbolTable);
    for (const imp of neededImports) imports.add(imp);
    containerJSX.push(jsx);
  }

  return `${Array.from(imports).join('\n')}

export default function ${page.name}() {
  return (
    <div>
      <div className="page-header">
        <h1>${page.title || page.name}</h1>
      </div>
${containerJSX.map(j => '      ' + j).join('\n\n')}
    </div>
  );
}
`;
}

function buildContainerJSX(container, schemaAST, symbolTable) {
  const neededImports = [];

  switch (container.type) {
    case 'Table': return buildTableJSX(container, neededImports);
    case 'Form': return buildFormJSX(container, neededImports, schemaAST);
    case 'Detail': return buildDetailJSX(container, neededImports, schemaAST);
    case 'MetricGrid': return buildMetricGridJSX(container, neededImports);
    case 'Calendar': return buildCalendarJSX(container, neededImports);
    case 'Kanban': return buildKanbanJSX(container, neededImports);
    default:
      return { jsx: `{/* Unknown container type: ${container.type} */}`, neededImports };
  }
}

function resolveApiCall(authExpr) {
  // e.g., "Appointment.my" → "api.appointment.my"
  if (!authExpr || !authExpr.includes('.')) return 'null';
  const parts = authExpr.split('.');
  return `api.${camelCase(parts[0])}.${parts[1]}`;
}

function buildTableJSX(c, imports) {
  imports.push(`import DataTable from '../../components/DataTable';`);
  const fetchFn = `() => ${resolveApiCall(c.from)}()`;
  const cols = JSON.stringify(c.columns);

  let viewFetchFn = 'null';
  let viewFields = '[]';
  if (c.view) {
    viewFetchFn = `(id) => ${resolveApiCall(c.view.get)}(id)`;
    viewFields = JSON.stringify(c.view.fields);
  }

  let editJSX = '';
  if (c.edit) {
    editJSX = ` editSubmitFn={(id, data) => ${resolveApiCall(c.edit.submit)}(id, data)}`;
  }

  let actionsArr = '[]';
  if (c.actions && c.actions.length > 0) {
    const actionItems = c.actions.map(a => {
      const handler = resolveApiCall(a.endpoint);
      return `{ label: '${a.label}', handler: (id) => ${handler}(id), onSuccess: '${a.onSuccess || ''}' }`;
    });
    actionsArr = `[${actionItems.join(', ')}]`;
  }

  const jsx = `<DataTable
        fetchFn={${fetchFn}}
        columns={${cols}}
        fields={${viewFields}}
        viewFetchFn={${viewFetchFn}}${editJSX}
        actions={${actionsArr}}
      />`;

  return { jsx, neededImports: imports };
}

function buildFormJSX(c, imports, schemaAST) {
  imports.push(`import DataForm from '../../components/DataForm';`);
  const submitFn = `(data) => ${resolveApiCall(c.submit)}(data)`;
  const fields = JSON.stringify(c.fields);
  const onSuccess = c.onSuccess || '';
  // Parse onSuccess: "toast\"Appointment booked!\"" → "Appointment booked!"
  const successMsg = onSuccess.replace(/^toast"?/, '').replace(/"$/, '') || 'Saved!';

  // Build fieldConfigs from the container's fieldConfigs
  let fieldConfigsJSX = 'null';
  if (c.fieldConfigs && Object.keys(c.fieldConfigs).length > 0) {
    const entries = Object.entries(c.fieldConfigs).map(([fieldName, config]) => {
      const fetchCall = resolveApiCall(config.from);
      return `'${fieldName}': { fetchFn: () => ${fetchCall}() }`;
    });
    fieldConfigsJSX = `{ ${entries.join(', ')} }`;
  }

  const modName = c.submit ? c.submit.split('.')[0] : (c.from ? c.from.split('.')[0] : null);
  const mod = modName ? schemaAST.modules.find(m => m.id === modName) : null;
  const fieldTypesObj = {};
  if (mod) {
    for (const f of mod.fields) fieldTypesObj[f.name] = f.type;
  }
  const fieldTypesStr = JSON.stringify(fieldTypesObj);

  const jsx = `<DataForm
        formFields={${fields}}
        submitFn={${submitFn}}
        fieldConfigs={${fieldConfigsJSX}}
        fieldTypes={${fieldTypesStr}}
        onSuccess="${successMsg}"
      />`;

  return { jsx, neededImports: imports };
}

function buildDetailJSX(c, imports, schemaAST) {
  imports.push(`import DataDetail from '../../components/DataDetail';`);
  const fetchFn = `() => ${resolveApiCall(c.from)}()`;
  const displayFields = JSON.stringify(c.fields);

  let editSubmitFn = 'null';
  let editFields = '[]';
  if (c.edit) {
    editSubmitFn = `(data) => ${resolveApiCall(c.edit.submit)}(data)`;
    editFields = JSON.stringify(c.edit.fields);
  }

  const modName = c.from ? c.from.split('.')[0] : null;
  const mod = modName ? schemaAST.modules.find(m => m.id === modName) : null;
  const fieldTypesObj = {};
  if (mod) {
    for (const f of mod.fields) fieldTypesObj[f.name] = f.type;
  }
  const fieldTypesStr = JSON.stringify(fieldTypesObj);

  const jsx = `<DataDetail
        fetchFn={${fetchFn}}
        displayFields={${displayFields}}
        editSubmitFn={${editSubmitFn}}
        editFields={${editFields}}
        fieldTypes={${fieldTypesStr}}
      />`;

  return { jsx, neededImports: imports };
}

function buildMetricGridJSX(c, imports) {
  imports.push(`import MetricGrid from '../../components/MetricGrid';`);

  // c.show is array of authExprs like ["Appointment.adminStats.totalAppointments", ...]
  // Group by endpoint: Appointment.adminStats → fetch once, extract keys
  const endpointMap = {};
  for (const expr of c.show) {
    const parts = expr.split('.');
    const module = parts[0];
    const endpoint = parts[1];
    const key = parts[2] || endpoint;
    const epKey = `${module}.${endpoint}`;
    if (!endpointMap[epKey]) endpointMap[epKey] = [];
    endpointMap[epKey].push({ key, label: key.replace(/([A-Z])/g, ' $1').trim() });
  }

  const metricsArr = Object.entries(endpointMap).map(([ep, keys]) => {
    const fetchCall = resolveApiCall(ep);
    const keysJSON = JSON.stringify(keys);
    return `{ fetchFn: () => ${fetchCall}(), keys: ${keysJSON} }`;
  });

  const jsx = `<MetricGrid
        metrics={[${metricsArr.join(', ')}]}
      />`;

  return { jsx, neededImports: imports };
}

function buildCalendarJSX(c, imports) {
  imports.push(`import DataCalendar from '../../components/DataCalendar';`);
  const fetchFn = `() => ${resolveApiCall(c.from)}()`;

  let viewFetchFn = 'null';
  let viewFields = '[]';
  if (c.view) {
    viewFetchFn = `(id) => ${resolveApiCall(c.view.get)}(id)`;
    viewFields = JSON.stringify(c.view.fields);
  }

  let actionsArr = '[]';
  if (c.actions && c.actions.length > 0) {
    const actionItems = c.actions.map(a => {
      const handler = resolveApiCall(a.endpoint);
      return `{ label: '${a.label}', handler: (id) => ${handler}(id, {}), onSuccess: '${a.onSuccess || ''}' }`;
    });
    actionsArr = `[${actionItems.join(', ')}]`;
  }

  const jsx = `<DataCalendar
        fetchFn={${fetchFn}}
        dateField="${c.dateField}"
        labelField="${c.labelField}"
        viewFetchFn={${viewFetchFn}}
        viewFields={${viewFields}}
        actions={${actionsArr}}
      />`;

  return { jsx, neededImports: imports };
}

function buildKanbanJSX(c, imports) {
  imports.push(`import DataKanban from '../../components/DataKanban';`);
  const fetchFn = `() => ${resolveApiCall(c.from)}()`;

  const jsx = `<DataKanban
        fetchFn={${fetchFn}}
        groupBy="${c.groupBy}"
        cardFields={${JSON.stringify(c.card)}}
      />`;

  return { jsx, neededImports: imports };
}
