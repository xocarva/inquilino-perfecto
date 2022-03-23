import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { useSetModal, useUser } from './hooks'
import Login from './Login'
import ProfileBar from './user/ProfileBar'
import SearchBar from './houses/SearchBar'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Header({ pendingBookings, setPendingBookings }) {
    const setModal = useSetModal()
    const dispatch = useDispatch()
    const user = useUser()
    const pathName = useLocation().pathname
    const [showBar, setShowBar] = useState(pathName === '/')

    useEffect(() => {
        if (pathName === '/') {
            setShowBar(true)
        }
    }, [pathName])

    useEffect(() => {
        const loadBookings = async () => {

            const response = await fetch(SERVER_URL + '/bookings/received/pending-amount', {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })

            const { pendingBookings } = await response.json()

            if (response.ok) {
                setPendingBookings(pendingBookings)
            }
        }

        let refreshInterval;

        if (user) {
            refreshInterval = setInterval(() => loadBookings(), 10000)
            loadBookings()
        }

        return () => clearInterval(refreshInterval)


    }, [user, setPendingBookings])

    return (
        <>
            <header className="header">
                <Link className='title' to="/">Inquilino Perfecto</Link>
                <div className='search-user-container'>
                    {!showBar && <div className='search-icon-container' onClick={() => setShowBar(!showBar)}><img className='search-icon' src="/house-search.png" title="Buscador" alt="search-icon" /></div>}
                    {!user &&
                        <div className='menu-login-register'>
                            <div onClick={() => setModal(<Login />)}>Login</div>
                            <span>|</span>
                            <Link to="/register"><div>Registro</div></Link>
                        </div>
                    }
                    {user &&
                        <ProfileBar className='menu-login-register'
                            madePending={user.madePending}
                            receivedPending={pendingBookings}
                            userName={user.firstName}
                            userPicture={<div id="avatar" style={{ backgroundImage: `url(${SERVER_URL}${user.picture})` }} />}
                            logoutButton={<span className='logout-boton' onClick={() => dispatch({ type: 'logout' })}>Cerrar sesión</span>}
                        />
                    }
                </div>
            </header>
            <SearchBar showBar={showBar} setShowBar={setShowBar} />
        </>
    )
}
export default Header
