import { useContext } from "react"
import { CgPhone } from "react-icons/cg"
import { DataContext } from "../../../../../../context/DataContext"

const Phone = () => {
    // Gets global data from the context
    const { phone } = useContext(DataContext)



    return (
        <div className="appointment-phone-container">
            <div className="appointment-phone-heading">
                <CgPhone className="appointment-phone-icon"/>
                <div className="appointment-phone">
                    <p className="appointment-phone-label">Телефон за записване</p>
                    <p className="appointment-phone-number">{phone}</p>
                </div>
            </div>

            <p className="appointment-phone-text">Можете да си запишете час и чрез обаждане на дадения по-горе телефон. Записвания на час по телефона се приемат всеки делничен ден от 10:00 до 13:00 часа.</p>
        </div>
    )
}

export default Phone