import { useEffect, useState } from "react"
import { useUser } from "../hooks"
import CardMadePendingBooking from "./CardMadePendingBooking"

import "./TenantPendingBookings.css"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function TenantPendingBookings() {
    const user = useUser()
    const [dataMadeBookings, setDataMadeBookings] = useState(null)
    const [stepMadeBooking, setStepMadeBooking] = useState(0)

    useEffect(() => {
        fetch(SERVER_URL + '/bookings/made/pending', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(data => setDataMadeBookings(data))
    }, [user])

    const perPageMadeBookings = 3
    const pagsMadeBookings = Math.ceil(dataMadeBookings?.length / perPageMadeBookings)
    const handlePrevMadeBookings = () => setStepMadeBooking(stepMadeBooking > 0 ? stepMadeBooking - 1 : pagsMadeBookings - 1)
    const handleNextMadeBookings = () => setStepMadeBooking((stepMadeBooking + 1) % pagsMadeBookings)

    return (
            <section className='made-pending-bookings-section'>
                <h2>Peticiones pendientes como inquilino</h2>
                <p className="description">Aquí puedes revisar las reservas que has realizado y todavía no han sido confirmadas.</p>
                <section className="made-pending-bookings-container">
                    {dataMadeBookings?.slice(stepMadeBooking * perPageMadeBookings, (stepMadeBooking + 1) * perPageMadeBookings).map(booking =>
                        <CardMadePendingBooking key={booking.bookingId} bookingData={booking} setDataMadeBookings={setDataMadeBookings} />
                    )}
                </section>
                {dataMadeBookings?.length > 0 ? <section className='button-steps-container-pendings-bookings'>
                    <span className="prev-button" onClick={handlePrevMadeBookings}>
                        ⬅️
                    </span>
                    <span>{stepMadeBooking + 1}/{Math.ceil(dataMadeBookings?.length / perPageMadeBookings)}</span>
                    <span className="next-button" onClick={handleNextMadeBookings}>
                        ➡️
                    </span>
                </section> : <p>No tienes ninguna reserva pendiente de confirmación. 😞</p>}
            </section>
    )
}

export default TenantPendingBookings
