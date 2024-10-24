import { useContext } from 'react';
import cardio from '../../../../img/Cardiogram.png'
import hero from '../../../../img/hero-img.jpg'
import { HashLink } from 'react-router-hash-link';
import { DataContext } from '../../../../context/DataContext';

const Hero = () => {
    // Gets global data from the context
    const { name } = useContext(DataContext)



    return (
        <section className="section-hero" id='hero'>
            <div className="hero-textbox">
                <p className="hero-subheading">{name}</p>
                <h2 className="hero-heading">Над 20 години грижа за Вашето здраве!</h2>
                <p className="hero-text">Кардиолог, интернист, спешен лекар, специализант по ангиология (съдова медицина)</p>

                <div className="hero-btn-box">
                    <HashLink to='/#about' className="btn secondary">Повече за мен</HashLink>
                    <HashLink to='/#book' className="btn">Запази час</HashLink>
                </div>
            </div>

            <img src={hero} className="hero-img" alt="Кардиологичен кабинет" />

            <img src={cardio} className="hero-cardio" alt="Cardiogram" />
        </section>
    )
}

export default Hero