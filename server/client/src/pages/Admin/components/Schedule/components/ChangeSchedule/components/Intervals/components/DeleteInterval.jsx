import Modal from 'react-modal'

const DeleteInterval = ({ interval, setInterval, startDate, endDate, handleDeleteInterval }) => {
    return (
        <Modal
            isOpen={interval !== null}
            onRequestClose={() => setInterval(null)}
            className='delete-card'
            overlayClassName='delete-overlay'
        >
            <h2 className="title">Сигурни ли сте?</h2>
            <p className="text">Сигурни ли сте, че искате да изтрието промените за дадения период?</p>
            <p className="text period">{startDate} - {endDate}</p>

            <div className="btn-box">
                <button onClick={() => setInterval(null)} className="btn secondary">Отказ</button>
                <button onClick={() => handleDeleteInterval(interval._id)} className="btn">Изтриване</button>
            </div>
        </Modal>
    )
}

export default DeleteInterval