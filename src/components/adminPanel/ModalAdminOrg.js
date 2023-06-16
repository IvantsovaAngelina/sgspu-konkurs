import axios from 'axios';
import React, { useState, useEffect } from 'react';
 
const ModalAdminOrg = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
            const org = {
            name: event.target.name.value,
            description: event.target.description.value,
            };
    
        
            await axios.post('http://45.8.97.195:8080/api/organization/create', org, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then((response) => {
                setData(response.data);
                alert('Организация создана!')
            });
    }

    return ( 
        <div className="modal fade" id="createOrg" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Создать организацию</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <label>
                        Аббревиатура организации
                        <input type="text" name="name" />
                        </label> 
            
                        <label>
                        Полное название организации
                        <input type="text" name="description" />
                        </label>
                        <button type="submit">Создать организацию</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
     );
 }
  
 export default ModalAdminOrg;