
export function validateData(firstName, lastName, email, emailConfirm, bio, password, passConfirm) {
    let errorData = { errorTypeValidation: '', errorTextValidation: ''}
    const nameRegex = /^[A-Za-zaáÁéÉíÍóÓúÚ\u00f1\u00d1]+$/
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    switch (true) {
        case firstName &&
            (firstName.length < 2 || firstName.length > 80 || !nameRegex.test(firstName)):
            errorData = { errorTypeValidation: 'firstName', errorTextValidation: 'Tu nombre debe contener entre 2 y 80 letras.'}
            return errorData
        case lastName &&
            (lastName.length < 2 || lastName.length > 80 || !nameRegex.test(lastName)):
            errorData = { errorTypeValidation: 'lastName', errorTextValidation: 'Tu apellido debe contener entre 2 y 80 letras.'}
            return errorData
        case email &&
            !emailRegex.test(email):
            errorData = { errorTypeValidation: 'email', errorTextValidation: 'Email no válido.'}
            return errorData
        case email !== emailConfirm:
            errorData = { errorTypeValidation: 'email', errorTextValidation: 'El email no coincide.'}
            return errorData
        case bio && (bio.length < 10 || bio.length >= 200):
            errorData = { errorTypeValidation: 'bio', errorTextValidation: 'Tu bio debe contener entre 10 y 200 caracteres.'}
            return errorData
        case password !== passConfirm:
            errorData = { errorTypeValidation: 'password', errorTextValidation: 'La contraseña no coincide.'}
            return errorData
        case password && (password.length < 5 || password.length >= 50):
            errorData = { errorTypeValidation: 'password', errorTextValidation: 'Tu contraseña debe contener entre 5 y 50 caracteres.'}
            return errorData
        default:
            return false
    }
}