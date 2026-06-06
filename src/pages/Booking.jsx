import { useState, useEffect } from 'react'
import { getServices, createBooking } from '../api'

export default function Booking() {
  const [services, setServices] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    full_name:'', email:'', phone:'', address:'',
    service_id:'', preferred_date:'', preferred_time:'', notes:''
  })

  useEffect(() => {
    getServices().then(res => setServices(res.data))
    // Set min date to today
    const today = new Date().toISOString().split('T')[0]
    setForm(f => ({ ...f, preferred_date: today }))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.full_name || !form.email || !form.phone || !form.address || !form.service_id || !form.preferred_date || !form.preferred_time) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await createBooking({ ...form, service_id: parseInt(form.service_id), notes: form.notes || null })
      setSubmitted(true)
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div style={{ padding:'60px 5%' }} className="fade-in">
      <div style={successBox}>
        <div style={{ fontSize:'48px', marginBottom:'16px' }}>✅</div>
        <h2 style={{ fontSize:'32px', marginBottom:'8px' }}>Booking Received!</h2>
        <p style={{ color:'var(--muted)' }}>We'll call you within 24 hours to confirm your appointment.</p>
      </div>
    </div>
  )

  return (
    <div style={{ padding:'60px 5%', maxWidth:'1100px', margin:'0 auto' }} className="fade-in">
      <p style={labelStyle}>Schedule a Visit</p>
      <h2 style={titleStyle}>Book a Service</h2>
      <p style={subStyle}>Fill in the form and our team will confirm within 24 hours.</p>

      <div style={formCard}>
        <form onSubmit={handleSubmit}>
          <div style={grid} className="form-grid-2col">
            <div style={group}>
              <label style={labelEl}>Full Name *</label>
              <input style={input} name="full_name" placeholder="John Mensah" value={form.full_name} onChange={handleChange} />
            </div>
            <div style={group}>
              <label style={labelEl}>Phone *</label>
              <input style={input} name="phone" placeholder="+234 800 000 0000" value={form.phone} onChange={handleChange} />
            </div>
            <div style={group}>
              <label style={labelEl}>Email *</label>
              <input style={input} name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div style={group}>
              <label style={labelEl}>Service *</label>
              <select style={input} name="service_id" value={form.service_id} onChange={handleChange}>
                <option value="">Select a service...</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name} — from ₦{s.price_from.toLocaleString()}</option>)}
              </select>
            </div>
            <div style={group}>
              <label style={labelEl}>Preferred Date *</label>
              <input style={input} name="preferred_date" type="date" value={form.preferred_date} onChange={handleChange} />
            </div>
            <div style={group}>
              <label style={labelEl}>Preferred Time *</label>
              <select style={input} name="preferred_time" value={form.preferred_time} onChange={handleChange}>
                <option value="">Choose time slot...</option>
                <option value="08:00">8:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
            <div style={{ ...group, gridColumn:'1/-1' }}>
              <label style={labelEl}>Property Address *</label>
              <input style={input} name="address" placeholder="14 Lagos Street, Abuja" value={form.address} onChange={handleChange} />
            </div>
            <div style={{ ...group, gridColumn:'1/-1' }}>
              <label style={labelEl}>Additional Notes</label>
              <textarea style={{ ...input, minHeight:'90px', resize:'vertical' }} name="notes" placeholder="Describe the pest problem in detail..." value={form.notes} onChange={handleChange} />
            </div>
          </div>

          {error && <p style={{ color:'#c0392b', fontSize:'13px', marginTop:'12px' }}>{error}</p>}

          <button type="submit" style={{ ...submitBtn, opacity: loading ? .7 : 1 }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelStyle = { fontSize:'11px', fontWeight:700, letterSpacing:'2px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'8px', display:'block' }
const titleStyle = { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)', marginBottom:'8px' }
const subStyle   = { color:'var(--muted)', marginBottom:'32px' }
const formCard   = { background:'#fff', border:'1px solid var(--border)', borderRadius:'12px', padding:'32px', maxWidth:'680px' }
const grid       = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }
const group      = { display:'flex', flexDirection:'column', gap:'6px' }
const labelEl    = { fontSize:'13px', fontWeight:600, color:'var(--text)' }
const input      = { padding:'10px 14px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'14px', fontFamily:"'DM Sans',sans-serif", color:'var(--text)', background:'var(--bg)', outline:'none', width:'100%' }
const submitBtn  = { marginTop:'20px', background:'var(--green)', color:'#fff', border:'none', padding:'13px 32px', borderRadius:'6px', fontSize:'15px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", width:'100%' }
const successBox = { background:'var(--green-pale)', border:'1px solid #a3d4b0', borderRadius:'12px', padding:'48px', textAlign:'center', maxWidth:'480px' }
