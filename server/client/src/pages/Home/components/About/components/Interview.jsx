const Interview = ({ src = "" }) => {
    return (
        <video className="interview" controls={true} name="media">
            <source src={src} type="video/mp4">
            </source>
        </video>
    )
}

export default Interview