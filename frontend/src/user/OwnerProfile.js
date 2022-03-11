import './OwnerProfile.css'
import { Suspense, useEffect, useState } from "react"
import Loading from "../Loading"
import useFetch from "../useFetch"
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import ScoreToTenant from './ScoreToTenant'
import ErrorBoundary from "../ErrorBoundary"
import { useUser } from '../hooks'
import Rating from '../Rating'
import NotFound from '../NotFound'
import NewAd from './NewAd'
import OwnerHouses from './OwnerHouses'
import OwnerBookings from './OwnerBookings'
import OwnerPendingBookings from './OwnerPendingBookings'
import OwnerRatings from './OwnerRatings'

function OwnerProfile() {

    return (
        <section className='profile-section'>
            <h1 className="profile-title">Perfil de casero</h1>
            <nav className="submenu">
                <Link className={(useLocation().pathname === '/user/owner-profile/houses') ? 'active' : ''} to="/user/tenant-profile/houses">Tus anuncios</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/new-house') ? 'active' : ''} to="/user/owner-profile/new-house">Publicar un anuncio</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/bookings') ? 'active' : ''} to="/user/owner-profile/bookings">Reservas confirmadas</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/pending-bookings') ? 'active' : ''} to="/user/owner-profile/pending-bookings">Reservas Pendientes</Link>
                <Link className={(useLocation().pathname === '/user/owner-profile/ratings') ? 'active' : ''} to="/user/owner-profile/ratings">Valoraciones recibidas</Link>
            </nav>
            <ErrorBoundary fallback={<NotFound />}>
                <Routes>
                    <Route path="houses" element={<OwnerHouses />} />
                    <Route path="new-house" element={<NewAd />} />
                    <Route path="bookings" element={<OwnerBookings />} />
                    <Route path="pending-bookings" element={<OwnerPendingBookings />} />
                    <Route path="ratings" element={<OwnerRatings />} />
                </Routes>
            </ErrorBoundary>
        </section>
    )


}

export default OwnerProfile





// function OwnerProfile() {

//     const {data: myAds} = useFetch(REACT_APP_BASE_URL + '/users/houses', [])

//     const [house, setHouse] = useState(0)
//     const [stepRating, setStepRating] = useState(0)
//     const [reload, setReload] = useState(false)

//     const perPage = 2
//     const pagsHouse = Math.ceil(myAds?.length / perPage)
//     const handleNext = () => setHouse(house > 0 ? house - 1 : pagsHouse - 1)
//     const handlePreview = () => setHouse((house + 1) % pagsHouse)

//     const {data: ratingsData} = useFetch(REACT_APP_BASE_URL + '/users/ratings/owner', [])


//    const totalRating = ratingsData.reduce((acc, rating) => {
//        return acc + rating.rating
//    }, 0)

//    const averageRatings = totalRating / ratingsData.length

//     const perPageRatings = 3
//     const pagsRatings = Math.ceil(ratingsData?.length / perPageRatings)
//     const handlePrevRatings = () => setStepRating(stepRating > 0 ? stepRating - 1 : pagsRatings - 1)
//     const handleNextRatings = () => setStepRating((stepRating + 1) % pagsRatings)

//     const user = useUser()
//     const [rentalsOffered, setRentalOffered] = useState(null)

//     useEffect(() => {
//         fetch(REACT_APP_BASE_URL + '/bookings/received/accepted', {
//             headers: {
//                 'Authorization': 'Bearer ' + user.token
//             }
//         })
//             .then(response => response.json())
//             .then(data => setRentalOffered(data))
//     }, [reload, user])

//     const [stepBooking, setStepBooking] = useState(0)

