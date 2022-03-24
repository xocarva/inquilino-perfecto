import { Link } from "react-router-dom";
import { useSetModal, useSetUser, useUser } from "../hooks";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function CardMadePendingBooking({ bookingData, setDataMadeBookings }) {
    const user = useUser()
    const setUser = useSetUser()
    const setModal = useSetModal()

    const handleCancelMadeBooking = async e => {
        const res = await fetch(SERVER_URL + '/bookings/cancel/' + e.target.attributes.bookingId.value, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.ok) {
            setUser({ ...user, madePending: user?.madePending > 0 ? user?.madePending - 1 : 0 })
            setModal(
                <article className='edit-confirm-message-container'>
                    <p>Reserva cancelada correctamente</p>
                </article>
            )
        } else if (res.status === 403) {
            setModal(<p>Antes de cancelar debes activar tu usuario</p>)
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

        setDataMadeBookings(currentList => {
            return currentList.filter(booking => booking.bookingId !== bookingData.bookingId)
        })
    }

    return (
        <article className='card-made-booking'>
            <div className="picture-made-booking" style={{ backgroundImage: `url(${SERVER_URL}${bookingData.urlPic})` }} ></div>
            <div className='booking-data-container'>
                <Link to={'/houses/' + bookingData.houseId} className='title-made-booking'>🏠 {bookingData.title}</Link>
                <div className='date-card-made-bookings-container'>
                    <div className='date-card-made-bookings'>
                        <span>📅 Fecha de entrada</span>
                        <span>{bookingData.startDate.slice(0, 10)}</span>
                    </div>
                    <div className='date-card-made-bookings'>
                        <span>📅 Fecha de salida</span>
                        <span>{bookingData.endDate.slice(0, 10)}</span>
                    </div>
                </div>
                <div className='buttons-made-cancel-bookings'>
                    <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelMadeBooking}>Cancelar</span>
                </div>
            </div>
        </article>
    )
}

export default CardMadePendingBooking