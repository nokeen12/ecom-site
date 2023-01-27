const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = require("express").Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const saltRounds = 10;

router.post('/signup',(req,res)=>{
    const { username, email, password } = req.body;

    if(username === '' || email === '' || password === ''){
        res.status(400).json({message:"Provide username, email and password"});
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    } 

    User.findOne({ email })
    .then((foundUser) => {
        // If the user with the same email already exists, send an error response
        if (foundUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        if(!foundUser){
            User.findOne({ username })
            .then(foundUser =>{
                if (foundUser){
                    res.status(400).json({ message: "User already exists." });
                    return;
                }
                // If email is unique, proceed to hash the password
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password, salt);
            
                // Create the new user in the database
                // We return a pending promise, which allows us to chain another `then` 
                return User.create({ username, email, password: hashedPassword, cart: [] });
            })
            .then((createdUser) => {
                // Deconstruct the newly created user object to omit the password
                // We should never expose passwords publicly
                if(createdUser){
                const { username, email, _id } = createdUser;
            
                // Create a new object that doesn't expose the password
                const user = { username, email, _id };
                // Send a json response containing the user object
                res.status(201).json({ user: user });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Internal Server Error" })
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    });
})

router.post('/login',(req,res)=>{
    const { email, password } = req.body;
 
    // Check if email or password are provided as empty string 
    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }
   
    // Check the users collection if a user with the same email exists
    User.findOne({ email })
    .then((foundUser) => {
        
        if (!foundUser) {
            // If the user is not found, send an error response
            res.status(401).json({ message: "User not found." })
            return;
        }

        // Compare the provided password with the one saved in the database
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    
        if (passwordCorrect) {
            // Deconstruct the user object to omit the password
            const { _id, username, email } = foundUser;
            
            // Create an object that will be set as the token payload
            const payload = { _id, username, email };
            // Create and sign the token
            const authToken = jwt.sign( 
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: 'HS256', expiresIn: "6h" }
            );

            // Send the token as the response
            res.status(200).json({ authToken: authToken });
        }
        else {
            res.status(401).json({ message: "Unable to authenticate the user" });
        }
    
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
})

router.get('/verify', isAuthenticated, (req,res)=>{
    console.log(`req.payload`, req.payload);
    res.status(200).json(req.payload);
})




module.exports = router;