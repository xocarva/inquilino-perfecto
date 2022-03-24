import './Register.css'
import { useState } from 'react'
import { useSetModal, useUser } from './hooks'
import { Link, useNavigate } from 'react-router-dom';
import { validateData } from './utils/validateData';

const SERVER_URL = process.env.REACT_APP_SERVER_URL


function Register() {
    const [firstName, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mailConfirm, setMailConfirm] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [errorType, setErrorType] = useState('')
    const [errorText, setErrorText] = useState('')
    const [picName, setPicName] = useState('No se ha cargado foto')
    const Navigation = useNavigate()
    const setModal = useSetModal()
    const user = useUser()

    if (user) {
        Navigation('/')
    }
    const handleProfilePic = e => {
        setPicName(e.target.files[0].name)
        setErrorType('')
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const picture = e.target.picture.files[0]

        if(!picture) {
            setErrorType('picture')
            setErrorText('Tienes que añadir una foto')
            return
        }

        const fd = new FormData()

        const { errorTypeValidation, errorTextValidation } = validateData(firstName, lastName, email, mailConfirm, bio, password, passConfirm)

        if (errorTypeValidation) {
            setErrorType(errorTypeValidation)
            setErrorText(errorTextValidation)
            document.getElementById(errorTypeValidation + '-register').focus()
            return
        }


        fd.append('firstName', firstName)
        fd.append('lastName', lastName)
        fd.append('email', email)
        fd.append('bio', bio)
        fd.append('picture', picture)
        fd.append('password', password)

        const res = await fetch(SERVER_URL + '/users/register', {
            method: 'POST',
            body: fd
        })

        if (res.ok) {
            setModal(<p>{`Te has registrado correctamente, recibiras un mail de confirmación a ${email}`}</p>)
            Navigation('/')
        } else if (res.status === 409) {
            setErrorText('El usuario ya existe')
            setErrorType('email')
        } else if(res.status === 550) {
            setModal(
                <div>
                    <p>Oops parece que tenemos un problema con el envío del código de activación. Contacta con nosotros. </p>
                    <Link to='/'>Volver</Link>
                </div>
            )
        } else {
            setModal(<p>No se ha podido realizar el registro</p>)
        }
    }


    return (
        <div className='body-register'>
            <h2 className='title-register-page'>Formulario de registro</h2>
            <form className='register-page' onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nombre
                        <input id='firstName-register' className='input-register' type='text' name='nombre' value={firstName} placeholder='Nombre...' required onChange={e => {
                            setName(e.target.value)
                            setErrorType('')
                        }} />
                        {errorType === 'firstName' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <label>
                        Apellido
                        <input className='input-register' id='lastName-register' type='text' name='apellido' value={lastName} placeholder='Apellido...' required onChange={e => {
                            setLastName(e.target.value)
                            setErrorType('')
                        }} />
                        {errorType === 'lastName' && <p className='error-text'>{errorText}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <div className='mail-container'>
                            <input className='input-register' id='email-register' name='email' type='email' value={email} placeholder='Email...' required onChange={e => {
                                setEmail(e.target.value)
                                setErrorText('')
                            }} />
                            {errorType === 'email' && <p className='error-text'>{errorText}</p>}
                        </div>
                    </label>
                    <label>
                        <span>Confirma Email <span className='check-emoji'>{email ? (email === mailConfirm) ? '✅' : '❌' : ''}</span></span>
                        <input className='input-register' name='email' type='email' value={mailConfirm} placeholder='Confirma email...' required onChange={e => setMailConfirm(e.target.value)} />
                    </label>
                </div>
                <label className='bio'>
                    Bio
                    <textarea id='bio-register' name='bio' value={bio} placeholder='bio...' required onChange={e => {
                        setBio(e.target.value)
                        setErrorType('')
                    }} />
                    {errorType === 'bio' && <p className='error-text'>{errorText}</p>}
                </label>
                <div className='picture-container'>
                    <label htmlFor='btn-picture' className='picture'>Cargar foto...</label>
                    {errorType === 'picture' && <span style={{ color: 'red' }}>{errorText}</span>}
                    {errorType !== 'picture'&& <span id='chosen-file'>{picName}</span>}
                    <input id='btn-picture' name='picture' type="file" accept="image/x-png,image/gif,image/jpeg,image/png" hidden onChange={handleProfilePic} />
                </div>
                <div id='pass-div'>
                    <label>
                        Contraseña
                        <input id='password-register' className='input-register' name='contraseña' type='password' value={password} placeholder='Contraseña...' required onChange={e => {
                            setPass(e.target.value)
                            setErrorType('')
                        }} />
                        {errorType === 'password' && <p className='error-text'>{errorText}</p>}
                    </label >
                    <label>
                        <span>Confirma contraseña<span className='check-emoji'>{password ? (password === passConfirm) ? '✅' : '❌' : ''}</span></span>
                        <input className='input-register' name='contraseña' type='password' value={passConfirm} placeholder='Confirma contraseña...' required onChange={e => setPassConfirm(e.target.value)} />
                    </label>
                </div>
                <div id='register-button'>
                    <button>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register



