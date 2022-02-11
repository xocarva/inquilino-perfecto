import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSetModal, useSetUser } from './hooks'
import './Login.css'

// Duda dispatch o state?????

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setUser = useSetUser()
  const setModal = useSetModal()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/users/login', {
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
        <span className='labelModal'>Email</span>
        <input name="username" value={email} onChange={e => setEmail(e.target.value)}/>
        <span className='labelModal'>Contraseña</span>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className='entrarButton'>Entrar</button>
        {error && <div className="error">{error}</div>}
    </form>
      <p>No estas registrado?</p>
      <Link to="/users/register" onClick={() => setModal(false)} className='noTengoCuentaButton'><span className='noTengoCuentaButton'>Regístrate</span></Link>
    </>
  )
}

export default Login
