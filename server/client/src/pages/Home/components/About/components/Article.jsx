import { Link } from "react-router-dom"

const Article = ({ title, text, website, link, image }) => {
    return (
        <Link to={link} target="_blank" className="article">
            <img src={image} className="article-img" alt="Article Image" />

            <div className="article-textbox">
                <h3 className="article-heading">{title}</h3>
                <p className="article-text">{text}</p>
                <p className="article-source">{website}</p>
            </div>
        </Link>
    )
}

export default Article