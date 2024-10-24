import { useContext, useEffect, useState } from "react"
import { CgPhone } from "react-icons/cg"
import { DataContext } from "../../../../../../context/DataContext"



const Appointments = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the appointments
    const [appointments, setAppointments] = useState([])



    // Holds the loading and error state for the section
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Gets all the appointments on init
    const fetching = async () => {
        setLoading(true)

        const response = await crud({
            url: '/appointments/',
            method: 'get'
        })


        if(response.status == 200) setAppointments(response.data.data.appointments.sort((app1, app2) => new Date(app1.date) - new Date(app2.date)))
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }

    useEffect(() => {
        fetching()
    }, [])



    // Formats the date and time of the appointment
    const formatHour = (dateString) => {
        const date = new Date(dateString)

        let hour = date.getUTCHours()
        if(hour < 10) hour = `0${hour}`

        let minutes = date.getUTCMinutes()
        if(minutes < 10) minutes = `0${minutes}`

        return `${hour}:${minutes}`
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString)

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }



    // Deletes all appointments with a previous date
    const handleDelete = async () => {
        setLoading(true)

        const response = await crud({
            url: '/appointments/deletePrev/',
            method: 'delete'
        })

        if(response.status !== 200) setError('Нещо се обърка. Опитай пак.')

        setLoading(false)

        fetching()
    }



    return (
        <div className="appointments">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="heading">
                <h2 className="title">Записани часове</h2>

                <button onClick={handleDelete} className="btn">Изтрий минали часове</button>
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            {
                appointments &&
                appointments.length ?
                <div className="appointments-card">
                    {
                        appointments.map((appointment, i) => (
                            <div className="appointment" key={i}>
                                <div className="appointment-data">
                                    <h4 className="appointment-name">{appointment.firstName} {appointment.lastName}</h4>
                                    <p className="appointment-phone">
                                        <CgPhone className="icon" />
                                        <span>{appointment.phoneNumber}</span>
                                    </p>
                                </div>

                                <div className="appointment-time">
                                    <p className="appointment-date">{formatDate(appointment.date)}</p>
                                    <p className="appointment-hour">{formatHour(appointment.date)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <h4>Няма предстоящи записани часове.</h4>
            }
        </div>
    )
}

export default Appointments