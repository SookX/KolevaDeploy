import './success.less'
import logo from '../../img/logo.png'
import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Success = () => {
    // Gets the type for the page
    const type = useParams().type



    // Holds the parts that change according to the type
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [button, setButton] = useState({ name: '', link: '' })



    // Sets the values
    useEffect(() => {
        if(type === 'book') {
            setTitle('запазен')
            setText('запазихте часа си. Очакваме Ви!')
            setButton({
                name: 'Откажи час',
                link: '/cancel'
            })
        } else if(type === 'cancel') {
            setTitle('отказан')
            setText('отказахте най-скорошния час, запазен на номера Ви.')
            setButton({
                name: 'Запази час',
                link: '/#book'
            })
        }
    }, [type])



    return (
        <section className='section-success'>
            <img src={logo} className='success-img' alt="Hearth" />

            <h2 className='success-title'>Успешно {title} час!</h2>
            <p className="success-text">Успешно {text} Благодарим!</p>

            <div className="success-btn-box">
                <HashLink to={button.link} className="btn secondary">{button.name}</HashLink>
                <HashLink to='/#hero' className="btn">Начало</HashLink>
            </div>
        </section>
    )
}

export default Success