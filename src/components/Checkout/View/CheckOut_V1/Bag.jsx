import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../../redux/cartSlice";
import styles from "./Bag.module.css";
import { MdClose } from "react-icons/md";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";

const Bag = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(({ cart }) => {
    return cart.cartItems;
  });
  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;
  return (
    <div className={styles.shoppingCart}>
      {cartItems?.length > 0 && (
        <div className={styles.tableContainer}>
          <div className={styles.totalContainer}>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
          <table className={styles.table}>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item._id} className={styles.cartItem}>
                  <td>
                    <img src={item?.image} alt={item?.model} />
                  </td>
                  <td className={styles.cartItemDetails}>
                    <div>Size: {item.size}</div>
                    <div>Color: {item?.color?.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Price by unit: $ {item.price}</div>
                    <div>Subtotal: $ {item.price * item.quantity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
export default Bag;
