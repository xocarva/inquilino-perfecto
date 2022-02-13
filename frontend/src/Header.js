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
    console.log(user)
    return (
        <>
            <header className="header">
                <div><Link className='title' to="/"><h1>Inquilino perfecto</h1></Link></div>
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
                            logoutButton={<span className='logout-boton' onClick={() => dispatch({ type: 'logout' })}>logout</span>}
                        />
                    }
                </>
            </header>
        </>
    )
}

export default Header






