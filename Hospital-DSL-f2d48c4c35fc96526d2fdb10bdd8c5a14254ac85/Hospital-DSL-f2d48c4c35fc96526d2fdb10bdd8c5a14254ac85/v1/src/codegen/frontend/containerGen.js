import { camelCase, writeFile } from '../backend/helpers.js';

export function generateContainers(outputDir) {
  console.log('\n📦 Frontend — Generic Containers');

  // ── DataTable ──────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/DataTable.jsx', `import { useState, useEffect } from 'react';

export default function DataTable({ fetchFn, columns, fields, viewFetchFn, editSubmitFn, actions, onRefresh }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(k => k + 1);

  useEffect(() => {
    setLoading(true);
    fetchFn().then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  const handleAction = async (action, item) => {
    try {
      await action.handler(item.id);
      if (action.onSuccess === 'refresh') refresh();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="card"><p className="text-muted">Loading...</p></div>;

  return (
    <div className="card">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
            {(viewFetchFn || actions?.length > 0) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {columns.map(col => (
                <td key={col}>
                  {typeof item[col] === 'object' && item[col] !== null
                    ? (item[col].name || item[col].id || JSON.stringify(item[col]))
                    : String(item[col] ?? '')}
                </td>
              ))}
              {(viewFetchFn || actions?.length > 0) && (
                <td>
                  <div className="flex gap-1">
                    {viewFetchFn && (
                      <button className="btn btn-ghost btn-sm" onClick={() => setViewItem(item)}>View</button>
                    )}
                    {actions?.map((a, i) => (
                      <button key={i} className="btn btn-danger btn-sm" onClick={() => handleAction(a, item)}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="text-center text-muted" style={{padding:'2rem'}}>No records found</td></tr>
          )}
        </tbody>
      </table>

      {viewItem && viewFetchFn && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Details</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}>&times;</button>
            </div>
            <ViewDetail item={viewItem} fields={fields} fetchFn={viewFetchFn} />
          </div>
        </div>
      )}
    </div>
  );
}

function ViewDetail({ item, fields, fetchFn }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (fetchFn && item?.id) {
      fetchFn(item.id).then(res => setDetail(res.data)).catch(() => setDetail(item));
    } else {
      setDetail(item);
    }
  }, [item]);

  if (!detail) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      {(fields || Object.keys(detail)).filter(f => f !== 'id').map(field => (
        <div key={field} style={{ marginBottom: '0.75rem' }}>
          <div className="form-label">{field}</div>
          <div style={{ color: 'var(--text-primary)' }}>
            {typeof detail[field] === 'object' && detail[field] !== null
              ? (detail[field].name || JSON.stringify(detail[field]))
              : String(detail[field] ?? '—')}
          </div>
        </div>
      ))}
    </div>
  );
}
`);

  // ── DataForm ───────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/DataForm.jsx', `import { useState, useEffect } from 'react';

export default function DataForm({ formFields, submitFn, fieldConfigs, fieldTypes = {}, onSuccess, title }) {
  const [form, setForm] = useState({});
  const [dropdowns, setDropdowns] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load dropdown data for fieldConfigs
    if (fieldConfigs) {
      for (const [fieldName, config] of Object.entries(fieldConfigs)) {
        if (config.fetchFn) {
          config.fetchFn().then(res => {
            setDropdowns(prev => ({ ...prev, [fieldName]: res.data }));
          });
        }
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      // Convert relationship fields to { id } objects
      const payload = { ...form };
      if (fieldConfigs) {
        for (const fieldName of Object.keys(fieldConfigs)) {
          if (payload[fieldName]) {
            payload[fieldName] = { id: Number(payload[fieldName]) };
          }
        }
      }
      await submitFn(payload);
      setForm({});
      setMessage(onSuccess || 'Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
    setSubmitting(false);
  };

  return (
    <div className="card">
      {title && <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>{title}</h3>}
      {message && <div style={{ marginBottom: '1rem', color: message.startsWith('Error') ? 'var(--danger)' : 'var(--success)', fontSize: '0.85rem' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <div className="form-group" key={field}>
            <label className="form-label">{field}</label>
            {dropdowns[field] ? (
              <select className="form-select" value={form[field] || ''}
                onChange={e => setForm({ ...form, [field]: e.target.value })}>
                <option value="">Select {field}...</option>
                {dropdowns[field].map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name || opt.id}</option>
                ))}
              </select>
            ) : (
              <input className="form-input" 
                type={fieldTypes[field] === 'Date' ? 'date' : fieldTypes[field] === 'Time' ? 'time' : 'text'}
                value={form[field] || ''}
                onChange={e => setForm({ ...form, [field]: e.target.value })} />
            )}
          </div>
        ))}
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
`);

  // ── DataDetail ─────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/DataDetail.jsx', `import { useState, useEffect } from 'react';

export default function DataDetail({ fetchFn, displayFields, editSubmitFn, editFields, fieldTypes = {} }) {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFn().then(res => { setData(res.data); setForm(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      const payload = {};
      for (const f of editFields) payload[f] = form[f];
      await editSubmitFn(payload);
      setData({ ...data, ...payload });
      setEditing(false);
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="card"><p className="text-muted">Loading...</p></div>;
  if (!data) return <div className="card"><p className="text-muted">No data</p></div>;

  return (
    <div className="card">
      {!editing ? (
        <>
          {displayFields.map(f => (
            <div key={f} style={{ marginBottom: '0.75rem' }}>
              <div className="form-label">{f}</div>
              <div>{typeof data[f] === 'object' ? (data[f]?.name || JSON.stringify(data[f])) : String(data[f] ?? '—')}</div>
            </div>
          ))}
          {editSubmitFn && (
            <button className="btn btn-primary mt-2" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </>
      ) : (
        <>
          {editFields.map(f => (
            <div className="form-group" key={f}>
              <label className="form-label">{f}</label>
              <input className="form-input" 
                type={fieldTypes[f] === 'Date' ? 'date' : fieldTypes[f] === 'Time' ? 'time' : 'text'}
                value={form[f] || ''}
                onChange={e => setForm({...form, [f]: e.target.value})} />
            </div>
          ))}
          <div className="flex gap-1">
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
`);

  // ── MetricGrid ─────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/MetricGrid.jsx', `import { useState, useEffect } from 'react';

export default function MetricGrid({ metrics }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // metrics is array of { fetchFn, keys: [{key, label}] }
    Promise.all(metrics.map(m => m.fetchFn().then(res => res.data)))
      .then(results => {
        const merged = {};
        results.forEach(r => Object.assign(merged, r));
        setData(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="metric-grid"><div className="metric-card"><p className="text-muted">Loading...</p></div></div>;

  const allKeys = metrics.flatMap(m => m.keys);

  return (
    <div className="metric-grid">
      {allKeys.map(({ key, label }) => (
        <div className="metric-card" key={key}>
          <div className="metric-label">{label}</div>
          <div className="metric-value">{data[key] ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
`);

  // ── DataCalendar ───────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/DataCalendar.jsx', `import { useState, useEffect, useMemo } from 'react';

export default function DataCalendar({ fetchFn, dateField, labelField, viewFetchFn, viewFields, actions }) {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date());
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    fetchFn().then(res => setData(res.data)).catch(() => {});
  }, []);

  const days = useMemo(() => {
    const year = month.getFullYear(), m = month.getMonth();
    const first = new Date(year, m, 1);
    const last = new Date(year, m + 1, 0);
    const startDay = first.getDay();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= last.getDate(); d++) cells.push(d);
    return cells;
  }, [month]);

  const getEvents = (day) => {
    if (!day) return [];
    const dateStr = \`\${month.getFullYear()}-\${String(month.getMonth()+1).padStart(2,'0')}-\${String(day).padStart(2,'0')}\`;
    return data.filter(item => {
      const val = item[dateField];
      return val && val.startsWith(dateStr);
    });
  };

  const today = new Date();
  const isToday = (day) => day && today.getFullYear() === month.getFullYear() && today.getMonth() === month.getMonth() && today.getDate() === day;

  return (
    <div className="card">
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth()-1))}>← Prev</button>
        <h3>{month.toLocaleString('default', {month:'long', year:'numeric'})}</h3>
        <button className="btn btn-ghost btn-sm" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth()+1))}>Next →</button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div className="calendar-header" key={d}>{d}</div>)}
        {days.map((day, i) => (
          <div key={i} className={\`calendar-cell \${isToday(day) ? 'today' : ''}\`}>
            {day && <div className="calendar-day">{day}</div>}
            {getEvents(day).map((ev, j) => (
              <div key={j} className="calendar-event" onClick={() => setViewItem(ev)}>
                {typeof ev[labelField] === 'object' ? ev[labelField]?.name : ev[labelField]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Event Details</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}>&times;</button>
            </div>
            {(viewFields || Object.keys(viewItem)).filter(f => f !== 'id').map(f => (
              <div key={f} style={{ marginBottom: '0.75rem' }}>
                <div className="form-label">{f}</div>
                <div>{typeof viewItem[f] === 'object' ? viewItem[f]?.name : String(viewItem[f] ?? '—')}</div>
              </div>
            ))}
            {actions && <div className="flex gap-1 mt-2">
              {actions.map((a, i) => <button key={i} className="btn btn-primary btn-sm" onClick={async () => { await a.handler(viewItem.id); setViewItem(null); }}>{a.label}</button>)}
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}
`);

  // ── DataKanban ─────────────────────────────────────────────
  writeFile(outputDir, 'frontend/src/components/DataKanban.jsx', `import { useState, useEffect } from 'react';

export default function DataKanban({ fetchFn, groupBy, groupOptions, cardFields, viewFetchFn, viewFields, actions }) {
  const [data, setData] = useState([]);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    fetchFn().then(res => setData(res.data)).catch(() => {});
  }, []);

  const columns = groupOptions || [...new Set(data.map(d => d[groupBy]))];

  return (
    <div className="card">
      <div className="kanban-board">
        {columns.map(col => (
          <div className="kanban-column" key={col}>
            <div className="kanban-column-title">{col}</div>
            {data.filter(d => d[groupBy] === col).map(item => (
              <div className="kanban-card" key={item.id} onClick={() => setViewItem(item)}>
                {(cardFields || Object.keys(item)).filter(f => f !== 'id' && f !== groupBy).slice(0, 3).map(f => (
                  <div key={f} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{f}: </strong>
                    {typeof item[f] === 'object' ? item[f]?.name : String(item[f] ?? '')}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Details</h2>
              <button className="modal-close" onClick={() => setViewItem(null)}>&times;</button>
            </div>
            {(viewFields || Object.keys(viewItem)).filter(f => f !== 'id').map(f => (
              <div key={f} style={{ marginBottom: '0.75rem' }}>
                <div className="form-label">{f}</div>
                <div>{typeof viewItem[f] === 'object' ? viewItem[f]?.name : String(viewItem[f] ?? '—')}</div>
              </div>
            ))}
            {actions && <div className="flex gap-1 mt-2">
              {actions.map((a, i) => <button key={i} className="btn btn-primary btn-sm" onClick={async () => { await a.handler(viewItem.id); setViewItem(null); }}>{a.label}</button>)}
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}
`);
}
