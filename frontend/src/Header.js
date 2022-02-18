import { useDispatch } from 'react-redux'
import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { useSetModal, useUser } from './hooks'
import Login from './Login'
import ProfileBar from './user/ProfileBar';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function Header() {
    const setModal = useSetModal()
    const dispatch = useDispatch()
    const user = useUser()
    return (
        <header className="header">
            <Link className='title' to="/">Inquilino Perfecto</Link>
            <>
                {!user &&
                    <div className='menu-login-register'>
                        <div onClick={() => setModal(<Login />)}>Login</div>
                        <span>/</span>
                        <Link to="/register"><div>Registro</div></Link>
                    </div>
                }
                {user &&
                    <ProfileBar className='menu-login-register'
                        userName={user.firstName}
                        userPicture={<div id="avatar" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}/${user.picture})` }} />}
                        logoutButton={<span className='logout-boton' onClick={() => dispatch({ type: 'logout' })}>Cerrar sesión</span>}
                    />
                }
            </>
        </header>
    )
}
export default Header
