import './NewAd.css'
import PicUpload from './PicUpload';
import { useState } from "react"
import { useSetModal, useUser } from '../hooks'
import { useNavigate } from 'react-router-dom';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function NewAd() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [rooms, setRooms] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [pictures, setPictures] = useState([])
    const user = useUser()
    const Navigation = useNavigate()
    const setModal = useSetModal()
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
        const res = await fetch(REACT_APP_BASE_URL + '/houses/', {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })

        if (res.ok) {
            setModal(<p>{`Has publicado tu anuncio ${title} con exito!!!`}</p>)
            Navigation('/')
        } else if (res.status === 403) {
            setModal(<p>Para poder publicar un anuncio debes activar primero tu usuario</p>)
        } else {
            setModal(<p>No se ha podido realizar la publicación</p>)
        }
    }
    return (
        <div className='ad-page'>
            <h1 className='title-ad-page'>Publica un nuevo anuncio</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Titulo
                        <input name='title' value={title} type='text' placeholder='Titulo...' required onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Precio
                        <input name='price' value={price} type='number' placeholder='Precio...' required onChange={e => setPrice(e.target.value)} />
                    </label>
                    <label>
                        Habitaciones
                        <input name='rooms' value={rooms} type='number' placeholder='Habitaciones...' required onChange={e => setRooms(e.target.value)} />
                    </label>
                    <label>
                        Ciudad
                        <input name='city' value={city} type='text' placeholder='Ciudad...' required onChange={e => setCity(e.target.value)} />
                    </label>
                </div>
                <div className='description-house'>
                    <label>
                        Descripción <br />
                        <textarea name='description' value={description} placeholder='Descripción...' required onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div id='picture-container'>
                    <PicUpload pictures={pictures} onChange={setPictures} />
                </div>
                <button id='ad-button'>
                    Publicar
                </button>
            </form>
        </div>
    )
}

export default NewAd
