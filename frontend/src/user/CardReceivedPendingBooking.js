import { Link } from "react-router-dom";
import { useSetModal, useSetUser, useUser } from "../hooks";
import Rating from "../Rating";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function CardReceivedPendingBooking({ bookingData, setDataReceivedBookings }) {
    const user = useUser()
    const setUser = useSetUser()
    const setModal = useSetModal()

    const handleConfirmReceivedBooking = async e => {
        const res = await fetch(SERVER_URL + '/bookings/confirm/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setUser({...user, receivedPending: user?.receivedPending > 0 ? user?.receivedPending -1 : 0})
            setModal(
                <article className='edit-confirm-message-container'>
                    <p>Reserva confirmada correctamente</p>
                </article>
            )
        } else if (res.status === 403) {
            setModal(<p>Antes de confirmar debes activar tu usuario</p>)
        } else if(res.status === 550) {
            setModal(
                <div>
                    <p>Oops parece que tenemos un problema con el envío de correo. Pero tu reserva se confirmó correctamente. </p>
                </div>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido confirmar la reserva</p>
                </div>
            )
        }

        setDataReceivedBookings(currentList => {
            return currentList.filter(booking => booking.bookingId !== bookingData.bookingId)
        })
    }

    const handleCancelReceivedBooking = async e => {
        const res = await fetch(SERVER_URL + '/bookings/cancel/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setUser({...user, receivedPending: user?.receivedPending > 0 ? user?.receivedPending -1 : 0})
            setModal(
                <article className='cancel-booking-message-container'>
                    <p>Reserva cancelada correctamente.</p>
                </article>
            )
        } else if (res.status === 403) {
            setModal(<p>Antes de confirmar debes activar tu usuario.</p>)
        } else if(res.status === 550) {
            setModal(
                <div>
                    <p>Oops parece que tenemos un problema con el envío de correo. Pero tu reserva se canceló correctamente. </p>
                </div>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido cancelar la reserva</p>
                </div>
            )
        }

        setDataReceivedBookings(currentList => {
            return currentList.filter(booking => booking.bookingId !== bookingData.bookingId)
        })
    }

    return (
        <article className='card-received-booking'>
            <div className="picture-received-booking" style={{ backgroundImage: `url(${SERVER_URL}${bookingData.housePicUrl})` }} ></div>
            <div className='booking-data-container'>
                <Link to={'/houses/' + bookingData.houseId} className='title-received-booking'>🏠 {bookingData.title}</Link>
                <div className='tenant-data'>
                    <div className='tenant-avatar-received' style={{ backgroundImage: `url(${SERVER_URL}${bookingData.tenantPicture})` }} />
                    <p className='name-tenant'>{bookingData.tenantName}</p>
                    <div className='rating-tenant'>
                        <Rating value={bookingData.ratingAvg} className='rating-tenant' />
                    </div></div>
                <div className='date-card-pending-bookings-container'>
                    <div className='date-card-pending-bookings'>
                        <span>📅 Fecha de entrada: {bookingData.startDate.slice(0, 10)}</span>
                    </div>
                    <div className='date-card-pending-bookings'>
                        <span>📅 Fecha de salida: {bookingData.endDate.slice(0, 10)}</span>
                    </div>
                </div>
                <div className='buttons-received-bookings'>
                    <span bookingid={Number(bookingData.bookingId)} onClick={handleConfirmReceivedBooking}>Aceptar</span>
                    <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelReceivedBooking}>Cancelar</span>
                </div>
            </div>
        </article>
    )
}

export default CardReceivedPendingBooking
