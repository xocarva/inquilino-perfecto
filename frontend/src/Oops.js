import { Link } from 'react-router-dom'
import './Oops.css'

function Oops() {
    return(
        <div className='body-oops'>
            <p>Ups! Algo ha ido mal 🙃</p>
            <Link className="back-button" to='/'>Volver al inicio</Link>
        </div>
    )
}

export default Oops
