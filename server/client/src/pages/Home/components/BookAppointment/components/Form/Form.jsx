import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../../../../../../context/DataContext"

const Form = ({ selectedDate, selectedHour }) => {
    // Gets global data from the context
    const { name, crud, navigate } = useContext(DataContext)



    // Holds the data for the form
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [terms, setTerms] = useState(false)



    // Creates a date object from the selected data
    const handleDateFormat = () => {
        let newDate = selectedDate
        let [hours, minutes] = selectedHour.split(':')
        hours = parseInt(hours)
        minutes = parseInt(minutes)
        newDate.setHours(hours, minutes, 0, 0)
        return newDate
    }



    // Holds the states for the crud operation
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)



    // Makes a crud operation to the backend to create the appointment
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if(terms) {
            if(selectedDate && selectedHour) {
                const body = {
                    firstName,
                    lastName,
                    phoneNumber,
                    date: selectedHour
                }

                const response = await crud({
                    url: '/appointments/',
                    method: 'post',
                    body
                })

                if(response.status == 201) navigate('/success/book')
            } else setError('Моля, изберете дата и час.')
        } else setError('Моля, приемете условията за ползване.')

        setLoading(false)
    }



    return (
        <div className="appointment-form-container">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <h2 className="appointment-title">Запазете си час!</h2>
            <p className="appointment-note">*Кабинетът роботи с <span>НЗОК</span> и <span>платен</span> прием.</p>
            <p className="appointment-doctor">Час за: {name}</p>

            {
                error &&
                <p className="error">{error}</p>
            }

            <form onSubmit={(e) => handleSubmit(e)} className="appointment-form">
                <div className="input-container">
                    <label htmlFor="firstName">Име</label>
                    <input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="checkbox-container">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={terms}
                        onChange={() => setTerms(!terms)}
                    />
                    <label htmlFor="terms">Приемам <Link to='/terms' className="terms-link">условията за ползване</Link></label>
                </div>

                <button type="submit" className="btn appointment-btn">Запази час</button>
            </form>

            <p className="appointment-cancel">За да <span>откажете</span> вече записан час, кликнете <span><Link to='/cancel'>тук</Link></span>.</p>
        </div>
    )
}

export default Form