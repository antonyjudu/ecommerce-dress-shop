import React from 'react'
import Title from '../components/Title.jsx';
import { assets } from '../assets/assets.js';
import NewsLetterBox from '../components/NewsLetterBox.jsx';

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[400px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At our dress shopping portal, we believe fashion is more than just clothing—it is an expression of confidence, individuality, and lifestyle. Our collection brings together carefully curated dresses that blend timeless elegance with modern trends, making it easy for every customer to find something that resonates with their style.</p>
          <p>Our collection represents a fusion of versatility, creativity, and culture, making it more than just a shopping experience. Each dress is handpicked to reflect the latest global trends while staying true to timeless silhouettes that never go out of style.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We focus on providing our customers with a wide selection of colors, patterns, and designs that flatter all body types and preferences.Our team is passionate about helping customers feel confident, beautiful, and ready to make memories in outfits that truly stand out.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We place the highest priority on quality assurance to ensure that every dress in our collection meets our customers’ expectations.</p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We understand that shopping should be simple, fast, and stress-free, which is why our platform is built with your convenience in mind.</p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5'>
          <b>Exceptional-Customer Service:</b>
          <p className='text-gray-600'>At the heart of our shopping experience is a commitment to exceptional customer service.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
