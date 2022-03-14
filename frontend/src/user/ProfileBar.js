import './ProfileBar.css'
import { Link } from "react-router-dom"

function ProfileBar({ userName, receivedPending, userPicture, logoutButton }) {
    return (
        <div className='wrapper' tabIndex={1}>
            <div className='title-profile'>
                <div>
                    <span id='name-profile'>{userName}</span>
                    <span className='pic-profile'>{userPicture}</span>
                    {receivedPending > 0 && <div id='notifications'>{receivedPending}</div>}
                </div>
            </div>
            <nav className='dropdown-profile' onClick={() => document.activeElement.blur('wrapper')}>
                <Link className='dropdown-nav' to="/user/edit-profile">Editar Perfil</Link>
                <Link className='dropdown-nav' to="/user/tenant-profile/bookings">Perfil Inquilino</Link>
                <Link className='dropdown-nav' to="/user/owner-profile/houses">Perfil Casero</Link>
                {receivedPending > 0 && <Link className='dropdown-nav' to="/user/owner-profile/pending-bookings">Solicitudes{receivedPending > 0 ? ' (' + receivedPending + ')' : ''}</Link>}
                <Link className='dropdown-nav' to="/user/owner-profile/new-house">Publicar anuncio</Link>
                <div className='dropdown-nav'>{logoutButton}</div>
            </nav>
        </div>
    )
}

export default ProfileBar
