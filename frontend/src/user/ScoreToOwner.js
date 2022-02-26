import { useState } from 'react'
import { useSetModal, useUser } from '../hooks'
import Puntuacion from '../Puntuacion'
import './TenantProfile.css'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


const ScoreToOwner = ( { bookingData } ) =>  {
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
                </article>
            )
        } else {
            setModal(
                <div className='modal-container'>
                    <p>No se ha podido guardar tu voto.</p>
                </div>
            )
        }
    }

    return(
        <div className='rating-historic-tenant'>
            {!bookingData.tenantRating ?
            <>
                    <div className='for-rating'>
                    <abbr title="Click para valorar" className='star-for-rating' onClick={e => setRating(1)}>{rating >= 1 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-for-rating' onClick={e => setRating(2)}>{rating >= 2 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-for-rating' onClick={e => setRating(3)}>{rating >= 3 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-for-rating' onClick={e => setRating(4)}>{rating >= 4 ? '★' : '☆'}</abbr>
                    <abbr title="Click para valorar" className='star-for-rating' onClick={e => setRating(5)}>{rating >= 5 ? '★' : '☆'}</abbr>
                    </div>
                    <button className='button-rating' onClick={handleSubmit}>Valorar</button>
            </>
                : <span className='rating-historic-tenant'><Puntuacion value={bookingData.tenantRating}/></span>}
        </div>
    )
}

export default ScoreToOwner
