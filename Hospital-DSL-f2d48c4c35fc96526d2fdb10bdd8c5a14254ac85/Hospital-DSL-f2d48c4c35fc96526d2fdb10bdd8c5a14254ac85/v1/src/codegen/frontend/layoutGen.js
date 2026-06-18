import { camelCase, writeFile } from '../backend/helpers.js';

export function generateLayouts(viewsAST, outputDir) {
  if (!viewsAST) return;
  console.log('\n📦 Frontend — Portal Layouts');

  for (const portal of viewsAST.portals) {
    const layout = buildLayout(portal);
    writeFile(outputDir, `frontend/src/layouts/${portal.name}Layout.jsx`, layout);
  }
}

function buildLayout(portal) {
  const navLinks = portal.pages.map(page => {
    const routePath = page.route === '/' ? '' : page.route;
    const fullPath = `/${portal.roles[0].toLowerCase()}${routePath}`;
    return `        <NavLink to="${fullPath}" className={({isActive}) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
          ${page.title || page.name}
        </NavLink>`;
  }).join('\n');

  return `import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ${portal.name}Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          ${portal.name.replace(/Portal$/, '')} Portal
        </div>
        <nav className="sidebar-nav">
${navLinks}
        </nav>
        <div className="sidebar-footer">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {user?.name || '${portal.roles[0]}'}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
`;
}
