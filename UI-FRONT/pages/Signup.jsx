import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  const signup = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.post('/auth/signup', { email, password })
      nav('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account 🚀</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={signup}>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" disabled={loading}>
            {loading ? 'Creating...' : 'Signup'}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

      </div>
    </div>
  )
}
