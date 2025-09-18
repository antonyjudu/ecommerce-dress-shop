import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // NEW
  const { setShowSearch, getCartCount, navigate, userToken, setUserToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken("");
    setCartItems({});
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/"><img src={assets.logo} className="w-36" alt="Logo" /></Link>

      {/* Navbar Links (desktop) */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile */}
        <div className="relative">
          <img
            onClick={() => {
              if (userToken) {
                setDropdownOpen(!dropdownOpen); // toggle dropdown
              } else {
                navigate('/login');
              }
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
          {userToken && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p
                onClick={() => navigate('/orders')}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p
                onClick={logout}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar menu (mobile) */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex-col text-gray-500 gap-2 inline-flex">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <div className="inline-block">
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/">HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/contact">CONTACT</NavLink>
            
            {/* Mobile Logout */}
            {userToken ? (
              <p
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="py-2 pl-6 cursor-pointer hover:text-black"
              >
                LOGOUT
              </p>
            ) : (
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6"
                to="/login"
              >
                LOGIN
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
