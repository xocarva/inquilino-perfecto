import { Suspense } from 'react'
import { useParams } from "react-router-dom"
import useFetch from '../useFetch'
import Loading from '../Loading'
import { useModal, useSetModal, useUser } from '../hooks'
import { Link } from 'react-router-dom'
import './House.css'




const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function House() {
  const { id, startDate, endDate } = useParams()
  const user = useUser()
  const modal = useModal()
  const setModal = useSetModal()
  const house = useFetch('http://localhost:3000/houses/' + id)

  const handleBooking = async e => {
    e.preventDefault()
    const res = await fetch(REACT_APP_BASE_URL + '/bookings/' + e.target.dataset.houseid, {
        method: 'POST',
        body: JSON.stringify({startDate, endDate}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        }
    })
    if(res.ok) {
        setModal(
            <div className='modal-container'>
                <p>Reserva confirmada.</p>
                <Link className='modal-link' to='/user/pending-bookings' onClick={e => modal(false)} >Continuar</Link>
            </div>
        )
        modal(true)
    } else {
        setModal(
            <div className='modal-container'>
                <p>No se ha podido realizar la reserva.</p>
            </div>
        )
        modal(true)
    }
}

  return (
    <>
      {house && <article className="house-card">
          <div className='house-picture' style={{backgroundImage:`url("http://localhost:3000${house.pictures[0].url}")`}}></div>
          <div className='house-info'>
            <a className='title' href='/'>{house.title}</a>
            <p className='rooms'>{house.rooms} habitaciones</p>
            <p className='price'>{house.price}€ / día</p>
          </div>
          <button className='booking-button'>Reservar</button>
      </article>}
    </>
  )
}

const HouseWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <House />
  </Suspense>

export default HouseWrapper
