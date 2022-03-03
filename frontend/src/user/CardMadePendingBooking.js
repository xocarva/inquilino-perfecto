import './PendingBookings.css'
import { Link } from "react-router-dom";
import { useSetModal, useUser } from "../hooks";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function CardMadePendingBooking({ bookingData, reloadMade, setReloadMade }) {
    const user = useUser()
    const setModal = useSetModal()

    const handleCancelMadeBooking = async e => {
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
                    <p>Reserva cancelada correctamente.</p>
                </article>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido cancelar la reserva</p>
                </div>
            )
        }
        setReloadMade(!reloadMade)
    }

    return (
        <article className='card-received-booking card-pending-bookings'>
            <div className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.urlPic})` }} ></div>
            <Link to={'/houses/' + bookingData.houseId} className='title-received-booking'>🏠 {bookingData.title}</Link>
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
                <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelMadeBooking}>Cancelar</span>
            </div>
        </article>
    )
}

export default CardMadePendingBooking