import Interview from "./Interview"
import interview2 from "../../../../../video/interview2.mp4"

const Interviews = () => {
    return (
        <div className="interview-container">
            <Interview src="https://media.botevgrad.com/2/29403/video.mp4" />
            <Interview src={interview2} />
            <Interview src="https://media.botevgrad.com/2/28499/video.mp4" />
        </div>
    )
}

export default Interviews