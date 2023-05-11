import React, { useState, useEffect  } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './style-contact.css'


const Contact = () => {
    return ( 
        <div className="contact">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1>Организационный комитет</h1>
                    </div>
                    <div className="col-md-3">
                        <b>Бурцев Николай Павлович</b>
                        <p>Телефон: + 7 (937) 648-61-86</p>
                        <p>E-mail: burtsev@pgsga.ru</p>
                        <p>Адрес: 443090, Россия, г. Самара,</p>
                        <p>ул. Антонова-Овсеенко, 24</p>
                    </div>
                    <div className="col-md-5">
                        <YMaps query={{ lang: 'en_RU' }}>
                            <Map state={{ center: [53.213084, 50.205097], zoom: 16 }} width="100%"/>
                        </YMaps>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Contact;