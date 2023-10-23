import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { fetchAllSales } from "../../../../redux/salesSlice";
import styles from './Sales.module.css'
import styleDashBoard from '../../DashBoard.module.css'
import { MENU_ADMIN } from "../../../../const";

const AppSALESview = () => {
    const dispatch = useDispatch();

    const allSales = useSelector((state) => state.sales.allSales);
    console.log("🚀 ~ file: Sales.jsx:13 ~ AppSALESview ~ allSales:", allSales)
    const [moreInformation, setMoreInformation] = useState({
        user: {},
        flag: false,
        shopping: {},
    })

    const handleOnClick = (Sale_id) => {
        const [saleFound] = allSales.filter((sale) => sale._id === Sale_id)

        setMoreInformation({
            ...moreInformation,
            flag: true,
            user: saleFound.user[0]
        })
    }

    const handleCloseInformation = () => {
        setMoreInformation({
            ...moreInformation,
            flag: false
        })
    }

    useEffect(() => {
        dispatch(fetchAllSales());
    }, [dispatch])

    useEffect(() => {
        console.log("MORE INFORMATION", moreInformation);
    }, [moreInformation])

    return (
        <div className={styleDashBoard.DashBoardContainer}>
            <div className={styles.TableContainer}>
                <label className={styles.TitleTable}>
                    {/* <h1 style={{color: 'red'}}>ICONO.....</h1> */}
                    <h1>{MENU_ADMIN.sales.icon}</h1>
                    SALES...
                </label>

                <div className={styles.TableData}>
                    <table>
                        <thead>
                            <tr>
                                {/* <th style={{ color: '#f4f4f4' }}> */}
                                {/* <th style={{ color: 'red' }}>
                                LOGO
                            </th> */}
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            SALE ID
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            USER ID
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            PURCHASE DATE
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            QUANTITY
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            PAYMENT (US$)
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            STATUS
                                        </div>
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!allSales.length && allSales?.map((sale, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>{sale?._id}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable} id={styles.enlace}>
                                                <div
                                                    className={styles.BorderTable}
                                                    onMouseOver={() => {
                                                        const Sale_id = sale._id;
                                                        handleOnClick(Sale_id)
                                                    }}
                                                >
                                                    {sale?.user[0]._id}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>
                                                    {new Date(sale?.purchase_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>
                                                    {sale?.purchase.reduce((total, item) => total + item.quantity, 0)}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>
                                                    {sale?.payment.toFixed(2)}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>
                                                    <span style={
                                                        {
                                                            color: sale.status === 'inProgress' ? '#969106' :
                                                                sale.status === 'approved' ? '#07520c' :
                                                                    sale.status === 'rejected' ? 'gray' : '##FF0000',
                                                            fontWeight: '800',
                                                            fontFamily: 'MontBold'

                                                        }
                                                    }>
                                                        {sale?.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>

                    <div
                        className={moreInformation.flag ? styles.showMoreInformation : styles.hiddenMoreInformation}
                        title={moreInformation.user._id}
                    >
                        <div className={styles.containerMoreInformation}>
                            <span>{`${moreInformation.user.firstName} ${moreInformation.user.lastName}`}</span>
                            <div className={styles.ImageContainer}>
                                <img
                                    src={moreInformation.user.image}
                                    alt="X"
                                />
                            </div>
                            <span>{moreInformation.user.email}</span>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={() => handleCloseInformation()}
                                title="CLOSE"
                            >
                                x
                            </button>
                        </div>
                    </div>


                    <div className={styles.containerMoreInformation}>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default AppSALESview;
