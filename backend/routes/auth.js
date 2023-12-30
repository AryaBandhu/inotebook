const express = require('express');
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
// for password Protection 
const bcrypt = require('bcrypt');
// JWT Token for genrate a tocken 
const jwt = require('jsonwebtoken');
const JWT_Secret = 'Iamaryabandhu';
const fetchuser = require('../Middlewere/fetchuser')

//ROUTE 1: create a New User with POST : "api/auth/create-user/" no Login Required
router.post('/create-user', [

    // for authentication name, email & password 
    body('name', "please Enter the valid name !!").isLength({ min: 3 }),
    body('email', "Email address not correct !!").isEmail(),
    body('password', "Password must be more then 8 character !!").isLength({ min: 8 })
],
    async (req, res) => {

        try {
            // Validation errors check 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            console.log(req.body);

            // in our password add a new saltpassword then store Database 
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password.toString(), salt);

            // for create a new user with all authentication 
            const user = await User.create({
                name: req.body.name,
                password: secpass,
                email: req.body.email
            })
                .catch(err => {             /*if any error face then exetute this code*/
                    res.json({ error: "Please Enter the unique Email ", message: err.message });
                    console.error("Please Enter the unique Email ");
                })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authentication = jwt.sign(data, JWT_Secret); //send encrypt data in to database
            res.json({ authentication });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }

);


//ROUTE 2:  Login User with POST : "api/auth/login/" no Login Required
router.post('/login', [
    body('email', "Email address not correct !!").isEmail(),
    body('password', "Password must be more then 8 character !!").notEmpty()
],
    async (req, res) => {

        // if error is ocure in request then run these line 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() });
        }

        const {email , password} = req.body;

        try {

            // check email exists or not in database
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error :"Pleasae try to login with correct credential !!"});
            }

            // check password with bcrypt correct or not
            let passwordCompair = await bcrypt.compare(password.toString(), user.password); // data and hash must be string 
            if(!passwordCompair){
                return res.status(400).json({error :"Pleasae try to login with correct credential !!"});
            }

            // send authentication token with JWT 
            const data = {
                user: {
                    id: user.id
                }
            }
            const authentication = jwt.sign(data, JWT_Secret);
            res.json({ authentication });
            

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//ROUTE 3:  Get User with POST : "api/auth/getuser" Login Required
router.post('/getuser' , fetchuser , async (req , res ) =>{
    try{
        const userid = req.user.id;
        // const user = await User.findById(userid).select("-password"); both are same line 
        const user = await User.findById(userid, ("-password"));       //both are same line
        res.json(user);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;