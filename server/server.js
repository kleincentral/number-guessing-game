//requirements, setting PORT to 5000
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


// some base attributes, setting Random and an Array which is returned when get is called.
  //allArray could be taken out, but this allows to save player data if thats a change
  //I want to implement
let random = 0;
let allArray = [];


function callRand(min, max) {
  //setting a random number, range of minimum to maximum. 
  let rand = Math.random()*(max-min)+min
  rand = Math.round(rand)
  console.log(rand)
  return rand
}

function compareValues(array) {
  //takes the guesses passed from the POST method, and checks if they are
    //higher lower or equal.
  for(let index of array) {
    if (index < random){
      content = {
        guess: index, status: 'too low'
      }
      allArray.push(content)
      //lower
    }
    else if (index > random) {
      content = {
        guess: index, status: 'too high'
      }
      allArray.push(content)
      //higher
    }
    else {
      content = {
        guess: index, status: 'THE NUMBER'
      }
      allArray.push(content)
      //equal
    }
  }
  console.log(allArray)
  //return the array of numbers under guess + the higher/lower/equal under status.
  return allArray
}



// GET & POST Routes go here

app.get('/highorlow', (req, res) => {
  console.log('Request was made!')

  //sends the array of higher/lower/equal to the client, then clears the array after
  res.send(allArray);
  allArray=[]
})

app.post('/highorlow', (req,res)=> {
  console.log('Info recieved!')
  
  //pushes values to compareValues and sends a confirmation back to the client that 
    //the data was recieved.
  compareValues(req.body.arrayToPush)
  res.sendStatus(201)

})

app.post('/setrand', (req, res) => {
  console.log('Request was made!')

  //sets random equal to a new random. Gives the max and min values from
    //post values given. Sends back a confirmation so the client knows data
    //was recieved.
  random = callRand(req.body.value1, req.body.value2)
  res.sendStatus(201)
})



//PORT for app running
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
