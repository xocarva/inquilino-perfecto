import './NewAd.css'
import { useState } from "react"
import { useSetModal, useUser } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import PicUpload from './PicUpload';

function NewAd() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [rooms, setRooms] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [pictures, setPictures] = useState([])
    const [error, setError] = useState()
    const user = useUser()
    const Navigation = useNavigate()
    const setModal = useSetModal()
    const dispatch = useDispatch()
    const handleSubmit = async e => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('title', title)
        fd.append('price', price)
        fd.append('rooms', rooms)
        fd.append('description', description)
        fd.append('city', city)
        for (const p of pictures) {
            fd.append('pictures', p.file)
        }
        const res = await fetch('http://localhost:3001/houses/', {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        let data = await res.json()

        if (res.ok) {
            setModal(true)
            dispatch({
                type: 'modal',
                modal: `Has publicado tu anuncio ${title} correctamente`
            })
            Navigation('/')
        } else {
            setError(data.error)
        }
    }
    return (
        <div className='ad-page'>
            <p className='title-ad-page'>Datos del anuncio</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Titulo <br/>
                        <input name='title' value={title} placeholder='Titulo...' onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Precio <br/>
                        <input name='price' value={price} placeholder='Precio...' onChange={e => setPrice(e.target.value)} />
                    </label>
                    <label>
                        Habitaciones <br/>
                        <input name='rooms' value={rooms} placeholder='Habitaciones...' onChange={e => setRooms(e.target.value)} />
                    </label>
                    <label>
                        Ciudad <br/>
                        <input name='city' value={city} placeholder='Ciudad...' onChange={e => setCity(e.target.value)} />
                    </label>
                </div>
                <div className='description-house'>
                    <label>
                        Descripción <br />
                        <textarea name='description' value={description} placeholder='Descripción...' onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div>
                    <PicUpload pictures={pictures} onChange={setPictures}/>
                </div>
                <button id='ad-button'>
                    Publicar
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default NewAd
