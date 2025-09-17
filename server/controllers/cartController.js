import User from '../models/User.js';

export const addToCart = async (req, res) => {
    try {
        const {itemId, size} = req.body;
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {};
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
        await User.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: "Added To Cart!"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export const updateCart = async (req, res) => {
    try {
        const {itemId, size, quantity} = req.body;
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {};
        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: "Cart Updated!"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export const getUserCart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {};
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}