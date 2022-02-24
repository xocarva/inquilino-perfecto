import { useState } from 'react'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
import Puntuacion from '../Puntuacion'
import './TenantProfile.css'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


const ScoreToTenant = ( { bookingData } ) =>  {
    const user = useUser()
    const setModal = useSetModal()
    const [rating, setRating] = useState(null)
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch(REACT_APP_BASE_URL + '/users/rate/' + bookingData.bookingId, {
            method: 'POST',
            body: JSON.stringify({ rating }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        if(res.ok) {
            setModal(
                <article className='edit-confirm-message-container'>
                    <span>✅</span>
                    <p>Tus voto se guardó correctamente.</p>
                    <Loading />
                    <p>Cargando tu nuevo voto...</p>
                </article>
            )
            setTimeout(() => {
                window.location.reload(true)
            }, 2000)
        }
    }

    return(
        <>
            {!bookingData.tenantRating ?
                <div className='owner-rating-tenant' onSubmit={handleSubmit}>
                    <div>
                    <abbr title="Click para valorar" className='star-rating-owner' onClick={e => setRating(1)}>{rating >= 1 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-rating-owner' onClick={e => setRating(2)}>{rating >= 2 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-rating-owner' onClick={e => setRating(3)}>{rating >= 3 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-rating-owner' onClick={e => setRating(4)}>{rating >= 4 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-rating-owner' onClick={e => setRating(5)}>{rating >= 5 ? '★' : '☆'}</abbr>
                    </div>
                    <button className='button-rating-owner'>Valorar</button>
                </div>
                : <span className='rating-historic-owner'><Puntuacion value={bookingData.tenantRating}/></span>}
        </>
    )
}

export default ScoreToTenant
