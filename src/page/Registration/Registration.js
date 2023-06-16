import { useNavigate } from 'react-router-dom';
import Organization from '../../helpers/Organization';
import { useForm } from 'react-hook-form';
import { withHookFormMask } from 'use-mask-input';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style-registration.css'

const Registration  = () => {
    const {
        register,
        watch,
        formState: { errors},
      } = useForm({
        mode: "onBlur"
      });

    const [data, setData] = useState({});

    const [role, setRole] = useState([]);

    const nav =useNavigate()

    useEffect(() => {
        axios.get('http://45.8.97.195:8080/api/role/findAll')
        .then(res => {
            const rol = res.data;
            setRole(rol);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
        password: event.target.password.value,
        firstName: event.target.firstName.value,
        secondName: event.target.secondName.value,
        fatherName: event.target.fatherName.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        country: event.target.country.value,
        city: event.target.city.value,
        aboutMe: event.target.aboutMe.value,
        organizationId: event.target.organizationId.value,
        roleId: 2,
        birthday: event.target.birthday.value,
        faculty: event.target.faculty.value,
        supervisorFullName: event.target.supervisorFullName.value,
        supervisorPosition: event.target.supervisorPosition.value,
        supervisorPhoneNumber: event.target.supervisorPhoneNumber.value,
        };

    
        axios.post('http://45.8.97.195:8080/api/user/register', user, {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            setData(response.data);
            alert('Пользователь создан!')
            nav(`/`)
        });
  };

  return (
    <main>
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <h1 className='title-reg'>Регистрация</h1>
                    <p className='registrationP'>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</p>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <div className='container'> 
                        <div className='row justify-content-center'>
                                <div className='col-md-6'> 
                                    <label>
                                        Имя
                                        <input type="text" name="firstName" 
                                        {...register('firstName', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.firstName && <p>{errors?.firstName?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-6'> 
                                    <label>
                                        Фамилия
                                        <input type="text" name="secondName" 
                                        {...register('secondName', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.secondName && <p>{errors?.secondName?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-6'> 
                                    <label>
                                        Отчество
                                        <input type="text" name="fatherName" 
                                        {...register('fatherName', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.fatherName && <p>{errors?.fatherName?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>
                            </div>

                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Пароль
                                        <input type="password" name="password" 
                                        {...register('password', 
                                        {required: "Поле небходимо заполнить",
                                        minLength:{value: 6, message: "Минимальный пароль 6 символов"}
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.password && <p>{errors?.password?.message || "Неверный пароль" }</p>}
                                    </div>
                                </div>

                                <div className='col-md-3'> 
                                    <label>
                                    Подтвердите Пароль
                                        <input type="password" name="secondPassword" 
                                        {...register('secondPassword', 
                                        {required: "Поле небходимо заполнить",
                                        validate: (val) => {
                                            if (watch('password') !== val) {
                                            return "Неверный пароль";
                                            }
                                        },
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.secondPassword && <p>{errors?.secondPassword?.message || "Неверный пароль" }</p>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Email:
                                        <input type="text" name="email" 
                                        {...register('email', 
                                        {required: "Поле небходимо заполнить",
                                        pattern:{
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Некорректный email"
                                            }
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.email && <p>{errors?.email?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>

                                <div className='col-md-3'> 
                                    <label>
                                        Номер телефона
                                        <input type="text" name="phone" 
                                        {...withHookFormMask(register('phone'), 
                                        ['8 999 999 99 99', '8 999 999 99 99'],
                                        {required: "Поле небходимо заполнить"}
                                        )}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.phone && <p>{errors?.phone?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Страна
                                        <input type="text" name="country" 
                                        {...register('country', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.country && <p>{errors?.country?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>

                                <div className='col-md-3'> 
                                    <label>
                                        Город
                                        <input type="text" name="city"
                                        {...register('city', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.city && <p>{errors?.city?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Вуз
                                        <Organization/>
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.organizationId && <p>{errors?.organizationId?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>

                                <div className='col-md-3'> 
                                    <label>
                                        Факультет
                                        <input type="text" name="faculty"
                                        {...register('faculty', 
                                        {required: "Поле небходимо заполнить"
                                        })}/>
                                    </label>
                                </div>
                            </div>

                            
                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Дата рождения
                                        <input
                                        name="birthday"
                                        type="date"
                                        ref={register('birthday', {
                                            valueAsDate: true,
                                        })}
                                        />
                                    </label>
                                    <div style={{color: 'blue'}}>
                                    {errors?.phone && <p>{errors?.phone?.message || "Поле небходимо заполнить" }</p>}
                                    </div>
                                </div>

                                <div className='col-md-3'> 
                                    <label>
                                        О пользователе
                                        <input type="text" name="aboutMe" 
                                        {...register('aboutMe', 
                                        {required: "Поле небходимо заполнить"
                                        })}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className='row justify-content-center'>
                                <div className='col-md-6'> 
                                    <label>
                                        ФИО руководителя
                                        <input type="text" name="supervisorFullName"
                                        {...register('supervisorFullName', 
                                        {required: "Поле небходимо заполнить"
                                        })}/>
                                    </label>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    <label>
                                        Должность руководителя
                                        <input type="text" name="supervisorPosition"
                                        {...register('supervisorPosition', 
                                        {required: "Поле небходимо заполнить"
                                        })}/>
                                    </label>
                                </div>
                                <div className='col-md-3'> 
                                    <label>
                                        Номер телефона руководителя
                                        <input type="text" name="supervisorPhoneNumber" 
                                        {...withHookFormMask(register('supervisorPhoneNumber'), 
                                        ['8 999 999 99 99', '8 999 999 99 99'],
                                        {required: "Поле небходимо заполнить"}
                                        )}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className='row justify-content-center'>
                                <div className='col-md-3'> 
                                    
                                </div>

                                <div className='col-md-3'> 
                                <button className='btn-add' type="submit">Создать пользователя</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    
 );
}
 
export default Registration;
