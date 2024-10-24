import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../../../../../../context/DataContext"
import { CgTrash } from "react-icons/cg"
import DeleteInterval from "./components/DeleteInterval"

const Intervals = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the weekdays in bulgarian
    const weekDays = {
        Monday: 'Понеделник',
        Tuesday: 'Вторник',
        Wednesday: 'Сряда',
        Thursday: 'Четвъртък',
        Friday: 'Петък',
        Saturday: 'Събота',
        Sunday: ''
    }



    // Holds the error and loading state of the form
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Holds the state for the intervals
    const [intervals, setIntervals] = useState([])
    const [selectedInterval, setSelectedInterval] = useState(null)



    // Gets the intervals from the backend on init
    const fetchIntervals = async () => {
        setLoading(true)

        const response = await crud({
            url: '/interval/change/',
            method: 'get'
        })

        if(response.status == 200) {
            let newIntervals = response.data.data.changes
            newIntervals = newIntervals.sort((interval1, interval2) => new Date(interval1.startDate) - new Date(interval2.startDate))
            setIntervals(newIntervals)
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }

    useEffect(() => {
        fetchIntervals()
    }, [])



    // Adds a leading zero
    const handleLeadingZero = (num) => {
        if(num >= 10) return num
        else return `0${num}`
    }



    // Formats the date into a readable string
    const handleFormatDate = (dateString) => {
        const date = new Date(dateString)

        return `${handleLeadingZero(date.getDate())}/${handleLeadingZero(date.getMonth() + 1)}/${date.getFullYear()}`
    }



    // Deletes an interval
    const handleDeleteInterval = async (id) => {
        setLoading(true)

        const response = await crud({
            url: `/interval/change/${id}/`,
            method: 'delete'
        })
        
        setSelectedInterval(null)

        if(response.status == 204) {
            fetchIntervals()
        }
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

            <DeleteInterval
                interval={selectedInterval}
                setInterval={setSelectedInterval}
                startDate={selectedInterval ? handleFormatDate(selectedInterval.startDate) : ''}
                endDate={selectedInterval ? handleFormatDate(selectedInterval.endDate) : ''}
                handleDeleteInterval={handleDeleteInterval}
            />

            <div className="heading">
                <div className="heading-content">
                    <h2 className="title">Промени за период</h2>
                    <div className="text">Всички промени в графика Ви.</div>
                </div>
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            <div className="intervals">
                {
                    intervals &&
                    intervals.length >= 1 ?
                    intervals.map((interval, i) => (
                        <div className="interval" key={i}>
                            <div className="interval-content">
                                <h4 className="interval-period">{handleFormatDate(interval.startDate)} - {handleFormatDate(interval.endDate)}</h4>
                                <p className="interval-text">
                                    <span>Работни дни: </span>
                                    {
                                        interval.days.map(day => ` ${weekDays[day]}`)
                                    }
                                </p>
                                <p className="interval-text"><span>Работно време</span>: {interval.startHour} - {interval.endHour}</p>
                                <p className="interval-text"><span>Продължителност на часовете</span>: {interval.duration} минути</p>
                                <p className="interval-text"><span>Почивки между часовете</span>: {interval.breakBetweenAppointments} минути</p>
                            </div>
                            <CgTrash onClick={() => setSelectedInterval(interval)} className="interval-icon"/>
                        </div>
                    ))
                    :
                    <h4>Няма промени в графика.</h4>
                }
            </div>
        </div>
    )
}

export default Intervals