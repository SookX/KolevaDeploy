import { useContext } from 'react'
import './terms.less'
import { DataContext } from '../../context/DataContext'

const Terms = () => {
    // Gets global data from the context
    const { name } = useContext(DataContext)



    return (
        <section className="section-terms">
            <h1 className='terms-title'>Условия за ползване</h1>
            <p className="terms-text">Сайтът предлага информация за кардиологичния кабинет на {name}. Освен информация, Вие можете да резервирате час за посещение в рамките на работното време на кабинета. Когато използвате формата ни за резервации, Вие се съгласявате ние да изпозлваме Вашето име и телефон само за целите на запазване на час в нашия кабинет. Ние се задължаваме да не използваме тази информация по никакъв друг начин.</p>
            <p className="terms-text">Запазените от Вас часове могат да бъдат променени или отказани, като за това ще получите уведомление чрез предоставените от Вас данни за контакт.</p>
        </section>
    )
}

export default Terms