import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { withHookFormMask } from 'use-mask-input';
import axios from 'axios';
import React, { useState, useEffect  } from 'react';
import UploadFile from '../../components/uploadFile/UploadFile';
import './style-PersonalAccount.css'
import jwt_decode from 'jwt-decode';

const PersonalAccountUser = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [organization, setOrganization] = useState([]);
  const { register } = useForm({
    mode: 'onBlur',
  });

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    firstName: '',
    secondName: '',
    fatherName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    aboutMe: '',
    organizationId: '',
    roleId: '',
    birthday: '',
    faculty: '',
    supervisorFullName: '',
    supervisorPosition: '',
    supervisorPhoneNumber: '',
  });

  const { id } = useParams();
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    axios.get(`http://45.8.97.195:8080/api/user/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }}).then((res) => {
      const user = res.data;
      setUser(user);
      setFormData({
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        secondName: user.secondName,
        fatherName: user.fatherName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        city: user.city,
        aboutMe: user.aboutMe,
        organizationId: user.organizationId,
        roleId: user.roleId,
        birthday: user.birthday || '',
        faculty: user.faculty,
        supervisorFullName: user.supervisorFullName,
        supervisorPosition: user.supervisorPosition,
        supervisorPhoneNumber: user.supervisorPhoneNumber,
      });
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: user?.id,
      userName: formData.userName,
      password: formData.password,
      firstName: formData.firstName,
      secondName: formData.secondName,
      fatherName: formData.fatherName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      city: formData.city,
      aboutMe: formData.aboutMe,
      organizationId: formData.organizationId,
      roleId: formData.roleId,
      birthday: formData.birthday,
      faculty: formData.faculty,
      supervisorFullName: formData.supervisorFullName,
      supervisorPosition:formData.supervisorPosition,
      supervisorPhoneNumber: formData.supervisorPhoneNumber,
    };
    axios.post(`http://45.8.97.195:8080/api/user/update`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
        alert('Данные обновлены!');
      });
  };

  useEffect(() => {
    axios.get('http://45.8.97.195:8080/api/organization/findAll')
      .then(res => {
        const organization = res.data;
        setOrganization(organization);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
    
    return (
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h2 className="title-user">Личный кабинет</h2>
            </div>
          </div>
        </div>
        <div className="infoUser">
          <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <label className='userId'>
                        Id
                        <input type="text" name="id" defaultValue={user?.id}  disabled/>
                    </label>
                    </div>
                </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <label>
                    Имя
                    <input type="text" name="firstName" defaultValue={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                  </label>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <label>
                    Фамилия
                    <input type="text" name="secondName" defaultValue={formData.secondName} onChange={(e) => setFormData({...formData, secondName: e.target.value})}/>
                  </label>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <label>
                    Отчество
                    <input type="text" name="fatherName" defaultValue={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})}/>
                  </label>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <label>
                    Email:
                    <input
                      type="text"
                      name="email"
                      defaultValue={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Некорректный email',
                        },
                      })}
                    />
                  </label>
                </div>

                <div className="col-md-3">
                  <label>
                    Номер телефона:
                    <input
                      type="text"
                      name="phone"
                      defaultValue={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
/>
                  </label>
                </div>
              </div>
              
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <label>
                    Страна
                    <input type="text" name="fatherName" defaultValue={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}/>
                  </label>
                </div>

                <div className="col-md-3">
                  <label>
                    Город
                    <input type="text" name="fatherName" defaultValue={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}/>
                  </label>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <label>
                    Вуз
                    <select className='selectOrg' name="organizationId" value={formData.organizationId} onChange={handleChange}>
                      {organization.map((org) => (
                        <option className='optionOrg' key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-3">
                  <label>
                    Факультет
                    <input type="text" name="faculty" defaultValue={formData.faculty} onChange={(e) => setFormData({...formData, faculty: e.target.value})}/>
                  </label>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-3">
                  <label>
                    Дата рождения
                    <input type="date" name="birthday" defaultValue={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})}/>
                  </label>
                </div>

                <div className="col-md-3">
                  <label>
                    О себе
                    <input type="text" name="aboutMe" defaultValue={formData.aboutMe} onChange={(e) => setFormData({...formData, aboutMe: e.target.value})}/>
                  </label>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-6">
                  <label>
                  ФИО руководителя
                    <input type="text" name="supervisorFullName" defaultValue={formData.supervisorFullName} onChange={(e) => setFormData({...formData, supervisorFullName: e.target.value})}/>
                  </label>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-3">
                  <label>
                  Должность руководителя
                    <input type="text" name="supervisorPosition" defaultValue={formData.supervisorPosition} onChange={(e) => setFormData({...formData, supervisorPosition: e.target.value})}/>
                  </label>
                </div>

                <div className="col-md-3">
                  <label>
                  Номер телефона руководителя
                    <input type="text" name="supervisorPhoneNumber" defaultValue={formData.supervisorPhoneNumber} onChange={(e) => setFormData({...formData, supervisorPhoneNumber: e.target.value})}/>
                  </label>
                </div>
              </div>

              
                <div className='row justify-content-center'>
                    <div className='col-md-6'> 
                        <button className='btn-submit' type="submit">Обновить данные</button>
                    </div>
                </div>
            </div>
          </form>
        </div>
        <UploadFile/>
      </main>
    );
  }
 
export default PersonalAccountUser