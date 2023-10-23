import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./TopSales.module.css";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts } from "../../redux/products";

const TopSales = ({ topSales, onClickTopSales }) => {

  const settings = {
    dots: true, // Muestra los indicadores (puntitos)
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Cantidad de tarjetas visibles a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TOP SALES</h1>

      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {topSales && topSales?.map((product) => (
            <Link
              to={`/detail/${product._id}`}
              className={styles.containe}
              key={product._id}
              onClick={() => { onClickTopSales() }}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.cardContainer} key={product._id}>
                <div className={styles.cardPromo} key={product._id}>
                  <div className={styles.cardPromoImage}>
                    <img
                      src={product?.image}
                      alt={product?.name}
                    />
                  </div>
                  <div className={styles.cardPromoInfo}>
                    <div>
                      <h2>{product?.model}</h2>
                      <p>{product?.type}</p>
                    </div>
                    <div>
                      <h3>$ {product?.price}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          ))}
        </Slider>
      </div>
    </div>
  );
};


TopSales.propTypes = {
  onClickTopSales: PropTypes.func,
  topSales: PropTypes.array
}
export default TopSales;
