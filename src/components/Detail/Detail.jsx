/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import PropTypes from "prop-types";
import "./Detail.css";
import { addCartItemsById } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import TopSales from "../TopSales/TopSales";
import BeMember from "../../components/BeMember/BeMember";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../components/Footer/Footer";
import InfoUser from "../InfoUser/InfoUser";
import { fetchDetail } from "../../redux/products";
import { readCookieSession } from "../../services";
import { fetchColors, fetchSizes } from "../../redux/filters";
import { addFavorites, fetchFavorites, removeFavorites } from "../../redux/favorites";
import { NotLogin } from "../Alerts";
import { ICONS } from "../../const";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null)
  const [isStock, setIsColor] = useState({})
  const favorites = useSelector(({ favorites }) => favorites.favorites)
  const zapatilla = useSelector(({ products }) => products.detail)
  console.log("🚀 ~ file: Detail.jsx:32 ~ Detail ~ zapatilla:", zapatilla)
  const colors = useSelector(({ filters }) => filters.data.colors)
  const sizes = useSelector(({ filters }) => filters.data.sizes)
  const cookie = readCookieSession()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    dispatch(fetchColors())
    dispatch(fetchDetail(id))
    dispatch(fetchFavorites())

  }, [dispatch, id])


  useEffect(() => {
    dispatch(fetchSizes(zapatilla.gender))
  }, [dispatch, zapatilla])

  const handleSizeClick = (size) => {
    const currentSize = size
    if (currentSize !== selectedSize) {
      return setSelectedSize(currentSize)
    }
    return setSelectedSize(null)
  };

  const handleColorClick = (color) => {
    console.log("🚀 ~ file: Detail.jsx:69 ~ handleColorClick ~ color:", color)
    const currentColor = color
    if (currentColor !== selectedColor) {
      return setSelectedColor(color)
    }
    return setSelectedColor(null)
  }

  if (zapatilla === null || sizes === null) {
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
          image: zapatilla.image[0].src
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
      NotLogin()
    }
  }
  return (
    <>
      <div className="detail-container">
        <div className="product">
          <div className="imagenes">
            {/* Aquí puedes renderizar las imágenes de la zapatilla */}
            <div className="product-images">
              {/* Aquí puedes renderizar las imágenes de la zapatilla, excluyendo la primera */}
              {zapatilla?.image?.slice(1).map((image, index) => (
                <div className={`im${index + 1}`} key={index}>
                  <img
                    className={`img${index + 1}`}
                    src={image?.src}
                    alt={zapatilla?.model}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-main-image">
            <img src={zapatilla?.image?.[0].src} alt={zapatilla?.model} />
          </div>

          <div className="product-info">
            <div className="info">
              <h1 className="name">{zapatilla?.brand?.brand}</h1>
              <h2>{zapatilla?.model}</h2>
              <p className="type"> {zapatilla?.type}</p>
              <p className="price"> $ {zapatilla?.price}</p>
              <div className="SelectProps">
                <div className='SelectSize'>
                  <h2>Size (US)</h2>
                  <div className="size">
                    {sizes.map((size, index) => {
                      const isSizeAvailable = zapatilla?.stock?.some((shoe) => shoe.size == size);
                      return (
                        <a
                          key={index}
                          onClick={isSizeAvailable ? () => handleSizeClick(size) : null}
                          className={selectedSize === size ? "selected" : ""}
                          style={{ opacity: !isSizeAvailable ? 0.3 : 1, cursor: !isSizeAvailable ? 'not-allowed' : 'pointer' }}
                        >{size}</a>
                      )
                    })}
                  </div>
                </div>
                <div className='SelectColors'>
                  <h2>Color </h2>
                  <div className="Colors">
                    {colors.map(({ name, html }, index) => {
                      const isColorAvailable = zapatilla?.stock?.some(({ color }) => color.name === name);
                      return (
                        <a
                          key={index}
                          onClick={isColorAvailable ? () => handleColorClick(name) : null}
                          className={`${selectedColor === name ? "SelectedColor" : ""} `}
                          style={{ opacity: !isColorAvailable ? 0.3 : 1, cursor: !isColorAvailable ? 'not-allowed' : 'pointer' }}
                        >
                          <h3 title={name}>{ICONS.COLORS(html)}</h3>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="for">(**) For thin feet we recommend purchasing the lower size.</p>
            <div className="bo">
              <button className="boto" onClick={addToCartHandler}>
                ADD TO CART
              </button>

              <div style={{ cursor: 'pointer' }} onClick={handlerChangeFavorites}>
                <p className="heart">
                  {favorites.includes(id) ? <BsHeartFill fill={'red'} /> : <BsHeart fill={'white'} />}
                </p>
              </div>
            </div>
          </div>
        </div>
        <InfoUser />
        <TopSales />
        <BeMember />
        <Footer />
      </div >
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
