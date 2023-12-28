const express = require('express');
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// create a New User with POST :  "api/auth" . not required auth must
router.post('/', [

    body('name', "please Enter the valid name !!").isLength({ min: 3 }),
    body('email', "Email address not correct !!").isEmail(),
    body('password', "Password must be more then 8 character !!").isLength({ min: 8 })
],

    async (req, res) => {

        // Validation errors check 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        .then(user => res.json(user))
        .catch(err => {             /*if any error face then exetute this code*/
            res.json({error : "Please Enter the unique Email ", message: err.message});
            console.error("Please Enter the unique Email ");
        })
    }

);

module.exports = router;