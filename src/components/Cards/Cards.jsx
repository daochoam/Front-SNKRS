import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/Image/Logo.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setResults } from "../../redux/resultsMen";
import {
  addFavorites,
  cleanFavorites,
  fetchFavorites,
  removeFavorites,
} from "../../redux/favorites";
import styles from "./Cards.module.css";
import { NotLogin } from "../Alerts";
import { readCookieSession } from "../../services";
import { ICONS } from "../../const";

const Cards = ({ products }) => {
  const cookie = readCookieSession();
  const dispatch = useDispatch();
  const favorites = useSelector(({ favorites }) => {
    return favorites.favorites;
  });

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleLikeClick = (event, zapa) => {
    event.preventDefault();
    if (cookie) {
      if (favorites?.includes(zapa._id)) {
        dispatch(removeFavorites(zapa._id));
      } else {
        dispatch(addFavorites(zapa._id));
      }
    } else {
      NotLogin();
    }
  };

  return (
    <>
      <div className={styles.product}>
        {products && products.length > 0 ? (
          <div className={styles.cards}>
            {products?.map((zapa) => (
              <Link
                to={`/detail/${zapa._id}`}
                className={styles.containe}
                key={zapa._id}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.card} key={zapa._id}>
                  <img src={zapa?.image} alt={zapa.model} />

                  <div className={styles.name}>
                    <h2>{zapa?.brand?.brand}</h2>
                    <div className={styles.price}>
                      <p>$ {zapa?.price}</p>
                      <div></div>
                    </div>
                  </div>

                  <div className={styles.type}>
                    <span className={styles.letra}>{zapa?.model}</span>

                    <p>{zapa.type}</p>
                    <br />
                  </div>
                  <div className={styles.Data}>
                    <Link className={styles.start}>
                      <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                      <FaStarHalfAlt />
                    </Link>
                    <div className={styles.ColorsCard}>
                      {[
                        ...new Set(
                          zapa?.stock?.map(({ color }) => JSON.stringify(color))
                        ),
                      ]
                        ?.map((item) => JSON.parse(item))
                        ?.map(({ name, html }, index) => {
                          return (
                            // <div key={index} title={name} className={styles.Colors}>
                            <h5 key={index} title={name}>
                              {ICONS.COLORS(html)}
                            </h5>
                          );
                        })}
                    </div>

                    <img src={logo} alt="logo" width={70} />
                  </div>

                  <button
                    className={`${styles.likeButton}`}
                    onClick={(event) => {
                      handleLikeClick(event, zapa);
                    }}
                  >
                    <span role="img" aria-label="Corazón">
                      {favorites?.includes(zapa._id) ? "❤️" : "🤍"}
                    </span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.outStock}>
            <h3>Out of Stock</h3>
            <h2>perform another search</h2>
            <h4>-SNKRS-</h4>
          </div>
        )}
      </div>
    </>
  );

};

Cards.propTypes = {
  products: PropTypes.array,
};

export default Cards;
