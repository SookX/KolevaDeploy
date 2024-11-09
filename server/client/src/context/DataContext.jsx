import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({ })

const DataProvider = ({ children }) => {
    // Sends the user to a different page
    const navigate = useNavigate()



    // Gets the JWT tokens if the user has logged in
    const [access, setAccess] = useState(localStorage.getItem('access') || null)



    // Sets the url for the backend server
    axios.defaults.baseURL = 'https://kolevakardiolog.org/api'



    // Makes a CRUD operation to the backend server
    const crud = async ({ url, method, body = null, headers = null }) => {
        try {
            const config = {
                headers: access ? {
                    'Authorization': `Bearer ${access}`,
                    ...headers
                } : {
                    headers
                }
            }

            let response;
            if (method.toLowerCase() === 'get') {
                response = await axios[method](url, config);
            } else {
                if(body) response = await axios[method](url, body, config);
                else response = await axios[method](url, config)
            }

            if(response) return response
        } catch(err) {
            return err
        }
    }



    // Holds the data for the site
    const [name, setName] = useState('Д-р Калина Колева, д.м. (PhD)')
    const [phone, setPhone] = useState('0877 202 032')
    const [email, setEmail] = useState('drkalinakoleva@gmail.com')
    const [address, setAddress] = useState('ул. Божко Божилов 1, ет. 2, Ботевград')



    return (
        <DataContext.Provider value={{
            navigate,
            crud, access, setAccess,
            name, phone, email, address
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataProvider