import './PendingBookings.css'
import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import useFetch from '../useFetch'
import { useModal, useSetModal, useUser } from '../hooks'
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function Puntuacion({ value }) {
    return (
        <span className="rating-tenant">
            {value >= 1 ? '★' : '☆'}
            {value >= 2 ? '★' : '☆'}
            {value >= 3 ? '★' : '☆'}
            {value >= 4 ? '★' : '☆'}
            {value >= 5 ? '★' : '☆'}
        </span>
    )
}


// TODO
//  PONER MENSAJE DE ERROR EN EDITPROFILE

function PendingBookings() {

    const dataReceivedBookings = useFetch(REACT_APP_BASE_URL + '/bookings/received/pending')

    const dataMadeBookings = useFetch(REACT_APP_BASE_URL + '/bookings/made/pending')
    console.log(dataMadeBookings)

    const user = useUser()
    const setModal = useSetModal()
    const modal = useModal()


    const handleConfirmReceivedBooking = async e => {
        const res = await fetch(REACT_APP_BASE_URL + '/bookings/confirm/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='confirm-booking-message-container'>
                    <span>✅</span>
                    <p>Reserva confirmada correctamente.</p>
                    <Link className='link-modal-confirm-booking' to='/user/pending-bookings' onClick={e => modal(false)} >Aceptar</Link>
                </article>
            )
            modal(true)
        }
    }

    const handleCancelReceivedBooking = async e => {
        console.log(e.target.attributes.bookingId.value)
        const res = await fetch(REACT_APP_BASE_URL + '/bookings/cancel/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='cancel-booking-message-container'>
                    <span>✅</span>
                    <p>Reserva cancelada correctamente.</p>
                    <Link className='link-modal-cancel-booking' to='/user/pending-bookings' onClick={e => modal(false)} >Aceptar</Link>
                </article>
            )
            modal(true)
        }
    }

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

    const handleCancelMadeBooking = async e => {
        console.log(e.target.attributes.bookingId.value)
        const res = await fetch(REACT_APP_BASE_URL + '/bookings/cancel/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='cancel-booking-message-container'>
                    <span>✅</span>
                    <p>Reserva cancelada correctamente.</p>
                    <Link className='link-modal-cancel-booking' to='/user/pending-bookings' onClick={e => modal(false)} >Aceptar</Link>
                </article>
            )
            modal(true)
        }
    }

    return(
        <section className="pending-bookings-page">
            <section className="received-pending-bookings-container">
                <h3>Peticiones de alquiler recividas pendientes</h3>
                {dataReceivedBookings?.slice(stepReceivedBooking * perPageReceivedBookings, (stepReceivedBooking + 1) * perPageReceivedBookings).map(booking =>
                            <article className='card-received-booking' key={booking.bookingId}>
                                <div key={booking.housePicUrl} className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.housePicUrl})`}} ></div>
                                <Link key={booking.title} to={'/houses/' + booking.houseId} className='title-received-booking'>{booking.title}<span> ➕info</span></Link>
                                <div className='tenant-data-container'>
                                <div className='tenant-avatar' key={booking.tenantPicture} style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.tenantPicture})`}} />
                                <p className='name-tenant' key={booking.tenantFirstName}>{booking.tenantName} {booking.tenantLastName}</p>
                                <Puntuacion className='rating-tenant' key={booking.ratingAvg}>{booking.ratingAvg}</Puntuacion>
                                </div>
                                <p key={booking.startDate} className='date-received-booking' >Desde el {booking.startDate.slice(0, 10)} hasta el {booking.endDate.slice(0, 10)}</p>
                                <div className='buttons-received-bookings'>
                                <span bookingid={Number(booking.bookingId)} onClick={handleConfirmReceivedBooking}>Aceptar</span>
                                <span bookingid={Number(booking.bookingId)} onClick={handleCancelReceivedBooking}>Cancelar</span>
                                </div>
                            </article>
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
            <section className="received-pending-bookings-container">
                <h3>Peticiones de alquiler hechas pendientes</h3>
                {dataMadeBookings?.slice(stepMadeBooking * perPageMadeBookings, (stepMadeBooking + 1) * perPageMadeBookings).map(booking =>
                            <article className='card-received-booking' key={booking.bookingId}>
                                <div key={booking.housePicUrl} className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.urlPic})`}} ></div>
                                <Link key={booking.title} to={'/houses/' + booking.houseId} className='title-received-booking'>{booking.title}<span> ➕info</span></Link>
                                <div className='tenant-data-container'>
                                <div className='tenant-avatar' key={booking.tenantPicture} style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.tenantPicture})`}} />
                                </div>
                                <p key={booking.startDate} className='date-received-booking' >Desde el {booking.startDate.slice(0, 10)} hasta el {booking.endDate.slice(0, 10)}</p>
                                <div className='buttons-received-bookings'>
                                <span bookingid={Number(booking.bookingId)} onClick={handleCancelMadeBooking}>Cancelar</span>
                                </div>
                            </article>
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
    )
}

const pendingBookingsWrapper = () =>
    <Suspense fallback={<Loading className="pending-bookings-page" />}>
        <PendingBookings />
    </Suspense>

export default pendingBookingsWrapper
