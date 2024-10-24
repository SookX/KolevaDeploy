import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../context/DataContext"

const Hours = ({ selectedDate, selectedHour, setSelectedHour }) => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)


    // Holds the formatted selected date string
    const [selectedFormatted, setSelectedFormatted] = useState(null)



    // Holds the available hours for the given date
    const [availableHours, setAvailableHours] = useState([])



    // Returns the given date in DD-MM-YYYY format
    const getDateFormatted = (date) => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }



    // Formats the selected date whenever it gets changed
    useEffect(() => {
        if(selectedDate) setSelectedFormatted(getDateFormatted(selectedDate))
    }, [selectedDate])



    // Holds the state for the hour picker
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    // Gets all the available hours from the backend when a date gets selected
    useEffect(() => {
        const fetching = async () => {
            setLoading(true)
            setAvailableHours(null)

            const response = await crud({
                method: 'get',
                url: `/interval/days/?year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth() + 1}&day=${selectedDate.getDate()}`
            })

            if(response.status == 200) {
                setError(null)
                let key = Object.keys(response.data.data.data)[0]
                let hours = response.data.data.data[key]
                hours = hours.map(hour => {
                    return new Date(hour)
                })

                setAvailableHours(hours)
            }
            else setError('Нещо се обърка. Опитай пак.')

            setLoading(false)
        }

        if(selectedDate) fetching()
    }, [selectedDate])



    // Gets the formatted hour from a date object
    const getHourFormatted = (hour) => {
        let hours = hour.getUTCHours()
        let minutes = hour.getUTCMinutes()

        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }



    return (
        <div>
            <div className="date-picker-heading">
                
                <div className="heading-line"></div>
                <p className="heading-text">{selectedFormatted ? selectedFormatted : 'Изберете дата.'}</p>
                <div className="heading-line"></div>
                
            </div>

            {
                loading ?
                <div className="heart"></div>
                :
                <>
                    {
                        error &&
                        <p className="error">{error}</p>
                    }

                    <div className="available-hours">
                        {
                            availableHours &&
                            availableHours.map((hour, i) => (
                                <div
                                    className={`available-hour ${hour === selectedHour ? 'active' : null}`}
                                    onClick={() => setSelectedHour(hour)}
                                    key={i}
                                >
                                    {`${getHourFormatted(hour)}`}
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Hours