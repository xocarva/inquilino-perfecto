import { useDispatch } from 'react-redux'
import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { useSetModal, useUser } from './hooks'
import Login from './Login'
import ProfileBar from './user/ProfileBar';

function Header() {
    const setModal = useSetModal()
    const dispatch = useDispatch()
    const user = useUser()
    return (
        <>
            <header className="header">
                <div><Link className='title' to="/"><h1>Inquilino perfecto</h1></Link></div>
                <>
                    {!user &&
                        <div className='menuLoginRegister'>
                            <div onClick={() => setModal(<Login />)}>Login</div>
                            <span>/</span>
                            <Link to="/register"><div>Registro</div></Link>
                        </div>
                    }
                    {user &&
                        <ProfileBar
                            userName={user.firstName}
                            userPicture={<div className="avatar" style={{ backgroundImage: `url(http://localhost:3001/${user.picture})` }} />}
                            logoutButton={<span className='logout-boton' onClick={() => dispatch({ type: 'logout' })}>logout</span>}
                        />
                    }
                </>
            </header>
        </>
    )
}

export default Header

