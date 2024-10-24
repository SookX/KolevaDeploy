import { useEffect, useState } from "react";
import Form from "./components/Form/Form";
import CancelAppointment from "./components/CancelAppointment/CancelAppointment";
import AppointmentTable from "../../../../../../components/AppointmentTable/AppointmentTable";

const BookAppointment = () => {
    // Holds the form data
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedHour, setSelectedHour] = useState(null)



    // Reset the selected hour when the date changes
    useEffect(() => {
        setSelectedHour(null)
    }, [selectedDate])

    

    return (
        <section className="section-appointment">
            <AppointmentTable
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
            />

            <Form
                selectedDate={selectedDate}
                selectedHour={selectedHour}
            />

            <CancelAppointment />
        </section>
    )
}

export default BookAppointment