import logo from '../../img/logo.png'

const SectionHeading = ({ title }) => {
    return (
        <div className='section-heading'>
            <div className="hearth-lines">
                <div className="hearth-line"></div>
                <img className='hearth' src={logo} alt="Green hearth" />
                <div className="hearth-line"></div>
            </div>
            <p className='section-title'>{title}</p>
        </div>
    )
}

export default SectionHeading