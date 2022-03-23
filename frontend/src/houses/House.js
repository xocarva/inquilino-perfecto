import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import { useFetch } from '../hooks'
import Loading from '../Loading'
import { useSetModal, useUser } from '../hooks'
import Login from '../Login'
import Rating from '../Rating'
import './House.css'
import Oops from '../Oops'


const SERVER_URL = process.env.REACT_APP_SERVER_URL


function House() {
  const { id, startDate, endDate } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const setModal = useSetModal()
  const [mainPic, setMainPic] = useState('')
  const [stepPic, setStepPic] = useState(0)

  const { data: house } = useFetch(SERVER_URL + '/houses/' + id)

  useEffect(() => {
    if (house?.pictures.length > 0) {
      setMainPic(house.pictures[0].url)
    }
  }, [house])

  if (!house) return <Loading />

  const handleBooking = async e => {
    e.preventDefault()
    if (!user) {
      setModal(<Login />)
      return
    }
    const res = await fetch(SERVER_URL + '/bookings/' + id, {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })

    if (res.ok) {
      setModal(
        <div className='modal-container'>
          <p>Se ha guardado tu reserva</p>
        </div>
      )
      navigate('/user/tenant-profile/pending-bookings')
    } else if (res.status === 403) {
        setModal(
          <div className='modal-container'>
            <p>Para poder reservar un alojamiento debes activar primero tu usuario</p>
          </div>
        )
    } else if (res.status === 460) {
        setModal(
          <div className='modal-container'>
            <p>No puedes reservar tu propia casa</p>
          </div>
      )
    } else if(res.status === 550) {
      setModal(
          <div>
              <p>Oops parece que tenemos un problema con el envío de correo. Pero tu reserva se produjo correctamente. </p>
          </div>
      )
  } else {
        setModal(
          <div className='modal-container'>
            <p>No se ha podido realizar la reserva</p>
          </div>
        )
    }
  }

  const perPagePics = 9
  const pagsPics = Math.ceil(house.pictures?.length / perPagePics)
  const handlePrev = () => setStepPic(stepPic > 0 ? stepPic - 1 : pagsPics - 1)
  const handleNext = () => setStepPic((stepPic + 1) % pagsPics)

  return (
    <>
      {house && <section className='ad'>
        <section className='ad-info'>
          <div className='main-picture' style={{ backgroundImage: `url("${SERVER_URL}${mainPic}")` }}></div>
          <div className='main-info'>
            <h2>🏠 {house.title}</h2>
            <div className='owner'>
              <div className='owner-pic' style={{ backgroundImage: `url("${SERVER_URL}${house.ownerPic}")` }}></div>
              <span className='owner-name'>{house.ownerName}</span>
              <Rating value={house.rating} className='rating-tenant' />
            </div>
            <span>🏙️ {house.city}</span>
            <span>🚪 {house.rooms} habitaciones</span>
            <span className='price'>🪙 {house.price}€ / Día</span>
            {startDate && endDate && <div className='dates'>
              <div className='date'>
                <span>📅 Fecha de entrada</span>
                <span>{startDate}</span>
              </div>
              <div className='date'>
                <span>📅 Fecha de salida</span>
                <span>{endDate}</span>
              </div>
            </div>}
            {startDate && endDate &&
              <button className='booking-btn' onClick={handleBooking}>Reservar</button>
            }
          </div>
        </section>
        <section className='all-pictures'>
          <div className='pictures'>
            {house.pictures?.slice(stepPic * perPagePics, (stepPic + 1) * perPagePics).map(picture =>
              <div key={picture.url} className='small-picture' onClick={() => setMainPic(picture.url)} style={{ backgroundImage: `url("${SERVER_URL}${picture.url}")` }}>
              </div>
            )}
          </div>
          <div className='pics-steps-buttons'>
            <span className='step-button' onClick={handlePrev}>
              ⬅️
            </span>
            <span>{stepPic + 1}/{Math.ceil(house.pictures?.length / perPagePics)}</span>
            <span className='step-button' onClick={handleNext}>
              ➡️
            </span>
          </div>
        </section>
        <section>
          <h3>Descripción</h3>
          <p>{house.description}</p>
        </section>
        <button className='back-button' onClick={() => navigate(-1)}>Volver</button>
      </section>}
    </>
  )
}

export default House
