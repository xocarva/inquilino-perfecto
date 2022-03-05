
export function validateDataProfile(firstName, lastName, email, emailConfirm, bio, password, passConfirm) {
    let errorData = { errorTypeValidation: '', errorTextValidation: ''}
    switch (true) {
        case firstName &&
            (firstName.length < 2 || firstName.length > 80):
            errorData = { errorTypeValidation: 'firstName', errorTextValidation: 'Tu nombre debe empezar por mayúscula y contener entre 2 y 80 carácteres.'}
            return errorData
        case lastName &&
            (lastName.length < 2 || lastName.length > 80):
            errorData = { errorTypeValidation: 'lastName', errorTextValidation: 'Tu apellido debe empezar por mayúscula y contener entre 2 y 80 carácteres.'}
            return errorData
        case email !== emailConfirm:
            errorData = { errorTypeValidation: 'email', errorTextValidation: 'El email no coincide.'}
            return errorData
        case bio && (bio.length < 10 || bio.length >= 200):
            errorData = { errorTypeValidation: 'bio', errorTextValidation: 'Tu bio debe contener entre 10 y 200 carácteres.'}
            return errorData
        case password !== passConfirm:
            errorData = { errorTypeValidation: 'password', errorTextValidation: 'La contraseña no coincide.'}
            return errorData
        case password && (password.length < 5 || password.length >= 50):
            errorData = { errorTypeValidation: 'password', errorTextValidation: 'Tu contraseña debe contener entre 5 y 50 carácteres.'}
            return errorData
        default:
            return false
    }
}