import './PicUpload.css'
import { nanoid } from 'nanoid'

function PicUpload({ pictures, onChange }) {
  const handleChange = e => {
    const files = Array.from(e.target.files)
    const entries = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f)
    }))
    onChange([...pictures, ...entries])
  }

  const handleRemove = (file) => {
    const borrar = pictures.filter(pic => pic.file !== file)
    return onChange(borrar)
  }

  return (
    <div className="pic-upload">
      {pictures.map(picture =>
        <div key={nanoid()} className='ad-image'>
          <div className="preview" style={{ backgroundImage: `url(${picture.preview})` }} />
          <button type='button' onClick={() => handleRemove(picture.file)}>Eliminar</button>
        </div>
      )}
      <label className="preview add">
        <input type="file" multiple required onChange={handleChange} />
      </label>
    </div>
  )
}

export default PicUpload
