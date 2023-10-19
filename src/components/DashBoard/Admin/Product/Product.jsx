import React, { useEffect, useState } from "react";
import DashBoard from '../../DashBoard.module.css'
import styles from './Product.module.css';
import InfoProduct from "./InfoProduct/InfoProduct";
import StockProduct from "./StockProduct/StockProduct";
import { ICONS, MENU_ADMIN, NAVBAR_LINKS, NAV_ADMIN, PRODUCT_STORAGE } from "../../../../const";
import ViewProduct from "./ViewProduct/ViewProduct";
import hasEmptyFields from "./Components/hasEmptyFields";
import { ConfirmCreateProduct, ErrorProduct, FieldsEmpty, NonDataStock, NonImageSelected, ProductSuccess } from "../../../Alerts";
import { useSelector } from "react-redux";
import getIdByName from "./Components/getIdByName";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

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
  const [success, setSuccess] = useState(false)
  const { image, stock, ...infoProduct } = product
  const brands = useSelector(({ filters }) => filters.detail.brands)
  const types = useSelector(({ filters }) => filters.detail.types)
  const categories = useSelector(({ filters }) => filters.detail.categories)


  useEffect(() => {
    localStorage.removeItem(PRODUCT_STORAGE)
  }, [success])

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
      if (hasEmptyFields(infoBasic)) {
        return FieldsEmpty()
      }
      if (hasEmptyFields(image)) {
        return NonImageSelected()
      }
      return setSteps(steps + 1)
    }
    if (steps === 2) {
      if (hasEmptyFields(stock)) {
        return NonDataStock()
      }
      return setSteps(steps + 1)
    }
  }

  const handlerSave = async () => {
    try {
      const { image, sku, brand, category, type, ...infoProduct } = product
      const ProductCreate = {
        ...infoProduct,
        Brand_id: getIdByName(brands, 'brand', brand),
        Category_id: getIdByName(categories, 'category', category),
        Type_id: getIdByName(types, 'type', type)
      }
      const formData = new FormData();

      image.forEach(({ file, color }) => {
        formData.append("imagesFiles", file, file.name);
        formData.append("imagesColors", color);
      })

      const { _id } = await axiosInstance.post(`/products`, ProductCreate)
      const data = await axiosInstance.put(`/products/images/${_id}`, formData)
      ProductSuccess()
      setSuccess(true)

    } catch (error) {
      ErrorProduct()
    }
  }

  const handlerChangeProduct = (data) => {
    let currentValue = {}
    steps == 1 ? currentValue = { ...product, ...data } : null
    steps == 2 ? currentValue = { ...product, stock: [...data] } : null
    setProduct(currentValue)
    localStorage.setItem(PRODUCT_STORAGE, JSON.stringify(currentValue));
  }

  const onRedirect = (data) => {
    setSuccess(data)
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
                <ViewProduct infoProduct={product} />
              </div>
            )}
          </div>
          <div className={`${styles.BtnProduct}`}>
            {steps > 1 && <button className={`${styles.ProductBtns}`} onClick={handlerPreview}>Prev</button>}
            {steps == 3 && <button className={`${styles.ProductBtns}`} onClick={handlerSave}>Create</button>}
            {steps < 3 && <button className={`${styles.ProductBtns}`} onClick={handlerNext}>Next</button>}
          </div>
        </div>
      </div>
    </div>)
}

export default Product