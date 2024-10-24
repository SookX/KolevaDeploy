import Calendar from "./Calendar/Calendar"
import Hours from "./Hours/Hours"

const AppointmentTable = ({ selectedDate, setSelectedDate, selectedHour, setSelectedHour }) => {
    return (
        <div className="appointment-table">
            <Calendar
                selected={selectedDate}
                setSelected={setSelectedDate}
            />
            <Hours
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
            />
        </div>
    )
}

export default AppointmentTable