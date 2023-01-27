const router = require('express').Router();
const Product = require('../models/Product.model');
const mongoose = require('mongoose');

router.get('/products', (req, res, next)=>{
    Product.find()
    .then(allProducts=>res.json(allProducts))
    .catch(err => res.json(err))
})
router.post('/products', (req, res, next)=>{
    const { title, weight, desc, sku, gallery, price } = req.body;

    Product.create({title, weight,desc,sku,gallery,price})
    .then(response =>res.json(response))
    .catch(err=>res.json(err))
})

router.get('/products/:productId', (req, res)=>{
    const { productId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        res.status(400).json({message: 'Specified id is not valid'});
        return;
    }

    Product.findById(productId)
    .then(product => res.status(200).json(product))
    .catch(err => res.json(err));
})

router.put('/products/:productId',(req, res)=>{
    const { productId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        res.status(400).json({message: 'Specified id is not valid'});
        return;
    }

    Product.findByIdAndUpdate(productId, req.body, {new: true})
    .then(updatedProduct => res.json(updatedProduct))
    .catch(err => res.json(err))
})

router.delete('/products/:productId',(req, res)=>{
    const { productId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        res.status(400).json({message: 'Specified id is not valid'});
        return;
    }

    Product.findByIdAndRemove(productId)
    .then(() => res.json({message: `Product with ${productId} removed successfully`}))
    .catch(err => res.json(err));
})

module.exports = router;