import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import './login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      nav('/todos')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2>Welcome Back 👋</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={login} className="login-form">

          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button disabled={loading} className="login-btn">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?
          <Link to="/signup"> Sign up</Link>
        </p>

      </div>
    </div>
  )
}
