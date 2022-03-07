import './EditProfile.css'
import { Suspense, useEffect, useState } from 'react'
import { useSetModal, useSetUser, useUser } from '../hooks'
import Loading from '../Loading'
import { validateDataProfile } from '../utils/validateDataProfile'
import EditPrrofileForm from './EditProfileForm'
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
    const [errorType, setErrorType] = useState('')
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        setErrorType('')
        setErrorText('')
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

            const getErrorValidateData = validateDataProfile(firstName, lastName, email, emailConfirm, bio, password, passConfirm)
            const { errorTypeValidation, errorTextValidation } = getErrorValidateData

            if(getErrorValidateData) {
            setErrorType(errorTypeValidation)
            setErrorText(errorTextValidation)
            document.getElementById(errorTypeValidation).focus()
            return
        }

        if (firstName) {
            fd.append("firstName", firstName)
            setFirstName('')
        }
        if (lastName) {
            fd.append("lastName", lastName)
            setLastName('')
        }
        if (email && email === emailConfirm) {
            fd.append("email", email)
            setEmail('')
            setEmailConfirm('')
        }
        if (bio) {
            fd.append("bio", bio)
            setBio('')
        }
        if (password && password === passConfirm) {
            fd.append("password", password)
            setPassword('')
            setPassConfirm('')
        }
        picture && fd.append("picture", picture)

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
            <EditPrrofileForm
                handleSubmit={handleSubmit}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                emailConfirm={emailConfirm}
                setEmailConfirm={setEmailConfirm}
                bio={bio}
                setBio={setBio}
                password={password}
                setPassword={setPassword}
                passConfirm={passConfirm}
                setPassConfirm={setPassConfirm}
                picName={picName}
                handleProfilePic={handleProfilePic}
                userData={userData}
                setErrorType={setErrorType}
                errorType={errorType}
                errorText={errorText}
            />
        </div>
    )
}


const ProfileWrapper = () =>
    <Suspense fallback={<Loading className="edit-profile-page" />}>
        <EditProfile />
    </Suspense>

export default ProfileWrapper
