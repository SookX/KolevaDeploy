import Appointments from "./components/Appointments/Appointments"
import BookAppointment from "./components/BookAppointment/BookAppointment"
import ChangeSchedule from "./components/ChangeSchedule/ChangeSchedule"

const Schedule = () => {
    return (
        <section className="section-schedule">
            <BookAppointment />

            <Appointments />

            <ChangeSchedule />
        </section>
    )
}

export default Schedule