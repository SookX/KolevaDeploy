import './home.less'
import About from "./components/About/About"
import Hero from "./components/Hero/Hero"
import Services from './components/Services/Services'
import Pricing from './components/Pricing/Pricing'
import BookAppointment from './components/BookAppointment/BookAppointment'
import Contacts from './components/Contacts/Contacts'
import { Helmet } from "react-helmet"

const Home = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Д-р Калина Колева - специалист в областта на кардиологията с над 20 години опит в България и Германия. Д-р Колева е кардиолог, интернист, спешен лекар и ангиолог (съдова медицина). Запазете си час за кабинета ѝ в Ботевград онлайн." />
                <meta name="keywords" content="Д-р Калина Колева, Колева, кардиолог, ангиолог, спешен лекар, вътрешна медицина, интернист, кардиолог Ботевград, Ботевград, кардиологичен кабинет, ехокардиография, консултация, Германия, МУ-София, Немското кардиологично дружество, доктор медик, НЗОК, платен прием" />


                <title>Д-р Калина Колева, д.м. (PhD) - Кардиологичен кабинет Ботевград</title>
            </Helmet>
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