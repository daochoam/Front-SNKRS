import {
    FaBuffer,
    FaChartPie,
    // FaCartShopping,
    FaDatabase,
    FaOpencart,
    FaRegistered,
    FaThermometerThreeQuarters,
    FaUserAlt,
} from 'react-icons/fa';
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { BiSolidCategoryAlt } from 'react-icons/bi'

export const MENU_USER = {
    profile: {
        name: 'PROFILE',
        route: '/user/profile',
        icon: <FaUserAlt />,
    },
    favorites: {
        name: 'FAVORITES',
        route: '/user/favorites',
        icon: <BsFillSuitHeartFill />,
    },
    shopping: {
        name: 'SHOPPING',
        route: '/user/shopping',
        icon: <FaOpencart />,
    },
    record: {
        name: 'RECORD',
        route: '/user/record',
        icon: <FaBuffer />,
    },
}

export const MENU_ADMIN = {
    sales: {
        name: 'SALES',
        route: '/admin/sales',
        icon: <FaOpencart />,
    },
    customer: {
        name: 'CUSTOMER',
        route: '/admin/customer',
        icon: <FaUserAlt />,
    },
    newsletter: {
        name: 'NEWSLETTER',
        route: '/admin/newletter',
        icon: <FaChartPie />,
    },
    stock: {
        name: 'STOCK',
        route: '/admin/stock',
        icon: <FaThermometerThreeQuarters />,
    },
    product: {
        name: 'PRODUCT',
        route: '/admin/product',
        icon: <FaDatabase />,
    },
    brands: {
        name: 'BRANDS',
        route: '/admin/brands',
        icon: <FaRegistered />,
    },
    typesCategories: {
        name: 'TYPES & CATEGORIES',
        route: '/admin/types-categories',
        icon: <BiSolidCategoryAlt />,
    }
}

export const NAV_ALL = [
    '/', '/home', '/women', '/men', '/kids'
]

export const NAV_USER = [
    ...NAV_ALL,
    ...Object.values(MENU_USER).map(({ route }) => route)
]

export const NAV_ADMIN = [
    ...NAV_ALL,
    ...Object.values(MENU_ADMIN).map(({ route }) => route)
]

export const NOT_NAVE = [
    ...NAV_USER,
    ...NAV_ADMIN
]