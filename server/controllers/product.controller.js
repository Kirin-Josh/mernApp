import mongoose from "mongoose";
import Product from "../models/product.model";

export const getProducts = async (res, req) => {
    try {
        const products = await Product.find({});
    } catch (error) {
        console.error("error in fetching products:", error.message);
        res.status(500).json({ success: false, data: products });
    }
}

export const addProducts = async (res, req) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success: false, message: "server error" });
        
    }
}

export const editProducts = async (res, req) => {
    const { id } = req.params

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProducts = async (res, req) => {
    const { id } = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "product deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "poduct not found" });
    }
}