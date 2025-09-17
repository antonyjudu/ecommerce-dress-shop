import React, { useContext, useEffect, useState } from 'react'
import { ShopContext, backendUrl } from '../context/ShopContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const {navigate, userToken, setUserToken} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currentState === "Sign Up"){
        const res = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(res.data.success){
          setUserToken(res.data.userToken);
        }
        else{
          toast.error(res.data.message);
        }
      }
      else{
        const res = await axios.post(`${backendUrl}/api/user/login`, {email, password});
        if(res.data.success){
          setUserToken(res.data.userToken);
        }else{
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(userToken){
      navigate('/');
    }
  },[userToken]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === 'Login' ? 
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create an Account</p> : 
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Now</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'LOGIN' : 'REGISTER'}</button>
    </form>
  )
}

export default Login
