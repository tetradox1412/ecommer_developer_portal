import { writeFile } from '../backend/helpers.js';

export function generateAuth(schemaAST, viewsAST, outputDir) {
  console.log('\n🔑 Frontend — Auth');

  // ── AuthContext ────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/auth/AuthContext.jsx', `import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password });
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (formData) => {
    const res = await api.auth.register(formData);
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
`);

  // ── ProtectedRoute ─────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/auth/ProtectedRoute.jsx', `import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}
`);

  // ── LoginPage ──────────────────────────────────────────────
  const groups = viewsAST?.loginGroups || [];
  const groupTabs = groups.map((g, i) => `        { name: '${g.name}', roles: [${g.roles.map(r => `'${r}'`).join(', ')}] }`);

  writeFile(outputDir, 'frontend/src/auth/LoginPage.jsx', `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LOGIN_GROUPS = [
${groupTabs.join(',\n')}
];

const SELF_REGISTER_GROUPS = LOGIN_GROUPS.filter((_, i) => [${groups.map((g, i) => g.selfRegister ? i : -1).filter(i => i >= 0).join(', ')}].includes(i));

export default function LoginPage() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      navigate('/' + data.role.toLowerCase());
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>

        <div className="auth-tabs">
          {LOGIN_GROUPS.map((g, i) => (
            <button key={i} className={\`auth-tab \${activeGroup === i ? 'active' : ''}\`}
              onClick={() => setActiveGroup(i)}>{g.name}</button>
          ))}
        </div>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Sign In</button>
        </form>

        {SELF_REGISTER_GROUPS.length > 0 && (
          <p className="mt-2 text-center">
            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
}
`);

  // ── RegisterPage ───────────────────────────────────────────
  const selfRegGroups = groups.filter(g => g.selfRegister);
  if (selfRegGroups.length > 0) {
    const regFields = selfRegGroups[0].registerFields.filter(f => f !== 'password' && f !== 'email');
    const fieldInputs = regFields.map(f => {
      return `          <div className="form-group">
            <label className="form-label">${f}</label>
            <input className="form-input" name="${f}" value={form.${f} || ''}
              onChange={e => setForm({...form, ${f}: e.target.value})} />
          </div>`;
    }).join('\n');

    const initialForm = [...regFields, 'email', 'password', 'name'].reduce((acc, f) => {
      acc[f] = "''";
      return acc;
    }, {});
    const initStr = Object.entries(initialForm).map(([k, v]) => `${k}: ${v}`).join(', ');

    writeFile(outputDir, 'frontend/src/auth/RegisterPage.jsx', `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ ${initStr} });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register({ ...form, role: '${selfRegGroups[0].roles[0]}' });
      navigate('/' + data.role.toLowerCase());
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>${selfRegGroups[0].name} Registration</p>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" value={form.name} required
              onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={form.email} required
              onChange={e => setForm({...form, email: e.target.value})} />
          </div>
${fieldInputs}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={form.password} required
              onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Register</button>
        </form>

        <p className="mt-2 text-center">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
`);
  }
}
