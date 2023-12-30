const express = require('express');
const router = express.Router();
const fetchuser = require('../Middlewere/fetchuser')
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const Notes = require('../Models/Notes');

//ROUTE 1:  Fetch all Notes GET : "api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        res.status(401).json({ error: "Notes Not Found yet Internal Problem" });
    }
})

//ROUTE 2:  Add a New Notes GET : "api/notes/addnote" Login Required
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

        const { title, discription, tag } = req.body; //destructuring the all the data
        const note = new Notes({
            title, discription, tag, user: req.user.id  //user : req.user.id for get user id
        })
        const SaveNotes = await note.save();
        res.json(SaveNotes);

    } catch (error) {
        res.status(500).send("Internal Server Error | Notes No Added");
    }
});

//ROUTE 3:  Update Notes PUT : "api/notes/updatenotes" Login Required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {
        // newNotes Basiclly use for save the changes after that send the server
        const { title, discription, tag } = req.body;
        let newNotes = {};
        if (title) {
            newNotes.title = title;
        };
        if (discription) {
            newNotes.discription = discription;
        };
        if (tag) {
            newNotes.tag = tag;
        };

        //check these notes persent or not 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send({ error: "Notes Not Found !" });
        };

        //check apply changes same user or not 
        if (note.user.toString() !== req.user.id) {
            res.status(401).send({ error: " Access Denied !!" });
        };

        // update Note in the database and save it 
        const finalNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json({ finalNote });

    } catch (error) {
        res.status(500).json({ error: " Internal Server Error |can't update at this time " })
    }
});

//ROUTE 4:  Deleted Notes DELETE : "api/notes/deletenotes" Login Required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        // check notes Available or not
    const note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).send({ error: "Note Note Found " });
    };

    // check the user same or diffrent 
    if(note.user.toString() !== req.user.id){
        res.status(403).send({error : "Access denied"});
    };

    const value = await Notes.findByIdAndDelete(req.params.id);
    res.json({"successful": "Notes Deleted successful !!" , notes : value });
    } catch (error) {
        res.status(500).send("Internal Server Error | Can't Delete at this time");
    }

    

})
module.exports = router;