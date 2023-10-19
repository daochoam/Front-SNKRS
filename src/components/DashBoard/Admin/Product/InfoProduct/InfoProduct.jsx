import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './InfoProduct.module.css'
import { InputSelect, InputText } from '../../../../Inputs'
import UploadSquare from '../Components/UploadSquare/UploadSquare'
import { GENDER, MENU_ADMIN } from '../../../../../const'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands, fetchCategories, fetchColors, fetchTypes } from '../../../../../redux/filters'
import Logo from '../../../../Icons/Logo';

const intInfo = {
   sku: '',
   model: '',
   brand: '',
   gender: '',
   category: '',
   type: '',
   price: '',
   image: []
}
const InfoProduct = ({ initInfoProduct = {}, onChangeInfoProduct, errors }) => {
   const dispatch = useDispatch()
   const [infoProduct, setInfoProduct] = useState(intInfo)
   const genders = GENDER
   const brands = useSelector(({ filters }) => filters.data.brands)
   const types = useSelector(({ filters }) => filters.data.types)
   const categories = useSelector(({ filters }) => filters.data.categories)
   const colors = useSelector(({ filters }) => filters.data.colors)

   useEffect(() => {
      setInfoProduct(initInfoProduct)
   }, [initInfoProduct])

   //? get Categories
   useEffect(() => {
      dispatch(fetchCategories())
      dispatch(fetchBrands())
      dispatch(fetchColors())
   }, [dispatch]);

   //? get Types
   useEffect(() => {
      dispatch(fetchTypes(infoProduct.category))
   }, [dispatch, infoProduct.category]);


   const handlerUploadImage = (data) => {
      const currentsProduct = { ...infoProduct }
      currentsProduct.image = [...data]
      setInfoProduct(currentsProduct);
      onChangeInfoProduct(currentsProduct)

   };


   const handlerSelectChange = (field, value) => {
      const currentValue = { ...infoProduct, [field]: value }
      setInfoProduct(currentValue)
      onChangeInfoProduct(currentValue)
   }

   return (
      <div className={styles.InfoProductContainer}>
         <div className={styles.ProductBody}>
            <div className={styles.InfoContainer}>
               <div className={styles.Information}>
                  <div className={styles.DataBasic}>
                     <div className={styles.DataProduct}>
                        <div className={styles.DataInfo} >
                           <div className={styles.HeaderLogo}>
                              <div className={styles.HeaderProduct}>
                                 <h1>{MENU_ADMIN.product.icon}</h1><h1>PRODUCTS...</h1>
                              </div>
                              <div className={styles.LogoProduct}>
                                 <Logo width='120px' height='25px' />
                              </div>
                           </div>
                           {Object.keys(infoProduct).map((key, index) => {
                              return (
                                 <div className={styles.DataInputsProducts} key={index}>
                                    <span className={styles.KeyData}>{key !== 'image' && key.toUpperCase()}</span>
                                    {'sku'.includes(key) &&
                                       < InputSelect
                                          name={key}
                                          options={['NEW PRODUCT......']}
                                          style={{
                                             width: '400px',
                                             select: { borderBottom: '0px solid black', borderInlineEnd: '0px solid black' }
                                          }}
                                          initSelect={infoProduct[key]}
                                          onChangeSelect={(input) => handlerSelectChange(key, input)}

                                       />
                                    }
                                    {['model', 'price'].includes(key) &&
                                       <InputText
                                          name={key}
                                          initInput={infoProduct[key]}
                                          buttonClear={true}
                                          placeHolder={`${key.toUpperCase()}`}
                                          style={{
                                             width: '400px',
                                             input: { width: '380px', fontSize: '20px' }
                                          }}
                                          onChangeInput={(input) => handlerSelectChange(key, input)}
                                       />
                                    }
                                    {['brand', 'gender', 'category', 'type'].includes(key) &&
                                       < InputSelect
                                          name={key}
                                          options={key === 'brand' ? brands : key === 'category' ? categories : key == 'type' ? types : genders}
                                          style={{
                                             width: '400px',
                                             select: { borderBottom: '5px solid black', borderInlineEnd: '2px solid black' }
                                          }}
                                          initSelect={infoProduct[key]}
                                          onChangeSelect={(input) => handlerSelectChange(key, input)}
                                       />
                                    }
                                 </div>)
                           })}
                        </div>
                     </div>
                  </div>
               </div>
               <div className={styles.DataImages} >
                  <span className={styles.KeyData}>IMAGES</span>
                  <div className={styles.Images}>
                     <div className={styles.ImageContainer}>
                        <div className={styles.UploadImages}>
                           <UploadSquare
                              colors={colors}
                              onImageUpload={handlerUploadImage} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

InfoProduct.propTypes = {
   initInfoProduct: PropTypes.object,
   errors: PropTypes.object,
   onChangeInfoProduct: PropTypes.func,
}

export default InfoProduct