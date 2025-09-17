import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Orders from './pages/Orders.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Searchbar from './components/Searchbar.jsx';
import { Toaster } from 'react-hot-toast';

// Admin
import Add from './pages/admin/Add.jsx';
import List from './pages/admin/List.jsx';
import OrdersPage from './pages/admin/OrdersPage.jsx';
import AdminNavbar from './components/admin/AdminNavbar.jsx';
import AdminSidebar from './components/admin/AdminSidebar.jsx';
import AdminLogin from './components/admin/AdminLogin.jsx';
import Verify from './pages/Verify.jsx';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [adminToken, setAdminToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', adminToken);
  }, [adminToken]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {/* ================= User Layout ================= */}
      {!isAdminRoute && (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <Navbar />
          <Searchbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>
          <Footer />
        </div>
      )}

      {/* ================= Admin Layout ================= */}
      {isAdminRoute && (
        <div className="min-h-screen w-full">
          <Routes>
            {/* Admin Login Page */}
            <Route path='/admin/login' element={<AdminLogin setAdminToken={setAdminToken} />} />
            {/* Admin Dashboard Pages */}
            {adminToken ? (
              <>
                <Route path='/admin/add' element={
                    <>
                      <AdminNavbar setAdminToken={setAdminToken} />
                      <hr className='text-gray-200' />
                      <div className='flex w-full min-h-[90vh]'>
                        <AdminSidebar />
                        <div className='flex-1 p-4'>
                          <Add adminToken={adminToken} />
                        </div>
                      </div>
                    </>
                  }/>
                <Route path='/admin/list' element={
                    <>
                      <AdminNavbar setAdminToken={setAdminToken} />
                      <hr className='text-gray-200' />
                      <div className='flex w-full min-h-[90vh]'>
                        <AdminSidebar />
                        <div className='flex-1 p-4'>
                          <List adminToken={adminToken} />
                        </div>
                      </div>
                    </>
                    }/>
                <Route path='/admin/orders' element={
                    <>
                      <AdminNavbar setAdminToken={setAdminToken} />
                      <hr className='text-gray-200' />
                      <div className='flex w-full min-h-[90vh]'>
                        <AdminSidebar />
                        <div className='flex-1 p-4'>
                          <OrdersPage adminToken={adminToken} />
                        </div>
                      </div>
                    </>
                  }/>
              </>) : (
              // Redirect any /admin/* route if not logged in
              <Route path='/admin/*' element={<Navigate to="/admin/login" />} />
            )}
          </Routes>
        </div>
      )}
    </>
  )
}

export default App;
