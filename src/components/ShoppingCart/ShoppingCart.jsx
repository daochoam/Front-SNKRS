/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../redux/cartSlice";
import styles from "./ShoppingCart.module.css";
import { MdClose } from "react-icons/md";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  itemIncrement,
  itemDecrement,
  removeFromCart,
  clearCart,
} from "../../redux/cartSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import zapa from "../../assets/Image/zapatillas.png";
import { PAYMENT_STORAGE } from "../../const/const";
import { ICONS } from "../../const";
initMercadoPago("APP_USR-e2f3a313-4a9d-4110-bd77-ad6c50675664");

const ShoppingCart = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const cartItems = useSelector(({ cart }) => {
    return cart.cartItems;
  });
  console.log("🚀 ~ file: ShoppingCart.jsx:31 ~ cartItems ~ cartItems:", cartItems)

  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showTable, setShowTable] = useState(true);
  const [update, setUpdate] = useState(false);
  const [payment, setPayment] = useState("");
  const handleIncrease = (item) => {
    dispatch(itemIncrement(item._id));
  };

  const handleDecrease = (item) => {
    dispatch(itemDecrement(item._id));
  };


  const handleClearCart = () => {
    MySwal.fire({
      title: "WARNING",
      text: "¿Are you sure to empty the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "black",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        setShowTable(false);
      }
    });
  };
  const handleRemove = (item) => {
    MySwal.fire({
      title: "WARNING",
      text: `¿Are you sure to delete this item from the cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "black",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(item._id));

        if (cartItems.length === 1) {
          setShowTable(false);
        }
      }
    });
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;
  return (
    <div className={styles.cartContainer}>



      <div className={styles.tableContainer}>
        {/* <Link className={styles.homebtn} to={"/home"}>
          <p className={styles.homebtonP}>
            <AiOutlineArrowLeft /> Home
          </p>
        </Link> */}

        <h2 className={styles.h2}>SHOPPING CART</h2>
        {cartItems.length > 0 ? (
          <div >
            <table className={styles.cartTable}>
              <thead >
                <tr>
                  <th></th>
                  <th></th>
                  <th>Color</th>
                  <th>Image</th>
                  <th>Gender</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price by unit</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.length > 0 &&
                  cartItems?.map((item) => (
                    <tr key={item._id}>
                      <td></td>
                      <td>
                        {" "}
                        <MdClose
                          className={styles.icon}
                          onClick={() => handleRemove(item)}
                        />
                      </td>
                      <td className={styles.fila}>
                        <div className="">
                          <h1 title={item?.color?.name}>{ICONS.COLORS(item?.color?.html)}</h1>
                        </div>
                      </td>
                      <td>
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className={styles.itemImage}
                        />
                      </td>
                      <td>{item?.gender}</td>

                      <td>{item?.size}</td>
                      <td>
                        <span className={styles.quantityCell}>
                          <div
                            className={styles.quantityButton}
                            onClick={() => handleDecrease(item)}
                          >
                            <FaMinusCircle />
                          </div>
                          {item.quantity}
                          <div
                            className={styles.quantityButton}
                            onClick={() => handleIncrease(item)}
                          >
                            <FaPlusCircle />
                          </div>
                        </span>
                      </td>
                      <td>${item?.price}</td>
                      <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.cartEmpty}>
            <h1>Your cart is empty</h1>
           
            <Link to="/home">
            <button className={styles.shopping}>Go shopping</button>
            </Link>
          </div>
        )}

        {showTable && cartItems.length > 0 && (
          <div className={styles.buttonContainer}>
            <FaTrashAlt className={styles.trash} onClick={handleClearCart} />

            <div className={styles.paymentButtons}>
              <div className={styles.totalTableContainer}>
                <table className={styles.totalTable}>
                  <tbody>
                    <tr>
                      <td>Total:</td>
                      <td>$ {total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/checkout">
                  <button className={styles.pay}>
                    Go to checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShoppingCart;
