import './EditProfile.css'
import { useEffect, useState } from 'react'
import { useSetModal, useSetUser, useUser } from '../hooks'
import Loading from '../Loading'
import { validateData } from '../utils/validateData'
import EditPrrofileForm from './EditProfileForm'
import Oops from '../Oops'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

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
    const [error, setError] = useState(null)

    useEffect(() => {
        setErrorType('')
        setErrorText('')
        const loadData = async () => {
            try {
                const response = await fetch(SERVER_URL + '/users/profile', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const data = await response.json()
                setUserData(data)
                setError(null)
            } catch(error) {
                setError(error)
            }

            }
            loadData()
    }, [user])

    if(error) return <Oops />
    if(!userData) return <Loading />

    const handleProfilePic = e => {
        setPicName(e.target.files[0].name)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const picture = e.target.picture.files[0]
        const fd = new FormData()

        if(!firstName && !lastName && !email && !bio && !password && !picture) return

        const { errorTypeValidation, errorTextValidation } = validateData(firstName, lastName, email, emailConfirm, bio, password, passConfirm)

        if (errorTypeValidation) {
            setErrorType(errorTypeValidation)
            setErrorText(errorTextValidation)
            document.getElementById(errorTypeValidation).focus()
            return
        }


        if (firstName) {
            fd.append("firstName", firstName)
        }
        if (lastName) {
            fd.append("lastName", lastName)
        }
        if (email && email === emailConfirm) {
            fd.append("email", email)
        }
        if (bio) {
            fd.append("bio", bio)
            setBio('')
        }
        if (password && password === passConfirm) {
            fd.append("password", password)
        }
        picture && fd.append("picture", picture)

        const res = await fetch(SERVER_URL + '/users/', {
            method: 'PATCH',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })

        if (res.ok) {
            const data = await res.json()
            const newUser = data.user
            setFirstName('')
            setLastName('')
            setEmail('')
            setEmailConfirm('')
            setBio('')
            setPassword('')
            setPassConfirm('')
            setPicName('')
            setModal(
                <article className='edit-confirm-message-container'>
                    <p>Tus cambios se guardaron correctamente. Recuerda que si registraste un nuevo e-mail, deberás activar tu cuenta desde el mensaje de activación que hemos enviado a tu correo.</p>
                </article>
            )
            setUser({
                token: user.token,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                picture: newUser.picture
            })
        } else if (res.status === 409) {
            setErrorType('email')
            setErrorText('El email ya está en uso')
            return
        } else {
            setModal(<p>No se ha podido realizar la acción</p>)
        }
    }

    return (
        <div className="edit-profile-page">
            <h2>Edita tus datos</h2>
            <p>Aquí puedes editar tus datos de perfil.</p>
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

export default EditProfile
