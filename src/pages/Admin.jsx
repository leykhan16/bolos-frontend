import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://bolos-api-production.up.railway.app/api'
const ADMIN_PASSWORD = 'bolos2025'  // change this to whatever you want

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [tab, setTab] = useState('bookings')
  const [error, setError] = useState('')

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setError('Wrong password')
    }
  }

  useEffect(() => {
    if (!authed) return
    axios.get(`${API}/bookings`).then(r => setBookings(r.data))
    axios.get(`${API}/contact`).then(r => setMessages(r.data))
  }, [authed])

  async function updateStatus(id, status) {
    await axios.patch(`${API}/bookings/${id}/status`, { status })
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  if (!authed) return (
    <div style={{ padding:'60px 5%', maxWidth:'400px', margin:'0 auto' }} className="fade-in">
      <h2 style={titleStyle}>Admin Login</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'14px', marginTop:'24px' }}>
        <input
          style={input}
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
        />
        {error && <p style={{ color:'red', fontSize:'13px' }}>{error}</p>}
        <button style={btn} onClick={login}>Login</button>
      </div>
    </div>
  )

  return (
    <div style={{ padding:'40px 5%', maxWidth:'1100px', margin:'0 auto' }} className="fade-in">
      <h2 style={titleStyle}>Admin Dashboard</h2>

      {/* Summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'16px', margin:'24px 0' }}>
        {[
          { label:'Total Bookings', value: bookings.length, icon:'📋' },
          { label:'Pending',        value: bookings.filter(b => b.status === 'pending').length, icon:'⏳' },
          { label:'Confirmed',      value: bookings.filter(b => b.status === 'confirmed').length, icon:'✅' },
          { label:'Messages',       value: messages.length, icon:'📨' },
        ].map(c => (
          <div key={c.label} style={statCard}>
            <div style={{ fontSize:'28px', marginBottom:'8px' }}>{c.icon}</div>
            <strong style={{ fontSize:'28px', fontFamily:"'Bebas Neue',sans-serif", color:'var(--green)' }}>{c.value}</strong>
            <span style={{ fontSize:'12px', color:'var(--muted)' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
        <button style={{ ...tabBtn, ...(tab === 'bookings' ? tabActive : {}) }} onClick={() => setTab('bookings')}>Bookings</button>
        <button style={{ ...tabBtn, ...(tab === 'messages' ? tabActive : {}) }} onClick={() => setTab('messages')}>Messages</button>
      </div>

      {/* Bookings table */}
      {tab === 'bookings' && (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr style={theadRow}>
                {['Name','Phone','Service','Date','Time','Address','Status','Action'].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr><td colSpan={8} style={{ padding:'24px', textAlign:'center', color:'var(--muted)' }}>No bookings yet</td></tr>
              )}
              {bookings.map(b => (
                <tr key={b.id} style={tr}>
                  <td style={td}><strong>{b.full_name}</strong><br/><span style={{ fontSize:'12px', color:'var(--muted)' }}>{b.email}</span></td>
                  <td style={td}>{b.phone}</td>
                  <td style={td}>{b.service_name}</td>
                  <td style={td}>{b.preferred_date}</td>
                  <td style={td}>{b.preferred_time}</td>
                  <td style={td} title={b.address}>{b.address.slice(0,25)}...</td>
                  <td style={td}><span style={{ ...statusBadge, ...statusColor(b.status) }}>{b.status}</span></td>
                  <td style={td}>
                    <select
                      style={selectEl}
                      value={b.status}
                      onChange={e => updateStatus(b.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Messages table */}
      {tab === 'messages' && (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr style={theadRow}>
                {['Name','Email','Phone','Subject','Message'].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 && (
                <tr><td colSpan={5} style={{ padding:'24px', textAlign:'center', color:'var(--muted)' }}>No messages yet</td></tr>
              )}
              {messages.map(m => (
                <tr key={m.id} style={tr}>
                  <td style={td}><strong>{m.full_name}</strong></td>
                  <td style={td}>{m.email}</td>
                  <td style={td}>{m.phone || '—'}</td>
                  <td style={td}>{m.subject}</td>
                  <td style={td}>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const statusColor = s => ({
  pending:   { background:'#fff3cd', color:'#856404' },
  confirmed: { background:'#d1e7dd', color:'#0a3622' },
  completed: { background:'#cfe2ff', color:'#084298' },
  cancelled: { background:'#f8d7da', color:'#842029' },
}[s] || {})

const titleStyle = { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)', marginBottom:'8px' }
const input      = { padding:'10px 14px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'14px', fontFamily:"'DM Sans',sans-serif", outline:'none' }
const btn        = { padding:'12px', background:'var(--green)', color:'#fff', border:'none', borderRadius:'6px', fontSize:'15px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }
const statCard   = { background:'#fff', border:'1px solid var(--border)', borderRadius:'10px', padding:'20px', display:'flex', flexDirection:'column', gap:'4px' }
const tabBtn     = { padding:'8px 20px', border:'1px solid var(--border)', borderRadius:'6px', background:'#fff', cursor:'pointer', fontSize:'13px', fontWeight:500, fontFamily:"'DM Sans',sans-serif" }
const tabActive  = { background:'var(--green)', color:'#fff', borderColor:'var(--green)' }
const tableWrap  = { overflowX:'auto', borderRadius:'10px', border:'1px solid var(--border)' }
const table      = { width:'100%', borderCollapse:'collapse', background:'#fff' }
const theadRow   = { background:'var(--green-pale)' }
const th         = { padding:'12px 16px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'var(--green)', letterSpacing:'.5px', textTransform:'uppercase' }
const tr         = { borderTop:'1px solid var(--border)' }
const td         = { padding:'12px 16px', fontSize:'13px', verticalAlign:'top' }
const statusBadge= { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:700 }
const selectEl   = { padding:'6px 10px', borderRadius:'4px', border:'1px solid var(--border)', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", cursor:'pointer' }
