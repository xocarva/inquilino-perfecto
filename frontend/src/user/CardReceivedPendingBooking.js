import './PendingBookings.css'
import { Link } from "react-router-dom";
import { useSetModal, useUser } from "../hooks";
import Puntuacion from "../Puntuacion";
import Loading from '../Loading';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function CardReceivedPendingBooking( { bookingData } ) {
    const user = useUser()
    const setModal = useSetModal()

    const handleConfirmReceivedBooking = async e => {
        const res = await fetch(REACT_APP_BASE_URL + '/bookings/confirm/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='edit-confirm-message-container'>
                    <span>✅</span>
                    <p>Confirmando reserva...</p>
                    <Loading />
                </article>
            )
            setTimeout(() => {
                window.location.reload(true)
            }, 2000)
        }
    }

    const handleCancelReceivedBooking = async e => {
        const res = await fetch(REACT_APP_BASE_URL + '/bookings/cancel/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setModal(
                <article className='edit-confirm-message-container'>
                    <span>✅</span>
                    <p>Cancelando reserva...</p>
                    <Loading />
                </article>
            )
            setTimeout(() => {
                window.location.reload(true)
            }, 2000)
        }
    }

    return (
        <article className='card-received-booking' key={bookingData.bookingId}>
            <div key={bookingData.housePicUrl} className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.housePicUrl})` }} ></div>
            <Link key={bookingData.title} to={'/houses/' + bookingData.houseId} className='title-received-booking'>{bookingData.title}<span> ➕info</span></Link>
            <div className='tenant-data-container'>
                <div className='tenant-avatar' key={bookingData.tenantPicture} style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.tenantPicture})` }} />
                <p className='name-tenant' key={bookingData.tenantFirstName}>{bookingData.tenantName} {bookingData.tenantLastName}</p>
                <div className='rating-tenant'>
                    <Puntuacion value={bookingData.ratingAvg} className='rating-tenant' key={bookingData.ratingAvg}></Puntuacion>
                </div>
            </div>
            <p key={bookingData.startDate} className='date-received-booking' >Desde el {bookingData.startDate.slice(0, 10)} hasta el {bookingData.endDate.slice(0, 10)}</p>
            <div className='buttons-received-bookings'>
                <span bookingid={Number(bookingData.bookingId)} onClick={handleConfirmReceivedBooking}>Aceptar</span>
                <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelReceivedBooking}>Cancelar</span>
            </div>
        </article>
    )
}

export default CardReceivedPendingBooking
