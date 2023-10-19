import './App.css'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import SignUp from './components/Login/SignUp/SignUp';
import Detail from './components/Detail/Detail'
import Navbar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home'
import LateralMenu from './components/DashBoard/LateralMenu/LateralMenu';
import { Brands, Customer, Product, Sales, Statistics, Stock, TypesCategories } from './views/Admin'
import { Favorites, Profile, Record, Shopping } from './views/User'
import HomeViews from './views/HomeViews/HomeViews';
import Payment from './views/Payment/Payment';
import PaymentSucces from './views/Payment/PaymentSucces';
import Trolley from './views/Trolley/Trolley';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Page404 from './views/Page404/Page404';

import Genders from './views/Genders/Genders';
import Views from './components/Reviews/Reviews';


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {/* //? Lateral Menu */}
      {(pathname.includes('/admin') || pathname.includes('/user')) ? <LateralMenu /> : null}
      {/* //? Navbar */}
      {(pathname.includes('/admin') || pathname.includes('/user')) ? (<Navbar NavColor='#F7F7F7' LogoColor='#424242' />) : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={
          <ProtectedRoutes>
            <HomeViews />
          </ProtectedRoutes>
        }
        />
        {/* <Route path="/user" element={<User />} /> */}
        <Route path="/men" element={<Genders />} />
        <Route path="/women" element={<Genders />} />
        <Route path="/kids" element={<Genders />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/trolley" element={<Trolley />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/payment-succes" element={<PaymentSucces />} />
        <Route path="/reviews/:id" element={<Views/>} />
        
        {/* <Route path="/user" element={<DashboardUser />} /> */}

        {/* //?Routes USER */}
        <Route path="/user" element={<Navigate to="/user/profile" />} />
        <Route exact path="/user/profile" element={<Profile />} />
        <Route exact path="/user/favorites" element={<Favorites />} />
        <Route exact path="/user/shopping" element={<Shopping />} />
        <Route exact path="/user/record" element={<Record />} />

        {/* //?Routes ADMIN */}
        <Route path="/admin" element={<Navigate to="/admin/statistics" />} />
        <Route exact path="/admin/statistics" element={<Statistics />} />
        <Route exact path="/admin/sales" element={<Sales />} />
        <Route exact path="/admin/customer" element={<Customer />} />
        <Route exact path="/admin/product" element={<Product />} />
        <Route exact path="/admin/stock" element={<Stock />} />
        <Route exact path="/admin/brands" element={<Brands />} />
        <Route exact path="/admin/types-categories" element={<TypesCategories />} />


        <Route exact path="*" element={<Page404 />} />

      </Routes>

    </>
  )
}

export default App
