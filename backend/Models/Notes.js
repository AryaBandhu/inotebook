const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type: String,
        require : true
    },
    discription :{
        type: String,
        require : true,
    },
    tag :{
        type: String,
        default: "Gernal"
    },
    date :{
        type : Date,
        default: Date.now
    }
  
});

module.exports = mongoose.model('user', NotesSchema);