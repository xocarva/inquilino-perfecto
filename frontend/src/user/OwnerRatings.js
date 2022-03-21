import { nanoid } from 'nanoid'
import { useState } from 'react'
import Rating from '../Rating'
import { useFetch } from '../hooks'
import './OwnerRatings.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function OwnerRatings() {
    const [stepRating, setStepRating] = useState(0)
    const { data: ratingsData } = useFetch(SERVER_URL + '/users/ratings/owner', [])

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
            <h2>Valoraciones recibidas como casero</h2>
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
                        <span className='prev-button' onClick={handlePrevRatings}>
                            ⬅️
                        </span>
                        <span>{stepRating + 1}/{Math.ceil(ratingsData.length / perPageRatings)}</span>
                        <span className='next-button' onClick={handleNextRatings}>
                            ➡️
                        </span>
                    </section> : <p>Aún no tienes valoraciones como casero. 😞</p>}
                </div>
                {ratingsData?.length > 0 && <section style={averageRatings >= 2.5 ? {backgroundColor: 'rgb(220, 241, 220)'} : {backgroundColor: 'rgb(253, 222, 222)'}} className='average-ratings'>
                    <h3>Media de valoraciones</h3>
                    <span className='average-ratings-number'>{averageRatings.toFixed(1)}</span>
                    <Rating value={averageRatings}  varClass={'card-rating'}/>
                    <span className='emoji-rating'>{averageRatings >= 2.5 ? '😊' : '☹️'}</span>
                </section>}
            </section>
        </section>
    )
}

export default OwnerRatings

