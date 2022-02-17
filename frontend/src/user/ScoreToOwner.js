import { useState } from 'react'
import { useUser } from '../hooks'
import Puntuacion from '../Puntuacion'
import './TenantProfile.css'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


const ScoreToOwner = ( { bookingData } ) =>  {
    const user = useUser()
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
            console.log('ok')
            window.location.reload(true)
        }
    }

    return(
        <div>
            {!bookingData.tenantRating ?
                <form onSubmit={handleSubmit}>
                    <input onChange={e => setRating(e.target.value)} type='number' placeholder='Califica tu estancia' min='0' max='5' />
                    <button>Enviar</button>
                </form>
                : <Puntuacion value={bookingData.tenantRating}>Ya has votado</Puntuacion>}
        </div>
    )
}

export default ScoreToOwner
