import React from 'react'

function NewsLetterBox() {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & Get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et omnis doloremque possimus cupiditate perspiciatis id a optio ex consequatur expedita, distinctio ut perferendis, quos natus odio, dolor vero. Dolorum, rerum!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type='email' placeholder='Enter your Email' className='w-full sm:flex-1 outline-none' required />
        <button className='bg-black text-white text-xs px-10 py-4 cursor-pointer' type='submit'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
