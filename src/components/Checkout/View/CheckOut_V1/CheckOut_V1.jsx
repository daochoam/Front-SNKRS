import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import styles from "./CheckOut_V1.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-e2f3a313-4a9d-4110-bd77-ad6c50675664");
import Bag from "./Bag";
import { Link } from "react-router-dom";
import { fetchCity, fetchCountry, fetchState } from "../../../../redux/country";
import { InputSelect } from "../../../Inputs";
import { getCartItems } from "../../../../redux/cartSlice";
import Footer from "../../../Footer/Footer";
// eslint-disable-next-line react/prop-types
const CheckOut_V1 = () => {
  const country = useSelector(({ country }) => {
    return country.country;
  });
  const state = useSelector(({ country }) => {
    return country.state;
  });
  const city = useSelector(({ country }) => {
    return country.city;
  });
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const cartItems = useSelector(({ cart }) => {
    return cart.cartItems;
  });
  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isFormValid = useRef({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });
  console.log("formData", formData);

  const [formErrors, setFormErrors] = useState({
    firstName: "error",
    lastName: "error",
    email: "error",
    phone: "error",
  });

  //? get Countries
  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  //? get States
  useEffect(() => {
    if (formData.country) {
      dispatch(fetchState(formData.country));
    }
  }, [dispatch, formData.country]);

  //? get Cities
  useEffect(() => {
    if (formData.country && formData.state) {
      dispatch(fetchCity(formData.country, formData.state));
    }
  }, [dispatch, formData.country, formData.state]);

  const updateFormValidity = (updateValue) => {
    const {
      name,
      data: { error, value },
    } = updateValue;
    console.log(name, error, value);
    const isValid = Boolean(!error) && Boolean(value);
    isFormValid.current = {
      ...isFormValid.current,
      [name]: isValid,
    };
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstName":
        return !value.trim().length ? "The name is required." : "";
      case "lastName":
        return !value.trim().length ? "The Last name is required." : "";
      case "email":
        return !value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
          ? "enter a valid email."
          : "";
      case "phone":
        return !value.match(/^\d{10}$/)
          ? "Enter a valid phone number (10 digits)."
          : "";
      default:
        return "";
    }
  };

  const makePostRequest = async () => {
    try {
      const postData = {
        purchase: cartItems,
        shipping: {
          fist_name: formData.firstName,
          last_name: formData.lastName,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
        },
      };
      console.log(postData);
      const response = await axiosInstance.post("/shopping", postData);
      setToken(response.id);
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  useEffect(() => {
    if (token !== "") {
      console.log("Valor de token:", token);
    }
  }, [token]);
  if (
    Object.keys(formData).length === 8 &&
    Object.values(formErrors).every((e) => e === "") &&
    token === ""
  ) {
    makePostRequest();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
    updateFormValidity({
      name,
      data: {
        value,
        error,
      },
    });
  };
  const handlerInputChange = (field, value) => {
    const currentValue = { ...formData, [field]: value };
    setFormData(currentValue);
  };
  console.log("Valor de token:", token);
  return (
    <div className={styles.checkout}>
      <div className={styles.leftPanel}>
        <div className={styles.infoCheckout}>
          <h1 className={styles.title}>Checkout</h1>
          <h2 className={styles.h2}>Delivery</h2>
          <div className={styles.formContainer}>
            <form>
              {/* <div className={styles.box}>
                <input type="checkbox" id="autocomplete" name="autocomplete" />
                <label className={styles.label} htmlFor="autocomplete">
                  Autocomplete information?
                </label>
              </div> */}
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <label className={styles.label}> First Name: </label>
                  <input
                    placeholder="First Name"
                    className={`${styles.input} ${formErrors.firstName && styles.errorInput
                      }`}
                    type="text"
                    id="firstNameInput"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {formErrors.firstName && (
                    <div className={styles.errorText}>{formErrors.firstName}</div>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.label}> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    className={`${styles.input} ${formErrors.lastName && styles.errorInput
                      }`}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastName && (
                    <div className={styles.errorText}>{formErrors.lastName}</div>
                  )}
                </div>
                {Object.keys(formData).map((key, index) => {
                  return (
                    <div key={index}>
                      {["country", "state", "city"].includes(key) && (
                        <div className={styles.WrapperCountry}>
                          <label className={styles.label}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                          </label>
                          <div className={styles.InputSelect}>
                            <InputSelect
                              options={
                                key === "country"
                                  ? country
                                  : key === "state"
                                    ? state
                                    : city
                              }
                              initInput={formData[key]}
                              onChangeSelect={(input) =>
                                handlerInputChange(key, input)
                              }

                              style={{
                                flexDirection: "row",
                                alignItems: "flex-start",
                                select: {
                                  backgroundColor: "#101010",
                                  color: "white",
                                  fontFamily: "MontLight",
                                  borderColor: "white",
                                  border: "2px solid white",
                                },
                                DateFile: {
                                  justifyContent: "flex-end",
                                  background: "black",
                                  alignItems: 'start',
                                },
                                input: {
                                  width: '100%',
                                  background: "rgb(217, 217, 217)",
                                },
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <label className={styles.label}>Address: </label>
                <input
                  placeholder="Hollywood Boulevard"
                  className={styles.input}
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className={styles.inputWrapper}>
                  <label className={styles.label}> Email: </label>
                  <input
                    placeholder="mail@mail.com"
                    className={`${styles.input} ${formErrors.email && styles.errorInput
                      }`}
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <div className={styles.errorText}>{formErrors.email}</div>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.label}> Phone: </label>
                  <input
                    placeholder="5555 555 555"
                    className={`${styles.input} ${formErrors.phone && styles.errorInput
                      }`}
                    type="text"
                    inputMode="numeric"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key) || formData.phone.length >= 10) {
                        e.preventDefault();
                      }
                    }}
                    maxLength="10"
                  />
                  {formErrors.phone && (
                    <div className={styles.errorText}>{formErrors.phone}</div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <h2 className={styles.payment}>Payment</h2>
          <div>
            <p className={styles.p}>
              You will be redirected to the Mercado Pago site after reviewin your
              order
            </p>
          </div>
          <div id="wallet_container">
            {token && <Wallet initialization={{ preferenceId: token }} />}
          </div>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <h2 className={styles.titlerigth}>In your bag</h2>
        <Link className={styles.Link} to="/user/shopping">
          Edit
        </Link>
        <Bag />
      </div>
    </div>
  );
};

export default CheckOut_V1;
