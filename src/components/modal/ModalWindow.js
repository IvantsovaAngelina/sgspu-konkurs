import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import './style-modal.css'

const ModalWindow = (props) => {
    const {img, user, nomination, idName, id, statusId, name, size} = props;
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [ratingValue, setRatingValue] = useState(props.ratingValue);
    const [userRole, setUserRole] = useState(null);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        secondName: '',
        fatherName: '',
        organization:''
    });
    const [userOrganization, setUserOrganization] = useState({
        organization: ''
    });
    const [userNomination, setUserNomination] = useState({
        nomin: ''
    });

    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    const getDataUser = () => {
        axios.get(`http://127.0.0.1:8080/api/user/${user}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '',
            }
        }).then((response) => {
            setUserInfo({
                firstName: response.data.firstName,
                secondName: response.data.secondName,
                fatherName: response.data.fatherName,
                organization: response.data.organizationId
            })
          })
          .catch((error) => {
            console.log(error);
          })
          
    }
    getDataUser()

    const getOrgatization = () => {
        axios.get(`http://127.0.0.1:8080/api/organization/${userInfo.organization}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '',
            }
        }).then((response) => {
            setUserOrganization({
                organization: response.data.description
            })
          })
          .catch((error) => {
            console.log(error);
          })
          
    }
    getOrgatization()

    const getNomination = () => {
        axios.get(`http://127.0.0.1:8080/api/nomination/${nomination}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '',
            }
        }).then((response) => {
            setUserNomination({
                nomin: response.data.name
            })
          })
          .catch((error) => {
            console.log(error);
          })
          
    }
    getNomination()
    
    const getRole = () => {
        axios
      .post("http://127.0.0.1:8080/api/user/find", { email: decoded.sub }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
        }
    })
      .then((response) => {
        setUserRole(response.data[0].roleId)
      })
      .catch((error) => {
        console.log(error);
      });
    }

    useEffect(() => {
        getRole();
      }, []);

      const plusLikes = () => {
        if (!liked) {
          const newRating = ratingValue + 1;
          setRatingValue(newRating);
          setLiked(true);
          if (disliked) {
            setDisliked(false);
            updateUserRating(newRating);
          } else {
            updateUserRating(newRating);
          }
        }
      }
      
      const minusLikes = () => {
        if (!disliked && ratingValue > 0) {
          const newRating = ratingValue - 1;
          setRatingValue(newRating);
          setDisliked(true);
          if (liked) {
            setLiked(false);
            updateUserRating(newRating);
          } else {
            updateUserRating(newRating);
          }
        }
      }

      const updateUserRating = (newRating) => {
        const data = {
          id: id,
          name: name ,
          size: size,
          base64:img,
          ratingValue: newRating,
          userId: user,
          statusId: statusId,
          nominationId:nomination
        }
        axios.post('http://127.0.0.1:8080/api/picture/update', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
          }
        })
        .then((response) => {
          console.log(`Успех для ${props.id}`);
        }, (error) => {
          console.log(error);
        });
      }
    
    const deletePic = () => {
        axios.delete(`http://127.0.0.1:8080/api/picture/${id}`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Origin': '',
              'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': '',
            }})
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    let deleteButton;
    if(userRole === 1){
        deleteButton = <button type="button" className="btn btn-danger" onClick={deletePic}>Удалить</button>
    } else {
        deleteButton = null;
    }

    let likesButton;
    if((userRole === 3) || (userRole === 1)){
        likesButton = <button type="button" className="btn btn-primary" onClick={plusLikes}>Нравится</button>
    } else {
        likesButton = null;
    }

    let unLikeButton;
    if((userRole === 3) || (userRole === 1)){
        unLikeButton = <button type="button" className="btn btn-secondary" onClick={minusLikes}>Не нравится</button>
    } else {
        unLikeButton = null;
    }
    return(
        <>
            <div className="modal fade" id={idName} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{userNomination.nomin}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <img className='unitImgModal' src={img} alt="Preview" id={id}/>
                <p className="FIO">{`${userInfo.secondName} ${userInfo.firstName} ${userInfo.fatherName}`}</p>
                <p>{userOrganization.organization}</p>
                </div>
                <div className="modal-footer">
                <p className='ratingValue'>{ratingValue}</p>
                {likesButton}
                {unLikeButton}
                {deleteButton}
                </div>
            </div>
            </div>
            </div>
        </>
    )

 }
export default ModalWindow;