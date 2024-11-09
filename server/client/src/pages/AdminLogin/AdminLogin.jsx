import { useContext, useEffect, useState } from 'react'
import './login.less'
import { DataContext } from '../../context/DataContext'

const AdminLogin = () => {
    // Holds the form data
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    // Gets global data from the context
    const { crud, access, setAccess, navigate } = useContext(DataContext)



    // Checks if the user is already authenticated
    useEffect(() => {
        if(access) navigate('/admin')
    }, [access])



    // Makes a crud operation to the backend
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await crud({
            url: '/admin/login/',
            method: 'post',
            body: {
                email,
                password
            }
        })

        console.log(response)

        if(response.status == 200) {
            const token = response.data.token

            localStorage.setItem('access', token)
            setAccess(token)
        }
    }



    return (
        <section className="section-cancel">
            <div className="cancel-card">
                <h3 className='cancel-title'>Вход на администратор</h3>

                <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container">
                        <label htmlFor="email">Имейл</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">Парола</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn" type='submit'>Вход</button>
                </form>
            </div>
        </section>
    )
}

export default AdminLogin