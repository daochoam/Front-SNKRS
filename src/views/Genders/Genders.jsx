import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import Banner from "../../components/banner/banner";
import Footer from "../../components/Footer/Footer";
import BeMember from "../../components/BeMember/BeMember";
import { Link, useLocation } from "react-router-dom";
import zapa from "../../assets/Image/zapatillas.png";

import styles from "./Genders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products";
import Paginated from "../../components/Paginated/Paginated";
import Filter from "../../components/Filter/Filter";

const Genders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageGender, setPageGender] = useState(1);
  const [filter, setFilter] = useState();
  const products = useSelector(({ products }) => {
    return products.products;
  });
  const pages = useSelector(({ products }) => products.pages);

  useEffect(() => {
    setFilter("");
  }, [pathname]);

  useEffect (()=>{
    if (searchTerm === '') {
      dispatch(fetchProducts({gender: pathname.slice(1), page: pageGender, ...filter  }));
    } else {
      dispatch(fetchProducts({ gender: pathname.slice(1), page: pageGender, ...filter, search: searchTerm}));
    }
  }, [dispatch, pathname, pageGender, filter, searchTerm]);

  const handlerChangePage = (page) => {
    setPageGender(page);
  };

  const handleFilter = (data) => {
    setFilter(data);
    console.log("es data", data);
  };

  const clearSearch = () => {
    setSearchTerm(''); // Limpia el término de búsqueda
    setPageGender(1); // Restablece la página a 1
  };

  return (
    <div className={styles.containerList}>
      <Banner />

      <div className={styles.homediv}>
        <div className={styles.filter}>
          <Filter onChangeFilter={handleFilter} path={pathname} />
        </div>
        <div className={styles.zapatilla}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search all products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button onClick={handleSearch}>Search</button> */}
          {searchTerm && (
            <button onClick={clearSearch}>Clear Search</button>
          )}
      </div>
          <Cards products={products} />
          <Paginated
            currentPage={pages.currentPage}
            totalPages={pages.totalPages}
            onChangePage={handlerChangePage}
          />
        </div>
      </div>
      <BeMember />
      <Footer />
    </div>
  );
};
export default Genders;
