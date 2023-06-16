import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalAdminOrg from './ModalAdminOrg';

const AllOrganization = () => {
  const token = localStorage.getItem('token');
  const [organization, setOrganization] = useState([]);

  const getOrg = async () => {
    try {
      const response = await axios.get('http://45.8.97.195:8080/api/organization/findAll', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setOrganization(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, []);

  const deleteOrg = async (id) => {
    try {
      const response = await axios.delete(`http://45.8.97.195:8080/api/organization/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert('Организация удалена');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <h1 className='title-reg'>Список всех организаций</h1>
                </div>
            </div>
            <div className='row'>

            </div>
            <div className='row'>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Короткое название организации</th>
                      <th>Полное название организации</th>
                      <th><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createOrg">Создать</button>
                      <ModalAdminOrg/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.map((org) => (
                      <tr key={org.id}>
                        <td>{org.id}</td>
                        <td>{org.name}</td>
                        <td>{org.description}</td>
                        <td>
                            <button onClick={() => deleteOrg(org.id)} className='btn btn-danger'>Удалить</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>   
            </div>
        </div>
    </main>
  );
};

export default AllOrganization;