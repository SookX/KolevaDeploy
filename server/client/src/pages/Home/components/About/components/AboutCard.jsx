import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production';
import koleva from '../../../../../img/koleva.png'
import { TbCircleCheckFilled } from "react-icons/tb";
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../../context/DataContext';

const AboutCard = () => {
    // Gets global data from the context
    const { name, crud } = useContext(DataContext)



    // Holds the state for the specialties
    const [specialties, setSpecialties] = useState([])



    // Gets the data from the backend
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                url: '/service/qualification/',
                method: 'get'
            })

            console.log(response)

            if(response.status == 200) {
                setSpecialties(response.data.data.qualifications)
            }
        }

        fetching()
    }, [])



    return (
        <div className="about-card">
            <div className="about-card-img-box">
                <img src={koleva} className="about-card-img" alt="Dr. Kalina Koleva, PhD" />
            </div>

            <div className="about-card-textbox">
                <div className="about-card-subheading">За мен</div>
                <h3 className="about-card-heading">{name}</h3>

                <div className="about-card-specialities">
                    {
                        specialties &&
                        specialties.map(specialty => (
                            <div className="speciality">
                                <TbCircleCheckFilled className='speciality-icon'/>
                                <p className="speciality-name">{specialty.name}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="about-card-btn-box">
                    <HashLink to='/#articles' className="btn secondary">Виж повече</HashLink>
                    <HashLink to='/#book' className="btn">Запази час</HashLink>
                </div>
            </div>
        </div>
    )
}

export default AboutCard