import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { withHookFormMask } from 'use-mask-input';
import axios from 'axios';
import React, { useState, useEffect  } from 'react';
import Organization from './../../helpers/Organization'
import './style-PersonalAccount_jury.css'
import jwt_decode from 'jwt-decode';

const PersonalAccountJury = () => {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
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
      
      return (
        <main>
          {/* <p>{id}</p> */}
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
                        name="email"
                        defaultValue={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        {...withHookFormMask(register('phone'), 
                        ['8 999 999 99 99', '8 999 999 99 99']
                        )}
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
                      <Organization/>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      Дата рождения
                      <input type="date" name="birthday" defaultValue={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})}/>
                    </label>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <label>
                      О себе
                      <input type="text" name="aboutMe" className='aboutMe' defaultValue={formData.aboutMe} onChange={(e) => setFormData({...formData, aboutMe: e.target.value})}/>
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
        </main>
      );
    }
 
export default PersonalAccountJury;