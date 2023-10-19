import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './ViewProduct.module.css'
import Cards from '../../../../Cards/Cards';

const ViewProduct = ({ infoProduct }) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        setProduct(
            {
                _id: '',
                image: URL.createObjectURL(infoProduct?.image?.[0]?.file),
                model: infoProduct?.model,
                type: infoProduct?.type,
                brand: { brand: infoProduct?.brand },
                price: infoProduct?.price,
                stock: infoProduct?.stock

            }
        )
    }, [infoProduct])

    return (
        <div className={styles.ViewContainer}>
            {/* <div className={styles.ContainerData}>
                <div className={styles.ProductMainImage}>
                    <img src={product?.image} alt={'Shoe'} />
                </div> */}
            <div className={styles.CardView}>
                <Cards products={[product]} style={{
                    card: {
                        display: 'grid',
                        justifyContent: 'center',
                        width: 'auto',
                        textdecoration: 'none', gridTemplateColumns: 'repeat(1, 1fr)',
                    }
                }} />
            </div>
        </div>
        // </div >

    )
}


ViewProduct.propTypes = {
    infoProduct: PropTypes,
}
export default ViewProduct