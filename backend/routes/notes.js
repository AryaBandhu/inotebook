const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let obj = {
        title: 'this is a title ',
        discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, mollitia'
    }
    res.json(obj);
})

module.exports = router;