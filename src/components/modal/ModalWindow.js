import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import './style-modal.css'

const ModalWindow = (props) => {
    const { img, idName, idUser, nomination, nominationId,userName, userLastName,userFatherName, userOrganization,name,statusId, size} = props;
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [ratingValue, setRatingValue] = useState(props.ratingValuePic);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);


    const getRole = async () => {
       axios.post("http://45.8.97.195:8080/api/user/find", { email: decoded.sub }, {
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
          id: idName,
          name: name,
          size: size,
          base64:img,
          ratingValue: newRating,
          userId: idUser,
          statusId: statusId,
          nominationId:nominationId
        }
        axios.post('http://45.8.97.195:8080/api/picture/update', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '',
          }
        })
        .then((response) => {
          alert(`Оценка для ${props.idName} обновлена`);
        }, (error) => {
          alert(error);
        });
      }
    
    const deletePic = () => {
        axios.delete(`http://45.8.97.195:8080/api/picture/${idName}`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Origin': '',
              'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': '',
            }})
        .then((response) => {
          alert(`Картинка ${props.id} удалена`);
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
            <div className="modal fade" id={`picInfo${idName}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{nomination}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <img className='unitImgModal' src={img} alt="Preview" id={idName}/>
                <p className="FIO">{`${userLastName} ${userName} ${userFatherName}`}</p>
                <p>{userOrganization}</p>
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