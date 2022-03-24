import { Route, Routes } from "react-router-dom"
import EditProfile from "./EditProfile"
import TenantProfile from "./TenantProfile"
import OwnerProfile from "./OwnerProfile"
import ErrorBoundary from "../ErrorBoundary"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks'
import Oops from "../Oops"
import './User.css'


function User({ pendingBookings }) {
    const navigate = useNavigate()
    const user = useUser()
    if (!user) navigate('/')
    return (
        <ErrorBoundary fallback={<Oops />}>
            <Routes>
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="tenant-profile/*" element={<TenantProfile />} />
                <Route path="owner-profile/*" element={<OwnerProfile pendingBookings={pendingBookings}/>} />
                <Route path="*" element={<Oops />} />
            </Routes>
        </ErrorBoundary>

    )
}

export default User
