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


// Code for Random

let random = callRand();

function callRand() {
  let rand = Math.random()*24+1
  rand = Math.round(rand)
  console.log(rand)
  return rand
}

function compareValues(array) {
  let returnArray = {}
  for(let index of array) {
    if (index > random){
      returnArray[index] = 'higher'
    }
    else if (index < random) {
      returnArray[index] = 'lower'
    }
    else{
      returnArray[index] = 'equal'
    }
  }
  return returnArray
}



// GET & POST Routes go here

app.get('/highorlow', (req, res) => {
  console.log('Request was made!')
})

app.post('/highorlow', (req,res)=> {
  console.log('Info recieved!')
  console.log(req.body)
  console.log(req.body.arrayToPush)
  console.log(compareValues(req.body.arrayToPush))
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
