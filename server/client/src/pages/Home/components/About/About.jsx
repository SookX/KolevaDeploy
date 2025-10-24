import AboutCard from './components/AboutCard';
import Articles from './components/Articles';
import Biography from './components/Biography';
import Interviews from './components/Interviews';

const About = () => {
    return (
        <section className="section-about" id='about'>
            <AboutCard />
            <Biography />
            <Articles />
            <Interviews />
        </section>
    )
}

export default About