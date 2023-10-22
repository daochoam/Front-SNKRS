import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./TopSales.module.css";
import { Link, useLocation } from "react-router-dom";

import { NavLink } from 'react-router-dom';
import { fetchProducts } from "../../redux/products";

// import { URL_FINDHOTEL } from "../../const/const";


const TopSales = ({ onClickTopSales }) => {
  const { pathname } = useLocation();
  const [pageGender, setPageGender] = useState(1);

  const dispatch = useDispatch();

  const stocks = useSelector(({ products }) => {
    return products.products
  })

  console.log(stocks);

  useEffect(() => {
    dispatch(fetchProducts({ gender: "", page: pageGender }))
  }, [dispatch, pathname, pageGender])

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
          {stocks.map((d) => (
            <Link
              to={`/detail/${d._id}`}
              className={styles.containe}
              key={d._id}
              onClick={() => { onClickTopSales() }}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.cardContainer} key={d.id}>
                <div className={styles.cardPromo} key={d.id}>
                  <div className={styles.cardPromoImage}>
                    <img
                      src={d.image}
                      alt={d.name}
                    />
                  </div>
                  <div className={styles.cardPromoInfo}>
                    <div>
                      <h2>{d.model}</h2>
                      <p>{d.type}</p>
                    </div>
                    <div>
                      <h3>$ {d.price}</h3>
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
  onClickTopSales: PropTypes.func
}
export default TopSales;
