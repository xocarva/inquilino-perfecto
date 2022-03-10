import { useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "./useFetch"

const URL = process.env.REACT_APP_BASE_URL

function Activate() {
    
    const[validate, setValidate] = useState()
    const { code } = useParams()

    console.log('estoy donde debo')

    const res = useFetch(`${URL}/users/validate/${code}`)

    console.log('res.ok', res)

    if (res.ok) {
        setValidate(true)
        console.log('ha cambiado el validar')
    }
    return (
        <>
            {validate && <p>Validado</p>}
            {!validate && <p>No validado</p>}
        </>
    )
}

export default Activate