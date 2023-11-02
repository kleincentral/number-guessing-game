const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Can read JSON when passed.
app.use(express.json());


// GET & POST Routes go here

app.get('/highorlow', (req, res) => {
  console.log('Request was made!')
})

app.post('/highorlow', (req,res)=> {
  console.log('Info recieved!')
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
