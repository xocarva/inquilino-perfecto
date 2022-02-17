import './EditProfile.css'
import { Suspense, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetModal, useSetUser, useUser } from '../hooks'
import useFetch from "../useFetch"
import Loading from '../Loading'
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function EditProfile() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [bio, setBio] = useState('')

    const user = useUser()
    const setUser = useSetUser()
    const setModal = useSetModal()
    // const navigate = useNavigate()

    const userData = useFetch(REACT_APP_BASE_URL + '/users/profile', {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    })


    const handleSubmit = async e => {
        e.preventDefault()
        const picture = e.target.picture.files[0]
        const fd = new FormData()
        firstName && fd.append('firstName', firstName)
        lastName && fd.append('lastName', lastName)
        email && fd.append('email', email)
        bio && fd.append('bio', bio)
        picture && fd.append('picture', picture)
        password && fd.append('password', password)
        const res = await fetch(REACT_APP_BASE_URL + '/users/', {
            method: 'PATCH',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='edit-confirm-message-container'>
                    <span>✅</span>
                    <p>Tus cambios se guardaron correctamente.</p>
                    <p>Recuerda que si registraste un nuevo e-mail, deberás activar tu cuenta desde el mensaje de activación que hemos enviado a tu correo.</p>
                    <Link className='link-modal-edit-profile' to='/user/edit-profile' onClick={e => setModal(false)} >Aceptar</Link>
                </article>
            )
            let newUserData = { ...user }
            if(firstName) newUserData = { ...user, firstName}
            if(lastName) newUserData = { ...user, lastName}
            if(email) newUserData = { ...user, email}
            if(bio) newUserData = { ...user, bio}
            // if(picture) newUserData = { ...user, picture: res.picture}
            setUser(newUserData)
            window.location.reload(true)
        }
    }

    const handleAvatar = e => {
        setModal(<div className='avatar-preview' style={{ backgroundImage: `url(${REACT_APP_BASE_URL}/${userData.picture} )`}}/>)
    }

    return (
        <div className="edit-profile-page">
            <h3>Edita tus datos:</h3>
            <form className='input-container-profile' onSubmit={handleSubmit}>
                <div className='data-container'>
                    <div className='up-container-profile'>
                        <label className='first-name-profile'>
                    Nombre:
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={userData.firstName} />
                </label>
                <label className='last-name-profile'>
                    Apellidos:
                    <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder={userData.lastName} />
                </label>
                <label className='email-profile'>
                    Email:
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder={userData.email} />
                </label>
                <label className='confirm-email-profile'>
                    Confirma email:
                    {email === emailConfirm ? '✅' : '❌'}
                    <input  value={emailConfirm}  onChange={e => setEmailConfirm(e.target.value)} />
                </label>
                    </div>
                <label className='bio-profile'>
                    Mi Bio:
                    <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder={userData.bio} />
                </label>
                <div className='down-container-profile'>
                    <label className='password-profile'>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='confirm-password-profile'>
                    Confirma password:
                    {passConfirm === password ? '✅' : '❌'}
                    <input type="password" value={passConfirm} onChange={e => setPassConfirm(e.target.value)} />
                </label>
                </div>
                </div>
                <div className='avatar-container'>
                    <div onClick={handleAvatar} className='avatar' style={{ backgroundImage: `url(${REACT_APP_BASE_URL}/${userData.picture} )`}}/>
                    <label className='camera-button'>
                        <div>📷</div>
                        <input className='upload-avatar' name='picture' type='file' accept="image/x-png,image/gif,image/jpeg,image/png" onChange={e => e.preventDefault()}/>
                    </label>
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
