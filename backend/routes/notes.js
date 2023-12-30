const express = require('express');
const router = express.Router();
const fetchuser = require('../Middlewere/fetchuser')
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const Notes = require('../Models/Notes');

//ROUTE 1:  Fetch all Notes GET : "api/auth/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        res.status(401).json({ error: "Notes Not Found yet Internal Problem" });
    }
})

//ROUTE 2:  Add a New Notes GET : "api/auth/addnote" Login Required
router.get('/addnote', fetchuser, [

    // check title and discription valid or not 
    body('title', "please Enter the valid title !!").isLength({ min: 3 }),
    body('discription', "discription must be more then 8 char").isLength({ min: 8 })

], async (req, res) => {

    try {
        // Validation errors check 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title , discription, tag } = req.body; //destructuring the all the data
        const note = new Notes ({
            title , discription , tag , user : req.user.id  //user : req.user.id for get user id
        })
        const SaveNotes = await note.save();
        res.json(SaveNotes);

    } catch (error) {
        res.status(500).send("Internal Server Error | Notes No Added");
    }


});

module.exports = router;