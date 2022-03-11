import './ProfileBar.css'
import { Link } from "react-router-dom"

function ProfileBar({ userName, madePending, receivedPending, userPicture, logoutButton }) {
    const pending = madePending + receivedPending
    return (
        <div className='wrapper' tabIndex={1}>
            <div className='title-profile'>
                <div>
                    <span id='name-profile'>{userName}</span>
                    <span className='pic-profile'>{userPicture}</span>
                    {pending > 0 && <div id='notifications'>{pending}</div>}
                </div>
            </div>
            <nav className='dropdown-profile' onClick={() => document.activeElement.blur('wrapper')}>
                <Link className='dropdown-nav' to="/user/edit-profile">Editar Perfil</Link>
                <Link className='dropdown-nav' to="/user/tenant-profile/bookings">Perfil Inquilino{madePending > 0 ? ' (' + madePending + ')':''}</Link>
                <Link className='dropdown-nav' to="/user/owner-profile/houses">Perfil Casero{receivedPending > 0 ? ' (' + receivedPending + ')' : ''}</Link>
                <Link className='dropdown-nav' to="/user/owner-profile/new-house">Publicar anuncio</Link>
                <div className='dropdown-nav'>{logoutButton}</div>
            </nav>
        </div>
    )
}

export default ProfileBar