//     const perPageBookings = 2
//     const pagsBookings = Math.ceil(rentalsOffered?.length / perPageBookings)
//     const handlePrevBookings = () => setStepBooking(stepBooking > 0 ? stepBooking - 1 : pagsBookings - 1)
//     const handleNextBookings = () => setStepBooking((stepBooking + 1) % pagsBookings)
//     return rentalsOffered && (
//         <div className="body-owner-profile">
//             <div className='title-container'>
//                 <h1 className='title-owner'>Tus anuncios</h1>
//             </div>
//             <section>
//                 {myAds.length > 0 ? <article className='article-announcements'>
//                     {myAds.slice(house * perPage, (house + 1) * perPage).map(ad =>
//                         <div className='body-announcements' key={ad.id}>
//                             <Link className='house-title' to={'/houses/' + ad.id}> 🏠 {ad.title}</Link>
//                             <div className='owner-picture' style={{ backgroundImage: `url(${REACT_APP_BASE_URL}/${ad.pictures[0].url})` }}></div>
//                         </div>
//                     )}
//                     <section className='buttons-owner'>
//                         <span onClick={handleNext}>
//                             ⬅️
//                         </span>
//                         <span>{house + 1}/{Math.ceil(myAds.length / perPage)}</span>
//                         <span onClick={handlePreview}>
//                             ➡️
//                         </span>
//                     </section>
//                 </article> : <div className='there-is-not'>Aun no tienes anuncios publicados 😅</div>}
//             </section>
//             <div className='title-container'>
//                 <h1 className='title-owner'>Historico de alquileres ofertados</h1>
//             </div>
//             <section>
//                 {rentalsOffered.length > 0 ? <div className='rental-history'>
//                     {rentalsOffered?.slice(stepBooking * perPageBookings, (stepBooking + 1) * perPageBookings).map(booking =>
//                         <article className='card-offered-booking' key={booking.bookingId}>
//                             <div className="picture-offered-booking" style={{ backgroundImage: `url(${REACT_APP_BASE_URL}${booking.housePicUrl})` }} />
//                             <div className='info-offered'>
//                                 <Link to={'/houses/' + booking.houseId} className='title-offered-booking'>🏠 {booking.title}</Link>
//                                 <p key={booking.startDate} className='date-offered-booking' >📅 Desde el {booking.startDate.slice(0, 10)} hasta el {booking.endDate.slice(0, 10)}</p>
//                                 <div className='state-offered-booking'>
//                                     {Date.parse(booking.endDate) < new Date() && <ScoreToTenant reload={reload} setReload={setReload} bookingData={{ bookingId: booking.bookingId, ownerRating: booking.ownerRating }} />}
//                                 </div>
//                             </div>
//                         </article>
//                     )}
//                     <section className='button-owner-offered'>
//                         <span onClick={handlePrevBookings}>
//                             ⬅️
//                         </span>
//                         <span>{stepBooking + 1}/{Math.ceil(rentalsOffered.length / perPageBookings)}</span>
//                         <span onClick={handleNextBookings}>
//                             ➡️
//                         </span>
//                     </section>
//                 </div> : <div className='there-is-not'>Aun no tienes alquileres ofertados 😅</div>}
//             </section>
//             <div className='title-container'>
//                 <h1 className='title-owner'>Valoraciones recibidas como casero {ratingsData.length > 0 && <span>  (<Rating className='star-ratings' value={averageRatings} />)</span>}</h1>
//             </div>
//             <section className='body-rating'>
//                 {ratingsData.length > 0 ? <div>
//                     <div className='ratings-container'>
//                         <section className='cards-ratings-container'>
//                             {ratingsData?.slice(stepRating * perPageRatings, (stepRating + 1) * perPageRatings).map(rating =>
//                                 <article className='article-rating' key={rating.id}>
//                                     <Rating className='star-rating' value={rating.rating} />
//                                     <span className='date-rating'>{rating.ratingDate.slice(0, 10)}</span>
//                                 </article>
//                             )}
//                         </section>
//                     </div>
//                     <section className='buttons-owner'>
//                         <span onClick={handlePrevRatings}>
//                             ⬅️
//                         </span>
//                         <span>{stepRating + 1}/{Math.ceil(ratingsData.length / perPageRatings)}</span>
//                         <span onClick={handleNextRatings}>
//                             ➡️
//                         </span>
//                     </section>
//                 </div> : <div className='there-is-not'>Aun no tienes valoraciones 😅</div>}
//             </section>
//         </div>
//     )
// }

// const ownerProfileWrapper = () =>
//     <Suspense fallback={<Loading className="body-owner-profile" />}>
//         <OwnerProfile />
//     </Suspense>


// export default ownerProfileWrapper

