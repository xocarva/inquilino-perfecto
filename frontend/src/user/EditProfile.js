import './EditProfile.css'
import { Suspense, useEffect, useState } from 'react'
import { useSetModal, useSetUser, useUser } from '../hooks'
import Loading from '../Loading'
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function EditProfile() {
    const user = useUser()
    const setUser = useSetUser()
    const setModal = useSetModal()
    const [userData, setUserData] = useState(user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [bio, setBio] = useState('')
    const [picName, setPicName] = useState('No se ha cargado foto')


    useEffect(() => {
        fetch(REACT_APP_BASE_URL + '/users/profile', {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
        })
        .then(response => response.json())
        .then(data => setUserData(data))
    }, [user])


    const handleProfilePic = e => {
        setPicName(e.target.files[0].name)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const picture = e.target.picture.files[0]
        const fd = new FormData()

        firstName && fd.append('firstName', firstName)
        let firstNamePattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
        const isValidFirstName = firstNamePattern.test(firstName)
        if(firstName && (!isValidFirstName || firstName.length < 2 || firstName.length > 80)) setModal(<p>Tu nombre debe empezar por mayúscula y contener entre 2 y 80 carácteres.</p>)

        lastName && fd.append('lastName', lastName)
        let lastNamePattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
        const isValidLastName = lastNamePattern.test(firstName)
        if(lastName && (!isValidLastName || lastName.length < 2 || lastName.length > 80)) setModal(<p>Tu apellido debe empezar por mayúscula y contener entre 2 y 80 carácteres.</p>)

        email && fd.append('email', email)
        email !== emailConfirm && setModal(<p>El correo no coincide.</p>)
        let emailPattern = /^[\w]+@{1}[\w]+\.+[a-z]{2,3}$/;
        const isValidEmail = emailPattern.test(email)
        if(email && !isValidEmail) setModal(<p>Correo no válido.</p>)

        bio && fd.append('bio', bio)
        let bioPattern = /^[A-Z]/
        const isValidBio = bioPattern.test(bio)
        if(bio && (!isValidBio || bio.length < 10 || bio.length >= 200)) setModal(<p>Tu bio debe empezar por mayúscula y contener entre 10 y 200 carácteres.</p>)

        picture && fd.append('picture', picture)

        password && fd.append('password', password)
        password !== passConfirm && setModal(<p>La contraseña no coincide.</p>)
        if(password && (password.length < 5 || password.length >= 50)) setModal(<p>Tu contraseña debe contener entre 5 y 50 carácteres.</p>)

        const res = await fetch(REACT_APP_BASE_URL + '/users/', {
            method: 'PATCH',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        const newUser = data.user

        if (res.ok) {
            setModal(
                <article className='edit-confirm-message-container'>
                    <span>✅</span>
                    <p>Tus cambios se guardaron correctamente.</p>
                    <p>Recuerda que si registraste un nuevo e-mail, deberás activar tu cuenta desde el mensaje de activación que hemos enviado a tu correo.</p>
                </article>
            )
            setUser({
                token: user.token,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                picture: newUser.picture
            })
            setFirstName('')
            setLastName('')
            setEmail('')
            setEmailConfirm('')
            setBio('')
            setPassword('')
            setPassConfirm('')
            setPicName('')
        }
    }

    return (
        <div className="edit-profile-page">
            <h3>Edita tus datos:</h3>
            <form className='input-container-profile' onSubmit={handleSubmit}>
                <div className='data-container'>
                    <div className='up-container-profile'>
                        <label className='first-name-profile'>
                    Nombre
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={userData.firstName} />
                </label>
                <label className='last-name-profile'>
                    Apellidos
                    <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder={userData.lastName} />
                </label>
                <label className='email-profile'>
                    Email
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder={userData.email} />
                </label>
                <label className='confirm-email-profile'>
                    Confirma email
                    { email ? email === emailConfirm ? '✅' : '❌' : ''}
                    <input  value={emailConfirm}  onChange={e => setEmailConfirm(e.target.value)} placeholder={userData.email} />
                </label>
                    </div>
                <label className='bio-profile'>
                    Mi Bio
                    <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder={userData.bio} />
                </label>
                <div className='down-container-profile'>
                    <label className='password-profile'>
                    Contraseña
                    <input type="password" value={password} placeholder='********' onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='confirm-password-profile'>
                    Confirma contraseña
                    { password ? passConfirm === password ? '✅' : '❌' : ''}
                    <input type="password" value={passConfirm} placeholder='********' onChange={e => setPassConfirm(e.target.value)} />
                </label>
                <div className='picture-container'>
                    <label htmlFor='btn-picture' className='picture'>Editar foto...</label>
                    <span id='chosen-file'>{picName}</span>
                    <input id='btn-picture' name='picture' type="file" accept="image/x-png,image/gif,image/jpeg,image/png" hidden onChange={handleProfilePic} />
                </div>
                </div>
                </div>
                <button className='edit-button-profile'>Guardar cambios</button>
            </form>
        </div>
    )
}


const ProfileWrapper = () =>
    <Suspense fallback={<Loading className="edit-profile-page" />}>
        <EditProfile />
    </Suspense>

export default ProfileWrapper
