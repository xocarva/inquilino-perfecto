import { useState } from 'react'
import './EditProfile.css'

function EditProfileForm({ handleSubmit, firstName, setFirstName, userData, errorType, setErrorType, errorText, lastName, setLastName, email, setEmail, emailConfirm, setEmailConfirm, bio, setBio, password, setPassword, passConfirm, setPassConfirm, picName, handleProfilePic }) {

    const [showPassword, setShowPassword] = useState(false)
    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form className='input-container-profile' onSubmit={handleSubmit}>
                <div className='up-container-profile'>
                    <label className='first-name-profile'>
                        Nombre
                        <input autoFocus id='firstName' value={firstName} onChange={e => {
                            setFirstName(e.target.value)
                            setErrorType('')
                        }} placeholder={userData.firstName} />
                        {errorType === 'firstName' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <label className='last-name-profile'>
                        Apellidos
                        <input id='lastName' value={lastName} onChange={e => {
                            setLastName(e.target.value)
                            setErrorType('')
                        }} placeholder={userData.lastName} />
                        {errorType === 'lastName' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <label className='email-profile'>
                        Email
                        <input type='email' id='email' value={email} onChange={e => {
                            setEmail(e.target.value)
                            setErrorType('')
                        }} placeholder={userData.email} />
                        {errorType === 'email' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <label className='confirm-email-profile'>
                        Confirma email <span className='check-emoji'>{email ? email === emailConfirm ? " ✅ " : '❌' : ''}</span>
                        <input type='email' value={emailConfirm} onChange={e => {
                            setEmailConfirm(e.target.value)
                            setErrorType('')
                        }} placeholder={userData.email} />
                    </label>
                </div>
                <label className='bio-profile'>
                    Mi Bio
                    <textarea id='bio' value={bio} onChange={e => {
                        setBio(e.target.value)
                        setErrorType('')
                    }} placeholder={userData.bio} />
                    {errorType === 'bio' && <p className='error-text'>{errorText}</p>}
                </label>
                <div className='down-container-profile'>
                    <div className='pass-container'>
                    <label className='password-profile'>
                        Contraseña {password && <span className='eye-password' onClick={handlerShowPassword} >👀</span>}
                        <input id='password' type={showPassword ? "text" : "password"} value={password} placeholder='********' onChange={e => {
                            setPassword(e.target.value)
                            setErrorType('')
                        }} />
                        {errorType === 'password' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <label className='confirm-password-profile'>
                        Confirma contraseña<span className='check-emoji'>{password ? passConfirm === password ? " ✅ " : '❌' : ''}</span>
                        <input type={showPassword ? "text" : "password"} value={passConfirm} placeholder='********' onChange={e => {
                            setPassConfirm(e.target.value)
                            setErrorType('')
                        }} />
                    </label>
                    </div>
                    <div className='picture-container'>
                        <label htmlFor='btn-picture' className='picture'>Editar foto...</label>
                        <span id='chosen-file'>{picName}</span>
                        <input id='btn-picture' name='picture' type="file" accept="image/x-png,image/gif,image/jpeg,image/png" hidden onChange={handleProfilePic} />
                    </div>
            </div>
            <button className='edit-button-profile'>Guardar cambios</button>
        </form>
    )
}

export default EditProfileForm
