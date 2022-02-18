import { Suspense, useEffect } from 'react'
import { useParams } from "react-router-dom"
import useFetch from '../useFetch'
import Loading from '../Loading'
import { useModal, useSetModal, useUser } from '../hooks'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './House.css'


const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL


function House() {
  const { id, startDate, endDate } = useParams()
  const user = useUser()
  const modal = useModal()
  const setModal = useSetModal()
  const [mainPic, setMainPic] = useState('')
  const [stepPic, setStepPic] = useState(0)

  const house = useFetch(REACT_APP_BASE_URL + '/houses/' + id)
  // setMainPic(house.pictures[0].url)

  const handleBooking = async e => {
    e.preventDefault()
    const res = await fetch(REACT_APP_BASE_URL + '/bookings/' + id, {
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
    } else {
        setModal(
            <div className='modal-container'>
                <p>No se ha podido realizar la reserva.</p>
            </div>
        )
    }
}

const perPagePics = 6
const pagsPics = Math.ceil(house.pictures?.length / perPagePics)
const handlePrev = () => setStepPic(stepPic > 0 ? stepPic - 1 : pagsPics - 1)
const handleNext = () => setStepPic((stepPic + 1) % pagsPics)

useEffect(() => {
  setMainPic(house.pictures[0].url)
}, [])

  return (
    <>
      {house && <section className='ad'>
            <section className='ad-info'>
              <div className='main-picture' style={{backgroundImage:`url("http://localhost:3000${mainPic}")`}}></div>
              <div className='main-info'>
                <h2>{house.title}</h2>
                <span>{house.city}</span>
                <span>{house.rooms} habitaciones</span>
                {startDate && endDate &&
                <div className='dates'>
                  <div className='date'>
                    <span>Fecha de entrada</span>
                    <span>{startDate}</span>
                  </div>
                  <div className='date'>
                    <span>Fecha de salida</span>
                    <span>{endDate}</span>
                  </div>
                </div>
              }
              </div>
              {startDate && endDate &&<div className='price-container'>
                <span className='price'>{house.price}€ / Día</span>
                <button className='booking-button' onClick={handleBooking}>Reservar</button>
              </div>}
            </section>
            <section className='all-pictures'>
              <div className='pictures'>
                {house.pictures?.slice(stepPic * perPagePics, (stepPic + 1) * perPagePics).map(picture =>
                  <div key={picture.url} className='small-picture' onClick={() => setMainPic(picture.url)} style={{backgroundImage:`url("${REACT_APP_BASE_URL}${picture.url}")`}}>
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
      </section>}
    </>
  )
}

const HouseWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <House />
  </Suspense>

export default HouseWrapper
