import Contact from './../../components/contact/Contact.js'
import './style-home.css'
import docImg from './../../img/pdf.png'
import purposeImg from './../../img/2mestoCollage_1.png'
import taskImg from './../../img/3mestoPaint_4.png'
import polozheniye from './../../documents/polozheniye.pdf'

const Home = () => {
    return ( 
        <main>
            <div className="titleText">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h5 className="jun-title-competition">Всероссийский творческий конкурс</h5> 
                            <h1 className="hard-title-competition">Профессия - Учитель</h1>
                            <p className="description-title-competition">Конкурс для учителей общеобразовательных школ, педагогов дополнительного образования, студентов высших учебных заведений, а также всех желающих.</p> 
                        </div>
                        <div className="col-md-2 imgTitle">
                            <a href={polozheniye}><img src={docImg} className="docImg"/>Положение о конкурсе</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="purpose">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <h1>Цель Конкурса</h1>
                            <p>Формирование осознанного и уважительного отношения к профессии учитель, развитие мотивации к использованию обучающимися цифровых технологий в своей деятельности.</p>
                        </div>
                        <div className="col-md-5">
                            <img src={purposeImg} alt="Цель Конкурса"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tasks">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <img src={taskImg} alt="Задачи Конкурса"/>
                        </div>
                        <div className="col-md-5">
                            <h1>Задачи Конкурса</h1>
                            <ul>
                                <li>Трансляция положительного образа учителя, повышение престижа профессии</li>
                                <li>Формирование информационной культуры обучающихся</li>
                                <li>Развитие мотивации молодёжи к созидательной творческой деятельности</li>
                                <li>Создание условий для внедрения результатов обучения по дисциплинам информатического цикла в практическую деятельность</li>
                                <li>Позиционирование творческой деятельности молодежи</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="organization">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h1>Организация конкурса</h1>
                            <p>Конкурс проводится с 2019 года на базе кафедры информатики, прикладной математики и методики их преподвания<br/>ФГБОУ ВО "Самарский госудаственный социально-педагогический университет".</p>   
                        </div>
                    </div>
                </div>
            </div>
            <Contact/>
        </main>
     );
}
 
export default Home;