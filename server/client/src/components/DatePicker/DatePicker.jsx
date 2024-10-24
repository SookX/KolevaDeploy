import { useEffect, useState } from "react"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"

const DatePicker = ({ selected, setSelected }) => {
    // Holds the data for the calendar
    const [dates, setDates] = useState([])
    const [month, setMonth] = useState({ index: null, name: null })
    const [year, setYear] = useState(null)



    // Gets the name of the given month
    const getMonthName = (month) => {
        const months = [
            "Януари", "Февруари", "Март", "Април", "Май", "Юни",
            "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
        ]

        return months[month]
    }



    // Sets the values to the selected date on init
    useEffect(() => {
        setMonth({
            index: selected.getMonth(),
            name: getMonthName(selected.getMonth())
        })
        setYear(selected.getFullYear())
    }, [])


    
    // Gets the name of the weekday
    const getDayName = (day) => {
        const days = [
            "Пон", "Вт", "Ср", "Чет", "Пет", "Съб", "Нед"
        ]

        return days[day]
    }



    // Holds the state of the calendar
    const [loading, setLoading] = useState(false)



    // Gets all dates of the given month
    const getAllDates = async (year, month) => {
        setLoading(true)

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
        for(let day = 1; day <= days; day++) {
            const date = new Date(Date.UTC(year, month, day))

            allDates.push(date)
        }

        setDates(allDates)
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
        <div className="date-picker">
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
                loading ?
                <div className="heart"></div>
                :
                <div className="calendar-dates">
                    {
                        Array.from({ length: 7 }, _ => null).map((_, i) => (
                            <p key={i} className="calendar-day">{getDayName(i)}</p>
                        ))
                    }
                    {
                        dates.map((date, i) => (
                            date ?
                            <div
                                className={`calendar-date ${checkSelected(date) ? 'active' : null}`}
                                onClick={() => setSelected(date)}
                                key={i}
                            >
                                {date.getDate()}
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

export default DatePicker