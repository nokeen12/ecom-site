const router = require('express').Router();
// const express = require('express');
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const mongoose = require('mongoose');
// const { useResolvedPath } = require('react-router-dom');
// const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

router.post('/cart', (req,res)=>{
    const { productId, userId } = req.body;
    Product.findById(productId)
        .then(foundProduct => {
            User.findByIdAndUpdate(userId, { $push: { cart: foundProduct}})
                .then(response => res.json(response))
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
})

router.put('/cart', (req,res)=>{
    const { userId, sendTitle } = req.body;
    Product.find({title: sendTitle})
    .then(foundProduct =>{
        User.findByIdAndUpdate(userId, { $unset: { cart: foundProduct}})
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})
module.exports = router;