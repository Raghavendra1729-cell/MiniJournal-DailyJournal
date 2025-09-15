import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

function Register({ onAuthed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectedRef = useRef(false)
  const [form, setForm] = useState({ name: '', userName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const prof = await api.getProfile()
        if (mounted && prof?.user && !redirectedRef.current && location.pathname !== '/') {
          redirectedRef.current = true
          onAuthed(prof.user)
          navigate('/', { replace: true })
        }
      } catch {}
    })()
    return () => { mounted = false }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await api.register({ name: form.name, userName: form.userName, email: form.email, password: form.password })
    const prof = await api.getProfile()
    const user = prof.user
    localStorage.setItem("mj_user", JSON.stringify(user))
    onAuthed(user)
    navigate("/")
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create account</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4" autoComplete="off">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded-md border px-3 py-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input className="w-full rounded-md border px-3 py-2" value={form.userName} onChange={e => setForm({ ...form, userName: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md border px-3 py-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button type="button" onClick={handleSubmit} disabled={loading} className="w-full rounded-md bg-gray-900 text-white py-2">
          {loading ? 'Please wait…' : 'Sign up'}
        </button>
        <p className="text-sm text-gray-600">
          Have an account? <Link to="/login" className="text-gray-900 underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}

export default Register


