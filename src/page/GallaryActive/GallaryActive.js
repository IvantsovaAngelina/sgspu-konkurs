import React, { useState, useEffect } from "react";
import ModalWindow from '../../components/modal/ModalWindow';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './style-gallaryActive.css'

const GallaryActive = () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const [pic, setPic] = useState([]);
    const [picNomination, setPicNomination] = useState({});
    const [userOrganization, setUserOrganization] = useState({});
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
  
    const getPicNomination = async (id) => {
        const name = await getNomination(id);
        return { id, nomination: name };
    };

    const getPicUser = async (id) => {
        const user = await getUser(id);
        const organization = await getOrganization(user.organizationId);
        return { id, firstName: user.firstName, secondName: user.secondName, fatherName: user.fatherName, organizationId: user.organizationId, organizationName: organization };
      };

      const getUserOrganization = async (id) => {
        const organization = await getOrganization(id);
        return { id, description: organization };
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
                organizationId: us.organizationId,
                organizationName: us.organizationName
              };
            });
            setUserMap(userMapData);
          })
        .catch((error) => console.log(error));
      }, [pic]);

      useEffect(() => {
        const promises = Object.values(userMap).map(async (user) => {
          const o = await getUserOrganization(user.organizationId);
          return o;
        });
        Promise.all(promises)
        .then((organizations) => {
            const organizationMapData = {};
            organizations.forEach((org) => {
              organizationMapData[org.id] = {
                description: org.description
              };
            });
            setUserOrganization(organizationMapData);
          })
        .catch((error) => console.log(error));
      }, [userMap]);

    return ( 
      <main className='gallMain'>
        <div className='container'>
            <div className="row justify-content-center">
                <h3>ГАЛЕРЕЯ</h3>
            </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='gallActive'>
              {pic.map((p) => {
                const user = userMap[p.userId];
                const imageSrc = `${p.base64}`;
                return (
                    <div className='unitPic' data-bs-toggle='modal' data-bs-target={`#picInfo${p.id}`}>
                    <img className='unitImg' src={imageSrc} />
                    {p && (
                        <ModalWindow 
                        img={imageSrc} 
                        idName={p.id} 
                        idUser={p.userId} 
                        ratingValuePic={p.ratingValue} 
                        nomination={picNomination[p.nominationId]} 
                        nominationId = {p.nominationId}
                        userLastName={user?.secondName} 
                        userName={user?.firstName} 
                        userFatherName={user?.fatherName} 
                        userOrganization={user?.organizationName} 
                        name={p.name} 
                        statusId={p.statusId} 
                        size={p.size} 
                        />
                    )}  
                    </div>  
                );  
                })}
            </div> 
          </div> 
        </div> 
      </div> 
    </main> 
  );
};

export default GallaryActive;