import { Link, useParams } from "react-router-dom"
import { useFetch } from "./hooks"
import "./Activate.css"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Activate() {

    const { code } = useParams()

    const res = useFetch(`${SERVER_URL}/users/validate/${code}`)

    return (
        <section className="activate">
            {<p>{res.data ? 'Usuario activado correctamente. 😊' : 'El usuario no ha podido ser validado. 😞'}</p>}
            <Link className="back-button" to="/">Volver al inicio</Link>
        </section>
    )
}

export default Activate
