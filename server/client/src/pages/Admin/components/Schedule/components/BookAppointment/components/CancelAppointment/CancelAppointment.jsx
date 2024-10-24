import { useContext, useState } from 'react'
import { DataContext } from '../../../../../../../../context/DataContext'

const CancelAppointment = () => {
    // Gets global data from the context
    const { crud, navigate } = useContext(DataContext)



    // Holds the phone number
    const [phone, setPhone] = useState('')



    // Holds the state for the form
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)



    // Makes a crud operation to the backend to cancel the appointment
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const response = await crud({
            url: `/appointments/?phoneNumber=${phone}`,
            method: 'delete'
        })

        

        if(response.status == 204) navigate('/success/cancel')
        else setError(response.response.data.message)

        setLoading(false)
    }



    return (
        <section className="section-cancel">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="cancel-card">
                <h3 className='cancel-title'>Отказване на час</h3>
                <p className='cancel-text'>Моля, въведете телефонния номер, на който е записан часът.</p>

                {
                    error &&
                    <p className="error">{error}</p>
                }

                <form className='cancel-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container">
                        <label htmlFor="phone">Телефон на пациента</label>
                        <input 
                            id='phone'
                            type="text" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button className="btn" type='submit'>Откажи час</button>
                </form>
            </div>
        </section>
    )
}

export default CancelAppointment