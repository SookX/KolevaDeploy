import './home.less'
import About from "./components/About/About"
import Hero from "./components/Hero/Hero"
import Services from './components/Services/Services'
import Pricing from './components/Pricing/Pricing'
import BookAppointment from './components/BookAppointment/BookAppointment'
import Contacts from './components/Contacts/Contacts'

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Pricing />
            <BookAppointment />
            <Contacts />
        </>
    )
}

export default Home