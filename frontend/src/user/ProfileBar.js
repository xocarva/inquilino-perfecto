import { Link } from "react-router-dom"

function ProfileBar() {
    return(
        <nav className="profileMenu">
            <Link to="/user/edit-profile">Editar Perfil</Link>
            <Link to="/user/tenant-profile">Perfil Inquilino</Link>
            <Link to="/user/owner-profile">Perfil Casero</Link>
            <Link to="/user/pending-bookings">Recervas pendientes</Link>
            <Link to="/user/new-ad">Publicar anuncio</Link>
        </nav>
    )
}

export default ProfileBar