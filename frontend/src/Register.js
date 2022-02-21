import './Register.css'
import { useState } from 'react'
import { useSetModal } from './hooks'
import { useNavigate } from 'react-router-dom';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function Register() {
    const [firstName, setName] = useState('')
    const [lastName, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [mailConfirm, setMailConfirm] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [error, setError] = useState()
    const [picName, setPicName] = useState('No se ha cargado foto')
    const Navigation = useNavigate()
    const setModal = useSetModal()

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
        const res = await fetch(REACT_APP_BASE_URL + '/users/register', {
            method: 'POST',
            body: fd
        })
        let data = await res.json()

        if (res.ok) {
            setModal(<p>{`Te has registrado correctamente, recibiras un mail de confirmación a ${email}`}</p>)
            Navigation('/')
        } else {
            setError(data.error)
        }
    }

    const handleProfilePic = e => {
        setPicName(e.target.files[0].name)
    }

    return (
        <div className='body-register'>
            <h2 className='title-register-page'>Formulario de registro</h2>
            <form className='register-page' onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nombre
                        <input className='input-register' type='text' name='nombre' value={firstName} placeholder='Nombre...' onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Apellido
                        <input className='input-register' type='text' name='apellido' value={lastName} placeholder='Apellido...' onChange={e => setLast(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input className='input-register' name='email' type='email' value={email} placeholder='Email...' onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Confirma Email {email ? email === mailConfirm ? '✅' : '❌' : ''}
                        <input className='input-register' name='email' type='email' value={mailConfirm} placeholder='Confirma email...' onChange={e => setMailConfirm(e.target.value)} />
                    </label>
                </div>
                <label className='bio'>
                    Bio
                    <textarea name='bio' value={bio} placeholder='bio...' onChange={e => setBio(e.target.value)} />
                </label>
                <div className='picture-container'>
                    <label for='btn-picture' className='picture'>Cargar foto...</label>
                    <span id='chosen-file'>{picName}</span>
                    <input id='btn-picture' name='picture' type="file" accept="image/x-png,image/gif,image/jpeg,image/png" hidden onChange={handleProfilePic} />
                </div>
                <div id='pass-div'>
                    <label>
                        Contraseña
                        <input className='input-register' name='contraseña' type='password' value={password} placeholder='Contraseña...' onChange={e => setPass(e.target.value)} />
                    </label >
                    <label>
                        Confirma contraseña {password ? (password === passConfirm) ? '✅' : '❌' : ''}
                        <input className='input-register' name='contraseña' type='password' value={passConfirm} placeholder='Confirma contraseña...' onChange={e => setPassConfirm(e.target.value)} />
                    </label>
                </div>
                <div id='register-button'>
                    <button>
                        Registrar
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Register



