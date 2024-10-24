import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../../../../../../context/DataContext"
import FormGrid from "../FormGrid/FormGrid"

const Default = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the form
    const [startHour, setStartHour] = useState('08:00')
    const [endHour, setEndHour] = useState('19:00')
    const [duration, setDuration] = useState(30)
    const [breakBetweenAppointments, setBreakBetweenAppointments] = useState(0)
    const [days, setDays] = useState([])



    // Holds the error and loading state of the form
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Gets the default interval from the backend on init
    const fetchDefault = async () => {
        setLoading(true)

        const response = await crud({
            url: '/interval/',
            method: 'get'
        })

        if(response.status == 200) {
            let interval = response.data.data.interval[0]

            if(interval) {
                setStartHour(interval.startHour)
                setEndHour(interval.endHour)
                setDuration(interval.duration)
                setBreakBetweenAppointments(interval.breakBetweenAppointments)
                setDays(interval.days)
            }

            setError(null)
        } 
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }

    useEffect(() => {
        fetchDefault()
    }, [])



    // Makes a crud operation to the backend with the changed default
    const handleSubmit = async () => {
        setLoading(true)

        const response = await crud({
            url: '/interval/',
            method: 'put',
            body: {
                days,
                startHour,
                endHour,
                duration,
                breakBetweenAppointments
            }
        })

        if(response.status == 200) window.location.reload(false)
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    return (
        <div className="schedule-card">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="heading">
                <div className="heading-content">
                    <h2 className="title">Стандартен график</h2>
                    <div className="text">Графикът Ви за всички дни. При промяна се сменя безсрочно. За да промените графика си за даден период, използвайте формата по-долу.</div>
                </div>
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            <FormGrid
                startHour={startHour}
                setStartHour={setStartHour}
                endHour={endHour}
                setEndHour={setEndHour}
                duration={duration}
                setDuration={setDuration}
                breakBetweenAppointments={breakBetweenAppointments}
                setBreakBetweenAppointments={setBreakBetweenAppointments}
                days={days}
                setDays={setDays}
            />

            <button onClick={handleSubmit} className="btn">Запази промените</button>
        </div>
    )
}

export default Default