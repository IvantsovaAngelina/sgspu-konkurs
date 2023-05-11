import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './upload-style.css';


const UploadFile = () => {
  const [fileData, setFileData] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  console.log(decoded);
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
     responseType: "json",
  };
  
  const [userId, setUserId] = useState(null);
  
  const getId = () => {
    axios
      .post("http://127.0.0.1:8080/api/user/find", { email: decoded.sub }, config)
      .then((response) => {
        setUserId(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getId();
  }, []);

const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      const fileDetails = {
        name: file.name,
        size: `${file.size / 1024} KB`,
        resolution: `${img.width}x${img.height}`,
      };
      setFileData({ ...fileDetails, base64: reader.result });
    };
  };
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    name: fileData.name,
    size: fileData.size,
    base64: fileData.base64,
    ratingValue: 0,
    statusId: 1,
    nominationId: event.target.nominationId.value,
    userId: userId,
  };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/picture/create",
        data,
        config
      );
      console.log(response.data);
      alert("Файл успешно загружен на сервер!");
    } catch (error) {
      console.log(error);
      alert("Ошибка при загрузке файла на сервер!");
    }
  };

  return (
    <div className="upload">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <input className="upl" type="file" onChange={handleFileInputChange} />
          </div>
          <div className="col-md-2">
            <select className="nomination" name="nominationId">
              <option className="nome" value={1}>
                Коллаж
              </option>
              <option className="nome" value={2}>
                Цифровая живопись
              </option>
              <option className="nome" value={3}>
                Оригинальная идея
              </option>
              <option className="nome" value={4}>
                Инфографика
              </option>
            </select>
            <button className="btn-submit-upl" type="submit">
              Отправить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;