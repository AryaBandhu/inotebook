const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user :{
        type : mongoose.Schema.ObjectId
    },
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

module.exports = mongoose.model('notes', NotesSchema);