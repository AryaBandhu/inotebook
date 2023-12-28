const express = require('express');
const router = express.Router();

router.get('/', (req , res) => {
    const obj = {
        name: 'Arya Bandhu',
        age : 20,
        city: 'dehradun'
    }
    res.json(obj);
})

module.exports = router;