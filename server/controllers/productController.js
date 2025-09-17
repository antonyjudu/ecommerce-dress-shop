import {v2 as cloudinary} from 'cloudinary';
import product from '../models/Product.js';

// Add Product
export const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        const products = new product(productData);
        await products.save();
        res.json({success: true, message: "Product Added"});
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}

// List Product
export const listProducts = async (req, res) => {
    try {
        const products = await product.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Remove Product
export const removeProduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product Removed!"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Single Product
export const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const products = await product.findById(productId);
        res.json({success: true, products});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}