import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../hooks"
import Loading from "../Loading"
import Oops from "../Oops"
import ScoreToOwner from "./ScoreToOwner"

import "./TenantBookings.css"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function TenantBookings() {
    const user = useUser()
    const [bookingsData, setBookingsData] = useState(null)
    const [stepBooking, setStepBooking] = useState(0)
    const [reload, setReload] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(SERVER_URL + '/bookings/made/accepted', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const data = await response.json()
                setBookingsData(data)
                setError(null)
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [reload, user])

    if(error) return <Oops />
    if(!bookingsData) return <Loading />

    const perPageBookings = 3
    const pagsBookings = Math.ceil(bookingsData?.length / perPageBookings)
    const handlePrevBookings = () => setStepBooking(stepBooking > 0 ? stepBooking - 1 : pagsBookings - 1)
    const handleNextBookings = () => setStepBooking((stepBooking + 1) % pagsBookings)


    return (
        <section className="main-section">
            <h2>Tu histórico de estancias</h2>
            <p className="description">Aquí puedes revisar tus reservas confirmadas y valorar las finalizadas.</p>
            {bookingsData < 1 && <p>Aún no tienes ninguna reserva. 😞</p>}
            <section className="historic-bookings-container">
                {bookingsData?.slice(stepBooking * perPageBookings, (stepBooking + 1) * perPageBookings).map(booking =>
                    <article className='card-house-historic-booking' key={booking.bookingId}>
                        <div className="picture-historic-booking" style={{ backgroundImage: `url(${SERVER_URL}${booking.housePicUrl})` }} ></div>
                        <div className='data-booking-container'>
                            <Link to={'/houses/' + booking.houseId} className='title-historic-booking'>🏠 {booking.houseTitle}</Link>
                            <div className='date-card-bookings'>
                                <span>📅 Fecha de entrada: </span>
                                <span>{booking.startDate.slice(0, 10)}</span>
                            </div>
                            <div className='date-card-bookings'>
                                <span>📅 Fecha de salida: </span>
                                <span>{booking.endDate.slice(0, 10)}</span>
                            </div>
                            <div className='state-booking'>
                                {Date.parse(booking.endDate) < new Date() && <ScoreToOwner setReload={setReload} reload={reload} bookingData={{ bookingId: booking.bookingId, tenantRating: booking.tenantRating }} />}
                            </div>
                        </div>
                    </article>
                )}
            </section>
        {bookingsData?.length > 0 && <section className='button-steps-container-bookings'>
                <span className="prev-button" onClick={handlePrevBookings}>
                    ⬅️
                </span>
                <span>{stepBooking + 1}/{Math.ceil(bookingsData?.length / perPageBookings)}</span>
                <span className="next-button" onClick={handleNextBookings}>
                    ➡️
                </span>
            </section>}
        </section>
    )
}

export default TenantBookings
