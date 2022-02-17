import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetModal, useSetUser } from './hooks'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setUser = useSetUser()
  const setModal = useSetModal()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(REACT_APP_BASE_URL +'/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data)
      setModal(false)
    } else {
      setError(data.error)
    }
  }

  return (
    <div className='body-login'>
    <form className="login" onSubmit={handleSubmit}>
        <label>
          Email
          <input name='email' type='email' placeholder='ejemplo@ejemplo.com...'value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña
          <input name='contraseña' type='password' placeholder='contraseña...' value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className='entrar-button'>Login</button>
        {error && <div className="error">{error}</div>}
        <p>No estas registrado?</p>
    </form>
      <Link to="/register" onClick={() => setModal(false)} className='register-button'><span className='register-button'>Regístrate</span></Link>
    </div>
  )
}

export default Login