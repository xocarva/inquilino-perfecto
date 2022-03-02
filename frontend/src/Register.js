import './Register.css'
import { useState } from 'react'
import { useSetModal, useUser } from './hooks'
import { useNavigate } from 'react-router-dom';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function Register() {
    const [firstName, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mailConfirm, setMailConfirm] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [error, setError] = useState()
    const [picName, setPicName] = useState('No se ha cargado foto')
    const Navigation = useNavigate()
    const setModal = useSetModal()
    const user = useUser()

    if (user) {
        Navigation('/')
    }

    let isValidEmailCheck
    let emailPattern = /^[\w]+@{1}[\w]+\.+[a-z]$/
    const isValidEmail = emailPattern.test(email)
    isValidEmail ? isValidEmailCheck = '✅' : isValidEmailCheck = '❌'

    const handleSubmit = async e => {
        e.preventDefault()
        const picture = e.target.picture.files[0]
        const fd = new FormData()
        let firstNamePattern = /(^[A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
        const isValidFirstName = firstNamePattern.test(firstName)

        let lastNamePattern = /(^[A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
        const isValidLastName = lastNamePattern.test(lastName)

        let bioPattern = /^[A-ZÁÉÍÓÚ]/
        const isValidBio = bioPattern.test(bio)

        switch (true) {
            case firstName &&
                (!isValidFirstName || firstName.length < 2 || firstName.length > 80):
                setModal(<p>Tu nombre debe empezar por mayúscula y contener entre 2 y 80 carácteres.</p>)
                setName('')
                return
            case lastName &&
                (!isValidLastName || lastName.length < 2 || lastName.length > 80):
                setModal(<p>Tu apellido debe empezar por mayúscula y contener entre 2 y 80 carácteres.</p>)
                setLastName('')
                return
            case email !== mailConfirm:
                setModal(<p>El correo no coincide.</p>)
                setEmail('')
                setMailConfirm('')
                return
            case email && !isValidEmail:
                setModal(<p>Correo no válido.</p>)
                setEmail('')
                setMailConfirm('')
                return
            case bio && (!isValidBio || bio.length < 10 || bio.length >= 200):
                setModal(<p>Tu bio debe contener entre 10 y 200 carácteres.</p>)
                setBio('')
                return
            case password !== passConfirm:
                setModal(<p>La contraseña no coincide.</p>)
                setPass('')
                setPassConfirm('')
                return
            case password && (password.length < 5 || password.length >= 50):
                setModal(<p>Tu contraseña debe contener entre 5 y 50 carácteres.</p>)
                setPass('')
                setPassConfirm('')
                return
            default:
                break
        }
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
                        <input className='input-register' type='text' name='nombre' value={firstName} placeholder='Nombre...' required onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Apellido
                        <input className='input-register' type='text' name='apellido' value={lastName} placeholder='Apellido...' required onChange={e => setLastName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input className='input-register' name='email' type='email' value={email} placeholder='Email...' required onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Confirma Email {email ? email === mailConfirm ? isValidEmailCheck : '❌' : ''}
                        <input className='input-register' name='email' type='email' value={mailConfirm} placeholder='Confirma email...' required onChange={e => setMailConfirm(e.target.value)} />
                    </label>
                </div>
                <label className='bio'>
                    Bio
                    <textarea name='bio' value={bio} placeholder='bio...' required onChange={e => setBio(e.target.value)} />
                </label>
                <div className='picture-container'>
                    <label htmlFor='btn-picture' className='picture'>Cargar foto...</label>
                    <span id='chosen-file'>{picName}</span>
                    <input id='btn-picture' name='picture' type="file" accept="image/x-png,image/gif,image/jpeg,image/png" required hidden onChange={handleProfilePic} />
                </div>
                <div id='pass-div'>
                    <label>
                        Contraseña
                        <input className='input-register' name='contraseña' type='password' value={password} placeholder='Contraseña...' required onChange={e => setPass(e.target.value)} />
                    </label >
                    <label>
                        Confirma contraseña {password ? (password === passConfirm) ? '✅' : '❌' : ''}
                        <input className='input-register' name='contraseña' type='password' value={passConfirm} placeholder='Confirma contraseña...' required onChange={e => setPassConfirm(e.target.value)} />
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



