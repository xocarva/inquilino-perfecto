import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery }  from '../hooks'
import './SearchBar.css'
import { useModal, useSetModal } from '../hooks'


function SearchBar () {
    const navigate = useNavigate()
    const query = useQuery()
    const modal = useModal()
    const setModal = useSetModal()
    const [city, setCity] = useState(query.get('city'))
    const [price, setPrice] = useState(query.get('price'))
    const [rooms, setRooms] = useState(query.get('rooms'))
    const [startDate, setStartDate] = useState(query.get('startDate'))
    const [endDate, setEndDate] = useState(query.get('endDate'))

    const handleSubmit = async e => {
        e.preventDefault()
        if(startDate >= endDate || new Date (startDate) < new Date()) {
            setModal(
                <div className='modal'>
                    <p>Las fechas no son válidas</p>
                </div>
            )
            modal(true)
            return
        }

        let url = '/houses/search/?startDate=' + startDate + '&endDate=' + endDate
        if(city) url += '&city=' + city
        if(rooms) url += '&rooms=' + rooms
        if(price) url += '&price=' + price
        navigate(url)
    }

    const reset = () => {
        setCity('')
        setPrice('')
        setRooms('')
        setStartDate('')
        setEndDate('')
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <fieldset>
                <h2>Encuentra tu vivienda</h2>
                <label>
                    Localidad
                    <input type="text" value={city} onChange={e => setCity(e.target.value)}></input>
                </label>
                <label>
                    Precio máx / día
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)}></input>
                </label>
                <label>
                    Habitaciones
                    <select value={rooms} onChange={e => setRooms(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">+3</option>
                    </select>
                </label>
                <label>
                    Fecha entrada
                    <input type="date" value={startDate} required onChange={e => setStartDate(e.target.value)}></input>
                </label>
                <label>
                    Fecha salida
                    <input type="date" value={endDate} required onChange={e => setEndDate(e.target.value)}></input>
                </label>
                <div className='button-container'>
                    <input type="submit" value="Buscar"></input>
                    <input type="reset" value="Borrar" onClick={reset}></input>
                </div>
            </fieldset>
        </form>
    )
}

export default SearchBar