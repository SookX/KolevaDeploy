import { useContext, useEffect, useState } from "react"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { DataContext } from "../../../context/DataContext";

const Calendar = ({ selected, setSelected }) => {
    // Holds the data for the calendar
    const [dates, setDates] = useState([])
    const [month, setMonth] = useState({ index: null, name: null })
    const [year, setYear] = useState(null)



    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Gets the name of the given month
    const getMonthName = (month) => {
        const months = [
            "Януари", "Февруари", "Март", "Април", "Май", "Юни",
            "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
        ]

        return months[month]
    }



    // Sets the values to the current date on init
    useEffect(() => {
        setMonth({
            index: new Date().getMonth(),
            name: getMonthName(new Date().getMonth())
        })
        setYear(new Date().getFullYear())
    }, [])



    // Gets the name of the weekday
    const getDayName = (day) => {
        const days = [
            "Пон", "Вт", "Ср", "Чет", "Пет", "Съб", "Нед"
        ]

        return days[day]
    }



    // Compares two given dates
    const compareDates = (date1, date2) => {
        date1.setHours(0, 0, 0, 0)
        date2.setHours(0, 0, 0, 0)

        if(date1.getTime() < date2.getTime()) return -1
        else if(date1.getTime() == date2.getTime()) return 0
        else return 1
    }



    // Holds the state of the calendar
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Gets all dates of the given month
    const getAllDates = async (year, month) => {
        setLoading(true)

        // Gets the available days from the backend
        const response = await crud({
            url: `/interval/days/?year=${year}&month=${month + 1}`,
            method: 'get'
        })


        if(response.status == 200) {
            setError(null)

            let available = Object.keys(response.data.data.data).map(date => new Date(date))

            let allDates = []

            // Gets the last day of the month - determines how many days are in the month
            const days = new Date(year, month + 1, 0).getDate()

            // Fills the array with null elements on the first days of the week which are not part of the month
            let firstDay = new Date(year, month, 1).getDay()
            if(firstDay == 0) firstDay = 7
            for(let i = 1; i < firstDay; i++) {
                allDates.push(null)
            }

            // Fills the dates array
            let availableCounter = 0
            for(let day = 1; day <= days; day++) {
                const date = new Date(year, month, day)

                let status

                if(
                    available &&
                    availableCounter < available.length &&
                    compareDates(date, available[availableCounter]) == 0
                ) {
                    if(compareDates(date, new Date()) >= 0) status = 'available'
                    else status = 'disabled'

                    availableCounter++
                } else status = 'disabled'

                allDates.push({
                    date,
                    status
                })
            }

            setDates(allDates)
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Changes the month and year states
    const handleMonthChange = (operation) => {
        if(operation === '+') {
            if(month.index === 11) {
                setMonth({
                    index: 0,
                    name: getMonthName(0)
                })
                setYear(year + 1)
            }
            else setMonth({
                index: month.index + 1,
                name: getMonthName(month.index + 1)
            })
        } else {
            if(month.index === 0) {
                setMonth({
                    index: 11,
                    name: getMonthName(11)
                })
                setYear(year - 1)
            }
            else if(operation === '-') setMonth({
                index: month.index - 1,
                name: getMonthName(month.index - 1)
            })
        }
    }


    // Checks if the given date is the selected one
    const checkSelected = (date) => {
        if(
            selected &&
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
        ) return true
        else return false
    }


    
    // Gets the dates whenever the month and year get changed
    useEffect(() => {
        if(month && year) getAllDates(year, month.index)
    }, [month, year])



    return (
        <div className="calendar">
            <div className="date-picker-heading">
                <IoIosArrowDropleftCircle
                    className="heading-icon"
                    onClick={() => handleMonthChange('-')}
                />
                
                <div className="heading-line"></div>
                <p className="heading-text">{month.name} {year}</p>
                <div className="heading-line"></div>
                
                <IoIosArrowDroprightCircle
                    className="heading-icon"
                    onClick={() => handleMonthChange('+')}
                />
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            {
                loading ?
                <div className="heart"></div>
                :
                <div className="calendar-dates">
                    {
                        !error &&
                        Array.from({ length: 7 }, _ => null).map((_, i) => (
                            <p key={i} className="calendar-day">{getDayName(i)}</p>
                        ))
                    }
                    {
                        dates.map((date, i) => (
                            date ?
                            <div
                                className={`calendar-date ${date.status === 'disabled' ? 'disabled' : checkSelected(date.date) ? 'active' : null}`}
                                onClick={() => date.status === 'available' ? setSelected(date.date) : null}
                                key={i}
                            >
                                {date.date.getDate()}
                            </div>
                            :
                            <p key={i}></p>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Calendar