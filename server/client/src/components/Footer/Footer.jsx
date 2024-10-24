import { CgMail, CgPhone, CgPin } from 'react-icons/cg'
import hearth from '../../img/logo.png'
import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production'
import { useContext } from 'react'
import { DataContext } from '../../context/DataContext'

const Footer = () => {
    // Gets global data from the context
    const { name, phone, email, address } = useContext(DataContext)



    return (
        <footer className="footer">
            <div className="footer-left">
                <HashLink to='/#hero'><img src={hearth} className='footer-logo' alt="Hearth" /></HashLink>

                <div className="footer-left-content">
                    <h3 className='footer-title'>{name}</h3>
                    <p className="footer-left-text">Кабинетът работи с <span>НЗОК</span>. <span>Платен</span> прием в един от дните.</p>
                    <p className="footer-copyright">Copyright ©{new Date().getFullYear()}</p>
                </div>
            </div>

            <div className="footer-right">
                <div className="footer-contact">
                    <CgPin className="footer-contact-icon"/>

                    <div className="footer-contact-content">{address}</div>
                </div>

                <div className="footer-contact">
                    <CgPhone className="footer-contact-icon"/>

                    <div className="footer-contact-content">{phone}</div>
                </div>

                <div className="footer-contact">
                    <CgMail className="footer-contact-icon"/>

                    <div className="footer-contact-content">{email}</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer