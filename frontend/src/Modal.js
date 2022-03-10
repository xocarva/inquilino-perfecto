import { useModal, useSetModal } from './hooks'
import './Modal.css'

function Modal() {
  const modal = useModal()
  const setModal = useSetModal()
  const handleClick = () => setModal(null)
  const handlePropagation = e => e.stopPropagation()
  return modal && (
    <div>
      <div className="modal-bg" onClick={handleClick}>
        <div className="modal-fg" onClick={handlePropagation}>
          <div className='close-button' onClick={handleClick}>✖️</div>
          {modal}
        </div>
      </div>
    </div>
  )
}

export default Modal