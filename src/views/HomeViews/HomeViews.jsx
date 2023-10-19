import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import BeMember from "../../components/BeMember/BeMember";
import Banner1 from "../../components/banner1/Banner1";
import styles from "./HomeViews.module.css";
import Home from "../../components/Home/Home";
import logo from "../../assets/Image/Logo.png";
import Carousel from "react-bootstrap/Carousel";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { fetchProducts, setProducts } from "../../redux/products";
import axiosInstance from "../../utils/axiosInstance";
import Paginated from "../../components/Paginated/Paginated";
import TopSales from "../../components/TopSales/TopSales";


const HomeViews = () => {
  const { pathname } = useLocation();
  const [pageGender, setPageGender] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1); // Cambiado a una única variable de página

  const dispatch = useDispatch();

  const stocks = useSelector(({ products }) => {
    return products.products
})

const pages = useSelector(({ products }) => products.pages);

console.log(stocks);

useEffect (()=>{
  if (searchTerm === '') {
    dispatch(fetchProducts({ gender: "", page: page }));
  } else {
    dispatch(fetchProducts({ search: searchTerm, page: page }));
  }
}, [dispatch, pathname, page, searchTerm]);

const handleSearch = () => {
  setPage(1); 
};


const handlerChangePage = (newPage) => {
  setPage(newPage); 
};

const clearSearch = () => {
  setSearchTerm(''); // Limpia el término de búsqueda
  setPage(1); // Restablece la página a 1
};

  return (
    <>
      <div className={styles.carrusel}>
        <Carousel>
          <Carousel.Item>
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/fd756a55198943.597a8e48aa0b4.gif"
              alt=""
            />
            <Carousel.Caption>
              <img className={styles.logo} src={logo} alt="logo" width={70} />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://media.tenor.com/_1Q1UOlJ3_QAAAAd/adidas-shoe.gif"
              alt=""
            />
            <Carousel.Caption>
              <img className={styles.logo} src={logo} alt="logo" width={70} />
              <p>
                You can find the best brands and we will deliver them to your
                home.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://3dprint.com/wp-content/uploads/2021/04/4DFWD_360_BG_HIGHRES.gif"
              alt=""
            />
            <Carousel.Caption>
              <img className={styles.logo} src={logo} alt="logo" width={70} />
              <p>
                We have all the models you are looking for and prices to suit
                you.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>



      <div className={styles.tarjetas}>

        
      <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button onClick={handleSearch}>Search</button> */}
          {searchTerm && (
            <button onClick={clearSearch}>Clear Search</button>
          )}
      </div>
      
        <Cards products={stocks} />

        <Paginated
            currentPage={pages.currentPage}
            totalPages={pages.totalPages}
            onChangePage={handlerChangePage}
          />
      </div>



        <div className={styles.homer}>
          <TopSales />
        </div>

        <div>
          <Banner1 />
        </div>
        <BeMember />

        <Newsletter />
        <Footer />
    </>
  );
};

export default HomeViews;


  // // Función para buscar por modelo
  // const handleSearchByModel = (model) => {
  //   // Realiza la solicitud a la API para buscar por modelo
  //   axiosInstance
  //     .get(`/products?model=${model}`)
  //     .then((response) => {
  //       const data = response.data;
  //       // Actualiza el estado de los resultados de búsqueda por modelo
  //       dispatch(setProducts(data.products));
  //       console.log('hggg', + data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };