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
        <div>
            {!bookingData.ownerRating ?
                <form onSubmit={handleSubmit}>
                    <input onChange={e => setRating(e.target.value)} type='number' placeholder='Califica tu estancia' min='0' max='5' />
                    <button>Enviar</button>
                </form>
                : <Puntuacion value={bookingData.ownerRating} />}
        </div>
    )
}

export default ScoreToTenant
