import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import styles from './Banner1.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/filters';

const Banner1 = ({ onSelectBrand }) => {
  const dispatch = useDispatch()
  const brands = useSelector(({ filters }) => filters.detail.brands)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  return (
    <div className={styles.slider}>
      <h1 className={styles.titulo}>The brands we work with</h1>
      <div className={styles.slideTrack}>
        {brands.map(({ image, brand }, index) => (
          <div className={styles.slide} style={{ cursor: 'pointer' }} key={index} onClick={() => onSelectBrand(brand)}>

            <img
              src={image?.src}
              alt={`Banner ${index + 1}`}
              className={styles.bannerImage}
            />
          </div>
        ))}
      </div>
    </div>
  );

};

Banner1.propTypes = {
  onSelectBrand: PropTypes.func
}

export default Banner1;