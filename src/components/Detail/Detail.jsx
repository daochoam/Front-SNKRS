/** @format */

// Detail.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import PropTypes from "prop-types";
import "./Detail.css";
import { addCartItemsById } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import TopSales from "../TopSales/TopSales";
import BeMember from "../../components/BeMember/BeMember";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../components/Footer/Footer";
import InfoUser from "../InfoUser/InfoUser";
import { fetchDetail } from "../../redux/products";
import { readCookieSession } from "../../services";
import { fetchColors, fetchSizes } from "../../redux/filters";
import {
  addFavorites,
  fetchFavorites,
  removeFavorites,
} from "../../redux/favorites";
import { NotLogin } from "../Alerts";
import { ICONS } from "../../const";
import axiosInstance from "../../utils/axiosInstance";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isStock, setIsColor] = useState({});
  const favorites = useSelector(({ favorites }) => favorites.favorites);
  const zapatilla = useSelector(({ products }) => products.detail);
  const topSales = useSelector(({ products }) => products.sales)
  const colors = useSelector(({ filters }) => filters.data.colors);
  const sizes = useSelector(({ filters }) => filters.data.sizes);
  const cookie = readCookieSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [images, setImages] = useState(zapatilla?.image || []);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleClickImage = (index) => {
    if (index === selectedImage) return; // No hagas nada si se hace clic en la imagen seleccionada.

    const clickedImage = images[index];
    const currentImage = images[selectedImage];

    const updatedImages = [...images];
    updatedImages[selectedImage] = clickedImage;
    updatedImages[index] = currentImage;

    setImages(updatedImages);
    setSelectedImage(index);
  };

  const slideTrackRef = useRef(null);
  const [reviewsInfo, setReviewsInfo] = useState([]);
  const [error, setError] = useState(null);
  console.log(reviewsInfo);

  const scrollLeft = () => {
    slideTrackRef.current.scrollLeft -= 200; // Ajusta la cantidad de desplazamiento según tu diseño
  };

  const scrollRight = () => {
    slideTrackRef.current.scrollLeft += 200; // Ajusta la cantidad de desplazamiento según tu diseño
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchDetail(id));
    dispatch(fetchFavorites());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchSizes(zapatilla.gender));
  }, [dispatch, zapatilla]);

  const handleSizeClick = (size) => {
    const currentSize = size;
    if (currentSize !== selectedSize) {
      return setSelectedSize(currentSize);
    }
    return setSelectedSize(null);
  };

  const handleColorClick = (color) => {
    const currentColor = color;
    if (currentColor !== selectedColor) {
      return setSelectedColor(color);
    }
    return setSelectedColor(null);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review?product=${id}`);
        setReviewsInfo(response);
        console.log(response);
      } catch (error) {
        setError("Error al obtener las reseñas: " + error.message);
      }
    };

    fetchReviews();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  // Si la zapatilla no se encuentra, puedes mostrar un mensaje de carga o error.
  if (zapatilla === null) {
    return <div>Cargando...</div>;
  }
  const addToCartHandler = () => {
    if (selectedSize === null || selectedColor === null) {
      if (selectedSize === null) {
        Swal.fire({
          icon: "warning",
          title: "Select one size",
          showConfirmButton: true,
          confirmButtonColor: "black",
        });
      }
      if (selectedColor === null) {
        Swal.fire({
          icon: "warning",
          title: "Select one color",
          showConfirmButton: true,
          confirmButtonColor: "black",
        });
      }
    } else {
      const isStock = zapatilla.stock.find(({ color, size }) => {
        return color.name == selectedColor && size == selectedSize;
      });

      if (!isStock) {
        Swal.fire({
          icon: "warning",
          title: "There is no product in stock",
          showConfirmButton: true,
          confirmButtonColor: "black",
        });
      } else {
        const shoeToAdd = {
          _id: zapatilla._id,
          price: zapatilla.price,
          color: isStock.color,
          size: isStock.size,
          gender: zapatilla.gender,
          image: zapatilla.image[0].src,
        };
        console.log("MY SHOE", shoeToAdd);
        dispatch(addCartItemsById(shoeToAdd));
      }
    }
  };

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

  const handlerChangeFavorites = (event) => {
    event.preventDefault();
    if (cookie) {
      if (favorites?.includes(id)) {
        dispatch(removeFavorites(id));
      } else {
        dispatch(addFavorites(id));
      }
    } else {
      NotLogin();
    }
  };

  return (
    <>
      <div className="detail-container">
        <div className="product">
          <div className="imagenes">
            <div className="product-images">
              {zapatilla?.image?.slice(0).map((image, index) => (
                <div
                  className={`im${index + 0}`}
                  key={index}
                  onClick={() => handleClickImage(index + 0)}
                >
                  <img
                    className={`img${index + 0}`}
                    src={image?.src}
                    alt={zapatilla?.model}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-main-image">
            <img
              className="im4"
              src={zapatilla?.image?.[selectedImage].src}
              alt={zapatilla?.model}
            />
          </div>

          <div className="product-info">
            <div className="info">
              <dir className="zapas">
                <h1 className="name">{zapatilla?.brand?.brand}</h1>
                <div>
                  
                <p className="comment">
                  <button className="show-table-button">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                    <FaStarHalfAlt />{" "}
                  </button>{" "}
                  {reviewsInfo?.averageRating}
                </p>
                </div>
              </dir>
              <h2>{zapatilla?.model}</h2>
              <h2 className="show-table-button">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />{" "}
              </h2>{" "}



              <p className="type"> {zapatilla?.type}</p>
              <p className="price"> $ {zapatilla?.price}</p>
              <div className="SelectProps">
                <div className="SelectSize">
                  <h2>Size (US)</h2>
                  <div className="size">
                    {sizes.map((size, index) => {
                      const isSizeAvailable = zapatilla?.stock?.some(
                        (shoe) => shoe.size == size
                      );
                      return (
                        <a
                          key={index}
                          onClick={
                            isSizeAvailable ? () => handleSizeClick(size) : null
                          }
                          className={selectedSize === size ? "selected" : ""}
                          style={{
                            opacity: !isSizeAvailable ? 0.3 : 1,
                            cursor: !isSizeAvailable
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          {size}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="SelectColors">
                  <h2>Color </h2>
                  <div className="Colors">
                    {colors.map(({ name, html }, index) => {
                      const isColorAvailable = zapatilla?.stock?.some(
                        ({ color }) => color.name === name
                      );
                      return (
                        <a
                          key={index}
                          onClick={
                            isColorAvailable
                              ? () => handleColorClick(name)
                              : null
                          }
                          className={`${selectedColor === name ? "SelectedColor" : ""
                            } `}
                          style={{
                            opacity: !isColorAvailable ? 0.3 : 1,
                            cursor: !isColorAvailable
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <h3 title={name}>{ICONS.COLORS(html)}</h3>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="for">
              (**) For thin feet we recommend purchasing the lower size.
            </p>
            <div className="bo">
              <button className="boto" onClick={addToCartHandler}>
                ADD TO CART
              </button>

              <div
                style={{ cursor: "pointer" }}
                onClick={handlerChangeFavorites}
              >
                <p className="heart">
                  {favorites.includes(id) ? (
                    <BsHeartFill fill={"red"} />
                  ) : (
                    <BsHeart fill={"white"} />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="slidi">
          <h1>Customers Reviews</h1>

          <button className={"sliderArro leftArrow"} onClick={scrollLeft}>
            <MdKeyboardArrowLeft />
          </button>

          <div className="slidi">
            <div className="slideTrack">
              {Array.isArray(reviewsInfo?.reviews) &&
                reviewsInfo?.reviews?.length > 0 ? (
                reviewsInfo?.reviews?.map((review) => (
                  <div key={review._id} className="slid">
                    <img
                      src={review.User_id.image}
                      alt={review.User_id.firstName}
                      className="baI"
                    />
                    <div className="comment">
                      <h3> {review.User_id.firstName}</h3>
                      <p className="stars">
                        {[...Array(5)].map((_, index) => (
                          <IoMdStar
                            key={index}
                            className={
                              index < review.rating
                                ? "star-filled"
                                : "star-outline"
                            }
                          />
                        ))}
                      </p>
                      <textarea value={review?.opinion} className="comment-message" disabled />
                    </div>
                  </div>
                ))
              ) : (
                <p className="comment">No hay reseñas disponibles.</p>
              )}
            </div>
          </div>

          <button className={"sliderArro rightArrow"} onClick={scrollRight}>
            <MdKeyboardArrowRight />
          </button>
        </div>

        <TopSales topSales={topSales} onClickTopSales={scrollToTop} />
        <BeMember />
        <Footer />
      </div>
    </>
  );
};

Detail.propTypes = {
  zapatilla: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    brand: PropTypes.object.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({ src: PropTypes.string.isRequired })
    ),
    model: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.array,
  }),
};

export default Detail;
