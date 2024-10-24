import { BrowserRouter, Routes, Route } from "react-router-dom"
import DataProvider from "./context/DataContext"
import Home from "./pages/Home/Home"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import CancelAppointment from "./pages/CancelAppointment/CancelAppointment"
import Success from "./pages/Success/Success"
import Terms from "./pages/Terms/Terms"
import AdminLogin from "./pages/AdminLogin/AdminLogin"
import Admin from "./pages/Admin/Admin"
import Data from "./pages/Admin/components/Data/Data"
import Schedule from "./pages/Admin/components/Schedule/Schedule"
import Gallery from "./pages/Gallery/Gallery"
import ServicesSection from "./pages/Admin/components/Services/ServicesSection"

function App() {

  return (
    <BrowserRouter>

      <DataProvider>

        <Header />

        <Routes>

          <Route path="/" element={<Home />} />  
          <Route path="/cancel" element={<CancelAppointment />} />
          <Route path="/success/:type" element={<Success />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} >
            <Route index element={<Data />} />
            <Route path="services" element={<ServicesSection />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>

        </Routes>

        <Footer />

      </DataProvider>

    </BrowserRouter>
  )
}

export default App
