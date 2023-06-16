import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const ModalAdminUser = ({ id, password, firstName, secondName, fatherName, email, phone, city, country,
  aboutMe, faculty, supervisorFullName, supervisorPosition, supervisorPhoneNumber, birthday,
  roleId, organizationId, picturesId
}) => {
  const token = localStorage.getItem('token');

  const [organization, setOrganization] = useState([]);
  const [roleUser, setRoleUser] = useState([]);
  const [formData, setFormData] = useState({
    id, 
    password, 
    firstName, 
    secondName, 
    fatherName, 
    email,
    phone,
    city,
    country, 
    aboutMe, 
    faculty, 
    supervisorFullName, 
    supervisorPosition, 
    supervisorPhoneNumber, 
    birthday,
    roleId, 
    organizationId
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://45.8.97.195:8080/api/user/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Данные пользователя обновлены!');
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Произошла ошибка при обновлении данных пользователя!');
      });
  };

  const getOrg = async () => {
    try {
      const response = await axios.get('http://45.8.97.195:8080/api/organization/findAll', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
        withCredentials: true,
      });
      setOrganization(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRol = async () => {
    try {
      const response = await axios.get('http://45.8.97.195:8080/api/role/findAll',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
        withCredentials: true,
      });
      setRoleUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
    getRol();
  }, []);


    return (
      <div className="modal fade" id={`user${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Информация о пользователе {id}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
              <label>
                Фамилия:
                <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} />
              </label> 
              <label>
                Имя:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              </label>
              <label>
                Отчество:
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>
                Пароль:
                <input type="text" name="password" value={formData.password} onChange={handleChange} />
              </label>

              <label>
                Номер телефона:
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </label>
  
              <label>
                Страна:
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
              </label>
  
              <label>
                Город:
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
              </label>
  
              <label>
                Дата рождения:
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
              </label>
  
              <label>
                Факультет:
                <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} />
              </label>
  
              <label>
                Название организации:
                <select name="organizationId" className='selectOrg' onChange={handleChange} value={formData.organizationId}>
                  {organization.map((org) => (
                    <option className='optionOrg' key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </label>
  
              <label>
                Роль пользователя:
                <select name="roleId" className='selectOrg' onChange={handleChange} value={formData.roleId}>
                  {roleUser.map((role) => (
                    <option className='optionOrg' key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </label>
  
              <label>
                ФИО научного руководителя:
                <input type="text" name="supervisorFullName" value={formData.supervisorFullName} onChange={handleChange} />
              </label>
  
              <label>
                Должность научного руководителя:
                <input type="text" name="supervisorPosition" value={formData.supervisorPosition} onChange={handleChange} />
              </label>
  
              <label>
                Номер телефона научного руководителя:
                <input type="text" name="supervisorPhoneNumber" value={formData.supervisorPhoneNumber} onChange={handleChange} />
              </label>
  
              <label>
                Обо мне:
                <input name="aboutMe" value={formData.aboutMe} onChange={handleChange} />
              </label> 
    
                <button type="submit" className='btn-submit' >Сохранить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default ModalAdminUser;