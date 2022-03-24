import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSetModal, useSetUser } from './hooks'

const SERVER_URL = process.env.REACT_APP_SERVER_URL


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const setUser = useSetUser()
  const setModal = useSetModal()

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch(SERVER_URL + '/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const data = await res.json()
      setUser(data)
      setModal(false)
    } else if (res.status === 404) {
      setError(<p>Email no registrado</p>)
      setEmail('')
    } else if (res.status === 401) {
      setError(<p>Contraseña inválida</p>)
      setPassword('')
    } else if (res.status === 400) {
      setError(
        <>
          <p>Formato de email</p>
          <p>inválido</p>
        </>
      )
    } else {
      setError(<p>Error !!!</p>)
    }
  }

  return (
    <div className='body-login'>
      <form className="login" onSubmit={handleSubmit}>
        <label>
          Email
          <input name='email' type='email' placeholder='ejemplo@ejemplo.com...' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña
          <input name='contraseña' type='password' placeholder='contraseña...' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className='entrar-button'>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>¿No estás registrado?</p>
      <Link to="/register" onClick={() => setModal(false)} className='register-button'>Regístrate</Link>
    </div>
  )
}

export default Login