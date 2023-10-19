import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import bannerData from '../../assets/Info.json';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import {IoMdStar, IoMdStarOutline } from 'react-icons/io';

import styles from './InfoUser.module.css';

const InfoUser = () => {
  const slideTrackRef = useRef(null);

  const reviews = useSelector((state) => state.reviews.reviews);


  const scrollLeft = () => {
    slideTrackRef.current.scrollLeft -= 200; // Ajusta la cantidad de desplazamiento según tu diseño
  };

  const scrollRight = () => {
    slideTrackRef.current.scrollLeft += 200; // Ajusta la cantidad de desplazamiento según tu diseño
  };

  return (
    <div className={styles.slider}>
      <h1>Customers Reviews</h1>
     
      <button className={`${styles.sliderArrow} ${styles.leftArrow}`} onClick={scrollLeft}>
        <MdKeyboardArrowLeft/>
      </button>

      <div className={styles.slideTrack} ref={slideTrackRef} key={bannerData.id}>
        {bannerData.comentarios.map((infoItem) => (
          <div className={styles.slide} key={infoItem.id}>
            <div className={styles.colorCircle}></div>
            <img
              src={infoItem.img}
              alt={`Banner ${infoItem.id}`}
              className={styles.bannerImage}
            />
            <div className={styles.comment}>
              <h3>{infoItem.usuario}</h3>
              <div className={styles.stars}>{infoItem.calificacion}</div>
              <p>{infoItem.comentario}</p>
            </div>
          </div>
        ))}
        
      </div>
      <button className={`${styles.sliderArrow} ${styles.rightArrow}`} onClick={scrollRight}>
        <MdKeyboardArrowRight/>
      </button>
    </div>
  );
};

export default InfoUser;


