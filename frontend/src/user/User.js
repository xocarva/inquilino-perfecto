import { Route, Routes } from "react-router-dom"
import EditProfile from "./EditProfile"
import TenantProfile from "./TenantProfile"
import OwnerProfile from "./OwnerProfile"
import PendingBookings from "./PendingBookings"
import NewAd from "./NewAd"
import ErrorBoundary from "../ErrorBoundary"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks'
import NotFound from "../NotFound"
import './User.css'


function User() {
    const navigate = useNavigate()
    const user = useUser()
    if (!user) navigate('/')
    return (
        <ErrorBoundary fallback={<NotFound />}>
            <Routes>
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="tenant-profile/*" element={<TenantProfile />} />
                <Route path="owner-profile" element={<OwnerProfile />} />
                <Route path="pending-bookings" element={<PendingBookings />} />
                <Route path="new-ad" element={<NewAd />} />
            </Routes>
        </ErrorBoundary>

    )
}

export default User
