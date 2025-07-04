import Article from "./Article"
import article1 from '../../../../../img/article1.jpg'
import article2 from '../../../../../img/article2.jpg'
import article3 from '../../../../../img/article3.jpg'
import article4 from '../../../../../img/article4.jpg'
import article5 from '../../../../../img/article5.jpg'
import article6 from '../../../../../img/article6.jpg'
import article7 from '../../../../../img/article7.jpg'
import article8 from '../../../../../img/article8.jpg'
import article9 from '../../../../../img/article9.jpg'
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

            <div className="articles">
                <Article
                    title='"Оптимизмът и социалната ангажираност доказано подобряват сърдечно-съдовото здраве."'
                    text={`Кардиологът д-р Калина Колева акцентира върху профилактиката на сърдечно-съдовите заболявания и основните рискови фактори.`}
                    website='balkanec.bg'
                    link='https://balkanec.bg/optimizmat-i-sotsialnata-angazhiranost-dokazano-podobryavat-sardechno-sadovoto-zdrave-d-r-kalina-koleva-kardiolog-video-66657.html'
                    image={article5}
                />

                <Article
                    title='Вредна ли е консумацията на кафе и алкохол за сърцето и съдовете?'
                    text={`Кафето е една от най-популярните "напитки на удоволствието", както го наричат немците. В един анализ на литературата е научната база данни от 2023г. (PubMed/Medline database) италиански екип установява следните...`}
                    website='Ботевградски Вести Плюс'
                    link='https://www.facebook.com/photo.php?fbid=557819733953007&set=pb.100091749549113.-2207520000&type=3&locale=bg_BG'
                    image={article6}
                />
            </div>
            <div className="articles">
                <Article
                    title='Опасно ли е сърцебиенето след вирусна инфекция?'
                    text={`Оплакванията по време на и след вирусни инфекции са най-разнообразни и в повечето случаи бенигнени, тоест очаквани и по-скоро безопасни. За съжаление, макар и редки, уврежданията на сърдечният мускул (миокардит) и на...`}
                    website='Ботевградски Вести Плюс'
                    link='https://www.facebook.com/photo/?fbid=579694471765533&set=pcb.579694595098854'
                    image={article7}
                />
                <Article
                    title='За първи път в Ботевград има практика лекар, със специалност ангиология'
                    text={`Д-р Калина Колева има специалности по вътрешни болести и кардиология, а съвсем наскоро завърши и нова специалност - ангиология.`}
                    website='videos.botevgrad.com'
                    link='https://videos.botevgrad.com/view/29072/Za-parvi-pat-v-Botevgrad-ima-praktika-lekar-sas-specialnost-angeologiya/'
                    image={article8}
                />
            </div>
            <div className="articles">
                <Article
                    title='Опасни ли са разширените венозни съдове на долните крайници и как се лекуват?'
                    text={`"Вариците по краката ми създават ли опасност за тромбоза?" Реших да разясня въпроса публично, защото проблемът е масов - засяга всеки трети човек, по-често жените, и зачестява с напредването на възрастта.`}
                    website='Ботевградски Вести Плюс'
                    link='https://www.facebook.com/photo/?fbid=639537669114546&set=pb.100091749549113.-2207520000'
                    image={article9}
                />
            </div>
        </div>
    )
}

export default Articles