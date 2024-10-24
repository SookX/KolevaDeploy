import { CgMail, CgPhone, CgPin } from "react-icons/cg"
import SectionHeading from "../../../../components/SectionHeading/SectionHeading"
import { useContext } from "react"
import { DataContext } from "../../../../context/DataContext"

const Contacts = () => {
    // Gets global data from the context
    const { phone, email, address } = useContext(DataContext)



    return (
        <>
            <SectionHeading title="Контакти" />
            <section className="section-contact">
                <div className="contact-card">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2922.3032576140163!2d23.798728278282592!3d42.908644876052044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa57571aeaf6d1%3A0x720efde3cce06dda!2z0KbQtdC90YLRitGALCDRg9C7LiDigJ7QkdC-0LbQutC-INCR0L7QttC40LvQvtCy4oCcIDEsIDIxNDAg0JHQvtGC0LXQstCz0YDQsNC0!5e0!3m2!1sbg!2sbg!4v1728311031032!5m2!1sbg!2sbg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="contact-map"></iframe>

                    <div className="contacts-data">
                        <div className="contact-header">
                            <div className="contact-subheading">Контакти</div>
                            <h3 className="contact-heading">Свържете се с мен</h3>
                        </div>

                        <div className="contacts">
                            <div className="contact">
                                <div className="contact-title">
                                    <CgPin className="contact-icon"/>
                                    <h4>Кабинет</h4>
                                </div>

                                <div className="contact-content">{address}</div>
                            </div>

                            <div className="contact">
                                <div className="contact-title">
                                    <CgPhone className="contact-icon"/>
                                    <h4>Телефон</h4>
                                </div>

                                <div className="contact-content">{phone}</div>
                            </div>

                            <div className="contact">
                                <div className="contact-title">
                                    <CgMail className="contact-icon"/>
                                    <h4>Имейл</h4>
                                </div>

                                <div className="contact-content">{email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contacts