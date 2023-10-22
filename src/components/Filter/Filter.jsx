import React, { useEffect, useState } from "react";
import logo from "../../assets/Image/Logo.png";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../../redux/resultsMen"; // Asegúrate de importar la acción correcta
import { InputSelect, InputText } from "../Inputs";
import styles from "./Filter.module.css";
import { fetchProducts, setProducts } from "../../redux/products";
import { useLocation } from "react-router-dom";
import {
  fetchBrands,
  fetchTypes,
  fetchSizes,
  fetchColors
} from "../../redux/filters";
import { GENDER } from "../../const";

const initFilters = {
  sortPrice: "",
  brand: "",
  type: "",
  size: "",
  color: "",
};

// eslint-disable-next-line react/prop-types
const Filter = ({ path, onChangeFilter }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [pageGender, setPageGender] = useState(1);
  const products = useSelector(({ products }) => {
    return products.products;
  });

  useEffect(() => {
    setSelectedOptions(initFilters);
  }, [path]);

  const pages = useSelector(({ products }) => products.pages);


  const [selectedOptions, setSelectedOptions] = useState(
    // selectData.reduce((acc, data) => ({ ...acc, [data.stateKey]: "" }), {})
    initFilters
  );


  const clearFilters = () => {
    setSelectedOptions(initFilters);
    onChangeFilter("")
  };


  ////////////////////////////////////////////SELECTS
  const genders = GENDER;
  const [infoProduct, setInfoProduct] = useState(initFilters);
  const brands = useSelector(({ filters }) => filters.data.brands);
  const types = useSelector(({ filters }) => filters.data.types);
  const sizes = useSelector(({ filters }) => filters.data.sizes);
  const colors = useSelector(({ filters }) => filters.data.colors)

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchTypes("shoes"));
    dispatch(fetchSizes(pathname.slice(1)));
    dispatch(fetchColors());
  }, [dispatch, pathname]);


  const handleFilterChange = (key, value) => {
    const updatedOptions = { ...selectedOptions, [key]: value };
    setSelectedOptions(updatedOptions);
    onChangeFilter(updatedOptions); // Llama a onChangeFilter con las opciones actualizadas
    console.log(updatedOptions);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <h3>FILTER:</h3>
      </div>
      <div className={styles.filter1}>
        <div className={styles.DataInputsProducts}>
          <span className={styles.KeyData}>SORT</span>
          <select
            name="sortPrice"
            className={styles.data}

            value={selectedOptions.sortPrice}
            onChange={(e) => handleFilterChange('sortPrice', e.target.value)}
          >
            <option value="">--Select option--</option>
            <option value="descending">Descendent Price</option>
            <option value="ascending">Ascendent Price</option>
          </select>
        </div>
        <div className={styles.DataInputsProducts}>
          <span className={styles.KeyData}>BRAND</span>
          <select
            name="brand"
            className={styles.data}

            value={selectedOptions.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">--Select brand--</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.DataInputsProducts}>
          <span className={styles.KeyData}>TYPE</span>
          <select
            name="type"
            className={styles.data}

            value={selectedOptions.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">--Select type--</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.DataInputsProducts}>
          <span className={styles.KeyData}>SIZE</span>
          <select
            name="size"
            className={styles.data}

            value={selectedOptions.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
          >
            <option value="">--Select size--</option>
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.DataInputsProducts}>
          <span className={styles.KeyData}>COLOR</span>
          <select
            name="color"
            className={styles.data}

            value={selectedOptions.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
          >
            <option value="">--Select color--</option>
            {colors.map((color, index) => (
              <option key={index} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
              <div className={styles.searchBar}>
        <button onClick={clearFilters}>Clear</button>
      </div>
      </div>
    </div>
  );
};

export default Filter;




// const handleSelectChange = (event, stateKey) => {
//   const queryParams = {};
//   const { value } = event.target;
//   // JSON.stringify(color)

//   const currentSelect = {
//     ...selectedOptions,
//     [stateKey]: value,
//   };

//   setSelectedOptions(currentSelect);

//   console.log("selected", selectedOptions);

//   Object.keys(currentSelect).forEach((key) => {
//     const value = currentSelect[key];
//     if (value) {
//       queryParams[key] = value;
//     }
//   });

//   onChangeFilter(queryParams);
// };