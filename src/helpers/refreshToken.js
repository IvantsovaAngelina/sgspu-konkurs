import axios from 'axios';

const refreshToken = (token) => {
    return axios.post('http://127.0.0.1:8080/api/auth/refresh', {
        refreshToken: token
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  
  const checkToken = () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      refreshToken(token)
        .then((newToken) => {
          localStorage.setItem('token', newToken);
          console.log('Токен успешно обновлен');
        })
        .catch((error) => {
          console.log('Ошибка обновления токена', error);
        });
    } else {
      console.log('Токен отсутствует');
    }
  };

export default checkToken;