import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style-login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://45.8.97.195:8080/api/auth/signin', { email, password });
      const { data } = response;
      localStorage.setItem('token', data.accessToken);

      const userResponse = await axios.get(`http://45.8.97.195:8080/api/user/${response.data.userId}`);
      const roleId = userResponse.data.roleId;

      if (roleId === 1) {
        nav(`/accountadmin/${data.userId}`);
        window.location.reload();
      } else if (roleId === 2) {
        nav(`/account/${data.userId}`);
        window.location.reload();
      } else if (roleId === 3) {
        nav(`/accountjury/${data.userId}`);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('Неверный email или пароль');
    }
  };

  return (
    <main>
      <div className="signin">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <form className="form-signin" onSubmit={handleSubmit}>
                <h3 className="h3 mb-3 font-weight-normal">Войдите пожалуйста</h3>
                <label htmlFor="inputEmail" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  placeholder="Email"
                  required=""
                  autoFocus=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Пароль
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  placeholder="Пароль"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-lg btn-block btn-submit" type="submit">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;