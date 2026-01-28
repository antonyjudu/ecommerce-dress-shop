import React from 'react'
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt='logo' />
            <p className='w-full md:w-2/3 text-gray-600'>
                Your destination for stylish, trend-forward dresses. From everyday elegance to statement pieces, we bring you curated fashion you’ll love. Subscribe for the latest arrivals, exclusive deals, and style tips.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to='/'><li className='cursor-pointer'>Home</li></Link>
                <Link to='/about'><li className='cursor-pointer'>About Us</li></Link>
                <li className='cursor-pointer'>Delivery</li>
                <li className='cursor-pointer'>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-1234567890</li>
                <li>contactsfrom@forever.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
