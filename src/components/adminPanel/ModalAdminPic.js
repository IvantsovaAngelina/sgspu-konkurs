import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style-adminPanel.css'

const ModalAdminPic = (props) => {
    const token = localStorage.getItem('token');
    const {id, name, size, img, ratingValue, userFirstName,userSecondName,userFatherName, nomination} = props;
    
    const deletePic = async (id) => {
        try {
          const response = await axios.delete(`http://45.8.97.195:8080/api/picture/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          });
          alert('Картинка удалена');
        } catch (error) {
          console.log(error);
        }
      };
    

    return ( 
        <div className="modal fade" id={`picInfo${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Информация</h5>
                    </div>
                    <div className="modal-body">
                        <img className='imgAdminPic' src={img}/>
                        <div className='infoBody'>
                            <p><span className='spanInfo'>Id изображения: </span>{id}</p>
                            <p><span className='spanInfo'>Название изображения: </span>{name}</p>
                            <p><span className='spanInfo'>Размер изображения: </span>{size}</p>
                            <p><span className='spanInfo'>Автор изображения: </span>{`${userSecondName} ${userFirstName} ${userFatherName}`}</p>
                            <p><span className='spanInfo'>Номинация изображения: </span>{nomination}</p>  
                            <p><span className='spanInfo'>Количество баллов: </span>{ratingValue}</p>  
                        </div>
                        <button onClick={() => deletePic(id)} className='btn btn-danger'>Удалить</button>
                    </div>
                
                </div>
            </div>
        </div>
     );
}
 
export default ModalAdminPic;