import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalAdminPic from './ModalAdminPic';

const AllPictures = () => {
    const token = localStorage.getItem('token');
    const [pic, setPic] = useState([]);
    const [picNomination, setPicNomination] = useState({});
    const [unitUser, setUnitUser] = useState({});
    const [userMap, setUserMap] = useState({});
    
    const getPic = async () => {
      try {
        const response = await axios.get('http://45.8.97.195:8080/api/picture/findAll', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPic(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const getNomination = async (id) => {
      try {
        const response = await axios.get(`http://45.8.97.195:8080/api/nomination/${id}`, {
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
  
    const getPicNomination = async (id) => {
      const name = await getNomination(id);
      return { id, nomination: name };
    };
    
    const getUser = async (id) => {
      try {
        const response = await axios.get(`http://45.8.97.195:8080/api/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return 'unknown';
      }
    };
  
    const getPicUser = async (id) => {
      const name = await getUser(id);
      return { id, firstName: name.firstName, secondName: name.secondName, fatherName: name.fatherName };
    };
    
    useEffect(() => {
      getPic();
    }, []);
    
    useEffect(() => {
      const promises = pic.map(async (user) => {
        const n = await getPicNomination(user.nominationId);
        return n;
      });
      Promise.all(promises)
        .then((nominations) => {
          const nominationMap = {};
          nominations.forEach((nom) => nominationMap[nom.id]= nom.nomination);
          setPicNomination(nominationMap);
        })
        .catch((error) => console.log(error));
    }, [pic]);
    
    useEffect(() => {
      const promises = pic.map(async (user) => {
        const u = await getPicUser(user.userId);
        return u;
      });
      Promise.all(promises)
        .then((users) => {
          const userMapData = {};
          users.forEach((us) => {
            userMapData[us.id] = {
              firstName: us.firstName,
              secondName: us.secondName,
              fatherName: us.fatherName,
            };
          });
          setUserMap(userMapData);
        })
        .catch((error) => console.log(error));
    }, [pic]);
    
    return (
      <main>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <h1 className="title-reg">Список всех картинок</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Пользователь</th>
                <th>Номинация</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pic.map((p) => {
                const user = userMap[p.userId];
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{user ? `${user.secondName} ${user.firstName} ${user.fatherName}` : 'unknown'}</td>
                    <td>{picNomination[p.nominationId]}</td>
                    <td>
                      <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#picInfo${p.id}`}>
                        Подробнее
                      </button>
                      <ModalAdminPic
                        id={p.id}
                        name={p.name}
                        size={p.size}
                        img={p.base64}
                        ratingValue={p.ratingValue}
                        userFirstName={user?.firstName}
                        userSecondName={user?.secondName}
                        userFatherName={user?.fatherName}
                        nomination={picNomination[p.nominationId]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
  );
};

export default AllPictures;