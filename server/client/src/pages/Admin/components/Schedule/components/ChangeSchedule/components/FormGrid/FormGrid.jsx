import { useEffect, useState } from "react"

const FormGrid = ({
    startHour, setStartHour,
    endHour, setEndHour,
    duration, setDuration,
    breakBetweenAppointments, setBreakBetweenAppointments,
    days, setDays
}) => {
    // Holds all the weekdays
    const [weekDays, setWeekDays] = useState([
        {
            day: "Monday",
            name: "Понеделник"
        },
        {
            day: "Tuesday",
            name: "Вторник"
        },
        {
            day: "Wednesday",
            name: "Сряда"
        },
        {
            day: "Thursday",
            name: "Четвъртък"
        },
        {
            day: "Friday",
            name: "Петък"
        },
        {
            day: "Saturday",
            name: "Събота"
        },
        {
            day: "Sunday",
            name: "Неделя"
        }
    ])



    // Selects and deselects days of the week
    const selectDay = (name) => {
        const index = days.findIndex(day => day === name)

        if(index >= 0) {
            let newDays = [...days]
            newDays.splice(index, 1)
            setDays(newDays)
        }
        else {
            setDays([
                ...days,
                name
            ])
        }
    }



    return (
        <div className="form-grid">
            <div className="schedule-input-container">
                <h3 className="title">Часове</h3>
                <div className="input-container">
                    <label htmlFor="start">Начало</label>
                    <input
                        id="start"
                        type="time"
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="end">Край</label>
                    <input
                        id="end"
                        type="time"
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="duration">Продължителност на часовете (в минути)</label>
                    <input
                        id="duration"
                        type="number"
                        min={1}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="break">Почивка между часовете (в минути)</label>
                    <input 
                        id="break"
                        type="number"
                        min={0}
                        value={breakBetweenAppointments}
                        onChange={(e) => setBreakBetweenAppointments(e.target.value)}
                    />
                </div>
            </div>

            <div className="weekdays">
                <h3 className="title">Работни дни</h3>

                <div className="weekdays-container">
                    {
                        weekDays.map((day, i) => (
                            <div className="checkbox-container" key={i}>
                                <input
                                    id={i}
                                    type="checkbox"
                                    checked={days.find(selectedDay => selectedDay === day.day) ? true : false}
                                    onChange={() => selectDay(day.day)}
                                />
                                <label>{day.name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FormGrid