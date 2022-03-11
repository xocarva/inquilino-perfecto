import './NewAd.css'
import PicUpload from './PicUpload';
import { useState } from "react"
import { useSetModal, useUser } from '../hooks'
import { useNavigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function NewAd() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [rooms, setRooms] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [pictures, setPictures] = useState([])
    const [errorType, setErrorType] = useState('')
    const [errorText, setErrorText] = useState('')
    const user = useUser()
    const Navigation = useNavigate()
    const setModal = useSetModal()
    const handleSubmit = async e => {
        e.preventDefault()
        const cityRegex = /^[A-Za-zaÁéÉíÍóÓúÚ\u00f1\u00d1]+$/
        if(!cityRegex.test(city)) {
            setErrorType('city')
            setErrorText('La ciudad solo puede contener letras.')
            setCity('')
            document.getElementById('city').focus()
            return
        }
        if (pictures.length < 1) {
            setModal(<p>Debes añadir al menos una imagen</p>)
            return
        }
        const fd = new FormData()
        fd.append('title', title)
        fd.append('price', price)
        fd.append('rooms', rooms)
        fd.append('description', description)
        fd.append('city', city)
        for (const p of pictures) {
            fd.append('pictures', p.file)
        }
        const res = await fetch(SERVER_URL + '/houses/', {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })

        if (res.ok) {
            setModal(<p>{`Has publicado tu anuncio '${title}' con exito`}</p>)
            Navigation('/user/owner-profile/houses')
        } else if (res.status === 403) {
            setModal(<p>Para poder publicar un anuncio debes activar primero tu usuario</p>)
        } else {
            setModal(<p>No se ha podido realizar la publicación</p>)
        }
    }
    return (
        <div className='ad-page'>
            <h2>Publica un nuevo anuncio</h2>
            <p className='desciption'>Aquí puedes crear un nuevo anuncio.</p>
            <form >
                <div className='label-container'>
                    <label>
                        Titulo
                        <input autoFocus name='title' value={title} type='text' placeholder='Titulo...' required onChange={e => setTitle(e.target.value)} />
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
                        <input id='city' name='city' value={city} type='text' placeholder='Ciudad...' required onChange={e => {
                            setCity(e.target.value)
                            setErrorType('')
                        }} />
                        {errorType === 'city' && <p className='error-city'>{errorText}</p>}
                    </label>
                </div>
                <div className='description-house'>
                    <label className="description-label">
                        Descripción
                        <textarea name='description' value={description} placeholder='Descripción...' required onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <label>Añadir fotos</label>
                <PicUpload pictures={pictures} onChange={setPictures} />
                <div className='button-new-house-container'>
                    <button onClick={handleSubmit} id='ad-button'>
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewAd
