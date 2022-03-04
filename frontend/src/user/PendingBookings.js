import './PendingBookings.css'
import { Suspense, useEffect, useState } from 'react'
import Loading from '../Loading'
import CardReceivedPendingBooking from './CardReceivedPendingBooking'
import CardMadePendingBooking from './CardMadePendingBooking'
import { useUser } from '../hooks'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL



function PendingBookings() {

    const user = useUser()

    const [dataReceivedBookings, setDataReceivedBookings] = useState(null)
    const [reloadReceived, setReloadReceived] = useState(false)
    const [reloadMade, setReloadMade] = useState(false)

    useEffect(() => {
        fetch(REACT_APP_BASE_URL + '/bookings/received/pending', {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
        })
        .then(response => response.json())
        .then(data => setDataReceivedBookings(data))
    }, [reloadReceived, user])


    const [dataMadeBookings, setDataMadeBookings] = useState(null)

    useEffect(() => {
        fetch(REACT_APP_BASE_URL + '/bookings/made/pending', {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
        })
        .then(response => response.json())
        .then(data => setDataMadeBookings(data))
    }, [reloadMade, user])


    const [stepReceivedBooking, setStepReceivedBooking] = useState(0)

    const perPageReceivedBookings = 3
    const pagsReceivedBookings = Math.ceil(dataReceivedBookings?.length / perPageReceivedBookings)
    const handlePrevReceivedBookings = () => setStepReceivedBooking(stepReceivedBooking > 0 ? stepReceivedBooking - 1 : pagsReceivedBookings - 1)
    const handleNextReceivedBookings = () => setStepReceivedBooking((stepReceivedBooking + 1) % pagsReceivedBookings)

    const [stepMadeBooking, setStepMadeBooking] = useState(0)

    const perPageMadeBookings = 3
    const pagsMadeBookings = Math.ceil(dataMadeBookings?.length / perPageMadeBookings)
    const handlePrevMadeBookings = () => setStepMadeBooking(stepMadeBooking > 0 ? stepMadeBooking - 1 : pagsMadeBookings - 1)
    const handleNextMadeBookings = () => setStepMadeBooking((stepMadeBooking + 1) % pagsMadeBookings)



    return (
        <section className="pending-bookings-page">
            <section className='received-pending-bookings-section'>
                <h3>Peticiones de reservas recibidas pendientes</h3>
                {dataReceivedBookings?.length > 0 ? <section className='received-pending-bookings-container'>
                    {dataReceivedBookings?.slice(stepReceivedBooking * perPageReceivedBookings, (stepReceivedBooking + 1) * perPageReceivedBookings).map(booking =>
                        <CardReceivedPendingBooking reloadReceived={reloadReceived} setReloadReceived={setReloadReceived}  key={booking.bookingId} bookingData={booking} />
                    )}
                </section> : <p className='no-received-bookkings-message'>No tienes ninguna petición de reserva pendiente.</p>}
                {dataReceivedBookings?.length > 0 && <section className='button-steps-container-pendings-bookings'>
                    <span onClick={handlePrevReceivedBookings}>
                        ⬅️
                    </span>
                    <span>{stepReceivedBooking + 1}/{Math.ceil(dataReceivedBookings?.length / perPageReceivedBookings)}</span>
                    <span onClick={handleNextReceivedBookings}>
                        ➡️
                    </span>
                </section>}
            </section>
            <section className='made-pending-bookings-section'>
                <h3>Peticiones de reservas hechas pendientes</h3>
                {dataMadeBookings?.length > 0 ? <section className="made-pending-bookings-container">
                    {dataMadeBookings?.slice(stepMadeBooking * perPageMadeBookings, (stepMadeBooking + 1) * perPageMadeBookings).map(booking =>
                        <CardMadePendingBooking reloadMade={reloadMade} setReloadMade={setReloadMade} key={booking.bookingId} bookingData={booking} />
                    )}
                </section> : <p className='no-received-bookkings-message'>No tienes ninguna reserva pendiente de confirmación.</p>}
                {dataMadeBookings?.length > 0 && <section className='button-steps-container-pendings-bookings'>
                    <span onClick={handlePrevMadeBookings}>
                        ⬅️
                    </span>
                    <span>{stepMadeBooking + 1}/{Math.ceil(dataMadeBookings?.length / perPageMadeBookings)}</span>
                    <span onClick={handleNextMadeBookings}>
                        ➡️
                    </span>
                </section>}
            </section>
        </section>
    )
}

const pendingBookingsWrapper = () =>
    <Suspense fallback={<Loading className="pending-bookings-page" />}>
        <PendingBookings />
    </Suspense>

export default pendingBookingsWrapper
