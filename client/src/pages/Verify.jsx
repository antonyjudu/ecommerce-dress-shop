import { useContext } from 'react';
import { ShopContext, backendUrl } from '../context/ShopContext.jsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Verify() {
    const {navigate, userToken, setCartItems} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async (e) => {
        try{
            if(!userToken){
                return null;
            }
            const res = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {usertoken: userToken}});
            if(res.data.success){
                setCartItems({});
                navigate('/orders');
            }else{
                navigate('/cart');
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    },[userToken]);

  return (
    <div>
      
    </div>
  )
}

export default Verify
