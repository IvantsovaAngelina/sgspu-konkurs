import axios from 'axios';
import React, { useState, useEffect } from 'react';
 
 const ModalAdminRole = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
            const org = {
            name: event.target.name.value
            };
    
        
            await axios.post('http://45.8.97.195:8080/api/role/create', org, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then((response) => {
                setData(response.data);
                alert('Ногвая роль создана!')
            });
    }

    return ( 
        <div className="modal fade" id="createRole" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Создать организацию</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <label>
                        Название роли для пользователя
                        <input type="text" name="name" />
                        </label> 
                        <button type="submit">Создать роль</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
     );
 }
  
 export default ModalAdminRole;