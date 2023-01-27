const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: String,
    weight: Number,
    desc: String,
    sku: String,
    gallery: Array,
    price: String,
})

const Product = model("Product", productSchema);

module.exports = Product;