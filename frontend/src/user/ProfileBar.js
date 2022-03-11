import './ProfileBar.css'
import { Link } from "react-router-dom"

function ProfileBar({ userName, userPicture, logoutButton }) {

    return (
        <div className='wrapper' tabIndex={1}>
            <div className='title-profile'>
                <div><span id='name-profile'>{userName}</span><span className='pic-profile'>{userPicture}</span></div>
            </div>
            <nav className='dropdown-profile' onClick={() => document.activeElement.blur('wrapper')}>
                <Link className='dropdown-nav' to="/user/edit-profile">Editar Perfil</Link>
                <Link className='dropdown-nav' to="/user/tenant-profile/bookings">Perfil Inquilino</Link>
                <Link className='dropdown-nav' to="/user/owner-profile/houses">Perfil Casero</Link>
                <Link className='dropdown-nav' to="/user/new-ad">Publicar anuncio</Link>
                <div className='dropdown-nav'>{logoutButton}</div>
            </nav>
        </div>
    )
}

export default ProfileBar
