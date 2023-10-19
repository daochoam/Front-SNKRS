import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import styleDashBoard from '../../DashBoard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUser } from '../../../../redux/user'
import styles from "./Customer.module.css";
import { ICONS, MENU_ADMIN } from '../../../../const'
import { ModalDataDelete } from '../../../Alerts'
import axiosInstance from '../../../../utils/axiosInstance';
import FilterHorizontalUser from '../../../FilterHorizontalUser/FilterHorizontalUser';

const MySwal = withReactContent(Swal);


const Customer = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState({ 0: { edit: false, trash: false }, add: false })
    const users = useSelector(({ user }) => user.user)
    console.log(users);
    const [filter, setFilter] = useState();

    useEffect (()=>{
        dispatch(fetchAllUser({...filter}))
    },[dispatch, filter])

    const handleFilter = (data) => {
        setFilter(data);
        console.log("es data", data);
      };

    // 

    const handlerUpdateBrand = (id) => {
        MySwal.fire({
            title: 'Change User Status',
            html: (
                <select id="swal-select" className="swal2-select">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                </select>
            ),
            confirmButtonText: 'Save',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const selectValue = document.getElementById('swal-select').value;
                console.log('Nuevo estado:', selectValue);
                axiosInstance.put(`admin/user/${id}`, { status: selectValue })
                    .then(response => {
                        console.log('Respuesta de actualización:', response.data);
                        dispatch(fetchAllUser({...filter}))
                        Swal.fire({
                            title: 'successful edit!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                    })
                    .catch(error => {
                        console.error('Error al actualizar el estado:', error);
                    });
            }
        });
    };
    


    

    const handlerDeleteBrand = (id) => {
        ModalDataDelete('Brand', id, '/brand')
    }

    const handlerMouseEnter = (index, button) => {
        if (index !== 'add') return setIsHovered({ ...isHovered, [index]: { [button]: true } });
        return setIsHovered({ ...isHovered, add: true });

    }
    const handlerMouseLeave = (index, button) => {
        if (index !== 'add') return setIsHovered({ ...isHovered, [index]: { [button]: false } });
        return setIsHovered({ ...isHovered, add: false });
    }

    return (
        <div className={styleDashBoard.DashBoardContainer}>
            <div className={styles.TableContainer}>
                <label className={styles.TitleTable}><h1>{MENU_ADMIN.customer.icon}</h1>USERS...</label>
                <FilterHorizontalUser onChangeFilter={handleFilter}/>
                <div className={styles.TableData}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ color: '#f4f4f4' }}>
                                    IMAGE
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            FIRSTNAME
                                        </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            LASTNAME  </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            EMAIL  </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            COUNTRY  </div>
                                    </span>
                                </th>
                                <th>
                                    <span className={styles.ItemTable}>
                                        <div className={styles.BorderTable}>
                                            STATUS  </div>
                                    </span>
                                </th>
                                <th> <button
                                    // onClick={handlerAddBrand}
                                    onMouseEnter={() => handlerMouseEnter('add', null)}
                                    onMouseLeave={() => handlerMouseLeave('add', null)}
                                ><h1>{ICONS.PLUS}</h1></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!users.length && users?.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.ImageContainer}>
                                                    <img className={styles.Image} src={user?.image} alt={user?.image} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>{user?.firstName?.toUpperCase()}</div>
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>{user?.lastName?.toUpperCase()}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>
                                                    <a className={styles.Email} href={`mailto:${user?.email}`}>{user?.email}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>{user?.address[0]?.country?.toUpperCase()}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ItemTable}>
                                                <div className={styles.BorderTable}>{user?.status?.toUpperCase()}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handlerUpdateBrand(user?._id)}
                                                onMouseEnter={() => handlerMouseEnter(index, 'edit')}
                                                onMouseLeave={() => handlerMouseLeave(index, 'edit')}
                                            >
                                                <h2>{ICONS.EDIT(isHovered[index]?.edit ? '#4CAF50' : '#454444')}</h2>
                                            </button>
                                            {/* <button
                                                onClick={() => handlerDeleteBrand(user?._id)}
                                                onMouseEnter={() => handlerMouseEnter(index, 'trash')}
                                                onMouseLeave={() => handlerMouseLeave(index, 'trash')}
                                            >
                                                <h2>{ICONS.TRASH(isHovered[index]?.trash ? '#4CAF50' : '#454444')}</h2>
                                            </button> */}
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    </div>
                {/* ))} */}
            </div>
        </div>
    )
}

Customer.propTypes = {}

export default Customer




// const handlerAddBrand = () => {
    //     Swal.fire({
    //         title: 'Crear Nuevo Usuario',
    //         html: `
    //             <form id="userForm">
    //                 <input type="text" id="firstName" placeholder="First Name" required />
    //                 <input type="text" id="lastName" placeholder="Last Name" required />
    //                 <input type="email" id="email" placeholder="Email" required />
    //                 <input type="password" id="password" placeholder="Password" required />
    //                 <select id="status">
    //                     <option value="active">Active</option>
    //                     <option value="inactive">Inactive</option>
    //                     <option value="banned">Banned</option>
    //                 </select>
    //                 <button type="submit">Submit</button>
    //             </form>
    //         `,
    //         showCancelButton: true,
    //         showConfirmButton: false,
    //         cancelButtonText: 'Cerrar',
    //         didOpen: () => {
    //             const userForm = document.getElementById('userForm');
    //             userForm.addEventListener('submit', async (event) => {
    //                 event.preventDefault();
    //                 const formData = new FormData(userForm);
    //                 const newUser = {};
    //                 for (let pair of formData.entries()) {
    //                     newUser[pair[0]] = pair[1];
    //                 }
    //                 console.log('Nuevo usuario:', newUser);
    
    //                 try {
    //                     const response = await axiosInstance.post('/auth/sign-up', {
    //                         ...newUser,
    //                     });
    //                     console.log('Respuesta de creación de usuario:', response.data);
    //                     // Aquí puedes manejar la lógica después de crear el nuevo usuario
    //                 } catch (error) {
    //                     console.error('Error al crear el usuario:', error);
    //                     // Aquí puedes manejar los errores de la solicitud de creación de usuario
    //                 }
    //             });
    //         }
    //     });
    // };
    