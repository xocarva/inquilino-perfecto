import './EditProfile.css'

function EditPrrofileForm({ handleSubmit, firstName, setFirstName, userData, errorType, errorText, lastName, setLastName, email, setEmail, emailConfirm, setEmailConfirm, bio, setBio, password, setPassword, passConfirm, setPassConfirm, picName, handleProfilePic }) {
    return(
        <form className='input-container-profile' onSubmit={handleSubmit}>
                <div className='data-container'>
                    <div className='up-container-profile'>
                        <label className='first-name-profile'>
                            Nombre
                            <input id='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={userData.firstName} />
                            {errorType === 'firstName' && <p className='error-text'>{errorText}</p>}
                        </label>
                        <label className='last-name-profile'>
                            Apellidos
                            <input id='lastName' value={lastName} onChange={e => setLastName(e.target.value)} placeholder={userData.lastName} />
                            {errorType === 'lastName' && <p className='error-text'>{errorText}</p>}
                        </label>
                        <label className='email-profile'>
                            Email
                            <input id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder={userData.email} />
                            {errorType === 'email' && <p className='error-text'>{errorText}</p>}
                        </label>
                        <label className='confirm-email-profile'>
                            Confirma email <span className='check-emoji'>{email ? email === emailConfirm ? " ✅ " : '❌' : ''}</span>
                            <input value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} placeholder={userData.email} />
                        </label>
                    </div>
                    <label className='bio-profile'>
                        Mi Bio
                        <textarea id='bio' value={bio} onChange={e => setBio(e.target.value)} placeholder={userData.bio} />
                            {errorType === 'bio' && <p className='error-text'>{errorText}</p>}
                    </label>
                    <div className='down-container-profile'>
                        <label className='password-profile'>
                            Contraseña
                            <input id='password' type="password" value={password} placeholder='********' onChange={e => setPassword(e.target.value)} />
                            {errorType === 'password' && <p className='error-text'>{errorText}</p>}
                        </label>
                        <label className='confirm-password-profile'>
                            Confirma contraseña
                            {password ? passConfirm === password ? " ✅ " : '❌' : ''}
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
    )
}

export default EditPrrofileForm
