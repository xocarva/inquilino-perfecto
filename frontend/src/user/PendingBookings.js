import './PendingBookings.css'
import { Suspense, useState } from 'react'
import Loading from '../Loading'
import useFetch from '../useFetch'
import CardReceivedPendingBooking from './CardReceivedPendingBooking'
import CardMadePendingBooking from './CardMadePendingBooking'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL



function PendingBookings() {

    const dataReceivedBookings = useFetch(REACT_APP_BASE_URL + '/bookings/received/pending')

    let classNameReceivedPendingBookingsSection
    dataReceivedBookings.length === 0 ? classNameReceivedPendingBookingsSection = '-off' : classNameReceivedPendingBookingsSection = '-on'

    const dataMadeBookings = useFetch(REACT_APP_BASE_URL + '/bookings/made/pending')

    let classNameMadePendingBookingsSection
    dataMadeBookings.length === 0 ? classNameMadePendingBookingsSection = '-off' : classNameMadePendingBookingsSection = '-on'

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
            <section className={'received-pending-bookings-section' + classNameReceivedPendingBookingsSection}>
                <h3>Peticiones de alquiler recibidas pendientes</h3>
                <section className='received-pending-bookings-container'>
                    {dataReceivedBookings?.slice(stepReceivedBooking * perPageReceivedBookings, (stepReceivedBooking + 1) * perPageReceivedBookings).map(booking =>
                        <CardReceivedPendingBooking bookingData={booking} />
                    )}
                </section>
                <section className='button-steps-container-bookings'>
                    <span onClick={handlePrevReceivedBookings}>
                        ⬅️
                    </span>
                    <span>{stepReceivedBooking + 1}/{Math.ceil(dataReceivedBookings.length / perPageReceivedBookings)}</span>
                    <span onClick={handleNextReceivedBookings}>
                        ➡️
                    </span>
                </section>
            </section>
            <section className={'made-pending-bookings-section' + classNameMadePendingBookingsSection}>
                <h3>Peticiones de alquiler hechas pendientes</h3>
                <section className="made-pending-bookings-container">
                    {dataMadeBookings?.slice(stepMadeBooking * perPageMadeBookings, (stepMadeBooking + 1) * perPageMadeBookings).map(booking =>
                        <CardMadePendingBooking bookingData={booking} />
                    )}
                </section>
                <section className='button-steps-container-bookings'>
                    <span onClick={handlePrevMadeBookings}>
                        ⬅️
                    </span>
                    <span>{stepMadeBooking + 1}/{Math.ceil(dataMadeBookings.length / perPageMadeBookings)}</span>
                    <span onClick={handleNextMadeBookings}>
                        ➡️
                    </span>
                </section>
            </section>
        </section>
    )
}

const pendingBookingsWrapper = () =>
    <Suspense fallback={<Loading className="pending-bookings-page" />}>
        <PendingBookings />
    </Suspense>

export default pendingBookingsWrapper
