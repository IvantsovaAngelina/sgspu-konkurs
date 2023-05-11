import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function checkToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

function Buttons() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const nav = useNavigate();
  const { id } = useParams();

  const navi = () => {
    nav(`/account/${userId}`);
    window.location.reload();
} 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (checkToken()) {
      setLoggedIn(true);
      const decodedToken = jwt_decode(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      };
      axios
        .post("http://127.0.0.1:8080/api/user/find", { email: decodedToken.sub }, config)
        .then((response) => {
          setUserId(response.data[0].id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserId('');
    nav('/');
  }

  return (
    <>
      {loggedIn ? (
        <>
          <button onClick={() => nav(navi())} className="btn-login">Личный кабинет
          </button>
          <button className="btn-reg" onClick={handleLogout}>Выход</button>
        </>
      ) : (
        <>
          <Link to="/registration"><button className="btn-reg">Регистрация</button></Link>
          <Link to="/login"><button className="btn-login">Вход</button></Link>
        </>
      )}
    </>
  );
}

export default Buttons;