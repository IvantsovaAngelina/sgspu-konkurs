import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalAdminNomin from './ModalAdminNomin';

const AllNominations = () => {
    const token = localStorage.getItem('token');
    const [nomination, setNomination] = useState([]);

    const getNomin = async () => {
        try {
            const response = await axios.get('http://45.8.97.195:8080/api/nomination/findAll', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setNomination(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNomination = async (id) => {
        try {
            const response = await axios.delete(`http://45.8.97.195:8080/api/nomination/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              withCredentials: true,
            });
            alert('Номинация удалена');
          } catch (error) {
            console.log(error);
          }
    };

    useEffect(() => {
        getNomin();
    }, []);

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <h1 className='title-reg'>Список всех номинаций конкурса</h1>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createNomin">Создать</button>
                                        <ModalAdminNomin/>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nomination.map((nom) => (
                                        <tr key={nom.id}>
                                            <td>{nom.id}</td>
                                            <td>{nom.name}</td>
                                            <td>
                                                <button onClick={() => deleteNomination(nom.id)} className='btn btn-danger'>Удалить</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AllNominations;