const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017"; Not worked
const mongoURI = "mongodb://0.0.0.0:27017";

// This function for connect to the mongooes if not then show the error 
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(() => {
        console.log("Connect To Mongo Successfully !!");
    }).catch(err => {console.log(err);})
}

module.exports = connectToMongo;