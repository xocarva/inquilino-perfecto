import './PendingBookings.css'
import { Link } from "react-router-dom";
import { useSetModal, useUser } from "../hooks";
import Loading from '../Loading';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function CardMadePendingBooking( { bookingData } ) {
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
                            <div key={bookingData.housePicUrl} className="picture-received-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.urlPic})` }} ></div>
                            <Link key={bookingData.title} to={'/houses/' + bookingData.houseId} className='title-received-booking'>{bookingData.title}<span> ➕info</span></Link>
                            <div className='tenant-data-container'>
                                <div className='tenant-avatar' key={bookingData.tenantPicture} style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${bookingData.tenantPicture})` }} />
                            </div>
                            <p key={bookingData.startDate} className='date-received-booking' >Desde el {bookingData.startDate.slice(0, 10)} hasta el {bookingData.endDate.slice(0, 10)}</p>
                            <div className='buttons-received-bookings'>
                                <span bookingid={Number(bookingData.bookingId)} onClick={handleCancelMadeBooking}>Cancelar</span>
                            </div>
                        </article>
    )
}

export default CardMadePendingBooking