import './style-footer.css'
import logo from './../../img/sgspu.png'


const Footer = () => {
    return ( 
        <footer className='footer mt-auto py-3 bg-light'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 align-self-center">
                    <div className="logo-textFooter">
                        <img src={logo} alt="logo" className="logoSGSPU_footer"/>
                        <a href="https://pgsga.ru/">
                        Самарский государственный социально-педагогический университет
                        </a>
                    </div>
                </div>
                <div className="col-md-3 align-self-center">
                    <b>Адрес ВУЗа</b>
                    <p>
                        443099, Россия, г. Самара, ул. М. Горького, 65/67
                    </p>
                </div>
                <div className="col-md-3 align-self-center ">
                    <b>Контакты</b>
                    <p>
                        Тел.: 
                        +7 (846) 207-44-00<br/>
                        E-mail: rectorat@sgspu.ru
                    </p>
                </div>
            </div>
        </div>
    </footer>
     );
}
 
export default Footer;