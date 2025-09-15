import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

function Login({ onAuthed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectedRef = useRef(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
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
    setError("")
    setLoading(true)
    try {
      await api.login({ email, password })
      const prof = await api.getProfile()
      const user = prof.user
      localStorage.setItem("mj_user", JSON.stringify(user))
      onAuthed(user)
      navigate("/")
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4" autoComplete="off">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md border px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="button" onClick={handleSubmit} disabled={loading} className="w-full rounded-md bg-gray-900 text-white py-2">
          {loading ? 'Please wait…' : 'Sign in'}
        </button>
        <p className="text-sm text-gray-600">
          No account? <Link to="/register" className="text-gray-900 underline">Create one</Link>
        </p>
      </form>
    </div>
  )
}

export default Login


