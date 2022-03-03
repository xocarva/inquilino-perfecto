import './PendingBookings.css'
import { Link } from "react-router-dom";
import { useSetModal, useUser } from "../hooks";
import Puntuacion from "../Puntuacion";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function CardReceivedPendingBooking( { bookingData, reloadReceived, setReloadReceived } ) {
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
                <article className='confirm-booking-message-container'>
                    <span>✅</span>
                    <p>Reserva confirmada correctamente</p>
                </article>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido confirmar la reserva</p>
                </div>
            )
        }
        setReloadReceived(!reloadReceived)
    }

    const handleCancelReceivedBooking = async e => {
        console.log('inicio cancel', reloadReceived)

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
                </article>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido cancelar la reserva.</p>
                </div>
            )
        }
        setReloadReceived(!reloadReceived)
        console.log('fin cancel', reloadReceived)

    }

    return (
        <article className='card-received-booking'>
            <div className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.housePicUrl})` }} ></div>
            <Link to={'/houses/' + bookingData.houseId} className='title-received-booking'>🏠 {bookingData.title}</Link>
            <div className='tenant-data-container'>
                <div className='tenant-avatar' style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.tenantPicture})` }} />
                <p className='name-tenant'>{bookingData.tenantName} {bookingData.tenantLastName}</p>
                <div className='rating-tenant'>
                    <Puntuacion value={bookingData.ratingAvg} className='rating-tenant' key={bookingData.ratingAvg}></Puntuacion>
                </div>
            </div>
            <div className='date-card-pending-bookings-container'>
            <div className='date-card-pending-bookings'>
                <span>📅 Fecha de entrada</span>
                <p>{bookingData.startDate.slice(0, 10)}</p>
            </div>
            <div className='date-card-pending-bookings'>
                <span>📅 Fecha de salida</span>
                <p>{bookingData.endDate.slice(0, 10)}</p>
            </div>
            </div>
            <div className='buttons-received-bookings'>
                <span bookingid={Number(bookingData.bookingId)} onClick={handleConfirmReceivedBooking}>Aceptar</span>
                <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelReceivedBooking}>Cancelar</span>
            </div>
        </article>
    )
}

export default CardReceivedPendingBooking
