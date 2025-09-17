import Order from '../models/Order.js';
import User from '../models/User.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

// Global Variables
const currency = 'inr';
const deliveryCharge = 10;

// Gateway Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// COD Method
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address} = req.body;
        const orderData = {
            userId: req.userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(req.userId, {cartData: {}});
        res.json({success: true, message: "Order Placed"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Stripe Method
export const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address} = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId: req.userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });
        res.json({success: true, session_url: session.url});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Verify Stripe
export const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body;
    try{
        if(success === "true"){
            await Order.findByIdAndUpdate(orderId, {payment: true});
            await User.findByIdAndUpdate(req.userId, {cartData: {}});
            res.json({success: true});
        }else{
            await Order.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Razorpay Method
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address} = req.body;
        const orderData = {
            userId: req.userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options, (error, order) => {
            if(error){
                console.log(error);
                return res.json({success: false, message: error.message});
            }
            res.json({success: true, order});
        });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Verify Razorpay
export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await User.findByIdAndUpdate(req.userId, {cartData: {}});
            res.json({success: true, message: 'Payment Successful'});
        }else{
            res.json({success: false, message: 'Payment Failed'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Display All Orders for Admin
export const allOrders = async (req, res) => {
    try{
        const orders = await Order.find({});
        res.json({success: true, orders});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    } 
}

// User Order Data
export const userOrders = async (req, res) => {
    try{
        const orders = await Order.find({userId: req.userId});
        res.json({success: true, orders});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Update Order Status for Admin
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: 'Status Updated!'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}