import Article from "./Article"
import article1 from '../../../../../img/article1.jpg'
import article2 from '../../../../../img/article2.jpg'
import article3 from '../../../../../img/article3.jpg'
import article4 from '../../../../../img/article4.jpg'
import SectionHeading from "../../../../../components/SectionHeading/SectionHeading"

const Articles = () => {
    return (
        <div id="articles">
            <SectionHeading title='Статии' />
            <div className="articles">
                <Article
                    title='Кардиологът д-р Калина Колева'
                    text=' „Сърцето ми е в България – всички мои роднини, близки и приятели са тук. Взех решението да приложа знанията и опита които имам, в моята родина. В провинцията липсват млади лекари и всякакъв друг медицински персонал, и тази тенденция трябва да се промени. Затова започвам с личния пример.“'
                    website='balkanec.bg'
                    link='https://balkanec.bg/kardiologat-d-r-kalina-koleva-nemski-opit-i-moderna-aparatura-dostapni-za-patsientite-na-botevgrad-i-regiona-64964.html'
                    image={article1}
                />

                <Article
                    title='Акценти от лекцията на д-р Калина Колева'
                    text='Д-р Калина Колева е кардиолог. Завършва медицина в Медицински университет в София през 2004 год. с отличие. Работи като лекар в България и придобива специалност по “Вътрешни болести“. През 2011 год. започва лекарската си кариера в Германия, където специализира “Спешна помощ“ и “Кардиология“.'
                    website='botevgrad.com'
                    link='https://botevgrad.com/news/91570/Akcenti-ot-lekciyata-na-kardiologa-d-r-Kalina-Koleva-pred-botevgradchani/'
                    image={article2}
                />
            </div>

            <div className="articles">
                <Article
                    title='Лекарят, който напусна Германия, за да лекува в Ботевград.'
                    text={`"Работя медицина с цялото си сърце, плам и желание. За мен е любима професия, която усещам като призвание."`}
                    website='Ботевградски Вести Плюс'
                    link='https://www.facebook.com/story.php?story_fbid=450932334641748&id=100091749549113'
                    image={article3}
                />

                <Article
                    title='Специализиран кабинет по кардиология и съдова медицина'
                    text='Специализиран кабинет по кардиология и съдова медицина отваря врати в МБАЛ – Ботевград ЕООД. Кабинетът разполага с уникална за областта апаратура с така наречения тъканен доплер за сърце.'
                    website='Вестник Правешки глас'
                    link='https://www.facebook.com/pravets.news/posts/pfbid032B4BGezVGfJeKWJu8wdTaiac87GG8Vn6dcz8HDZ2XCredLcg6SFemnoJRJEpqBxVl'
                    image={article4}
                />
            </div>
        </div>
    )
}

export default Articles