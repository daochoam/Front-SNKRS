import React, { useEffect, useState } from "react";
import logo from "../../assets/Image/Logo.png";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../../redux/resultsMen"; // Asegúrate de importar la acción correcta
import { InputSelect, InputText } from "../Inputs";
import styles from "./FilterHorizontalUser.module.css";
import { fetchProducts, setProducts } from "../../redux/products";
import { useLocation } from "react-router-dom";
import { GENDER } from "../../const";
import axiosInstance from "../../utils/axiosInstance";
import { fetchCountry } from "../../redux/country";
import { setUser } from "../../redux/user";

const initFilters = {
  firstName: "",
  email: "",
  status: "",
  country: "",
};

// eslint-disable-next-line react/prop-types
const FilterHorizontalUser = ({ onChangeFilter }) => {
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const [pageGender, setPageGender] = useState(1);

  const pages = useSelector(({ products }) => products.pages);

  const [selectedOptions, setSelectedOptions] = useState(
    // selectData.reduce((acc, data) => ({ ...acc, [data.stateKey]: "" }), {})
    initFilters
  );

  const clearFilters = () => {
    setSelectedOptions(initFilters);
    setSearchTerm("");
    onChangeFilter("")
  };
  ////////////////////////////////////////////SELECTS
  const genders = GENDER;
  const [infoProduct, setInfoProduct] = useState(initFilters);

  const country = useSelector(({ country }) => {
    return country.country;
  });

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    const updatedOptions = { ...selectedOptions, [key]: value };
    setSelectedOptions(updatedOptions);
    onChangeFilter(updatedOptions); // Llama a onChangeFilter con las opciones actualizadas
  };


  return (
    <div className={styles.filter}>
      <div className={styles.DataInputsProducts}>
        <span className={styles.KeyData}>ORDER NAME</span>
        <select
          name="firstName"
          className={styles.data}
          value={selectedOptions.firstName}
          onChange={(e) => handleFilterChange("firstName", e.target.value)}
        >
          <option value="">Select option</option>
          <option value="1">Ascendent Name</option>
          <option value="-1">Descendent Name</option>
        </select>
      </div>

      <div className={styles.DataInputsProducts}>
        <span className={styles.KeyData}>ORDER EMAIL</span>
        <select
          name="email"
          className={styles.data}
          value={selectedOptions.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
        >
          <option value="">Select option</option>
          <option value="1">Ascendent Email</option>
          <option value="-1">Descendent Email</option>
        </select>
      </div>

      <div className={styles.DataInputsProducts}>
        <span className={styles.KeyData}>ORDER COUNTRY</span>
        <select
          name="country"
          className={styles.data}

          value={selectedOptions.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
        >
          <option value="">Select option</option>
          {country.map((type, index) => (
            <option key={index} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.DataInputsProducts}>
        <span className={styles.KeyData}>ORDER STATUS</span>
        <select
          name="status"
          className={styles.data}
          value={selectedOptions.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>

      </div>
      
      <div className={styles.searchBar}>
        <button onClick={clearFilters}>Clear</button>
      </div>

      {/* <div className={styles.searchBar}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div> */}
    </div>
  );
};

export default FilterHorizontalUser;
