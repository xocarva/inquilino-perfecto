import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useUser } from '../hooks'
import Rating from '../Rating'
import useFetch from '../useFetch'
import './TenantRatings.css'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function TenantRatings() {
    const user = useUser()
    const [stepRating, setStepRating] = useState(0)
    const { data: ratingsData } = useFetch(REACT_APP_BASE_URL + '/users/ratings/tenant', [])

    let totalRatings = 0
    ratingsData?.map(rating =>
        totalRatings = totalRatings + rating.rating,
    )
    let averageRatings = totalRatings / ratingsData?.length

    const perPageRatings = 5
    const pagsRatings = Math.ceil(ratingsData?.length / perPageRatings)
    const handlePrevRatings = () => setStepRating(stepRating > 0 ? stepRating - 1 : pagsRatings - 1)
    const handleNextRatings = () => setStepRating((stepRating + 1) % pagsRatings)


    return (
        <section className='ratings-section'>
            <h2>Valoraciones recibidas como inquilino</h2>
            <p className='desciption'>Aquí puedes revisar el histórico de valoraciones.</p>
            <section className="historic-ratings-container">
                <div className='ratings-container'>
                    <section className='cards-ratings-container'>
                        {ratingsData?.slice(stepRating * perPageRatings, (stepRating + 1) * perPageRatings).map(rating =>
                            <article className='card-historic-rating' key={nanoid()}>
                                <Rating value={rating.rating} />
                                <span className='date-rating'>{rating.ratingDate.slice(0, 10)}</span>
                            </article>
                        )}
                    </section>
                    {ratingsData?.length > 0 ? <section className='button-steps-container-ratings'>
                        <span onClick={handlePrevRatings}>
                            ⬅️
                        </span>
                        <span>{stepRating + 1}/{Math.ceil(ratingsData.length / perPageRatings)}</span>
                        <span onClick={handleNextRatings}>
                            ➡️
                        </span>
                    </section> : <p>Aún no tienes valoraciones como inquilino. 😞</p>}
                </div>
                {ratingsData?.length > 0 && <section className='average-ratings'>
                    <h3>Media de valoraciones</h3>
                    <span className='average-ratings-number'>{averageRatings.toFixed(1)}</span>
                    <Rating value={averageRatings} />
                </section>}
            </section>
        </section>
    )
}

export default TenantRatings
