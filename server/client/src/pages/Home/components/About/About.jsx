import AboutCard from './components/AboutCard';
import Articles from './components/Articles';
import Biography from './components/Biography';
import Interview from './components/Interview';

const About = () => {
    return (
        <section className="section-about" id='about'>
            <AboutCard />
            <Biography />
            <Articles />
            <Interview />
        </section>
    )
}

export default About