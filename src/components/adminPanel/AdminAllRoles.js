import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalAdminRole from './ModalAdminRole';

const AllRolles = () => {
    const token = localStorage.getItem('token');
    const [role, setRole] = useState([]);

    const getRole = async () => {
        try {
        const response = await axios.get('http://45.8.97.195:8080/api/role/findAll', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        setRole(response.data);
        } catch (error) {
        console.log(error);
        }
    };

    const deleteRole = async (id) => {
        try {
            const response = await axios.delete(`http://45.8.97.195:8080/api/role/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              withCredentials: true,
            });
            alert('Роль пользователя удалена');
          } catch (error) {
            console.log(error);
          }
    };

    useEffect(() => {
        getRole();
    }, []);

    

    return ( 
        <main>
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <h1 className='title-reg'>Список ролей для пользователей</h1>
                </div>
                <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createRole">Создать</button>
                                <ModalAdminRole/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                role.map(
                                    (r) => (
                                        <tr key={r.id}>
                                          <td>{r.id}</td>
                                          <td>{r.name}</td>
                                          <td><button onClick={() => deleteRole(r.id)} className='btn btn-danger'>Удалить</button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </main> 
     );
}
 
export default AllRolles;