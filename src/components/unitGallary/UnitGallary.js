import './style-unit.css';
import React, { useState, useEffect } from "react";
import ModalWindow from '../modal/ModalWindow';
import axios from 'axios';

const UnitGallary = () => {
  const [unitImages, setUnitImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/picture/findAll")
      .then((response) => {
        setUnitImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {unitImages.map((item) => {
        const imageSrc = `${item.base64}`;
        return (
          <div
            className="unitPic"
            data-bs-toggle="modal" 
            data-bs-target={`#id${item.id}`}
          >
            <img
              className="unitImg"
              src={imageSrc}
            />
            {item && (
              <ModalWindow
                img={imageSrc}
                idName ={`id${item.id}`}
                id = {item.id}
                ratingValue = {item.ratingValue}
                nomination = {item.nominationId}
                user = {item.userId}
                name = {item.name}
                statusId = {item.statusId}
                size = {item.size}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
export default UnitGallary;