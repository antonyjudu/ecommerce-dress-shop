import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '');
    
    useEffect(() => {
    if (userToken) {
        localStorage.setItem('userToken', userToken);
    }
    }, [userToken]);

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if(userToken){
            try {
                const res= await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{usertoken: userToken}});
                toast.success(res.data.message);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(userToken){
            try{
                const res = await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {usertoken: userToken}});
                toast.success(res.data.message);
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/product/list');
            if(res.data.success){
                setProducts(res.data.products);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (userToken) => {
        try {
            const res = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {usertoken: userToken}});
            if(res.data.success){
                setCartItems(res.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    },[]);

    useEffect(() => {
    if (userToken) {
        getUserCart(userToken);  // ✅ Always fetch cart for logged in user
    }
}, [userToken]);


    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
         navigate, userToken, setUserToken, getUserCart
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;