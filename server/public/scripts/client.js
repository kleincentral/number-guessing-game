function onReady() {
  console.log("JavaScript is loaded!")
}

//need a variable on the global scale.
let guessCount = 1

function callRandom() {
  //sets the min and max of the axios to get the random number at the end.
  min = document.getElementById('min').value
  max = document.getElementById('max').value

  //sets HTML content to what the page should look like
  document.getElementById('whereShitGo').innerHTML =
  `<h1>YOUR GAME HERE!</h1>

  <h2>Guesses</h2>
  <form>
    <input type="number"
    placeholder="Leo"
    id="guess1">
    <input type="number"
    placeholder="Braden"
    id="guess2">
    <input type="number"
    placeholder="Essie"
    id="guess3">
    <input type="number"
    placeholder="Walker"
    id="guess4">
    <input type="number"
    placeholder="Sean"
    id="guess5">
    <input type="number"
    placeholder="Mark"
    id="guess6">
    <button onclick="pushGuesses(event)">Guess</button>
  </form>
  <table style="width: 100%;" id="guessContent">
    <tr>
      <td>ROUND NUMBER!</td>
      <td>Leo</td>
      <td></td>
      <td>Braden</td>
      <td></td>
      <td>Essie</td>
      <td></td>
      <td>Walker</td>
      <td></td>
      <td>Sean</td>
      <td></td>
      <td>Mark</td>
      <td></td>
    </tr>
  </table>`

  //post to send the min and max of our random range to the server
  axios({
    method: 'POST',
    url: '/setrand',
    data: {
      value1: min,
      value2: max
    }
  }).then(function(response) {
    //no return, but lets us know our random number was set.
    console.log("Random Number Set!");
  })

}

function resetPage() {
  //resets the page to what it was originally for when we hit the reset button.
  guessCount = 1
  document.getElementById('whereShitGo').innerHTML =
  `<h1>Choose the Number Range!</h1> 
  <form>
    <input type="number"
    placeholder="min"
    id="min">
    <input type="number"
    placeholder="max"
    id="max">
    <button onclick="callRandom()">Values!</button>
  </form>`
}


function pushGuesses(event) {
  event.preventDefault()
  console.log('Collecting Guesses.')
  
  //makes an empty array to store the guesses in
  let arrayToPush = []
  for(i=1; i<=6; i++){

    //adds values to the array
    arrayToPush.push(document.getElementById(`guess${i}`).value)

    //once the last index is reached, first checks if any indexes match.
    if (i === 6) {
      for(let j=0; j<=arrayToPush.length; j++) {
        for(let o=0; o<=arrayToPush.length; o++) {
          if (o===j){
            //indexes do not match, onto another test.
            console.log('carry on')
          }
          else if (arrayToPush[j] === arrayToPush[o]){
            //indexes do match, return before clearing guess content.
            console.log(arrayToPush[j], 'and', arrayToPush[o], 'match')
            return
          }
        }
      }
      //clear guess content at the end, to make sure its not cleared before
        // checking if there are identical values.
      document.getElementById(`guess1`).value = ''
      document.getElementById(`guess2`).value = ''
      document.getElementById(`guess3`).value = ''
      document.getElementById(`guess4`).value = ''
      document.getElementById(`guess5`).value = ''
      document.getElementById(`guess6`).value = ''
    }
  }

  //post method to send my new array of numbers to the server.
  axios({
    method: 'POST',
    url: '/highorlow',
    data: {arrayToPush}
  }).then(function(response) {
    console.log("Posted Numbers to Server!");

    //calls a function to get output from our server.
    callGuessList()
  })
}

function callGuessList(){

  //gets a number array with 'higher than' 'lower than' 'equal'
   // status' in order to find out if we guessed the number.
  axios({
    method: 'GET',
    url: '/highorlow'
  }).then(function(response){
    console.log('recieved', response.data)

    //renders new data in a row so users can see it.
    renderNewRow(response.data)

    //checks if the number was guessed by a player
    checkIfDone(response.data)
  })
}

function renderNewRow(data){

  //sets a variable to correctly show player guess data on the DOM
  let append = `<tr><td>${guessCount}</td>`
  for(let index of data) {
    append += `
      <td>${index.guess}</td>
      <td>${index.status}</td>`
  }
  append+=`</tr>`
  
  //console logs it to check it is what is expected
  console.log(append)

  //adds to the DOM, and increments guess count since a round of guessing has passed
  document.getElementById('guessContent').innerHTML += append
  guessCount ++
}

function checkIfDone(data){
  //console logs explain fairly well, loop to check if the status is 
    //the unique one which returns when the number is the same.
  console.log('Checking if Number was met loop starting...')
  for(let index of data) {
    if (index.status === `THE NUMBER`) {
      
      //if the number is the same, add the resetPage button to the bottom and return.
      console.log('NUMBER FOUND!')
      document.getElementById('whereShitGo').innerHTML += '<button onclick="resetPage()">Reset</button>'
      return
    }
  }
  console.log('No match found.')
}

//calls onready to make sure javascript works!
onReady()
