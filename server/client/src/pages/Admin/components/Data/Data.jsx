import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../../context/DataContext"
import { CgClose, CgMail, CgMathPlus, CgPhone } from "react-icons/cg"
import { TbChecks } from "react-icons/tb";
import axios from "axios";

const Data = () => {
    // Gets global data from the context
    const { access, name, email, phone, crud } = useContext(DataContext)



    // Holds the data for the page
    const [biography, setBiography] = useState('')
    const [specialties, setSpecialties] = useState([])



    // Holds the error and loading states for the page
    const [specialtyError, setSpecialtyError] = useState(null)
    const [biographyError, setBiographyError] = useState(null)
    const [loading, setLoading] = useState(false)



    const fetchSpecialties = async () => {
        setLoading(true)

        const response = await crud({
            method: 'get',
            url: '/service/qualification/'
        })

        if(response.status == 200) {
            setSpecialties(response.data.data.qualifications)
        }
        else setSpecialtyError('Нещо се обърка. Опитайте пак.')

        setLoading(false)
    }



    // Gets the data from the backend on init
    useEffect(() => {
        const fetchBiography = async () => {
            setLoading(true)

            const response = await crud({
                method: 'get',
                url: '/service/about/'
            })

            if(response.status == 200) {
                setBiography(response.data.data.biography[0].text)
            }

            setLoading(false)
        }

        fetchBiography()
        fetchSpecialties()
    }, [])



    // Holds the state for the form data
    const [currentSpecialities, setCurrentSpecialities] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState(null)
    const [currentBiography, setCurrentBiography] = useState('')



    // Sets the initial values for the form data
    useEffect(() => {
        if(specialties && biography) {
            setCurrentSpecialities(specialties)
            setCurrentBiography(biography)
        }
    }, [specialties, biography])



    // Removes a speciality from the list
    const handleRemoveSpecialty = async (id) => {
        setLoading(true)

        const newSpecialties = currentSpecialities.filter(specialty => specialty._id !== id)

        const response = await crud({
            method: 'delete',
            url: `/service/qualification/${id}`
        })

        console.log(response)

        if(response.status == 204) setCurrentSpecialities(newSpecialties)
        else setSpecialtyError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Adds a new specialty
    const handleAddSpecialty = async () => {
        setLoading(true)

        const response = await crud({
            url: '/service/qualification/',
            method: 'post',
            body: {
                name: `Специалност ${currentSpecialities.length + 1}`
            }
        })

        console.log(response)

        if(response.status == 201) fetchSpecialties()
        else setSpecialtyError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Changes the array when the input is done
    const handleDeselectSpecialty = async () => {
        setLoading(true)

        let newSpecialties = currentSpecialities
        let selectedIndex = newSpecialties.findIndex(specialty => specialty._id === selectedSpecialty._id)
        newSpecialties[selectedIndex] = selectedSpecialty

        const response = await crud({
            method: 'put',
            url: `/service/qualification/${selectedSpecialty._id}/`,
            body: {
                name: selectedSpecialty.name
            }
        })
        
        console.log(response)

        if(response.status == 200) setCurrentSpecialities(newSpecialties)
        else setSpecialtyError('Нещо се обърка. Опитай пак.')
    
        setSelectedSpecialty(null)

        setLoading(false)
    }



    // Switches to an input field when the user clicks on a specialty
    const handleSelectSpecialty = (id) => {
        if(selectedSpecialty) handleDeselectSpecialty()
        setSelectedSpecialty(currentSpecialities.find(specialty => specialty._id === id))
    }



    // Makes a crud operation to the backend with the new data
    const handleSaveChanges = async () => {
        if(currentBiography !== biography) {
            setLoading(true)

            const response = await crud({
                method: 'put',
                url: '/service/about/',
                body: {
                    text: currentBiography
                }
            })

            if(response.status != 200) setBiographyError('Нещо се обърка. Опитай пак.')

            setLoading(false)
        }
    }



    return (
        <section className="section-data">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="biography-card">
                <h2 className="biography-title">{name}</h2>

                <div className="admin-input-container">
                    <div className="admin-contact">
                        <CgMail className="admin-contact-icon"/>

                        <p className="admin-contact-content">{email}</p>
                    </div>

                    <div className="admin-contact">
                        <CgPhone className="admin-contact-icon"/>

                        <p className="admin-contact-content">{phone}</p>
                    </div>
                </div>

                <div className="specialities-container">
                    <div className="heading">
                        <h3 className="title">Квалификации</h3>

                        <button onClick={handleAddSpecialty} className="heading-btn">
                            <CgMathPlus />
                            <p>Добави</p>
                        </button>
                    </div>

                    <div className="specialities">
                        {
                            specialtyError &&
                            <p className="error">{specialtyError}</p>
                        }
                        {
                            currentSpecialities &&
                            currentSpecialities.map((specialty, i) => (
                                selectedSpecialty && specialty._id == selectedSpecialty._id ?
                                <div className="speciality-container" key={i}>
                                    <input
                                        className="specialty-input"
                                        value={selectedSpecialty.name}
                                        onChange={(e) => setSelectedSpecialty({
                                            ...selectedSpecialty,
                                            name: e.target.value
                                        })}
                                    />
                                    <TbChecks onClick={() => handleDeselectSpecialty()} className="speciality-icon" />
                                </div>
                                :
                                <div className="speciality-container" key={i}>
                                    <p onClick={() => handleSelectSpecialty(specialty._id)}>{specialty.name}</p>
                                    {
                                        currentSpecialities.length > 1 &&
                                        <CgClose onClick={() => handleRemoveSpecialty(specialty._id)} className="speciality-icon" />
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="biography-container">
                    <div className="heading">
                        <h3 className="title">Биография</h3>
                    </div>

                    {
                        biographyError &&
                        <p className="error">{biographyError}</p>
                    }

                    <div className="input-container">
                        <textarea
                            value={currentBiography}
                            onChange={(e) => setCurrentBiography(e.target.value)}  
                        />
                    </div>
                </div>

                <div className="btn-box">
                    <div className="btn secondary">Отказ</div>
                    <button onClick={() => handleSaveChanges()} className="btn">Запази промените</button>
                </div>
            </div>
        </section>
    )
}

export default Data