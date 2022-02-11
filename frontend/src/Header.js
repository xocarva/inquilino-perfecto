import './Header.css'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useModal, useSetModal } from './hooks'


function Header() {
    const setModal = useSetModal()
    const modal = useModal()
    const handleLogin = e => {
        setModal(<Login/>)
        modal(true)
    }

    return(
        <header className="header">
            <Link to="/"><h1>Inquilino perfecto</h1></Link>
            <Link to="/register">Registro</Link>
            <Link to="/user/edit-profile">Editar perfil</Link>
            <span onClick={handleLogin}>Login</span>
        </header>
    )
}

export default Header






