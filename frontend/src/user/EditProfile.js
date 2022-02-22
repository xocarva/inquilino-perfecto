import './EditProfile.css'
import { Suspense, useState } from 'react'
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
            window.location.reload(true)
        }
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
                    <input  value={emailConfirm}  onChange={e => setEmailConfirm(e.target.value)} placeholder={userData.email} />
                </label>
                    </div>
                <label className='bio-profile'>
                    Mi Bio:
                    <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder={userData.bio} />
                </label>
                <div className='down-container-profile'>
                    <label className='password-profile'>
                    Password:
                    <input type="password" value={password} placeholder='********' onChange={e => setPassword(e.target.value)} />
                </label>
                <label className='confirm-password-profile'>
                    Confirma password:
                    {passConfirm === password ? '✅' : '❌'}
                    <input type="password" value={passConfirm} placeholder='********' onChange={e => setPassConfirm(e.target.value)} />
                </label>
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
