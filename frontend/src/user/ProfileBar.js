import './ProfileBar.css'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useState } from "react"

function ProfileBar({ userName, userPicture, logoutButton }) {
    const [dropdown, setDropdown] = useState(false)
    const openCloseDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <Dropdown isOpen={dropdown} toggle={openCloseDropdown} >
            <DropdownToggle caret className='botonDrop'>
              {userName} {userPicture}
            </DropdownToggle>

            <DropdownMenu className='dropdown'>
                <DropdownItem className='linkMenuPerfil'><Link className='menuPerfil' to="/user/edit-profile">Editar Perfil</Link></DropdownItem>
                <DropdownItem className='linkMenuPerfil'><Link className='menuPerfil' to="/user/tenant-profile">Perfil Inquilino</Link></DropdownItem>
                <DropdownItem className='linkMenuPerfil'><Link className='menuPerfil' to="/user/owner-profile">Perfil Casero</Link></DropdownItem>
                <DropdownItem className='linkMenuPerfil'><Link className='menuPerfil' to="/user/pending-bookings">Recervas pendientes</Link></DropdownItem>
                <DropdownItem className='linkMenuPerfil'><Link className='menuPerfil' to="/user/new-ad">Publicar anuncio</Link></DropdownItem>
                <DropdownItem className='linkMenuPerfil'>{logoutButton}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileBar

