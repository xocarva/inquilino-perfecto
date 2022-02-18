import './OwnerProfile.css'
import { Suspense, useState } from "react"
import Loading from "../Loading"
import useFetch from "../useFetch"
import { Link } from 'react-router-dom'

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
    console.log(rentalsOffered)

    return (
        <div className="body-owner-profile">
            <section>
                <h3>Tus anuncios</h3>
                <article className='article-ads'>
                    {myAds?.slice(house * perPage, (house + 1) * perPage).map(ad =>
                        <div className='body-ads' key={ad.id}>
                            <Link className='house-title' to={'/houses' + ad.id}>{ad.title}</Link>
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
                    <section id='buttons-owner-rating'>
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

