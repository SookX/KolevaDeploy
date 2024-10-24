import { useContext, useEffect, useState } from "react"
import SectionHeading from "../../../../components/SectionHeading/SectionHeading"
import { DataContext } from "../../../../context/DataContext"

const Services = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the services
    const [services, setServices] = useState([])



    // Holds the error state
    const [error, setError] = useState(null)



    // Gets the services from the backend on init
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                url: '/service/services/',
                method: 'get'
            })

            if(response.status == 200) setServices(response.data.data.services)
            else setError('Нещо се обърка. Опитай пак.')
        }

        fetching()
    }, [])



    return (
        <div id="services">
            <SectionHeading title='Медицински услуги' />
            <section className="section-services">
                {
                    services &&
                    services.map((service, i) => (
                        <div className={`service-card ${i % 2 == 0 ? 'green' : 'red'}`} key={i}>
                            <h3 className="service-title title">{service.title}</h3>
                            <p className="service-content">{service.text}</p>
                        </div>
                    ))
                }

                {
                    error &&
                    <p className="error">{error}</p>
                }
            </section>
        </div>
    )
}

export default Services