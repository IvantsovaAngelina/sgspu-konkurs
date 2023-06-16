import axios from 'axios';
import React, { useState, useEffect } from 'react';
 
 const ModalAdminNomin = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
            const nomin = {
            name: event.target.name.value,
            };
    
        
            await axios.post('http://45.8.97.195:8080/api/nomination/create', nomin, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            })
            .then((response) => {
                setData(response.data);
                alert('Номинация создана создана!')
            });
    }

    return ( 
        <div className="modal fade" id="createNomin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Создать организацию</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <label>
                        Название номинации
                        <input type="text" name="name" />
                        </label> 
                        <button type="submit">Создать организацию</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
     );
 
}
  
 export default ModalAdminNomin;