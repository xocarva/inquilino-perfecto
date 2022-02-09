import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetModal, useSetUser } from './hooks'
import './Login.css'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setUser = useSetUser()
  const setModal = useSetModal()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:3001/users/login', {
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
      navigate('/')
    } else {
      setError(data.error)
    }
  }

  return (
    <>
    <form className="login" onSubmit={handleSubmit}>
        <label>
          Emal 
          <input name='email' type='email' placeholder='example@example.com...'value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña 
          <input name='contraseña' type='password' placeholder='password...' value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className='entrarButton'>Login</button>
        {error && <div className="error">{error}</div>}
        <p>No estas registrado?</p>
    </form>
      <Link to="/register" onClick={() => setModal(false)} className='noTengoCuentaButton'><span className='noTengoCuentaButton'>Regístrate</span></Link>
    </>
  )
}

export default Login