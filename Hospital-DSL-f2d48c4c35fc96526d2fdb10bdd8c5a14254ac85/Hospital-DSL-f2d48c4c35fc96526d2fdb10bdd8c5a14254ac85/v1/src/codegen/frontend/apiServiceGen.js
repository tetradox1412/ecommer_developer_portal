import { camelCase, writeFile } from '../backend/helpers.js';

export function generateApiService(schemaAST, symbolTable, outputDir) {
  console.log('\n📦 Frontend — API Service');

  // Build per-module API methods from the symbol table
  const moduleBlocks = [];

  for (const mod of schemaAST.modules) {
    const methods = [];
    for (const api of mod.apis) {
      const name = api.name;
      if (!name) continue;

      if (api.verb === 'Stats') {
        methods.push(`    ${name}: () => client.get('/api/${camelCase(mod.id)}${api.path}')`);
        continue;
      }

      switch (api.verb) {
        case 'List':
          methods.push(`    ${name}: () => client.get('/api/${camelCase(mod.id)}${api.path}')`);
          break;
        case 'Get': {
          const hasIdParam = api.path.includes(':id');
          if (hasIdParam) {
            const axiosPath = api.path.replace(/:(\w+)/g, '${$1}');
            methods.push(`    ${name}: (id) => client.get(\`/api/${camelCase(mod.id)}${axiosPath}\`)`);
          } else {
            methods.push(`    ${name}: () => client.get('/api/${camelCase(mod.id)}${api.path}')`);
          }
          break;
        }
        case 'Create':
          methods.push(`    ${name}: (data) => client.post('/api/${camelCase(mod.id)}${api.path}', data)`);
          break;
        case 'Update': {
          const axiosPath = api.path.replace(/:(\w+)/g, '${$1}');
          if (api.path.includes(':id')) {
            methods.push(`    ${name}: (id, data) => client.put(\`/api/${camelCase(mod.id)}${axiosPath}\`, data)`);
          } else {
            methods.push(`    ${name}: (data) => client.put('/api/${camelCase(mod.id)}${api.path}', data)`);
          }
          break;
        }
        case 'Delete': {
          const axiosPath = api.path.replace(/:(\w+)/g, '${$1}');
          methods.push(`    ${name}: (id) => client.delete(\`/api/${camelCase(mod.id)}${axiosPath}\`)`);
          break;
        }
      }
    }

    moduleBlocks.push(`  ${camelCase(mod.id)}: {\n${methods.join(',\n')}\n  }`);
  }

  writeFile(outputDir, 'frontend/src/api.js', `import axios from 'axios';

const client = axios.create({ baseURL: '' });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

const api = {
  auth: {
    login: (data) => client.post('/api/auth/login', data),
    register: (data) => client.post('/api/auth/register', data),
  },
${moduleBlocks.join(',\n')}
};

export default api;
export { client };
`);
}
