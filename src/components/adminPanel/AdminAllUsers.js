import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import ModalAdminUser from './ModalAdminUser'
import './style-adminPanel.css'

const AllUsers = () => {
    const [unitUser, setUnitUser] = useState([]);
    const [userOrganization, setUserOrganization] = useState({});
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);

    const getDataUser = async () => {
      try {
        const response = await axios.get('http://45.8.97.195:8080/api/user/findAll', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
          },
        });
        setUnitUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      getDataUser();
    }, []);

    const getOrganization = async (id) => {
      try {
        const response = await axios.get(`http://45.8.97.195:8080/api/organization/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
          },
        });
        return response.data.name;
      } catch (error) {
        console.log(error);
        return 'unknown';
      }
    };
  
    const getUserOrganization = async (id) => {
      const name = await getOrganization(id);
      return { id, organization: name };
    };
  
    useEffect(() => {
      const promises = unitUser.map(async (user) => {
        const org = await getUserOrganization(user.organizationId);
        return org;
      });
      Promise.all(promises)
        .then((organizations) => {
          const organizationMap = {};
          organizations.forEach((org) => (organizationMap[org.id]= org.organization));
          setUserOrganization(organizationMap);
        })
        .catch((error) => console.log(error));
    }, [unitUser]);
    
    const handleDeleteUser = async (id) => {
      try {
        const response = await axios.delete(`http://45.8.97.195:8080/api/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        alert('Пользователь удален!');
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <h1>Список пользователей</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>Почта</th>
                            <th>Номер телефона</th>
                            <th>Организация</th>
                            <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unitUser.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.secondName} {user.firstName} {user.fatherName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{userOrganization[user.organizationId]}</td>
                                <td>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#user${user.id}`}>Подробнее</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                                <ModalAdminUser id={user.id} 
                                password={user.password} 
                                firstName={user.firstName} 
                                secondName={user.secondName} 
                                fatherName={user.fatherName} 
                                email={user.email} 
                                phone={user.phone} 
                                city={user.city} 
                                country={user.country} 
                                aboutMe={user.aboutMe} 
                                faculty={user.faculty} 
                                supervisorFullName={user.supervisorFullName} 
                                supervisorPosition={user.supervisorPosition} 
                                supervisorPhoneNumber={user.supervisorPhoneNumber} 
                                birthday={user.birthday} 
                                roleId={user.roleId} 
                                organizationId={user.organizationId} 
                                picturesId={user.picturesId} />
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

export default AllUsers;
