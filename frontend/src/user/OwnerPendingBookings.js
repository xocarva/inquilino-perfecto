import { useEffect, useState } from 'react'
import { useUser } from '../hooks'
import CardReceivedPendingBooking from './CardReceivedPendingBooking'
import './OwnerPendingBookings.css'

const SERVER_URL = process.env.SERVER_URL


function OwnerPendingBookings() {
    const user = useUser()
    const [dataReceivedBookings, setDataReceivedBookings] = useState(null)
    const [stepReceivedBooking, setStepReceivedBooking] = useState(0)


    useEffect(() => {
        fetch(SERVER_URL + '/bookings/received/pending', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(data => setDataReceivedBookings(data))
    }, [user])


    const perPageReceivedBookings = 3
    const pagsReceivedBookings = Math.ceil(dataReceivedBookings?.length / perPageReceivedBookings)
    const handlePrevReceivedBookings = () => setStepReceivedBooking(stepReceivedBooking > 0 ? stepReceivedBooking - 1 : pagsReceivedBookings - 1)
    const handleNextReceivedBookings = () => setStepReceivedBooking((stepReceivedBooking + 1) % pagsReceivedBookings)

    return (
        <section className="pending-bookings-page">
            <h2>Peticiones recibidas pendientes</h2>
            <p className="description">Aquí puedes aceptar o cancelar las peticiones de reserva que han recibido tus propiedades.</p>
            <section className='received-pending-bookings-section'>
                {dataReceivedBookings?.length > 0 ? <section className='received-pending-bookings-container'>
                    {dataReceivedBookings?.slice(stepReceivedBooking * perPageReceivedBookings, (stepReceivedBooking + 1) * perPageReceivedBookings).map(booking =>
                        <CardReceivedPendingBooking  key={booking.bookingId} bookingData={booking} setDataReceivedBookings={setDataReceivedBookings} />
                    )}
                </section> : <p className='no-received-bookkings-message'>No tienes ninguna petición de reserva pendiente. 😅</p>}
            </section>
            {dataReceivedBookings?.length > 0 && <section className='button-steps-container-pendings-bookings'>
                    <span className='prev-button' onClick={handlePrevReceivedBookings}>
                        ⬅️
                    </span>
                    <span>{stepReceivedBooking + 1}/{Math.ceil(dataReceivedBookings?.length / perPageReceivedBookings)}</span>
                    <span className='next-button' onClick={handleNextReceivedBookings}>
                        ➡️
                    </span>
                </section>}
        </section>
    )
}

export default OwnerPendingBookings
