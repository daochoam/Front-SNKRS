import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import handlerFieldStock from './handlerFieldStock'
import styles from './StockProduct.module.css'
import Label from '../Components/Label/Label'
import Colors from '../Components/Filters/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { fetchColors, fetchSizes } from '../../../../../redux/filters';
import Sizes from '../Components/Filters/Sizes/Sizes';
import handlerFilterStock from './handlerFilterStock';
import { ICONS } from '../../../../../const';
import handlerStockGteZero from './handlerStockGteZero';

const initInfoStock = []

const StockProduct = ({ initStock = [], onChangeStockProduct, errors, model = '', gender = '' }) => {
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState({ 0: { minus: false, plus: false } })
    const [filtered, setFiltered] = useState([])
    const [stock, setStock] = useState(initInfoStock)
    const [filter, setFilter] = useState({ color: [], size: [] })
    const colors = useSelector(({ filters }) => filters.data.colors)
    const sizes = useSelector(({ filters }) => filters.data.sizes)

    useEffect(() => {
        setStock(handlerFieldStock(colors, sizes))
    }, [colors, sizes])

    useEffect(() => {
        let stockValues
        if (!stock.length) stockValues = handlerFieldStock(colors, sizes)
        else stockValues = [...stock]

        if (initStock.length) {
            initStock.forEach((initValue) => {
                const matchItem = stockValues.find(({ size, color }) => {
                    return (
                        size === initValue.size &&
                        color.name === initValue.color.name)
                });
                if (matchItem) {
                    matchItem.quantity = initValue.quantity;
                }
            });
            setStock(stockValues);
        }
    }, [initStock, stock, colors, sizes])

    useEffect(() => {
        dispatch(fetchColors())
        dispatch(fetchSizes(gender))
    }, [dispatch, gender])

    useEffect(() => {
        setFiltered(handlerFilterStock(filter, stock))
    }, [filter, stock])


    const handlerChangeColor = (data) => {
        if (filter.color.includes(data)) {
            setFilter({ ...filter, color: filter.color.filter(color => color !== data) });
        } else {
            const currentColor = { ...filter }
            currentColor.color = data
            setFilter(currentColor);
        }
    }

    const handlerChangeSize = (data) => {
        if (filter.size.includes(data)) {
            setFilter({ ...filter, size: filter.size.filter(size => size !== data) });
        } else {
            const currentFilter = { ...filter }
            currentFilter.size = data
            setFilter(currentFilter);
        }
    }

    const handlerChangeQuantity = (event, index) => {
        event.preventDefault();
        let updateStock = [...stock]
        const { name, value } = event.target;
        updateStock[index].quantity = Math.abs(value)
        setStock(updateStock)
        onChangeStockProduct(handlerStockGteZero(updateStock))
    }



    const handlerClickQuantity = (event, index, button) => {
        event.preventDefault();
        let updateStock = [...stock]
        if (button === 'minus' && updateStock[index].quantity > 0) {
            updateStock[index].quantity -= 1
        }
        if (button === 'plus') {
            updateStock[index].quantity += 1
        }
        setStock(updateStock)
        onChangeStockProduct(handlerStockGteZero(updateStock))
    }

    const handlerHoverEnter = (index, button) => {
        setIsHovered({ ...isHovered, [index]: { [button]: true } })
    }
    const handlerHoverLeave = (index, button) => {
        setIsHovered({ ...isHovered, [index]: { [button]: false } })
    }
    return (
        <div className={styles.StockContainer}>
            <div className={styles.ContainerHeader}>
                <div className={styles.ProductFilters}>
                    <Label title='MODEL' text={model.toUpperCase()} />
                    <Label title='GENDER' text={gender.toUpperCase()} />
                    <Colors colors={colors} onSelectColor={handlerChangeColor} />
                    <Sizes sizes={sizes} onSelectSize={handlerChangeSize} />
                </div>
                <div className={styles.DataStock}>
                    {stock?.length && stock?.map(({ color, size, quantity }, index) => {
                        return (
                            filtered && filtered.includes(index) &&
                            <div className={styles.InfoStock} key={index}>
                                <div className={styles.SizeStock}>
                                    {size}
                                </div>
                                <div className={styles.ColorStock} style={{ background: `${color?.html}` }} title={color?.name}>
                                </div>
                                <div className={styles.QuantityStock}>
                                    <h3 onMouseEnter={() => handlerHoverEnter(index, "minus")}
                                        onMouseLeave={() => handlerHoverLeave(index, "minus")}
                                        onClick={(event) => handlerClickQuantity(event, index, "minus")}>
                                        {ICONS.MINUS_SQUARE(!isHovered[index]?.minus ? '#828282' : 'green')}</h3>
                                    <input type='text' name={index} value={quantity}
                                        className={styles.InputQuantity}
                                        onChange={(event) => handlerChangeQuantity(event, index)}
                                    />
                                    <h3 onMouseEnter={() => handlerHoverEnter(index, "plus")}
                                        onMouseLeave={() => handlerHoverLeave(index, "plus")}
                                        onClick={(event) => handlerClickQuantity(event, index, "plus")}>
                                        {ICONS.PLUS_SQUARE(!isHovered[index]?.plus ? '#828282' : 'green')}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

StockProduct.propTypes = {
    initStock: PropTypes.array,
    onChangeStockProduct: PropTypes.func,
    errors: PropTypes.object,
    model: PropTypes.string,
    gender: PropTypes.string,
}

export default StockProduct