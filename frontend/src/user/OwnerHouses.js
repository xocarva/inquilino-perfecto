import { useState } from "react"
import { Link } from "react-router-dom"
import useFetch from "../useFetch"

import "./OwnerHouses.css"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function OwnerHouses() {
    const [house, setHouse] = useState(0)
    const { data: myAds } = useFetch(SERVER_URL + '/users/houses', [])

    const perPage = 12
    const pagsHouse = Math.ceil(myAds?.length / perPage)
    const handleNext = () => setHouse(house > 0 ? house - 1 : pagsHouse - 1)
    const handlePreview = () => setHouse((house + 1) % pagsHouse)


    return (
        <section className="owner-houses">
            <h2>Tus anuncios</h2>
            <p className="description">Aquí puedes ver tus propiedades.</p>
            {myAds.length > 0 ? <article className='article-announcements'>
                {myAds.slice(house * perPage, (house + 1) * perPage).map(ad =>
                    <div className='body-announcements' key={ad.id}>
                        <Link className='house-title' to={'/houses/' + ad.id}> 🏠 {ad.title}</Link>
                        <div className='owner-picture' style={{ backgroundImage: `url(${SERVER_URL}/${ad.pictures[0].url})` }}></div>
                    </div>
                )}
            </article> : <p className="no-houses">Aun no tienes anuncios publicados 😅</p>}
        {myAds.length > 0 && <section className='buttons-owner-houses'>
                <span className="prev-button" onClick={handleNext}>
                    ⬅️
                </span>
                <span>{house + 1}/{Math.ceil(myAds.length / perPage)}</span>
                <span className="next-button" onClick={handlePreview}>
                    ➡️
                </span>
            </section>}
        </section>
    )
}

export default OwnerHouses
