import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { SESSION_NAME } from '../const/const';
import { readCookieSession, updateCookieSession } from '../services';

const ProtectedRoutes = ({ children, nameCookie = SESSION_NAME, path, redirectPath = '/' }) => {

    const handlerProtectedClick = async (event) => {
        if (!event.target.classList.contains('ProtectedRoutes')) { // Verificar la clase correctamente
            await updateCookieSession()
        }
    }


    return (
        <div className="ProtectedRoutes" onClick={handlerProtectedClick}>
            {children}
        </div>
    );
}

ProtectedRoutes.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    nameCookie: PropTypes.string,
    path: PropTypes.string,
    redirectPath: PropTypes.string
};

export default ProtectedRoutes;