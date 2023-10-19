import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import DashBoard from '../../DashBoard.module.css'
import styles from './Product.module.css';
import InfoProduct from "./InfoProduct/InfoProduct";
import StockProduct from "./StockProduct/StockProduct";
import Logo from "../../../Icons/Logo";
import { ICONS, MENU_ADMIN, NAVBAR_LINKS, NAV_ADMIN, PRODUCT_STORAGE } from "../../../../const";
import ReviewProduct from "./ReviewProduct/ReviewProduct";
import { handlerIsObjectEmpty } from "../../../../services";

const initProduct = {
  sku: '',
  model: '',
  brand: '',
  gender: '',
  category: '',
  type: '',
  price: '',
  image: [],
  stock: [
    {
      quantity: '',
      size: '',
      color: {
        name: '',
        html: '',
      }
    }
  ]
}
const Product = () => {
  const [product, setProduct] = useState(initProduct)
  const [save, setSave] = useState(false);
  const [steps, setSteps] = useState(1);
  const { image, stock, ...infoProduct } = product

  console.log("🚀 ~ file: Product.jsx:34 ~ Product ~ product:", product)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(PRODUCT_STORAGE));
    if (storedData) {
      setProduct({ ...product, ...storedData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlerPreview = () => {
    setSteps(steps - 1);

  }

  const handlerNext = () => {
    if (steps === 1) {
      const { stock, image, sku, ...infoBasic } = product
      if (handlerIsObjectEmpty(infoBasic)) {
        return
      }
      setSteps(steps + 1)
    }
  }

  const handlerSave = () => {
  }

  const handlerChangeProduct = (data) => {
    let currentValue = {}
    steps == 1 ? currentValue = { ...product, ...data } : null
    steps == 2 ? currentValue = { ...product, stock: [...data] } : null
    setProduct(currentValue)
    localStorage.setItem(PRODUCT_STORAGE, JSON.stringify(currentValue));
  }

  return (
    <div className={DashBoard.DashBoardContainer}>
      <span className={styles.StepsView}>
        {[1, 2, 3].map((step) => {
          return (
            <span className={styles.StepsViewBody} key={step}>
              <div className={`${styles.NumberStep} ${step <= steps && styles.StepActive}`}> {step}</div>
              {[1, 2].includes(step) && <div className={`${styles.LineStep} ${step <= steps - 1 && styles.StepActive}`}></div>}
            </span>)
        })}
      </span>
      <div className={styles.ProductContainer}>
        <div className={styles.DataProduct}>
          <div className={styles.StepsContainer}>
            {steps === 1 && (
              <div className={styles.Info}>
                <InfoProduct initInfoProduct={{ ...infoProduct, image }} onChangeInfoProduct={handlerChangeProduct} />
              </div>
            )}
            {steps === 2 && (
              <div className={styles.Info}>
                <StockProduct
                  initStock={stock}
                  onChangeStockProduct={handlerChangeProduct}
                  model={product.model}
                  gender={product.gender} />
              </div>
            )}
            {steps === 3 && (
              <div className={styles.Info}>
                <ReviewProduct />
              </div>
            )}
          </div>
          <div className={`${styles.BtnProduct}`}>
            {steps > 1 && <button className={`${styles.ProductBtns}`} onClick={handlerPreview}>Prev</button>}
            {save && steps > 1 && <button className={`${styles.ProductBtns}`} onClick={handlerSave}>Save</button>}
            {steps < 3 && <button className={`${styles.ProductBtns}`} onClick={handlerNext}>Next</button>}
          </div>
        </div>
      </div>
    </div>)
}

export default Product