import { Link } from 'react-router-dom'
import './Header.css'
import { useSetModal } from './hooks'
import Login from './Login'

function Header() {
    const setModal = useSetModal()
    return(
        <header className="header">
            <Link to="/"><h1>Inquilino perfecto</h1></Link>
            <span onClick={()=> setModal(<Login />)} className='loginButton'>Login</span>
            <Link to="/register">Registro</Link>
            <Link to="/user/edit-profile">Editar perfil</Link>
        </header>
    )
}

export default Header






