import Article from "./Article"
import article1 from '../../../../../img/article1.jpg'
import article2 from '../../../../../img/article2.jpg'
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
        </div>
    )
}

export default Articles