import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production'
import logo from '../../img/logo.png'
import { CgClose, CgMenu } from "react-icons/cg";
import { useEffect, useState } from 'react'

const Header = () => {
    // Holds the links for the navigation
    const links = [
        {
            name: 'За мен',
            link: '/#about'
        },
        {
            name: 'Медицински услуги',
            link: '/#services'
        },
        {
            name: 'Снимки',
            link: '/gallery'
        },
        {
            name: 'Запази час',
            link: '/#book'
        },
    ]



    // Holds the state for the mobile navigation
    const [open, setOpen] = useState(false)



    // Closes the mobile navigation whenever a link is clicked
    useEffect(() => {
        const closeNav = (e) => {
            if(e.target.classList.contains('nav-link')) setOpen(false)
        }

        document.addEventListener('click', closeNav)

        return window.removeEventListener('click', closeNav)
    }, [])

    

    return (
        <header className="header">
            <HashLink to='/#hero'><img src={logo} alt="Hearth" className='nav-logo' /></HashLink>

            <nav className='main-nav'>
                {
                    links.map((link, i) => (
                        <HashLink key={i} className="nav-link" to={link.link}>{link.name}</HashLink>
                    ))
                }
            </nav>

            <div className="mobile-nav">
                {
                    open ?
                    <CgClose className='mobile-icon' onClick={() => setOpen(false)} />
                    :
                    <CgMenu className='mobile-icon' onClick={() => setOpen(true)} />
                }

                {
                    open &&
                    <div className="mobile-nav-links">
                        <img src={logo} alt="Heart" className='mobile-nav-logo' />

                        <HashLink className="nav-link" to='/#hero'>Начало</HashLink>

                        {
                            links.map((link, i) => (
                                <HashLink key={i} className="nav-link" to={link.link}>{link.name}</HashLink>
                            ))
                        }
                    </div>
                }
            </div>
        </header>
    )
}

export default Header