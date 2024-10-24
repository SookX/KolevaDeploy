import { useContext, useState } from "react"
import { DataContext } from "../../../../../../../../context/DataContext"
import DateInput from "../../../../../../../../components/DateInput/DateInput"
import FormGrid from "../FormGrid/FormGrid"

const ChangeInterval = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the form
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startHour, setStartHour] = useState('08:00')
    const [endHour, setEndHour] = useState('19:00')
    const [duration, setDuration] = useState(30)
    const [breakBetweenAppointments, setBreakBetweenAppointments] = useState(0)
    const [days, setDays] = useState([])



    // Holds the error and loading state of the form
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Makes a crud operation to the backend with the changed schedule
    const handleSubmit = async () => {
        setLoading(true)

        const body = {
            startDate,
            endDate,
            days,
            startHour,
            endHour,
            duration,
            breakBetweenAppointments
        }

        const response = await crud({
            url: '/interval/change/',
            method: 'post',
            body
        })

        if(response.status == 201) window.location.reload(false)
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
                    <h2 className="title">Добави период</h2>
                    <div className="text">Промените Ви в графика за зададен период. За добавяне на период попълнете формата. За отпуска не избирайте нито един от дните. По-горе може да видите и изтриете всяка от Вашите промени.</div>
                    <div className="text">*Периодите не могат да се застъпват.</div>
                </div>
            </div>
            

            <h3 className="title">Период</h3>
            <div className="date-input-container">
                <DateInput
                    label="Промяна от"
                    date={startDate}
                    setDate={setStartDate}
                />

                <DateInput
                    label="Промяна до"
                    date={endDate}
                    setDate={setEndDate}
                />
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

export default ChangeInterval