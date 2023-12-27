const connectToMongo = require('./db.js');
const express = require('express')

connectToMongo(); // database connect

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Arya Bandhu')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})