import './Register.css'
import { useState } from 'react'
import { useSetModal } from './hooks'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'


function Register() {
    const [firstName, setName] = useState('')
    const [lastName, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [mailConfirm, setMailConfirm] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [error, setError] = useState()
    const Navigation = useNavigate()
    const setModal = useSetModal()
    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()
        const picture = e.target.picture.files[0]
        const fd = new FormData()
        fd.append('firstName', firstName)
        fd.append('lastName', lastName)
        fd.append('email', email)
        fd.append('bio', bio)
        fd.append('picture', picture)
        fd.append('password', password)
        const res = await fetch('http://localhost:3001/users/register', {
            method: 'POST',
            body: fd
        })
        let data = await res.json()

        if (res.ok) {
            setModal(true)
            dispatch({
                type: 'modal',
                modal: `Te has registrado correctamente, recibiras un mail de confirmación a ${email}`
            })
            Navigation('/')
        } else {
            setError(data.error)
        }
    }

    return (
        <>
            <p className='titleRegisterPage'>Formulario de registro</p>
            <form className='registerPage' onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nombre <br />
                        <input className='inputTextRegister' name='nombre' value={firstName} placeholder='Write First Name...' onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Apellido <br />
                        <input className='inputTextRegister' name='apellido' value={lastName} placeholder='Write Last Name...' onChange={e => setLast(e.target.value)} />
                    </label>
                    <label>
                        Email <br />
                        <input className='inputTextRegister' name='email' type='email' value={email} placeholder='Write email...' onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Confirma Email <br />
                        <input className='inputTextRegister' name='email' type='email' value={mailConfirm} placeholder='confirm email...' onChange={e => setMailConfirm(e.target.value)} />
                        {email === mailConfirm ? '✅' : '❌'}
                    </label>
                </div>
                <div>
                    <label>
                        Bio <br />
                        <textarea name='bio' value={bio} placeholder='...Write bio...' onChange={e => setBio(e.target.value)} />
                    </label>
                    <label className='picture'>
                        <input name='picture' type="file" accept="image/x-png,image/gif,image/jpeg" />
                    </label>
                </div>
                <div className='pass-div'>
                    <label>
                        Contraseña <br />
                        <input className='inputTextRegister' name='contraseña' type='password' value={password} placeholder='Write pass...' onChange={e => setPass(e.target.value)} />
                    </label >
                    <label>
                        Confirma contraseña <br />
                        <input className='inputTextRegister' name='contraseña' type='password' value={passConfirm} placeholder='Write pass...' onChange={e => setPassConfirm(e.target.value)} />
                        {password === passConfirm ? '✅' : '❌'}
                    </label>
                </div>
                <button className='registerButton'>
                    Registrar
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}

export default Register



