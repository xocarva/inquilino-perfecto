import { Link, Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from "../ErrorBoundary"
import Oops from '../Oops'
import NewAd from './NewAd'
import OwnerHouses from './OwnerHouses'
import OwnerBookings from './OwnerBookings'
import OwnerPendingBookings from './OwnerPendingBookings'
import OwnerRatings from './OwnerRatings'

function OwnerProfile({ pendingBookings }) {

    return (
        <section className='profile-section'>
            <h1 className="profile-title">Perfil de casero</h1>
            <nav className="submenu">
                <Link className={(useLocation().pathname === '/user/owner-profile/houses') ? 'active' : ''} to="/user/owner-profile/houses">Tus anuncios</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/new-house') ? 'active' : ''} to="/user/owner-profile/new-house">Publicar un anuncio</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/bookings') ? 'active' : ''} to="/user/owner-profile/bookings">Reservas confirmadas</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/pending-bookings') ? 'active' : ''} to="/user/owner-profile/pending-bookings">Reservas Pendientes{pendingBookings ? ' (' + pendingBookings + ')' : ''}</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/ratings') ? 'active' : ''} to="/user/owner-profile/ratings">Valoraciones recibidas</Link>
            </nav>
            <ErrorBoundary fallback={<Oops />}>
                <Routes>
                    <Route path="houses" element={<OwnerHouses />} />
                    <Route path="new-house" element={<NewAd />} />
                    <Route path="bookings" element={<OwnerBookings />} />
                    <Route path="pending-bookings" element={<OwnerPendingBookings />} />
                    <Route path="ratings" element={<OwnerRatings />} />
                    <Route path="*" element={<Oops />} />
                </Routes>
            </ErrorBoundary>
        </section>
    )


}

export default OwnerProfile







