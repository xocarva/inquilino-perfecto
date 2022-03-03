import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'
import { useSetModal } from '../hooks'


function SearchBar () {
    const navigate = useNavigate()
    const setModal = useSetModal()
    const [city, setCity] = useState('')
    const [price, setPrice] = useState('')
    const [rooms, setRooms] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [showBar, setShowBar] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        if(startDate >= endDate || new Date (startDate) < new Date()) {
            setModal(
                <div className='modal'>
                    <p>Las fechas no son válidas</p>
                </div>
            )
            return
        }

        let url = '/houses/search/?startDate=' + startDate + '&endDate=' + endDate
        if(city) url += '&city=' + city
        if(rooms) url += '&rooms=' + rooms
        if(price) url += '&price=' + price
        setCity('')
        setPrice('')
        setRooms('')
        setStartDate('')
        setEndDate('')
        setShowBar(!showBar)
        navigate(url)
    }

    return (
        <>
            {!showBar && <div className='search-icon-container'>
                <span className='search-icon' onClick={() => setShowBar(!showBar)}>Buscar</span>
            </div>}
            {showBar && <div className='form-container'>
                <form className="searchForm" onSubmit={handleSubmit}>
                    <h2>Encuentra tu vivienda</h2>
                    <label>
                        Localidad
                        <input type="text" value={city} onChange={e => setCity(e.target.value)}></input>
                    </label>
                    <label>
                        Precio
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)}></input>
                    </label>
                    <label>
                        Habitaciones
                        <select className='rooms-select' value={rooms} onChange={e => setRooms(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">+3</option>
                        </select>
                    </label>
                    <label>
                        Fecha entrada
                        <input type="date" min={(new Date()).toISOString().split('T')[0]} value={startDate} required onChange={e => setStartDate(e.target.value)}></input>
                    </label>
                    <label>
                        Fecha salida
                        <input type="date" min={(new Date()).toISOString().split('T')[0]} value={endDate} required onChange={e => setEndDate(e.target.value)}></input>
                    </label>
                    <div className='button-container'>
                        <input type="submit" value="Buscar"></input>
                    </div>
                </form>
                <div className='close-icon-container'>
                    <span className='close-bar-icon' onClick={() => setShowBar(!showBar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-up" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718355" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="12" y1="10" x2="12" y2="20" />
                            <line x1="12" y1="10" x2="16" y2="14" />
                            <line x1="12" y1="10" x2="8" y2="14" />
                            <line x1="4" y1="4" x2="20" y2="4" />
                        </svg>
                    </span>
                </div>
            </div>}
        </>
    )
}

export default SearchBar