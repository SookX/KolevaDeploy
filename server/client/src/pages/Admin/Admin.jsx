import { NavLink, Outlet } from 'react-router-dom'
import './admin.less'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const Admin = () => {
    // Gets global data from the context
    const { access, setAccess, navigate } = useContext(DataContext)

    

    // Checks if the user is authenticated on init
    useEffect(() => {
        if(!access) navigate('/adminLogin')
    }, [access])



    // Removes the tokens
    const handleLogout = () => {
        localStorage.removeItem('access')
        setAccess(null)
    }



    // Holds the state for the mobile sidebar
    const [opened, setOpened] = useState(false)



    return (
        <div className="admin-panel">
            <div className={`sidebar ${opened ? 'opened' : null}`}>
                <div className="sidebar-textbox">
                    <h3 className='sidebar-title'>Добре дошли!</h3>
                    <p className='sidebar-text'>Тук може да конфигурирате данните за уебсайта.</p>
                </div>

                <div className="sidebar-navigation">
                    <NavLink to='/admin' end className={`sidebar-link ${(isActive) => isActive ? 'active' : null}`} >Данни</NavLink>
                    <NavLink to='/admin/services' className={`sidebar-link ${(isActive) => isActive ? 'active' : null}`} >Услуги</NavLink>
                    <NavLink to='/admin/schedule' className={`sidebar-link ${(isActive) => isActive ? 'active' : null}`} >Часове</NavLink>
                </div>

                <div className="sidebar-btn-box">
                    <button onClick={handleLogout} className="btn">Изход</button>
                </div>
            </div>

            {
                opened ?
                <IoIosArrowDropleftCircle onClick={() => setOpened(false)} className='sidebar-icon close' />
                :
                <IoIosArrowDroprightCircle onClick={() => setOpened(true)} className='sidebar-icon open' />
            }

            <Outlet />
        </div>
    )
}

export default Admin