import { useState } from "react";
import { CgCalendar } from "react-icons/cg";
import DatePicker from '../DatePicker/DatePicker'


const DateInput = ({ label, date, setDate }) => {
    // Holds the state of the input
    const [opened, setOpened] = useState(false)



    // Formats the date and time to a string
    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }



    return (
        <div className="date-input">
            <label>{label}</label>
            <div className="input" onClick={() => setOpened(!opened)}>
                <CgCalendar className="date-icon" />
                <p className="date">{formatDate(date)}</p>
            </div>

            {
                opened &&
                <DatePicker
                    selected={date}
                    setSelected={setDate}
                />
            }
        </div>
    )
}

export default DateInput