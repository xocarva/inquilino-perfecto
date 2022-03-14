import { Link, Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from "../ErrorBoundary"
import Oops from '../Oops'
import TenantBookings from './TenantBookings'
import TenantPendingBookings from './TenantPendingBookings'
import TenantRatings from './TenantRatings'

function TenantProfile() {

    return (
        <section className='profile-section'>
            <h1 className="profile-title">Perfil de inquilino</h1>
            <nav className="submenu">
                <Link className={(useLocation().pathname === '/user/tenant-profile/bookings') ? 'active' : ''} to="/user/tenant-profile/bookings">Reservas confirmadas</Link>
                <Link className={(useLocation().pathname === '/user/tenant-profile/pending-bookings') ? 'active' : ''} to="/user/tenant-profile/pending-bookings">Reservas Pendientes</Link>
                <Link className={(useLocation().pathname === '/user/tenant-profile/ratings') ? 'active' : ''} to="/user/tenant-profile/ratings">Valoraciones recibidas</Link>
            </nav>
            <ErrorBoundary fallback={<Oops />}>
                <Routes>
                    <Route path="bookings" element={<TenantBookings />} />
                    <Route path="pending-bookings" element={<TenantPendingBookings />} />
                    <Route path="ratings" element={<TenantRatings />} />
                    <Route path="*" element={<Oops />} />
                </Routes>
            </ErrorBoundary>
        </section>
    )


}

export default TenantProfile

