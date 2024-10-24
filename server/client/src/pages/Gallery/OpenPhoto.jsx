import Modal from 'react-modal'
import { CgClose } from 'react-icons/cg'

const OpenPhoto = ({ isOpen, onRequestClose, image }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            className='gallery-overlay-container'
            overlayClassName='gallery-overlay'
        >
            <CgClose onClick={onRequestClose} className='gallery-overlay-icon'/>

            <img className='open-photo' src={image} alt="Изображение" />
        </Modal>
    )
}

export default OpenPhoto