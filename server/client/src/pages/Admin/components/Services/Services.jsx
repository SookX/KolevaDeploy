import { useContext, useEffect, useState } from "react"
import { CgClose, CgMathPlus } from "react-icons/cg"
import { DataContext } from "../../../../context/DataContext"

const Services = () => {
    const { crud } = useContext(DataContext)
    const [services, setServices] = useState([])



    // Holds the state for the services
    const [currentServices, setCurrentServices] = useState([])



    // Holds the error and loading state for the page
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)



    // Sets the states on init
    const fetchServices = async () => {
        setLoading(true)

        const response = await crud({
            url: '/service/services/',
            method: 'get'
        })

        if(response.status == 200) {
            setServices(response.data.data.services)
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }

    useEffect(() => {
        fetchServices()
    }, [])


    useEffect(() => {
        if(services) setCurrentServices([...services])
    }, [services])



    // Removes a service from the array
    const handleRemoveService = async (id) => {
        setLoading(true)

        const response = await crud({
            url: `/service/services/${id}`,
            method: 'delete'
        })

        if(response.status == 204) {
            fetchServices()
        }

        setLoading(false)
    }



    // Adds a new service
    const handleAddService = async () => {
        setLoading(true)

        const newService = {
            title: `Услуга ${currentServices.length + 1}`,
            text: `Нова услуга`
        }

        const response = await crud({
            url: '/service/services/',
            method: 'post',
            body: newService
        })

        if(response.status == 201) {
            fetchServices()
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Changes the title of a service
    const handleChangeTitle = (e, id) => {
        let newServices = currentServices.map(service => service._id === id ? {...service, title: e.target.value} : service)
        setCurrentServices(newServices)
    }



    // Changes the content of a service
    const handleChangeContent = (e, id) => {
        let newServices = currentServices.map(service => service._id === id ? {...service, text: e.target.value} : service)
        setCurrentServices(newServices)
    }



    // Makes a crud operation to the backend with the changed service
    const handleUpdateService = async (service) => {
        setLoading(true)

        const response = await crud({
            url: `/service/services/${service._id}`,
            method: 'put',
            body: {
                title: service.title,
                text: service.text
            }
        })

        if(response.status !== 200) setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Saves the changes
    const handleSaveChanges = () => {
        const changed = currentServices.filter(service1 => {
            const service2 = services.find(service => service._id === service1._id)

            if(service1.title !== service2.title || service1.text !== service2.text) {
                return service1
            }
            return false
        })

        changed.map(service => handleUpdateService(service))
    }



    return (
        <section className="section-services">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="heading">
                <h2 className="title">Услуги</h2>

                <button onClick={handleAddService} className="heading-btn">
                    <CgMathPlus />
                    <p>Добави</p>
                </button>
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }

            <div className="service-grid">
                {
                    currentServices &&
                    currentServices.map((service, i) => (
                        <div key={i} className={`service-card ${i % 2 == 0 ? 'green' : 'red'}`}>
                            {
                                currentServices.length > 1 &&
                                <CgClose
                                    className="service-icon"
                                    onClick={() => handleRemoveService(service._id)}
                                />
                            }

                            <textarea
                                className="service-title title"
                                value={service.title}
                                onChange={(e) => handleChangeTitle(e, service._id)}
                                rows={3}
                            />

                            <textarea
                                rows={6} 
                                className="service-content"
                                value={service.text}
                                onChange={(e) => handleChangeContent(e, service._id)}
                            />
                        </div>
                    ))
                }
            </div>

            <button onClick={handleSaveChanges} className="btn">Запази промените</button>
        </section>
    )
}

export default Services