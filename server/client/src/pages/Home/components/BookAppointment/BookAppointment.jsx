import { useEffect, useState } from "react";
import SectionHeading from "../../../../components/SectionHeading/SectionHeading"
import Form from "./components/Form/Form";
import Phone from "./components/Phone/Phone";
import AppointmentTable from "../../../../components/AppointmentTable/AppointmentTable";

const BookAppointment = () => {
    // Holds the form data
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedHour, setSelectedHour] = useState(null)



    // Reset the selected hour when the date changes
    useEffect(() => {
        setSelectedHour(null)
    }, [selectedDate])

    

    return (
        <div id="book">
            <SectionHeading title='Запазване на час' />
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

                <Phone />
            </section>
        </div>
    )
}

export default BookAppointment