import { writeFile } from '../backend/helpers.js';

export function generateApp(viewsAST, outputDir) {
  if (!viewsAST) return;
  console.log('\n📦 Frontend — App.jsx + Routing');

  const imports = [];
  const routes = [];

  imports.push(`import { Routes, Route, Navigate } from 'react-router-dom';`);
  imports.push(`import { useAuth } from './auth/AuthContext';`);
  imports.push(`import LoginPage from './auth/LoginPage';`);
  imports.push(`import ProtectedRoute from './auth/ProtectedRoute';`);

  // Check if register page exists
  const hasSelfReg = viewsAST.loginGroups.some(g => g.selfRegister);
  if (hasSelfReg) {
    imports.push(`import RegisterPage from './auth/RegisterPage';`);
  }

  // Import layouts and pages
  for (const portal of viewsAST.portals) {
    imports.push(`import ${portal.name}Layout from './layouts/${portal.name}Layout';`);
    const portalDir = portal.roles[0].toLowerCase();
    for (const page of portal.pages) {
      imports.push(`import ${portal.name}_${page.name} from './pages/${portalDir}/${page.name}';`);
    }
  }

  // Build role-to-portal mapping for redirect
  const rolePortalMap = {};
  for (const portal of viewsAST.portals) {
    for (const role of portal.roles) {
      rolePortalMap[role] = portal.roles[0].toLowerCase();
    }
  }

  // Build portal routes
  for (const portal of viewsAST.portals) {
    const basePath = portal.roles[0].toLowerCase();
    const rolesList = JSON.stringify(portal.roles);

    const pageRoutes = portal.pages.map(page => {
      const pagePath = page.route === '/' ? 'index' : page.route.replace(/^\//, '');
      const routePath = page.route === '/' ? '' : page.route;
      return `          <Route ${routePath === '' ? 'index' : `path="${routePath.replace(/^\//, '')}"`} element={<${portal.name}_${page.name} />} />`;
    });

    routes.push(`        <Route path="/${basePath}" element={
          <ProtectedRoute roles={${rolesList}}>
            <${portal.name}Layout />
          </ProtectedRoute>
        }>
${pageRoutes.join('\n')}
        </Route>`);
  }

  // Build redirect logic
  const redirectCases = Object.entries(rolePortalMap).map(([role, path]) =>
    `    if (user.role === '${role}') return '/${path}';`
  ).join('\n');

  writeFile(outputDir, 'frontend/src/App.jsx', `${imports.join('\n')}

function getPortalPath(user) {
  if (!user) return '/login';
${redirectCases}
  return '/login';
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={getPortalPath(user)} /> : <LoginPage />} />
${hasSelfReg ? '      <Route path="/register" element={user ? <Navigate to={getPortalPath(user)} /> : <RegisterPage />} />' : ''}

${routes.join('\n\n')}

      <Route path="/" element={<Navigate to={user ? getPortalPath(user) : '/login'} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
`);
}
