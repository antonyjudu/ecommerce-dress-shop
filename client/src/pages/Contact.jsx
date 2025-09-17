import React from 'react'
import Title from '../components/Title.jsx';
import { assets } from '../assets/assets.js';
import NewsLetterBox from '../components/NewsLetterBox.jsx';

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[400px]' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>33, South street, Trichy, <br /> Tamil Nadu, India. </p>
          <p className='text-gray-500'>Phone: (+91) 1234567890 <br /> Email: admin@forever.com</p>
          <p className='font-semibold text-xl text-gray-600'>Carrers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
