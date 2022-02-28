import './OwnerProfile.css'
import { Suspense, useState } from "react"
import Loading from "../Loading"
import useFetch from "../useFetch"
import { Link } from 'react-router-dom'
import ScoreToTenant from './ScoreToTenant'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function Puntuacion({ value }) {
    return (
        <span className="puntuacion">
            {value >= 1 ? '★' : '☆'}
            {value >= 2 ? '★' : '☆'}
            {value >= 3 ? '★' : '☆'}
            {value >= 4 ? '★' : '☆'}
            {value >= 5 ? '★' : '☆'}
        </span>
    )
}


function OwnerProfile() {

    const myAds = useFetch(REACT_APP_BASE_URL + '/users/houses')

    const [house, setHouse] = useState(0)
    const [stepRating, setStepRating] = useState(0)

    const perPage = 2
    const pagsHouse = Math.ceil(myAds?.length / perPage)
    const handleNext = () => setHouse(house > 0 ? house - 1 : pagsHouse - 1)
    const handlePreview = () => setHouse((house + 1) % pagsHouse)

    const ratingsData = useFetch(REACT_APP_BASE_URL + '/users/ratings/owner')

    const perPageRatings = 3
    const pagsRatings = Math.ceil(ratingsData?.length / perPageRatings)
    const handlePrevRatings = () => setStepRating(stepRating > 0 ? stepRating - 1 : pagsRatings - 1)
    const handleNextRatings = () => setStepRating((stepRating + 1) % pagsRatings)

    const rentalsOffered = useFetch(REACT_APP_BASE_URL + '/bookings/received/accepted')
    const [stepBooking, setStepBooking] = useState(0)

    const perPageBookings = 2
    const pagsBookings = Math.ceil(rentalsOffered?.length / perPageBookings)
    const handlePrevBookings = () => setStepBooking(stepBooking > 0 ? stepBooking - 1 : pagsBookings - 1)
    const handleNextBookings = () => setStepBooking((stepBooking + 1) % pagsBookings)
    return rentalsOffered && (
        <div className="body-owner-profile">
            <section>
                <h3>Tus anuncios</h3>
                <article className='article-announcements'>
                    {myAds?.slice(house * perPage, (house + 1) * perPage).map(ad =>
                        <div className='body-announcements' key={ad.id}>
                            <Link className='house-title' to={'/houses/' + ad.id}> 🏠 {ad.title}</Link>
                            <div className='owner-picture' style={{ backgroundImage: `url(${REACT_APP_BASE_URL}/${ad.pictures[0].url})` }}></div>
                        </div>
                    )}
                    <section className='buttons-owner'>
                        <span onClick={handleNext}>
                            ⬅️
                        </span>
                        <span>{house + 1}/{Math.ceil(myAds.length / perPage)}</span>
                        <span onClick={handlePreview}>
                            ➡️
                        </span>
                    </section>
                </article>
            </section>
            <section className='rental-history'>
                <h3>Historico de alquileres ofertados</h3>
                {rentalsOffered?.slice(stepBooking * perPageBookings, (stepBooking + 1) * perPageBookings).map(booking =>
                    <article className='card-offered-booking' key={booking.houseId}>
                        <div className="picture-offered-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.housePicUrl})` }} />
                        <div className='info-offered'>
                            <Link to={'/houses/' + booking.houseId} className='title-offered-booking'>🏠 {booking.title}</Link>
                            <p key={booking.startDate} className='date-offered-booking' >📅 Desde el {booking.startDate.slice(0, 10)} hasta el {booking.endDate.slice(0, 10)}</p>
                            <div className='state-offered-booking'>
                                {Date.parse(booking.endDate) < new Date() && <ScoreToTenant bookingData={{ bookingId: booking.bookingId, ownerRating: booking.ownerRating }} />}
                            </div>
                        </div>
                    </article>
                )}
                <section className='button-owner-offered'>
                    <span onClick={handlePrevBookings}>
                        ⬅️
                    </span>
                    <span>{stepBooking + 1}/{Math.ceil(rentalsOffered.length / perPageBookings)}</span>
                    <span onClick={handleNextBookings}>
                        ➡️
                    </span>
                </section>
            </section>
            <section className='body-rating'>
                <h3>Valoraciones recibidas como casero</h3>
                <div className='ratings-container'>
                    <section className='cards-ratings-container'>
                        {ratingsData?.slice(stepRating * perPageRatings, (stepRating + 1) * perPageRatings).map(rating =>
                            <article className='article-rating' key={rating.ratingDate}>
                                <Puntuacion key={rating.rating} value={rating.rating} />
                                <span key={rating.ratingDate} className='date-rating'>{rating.ratingDate.slice(0, 10)}</span>
                            </article>
                        )}
                    </section>
                    <section className='buttons-owner'>
                        <span onClick={handlePrevRatings}>
                            ⬅️
                        </span>
                        <span>{stepRating + 1}/{Math.ceil(ratingsData.length / perPageRatings)}</span>
                        <span onClick={handleNextRatings}>
                            ➡️
                        </span>
                    </section>
                </div>
            </section>
        </div>
    )
}

const ownerProfileWrapper = () =>
    <Suspense fallback={<Loading className="body-owner-profile" />}>
        <OwnerProfile />
    </Suspense>


export default ownerProfileWrapper

