import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks'
import Loading from '../Loading'
import Oops from '../Oops'
import './OwnerBookings.css'
import ScoreToTenant from './ScoreToTenant'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function OwnerBookings() {
    const user = useUser()
    const [rentalsOffered, setRentalOffered] = useState(null)
    const [reload, setReload] = useState(false)
    const [stepBooking, setStepBooking] = useState(0)
    const [error, setError] = useState(null)

    const perPageBookings = 3
    const pagsBookings = Math.ceil(rentalsOffered?.length / perPageBookings)
    const handlePrevBookings = () => setStepBooking(stepBooking > 0 ? stepBooking - 1 : pagsBookings - 1)
    const handleNextBookings = () => setStepBooking((stepBooking + 1) % pagsBookings)


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(SERVER_URL + '/bookings/received/accepted', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const data = await response.json()
                setRentalOffered(data)
                setError(null)
            } catch (error) {
                setError(error)
            }
        }

        loadData()

    }, [reload, user])

    if (error) return <Oops />

    return (
        <section className="main-section">
            <h2>Reservas recibidas que has confirmado</h2>
            <p className="description">Aquí puedes revisar el histórico de reservas en tus propiedades y valorar a los inquilinos de aquellas que ya hayan finalizado.</p>
            {!rentalsOffered && <Loading />}
            {rentalsOffered && <section>
                {rentalsOffered?.length > 0 ? <div className='rental-history'>
                    {rentalsOffered?.slice(stepBooking * perPageBookings, (stepBooking + 1) * perPageBookings).map(booking =>
                        <article className='card-offered-booking' key={booking.bookingId}>
                            <div className="picture-offered-booking" style={{ backgroundImage: `url(${SERVER_URL}${booking.housePicUrl})` }} />
                            <div className='info-offered'>
                                <Link to={'/houses/' + booking.houseId} className='title-offered-booking'>🏠 {booking.title}</Link>
                                <div className='date-offered-bookings'>
                                    <span>📅 Fecha de entrada: </span>
                                    <span>{booking.startDate.slice(0, 10)}</span>
                                </div>
                                <div className='date-offered-booking'>
                                    <span>📅 Fecha de salida: </span>
                                    <span>{booking.endDate.slice(0, 10)}</span>
                                </div>
                                <div className='tenant-data'>
                                    <div className='tenant-avatar' style={{ backgroundImage: `url(${SERVER_URL}${booking.tenantPicture})` }}></div>
                                    <p>{booking?.tenantName}</p>
                                </div>
                                <div className='state-offered-booking'>
                                    {Date.parse(booking.endDate) < new Date() && <ScoreToTenant reload={reload} setReload={setReload} bookingData={{ bookingId: booking.bookingId, ownerRating: booking.ownerRating }} />}
                                </div>
                            </div>
                        </article>
                    )}
                    <section className='button-owner-offered'>
                        <span className='prev-button' onClick={handlePrevBookings}>
                            ⬅️
                        </span>
                        <span>{stepBooking + 1}/{Math.ceil(rentalsOffered?.length / perPageBookings)}</span>
                        <span className='prev-button' onClick={handleNextBookings}>
                            ➡️
                        </span>
                    </section>
                </div> : <div className='there-is-not'>Aun no tienes alquileres ofertados 😅</div>}
            </section>}
        </section>
    )
}

export default OwnerBookings
