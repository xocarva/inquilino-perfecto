import './Header.css'
import { Link } from 'react-router-dom'


function Header() {

    return(
        <header className="header">
            <Link to="/"><h1>Inquilino perfecto</h1></Link>
            <Link to="/register">Registro</Link>
            <Link to="/user/edit-profile">Editar perfil</Link>
        </header>
    )
}

export default Header






