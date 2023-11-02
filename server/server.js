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
let allArray = [];

let test = {
  name: 2,
  3: 'string'
}

function callRand() {
  let rand = Math.random()*24+1
  rand = Math.round(rand)
  console.log(rand)
  return rand
}

function compareValues(array) {
  let count = 0
  for(let index of array) {
    if (index < random){
      content = {
        guess: index, status: 'too low'
      }
      allArray.push(content)
    }
    else if (index > random) {
      content = {
        guess: index, status: 'too high'
      }
      allArray.push(content)
    }
    else {
      content = {
        guess: index, status: 'THE NUMBER'
      }
      allArray.push(content)
    }
    count ++
  }
  console.log(allArray)
  return allArray
}



// GET & POST Routes go here

app.get('/highorlow', (req, res) => {
  console.log('Request was made!')
  res.send(allArray);
  allArray=[]
})

app.post('/highorlow', (req,res)=> {
  console.log('Info recieved!')
  console.log(req.body)
  console.log(req.body.arrayToPush)
  console.log(compareValues(req.body.arrayToPush))
  res.sendStatus(201)

})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
