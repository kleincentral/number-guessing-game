function onReady() {
  console.log("JavaScript is loaded!")
}

function callRandom() {
  min = document.getElementById('min').value
  max = document.getElementById('max').value
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
  axios({
    method: 'POST',
    url: '/setrand',
    data: {
      value1: min,
      value2: max
    }
  }).then(function(response) {
    console.log("Random Number Set!");
  })

}

function resetPage() {
  document.getElementById('whereShitGo').innerHTML = 
  `<form>
    <input type="number"
    placeholder="min"
    id="min">
    <input type="number"
    placeholder="max"
    id="max">
    <button onclick="callRandom()">Values!</button>
  </form>`
}

let guessCount = 1

function pushGuesses(event) {
  
  event.preventDefault()
  console.log('Collecting Guesses.')
  let arrayToPush = []
  for(i=1; i<=6; i++){
    arrayToPush.push(document.getElementById(`guess${i}`).value)
    if (i === 6) {
      for(let j=0; j<=arrayToPush.length; j++) {
        for(let o=0; o<=arrayToPush.length; o++) {
          if (o===j){
            console.log('carry on')
          }
          else if (arrayToPush[j] === arrayToPush[o]){
            console.log(arrayToPush[j], 'and', arrayToPush[o], 'match')
            return
          }
        }
      }
      document.getElementById(`guess1`).value = ''
      document.getElementById(`guess2`).value = ''
      document.getElementById(`guess3`).value = ''
      document.getElementById(`guess4`).value = ''
      document.getElementById(`guess5`).value = ''
      document.getElementById(`guess6`).value = ''
    }
  }
  axios({
    method: 'POST',
    url: '/highorlow',
    data: {arrayToPush}
  }).then(function(response) {
    console.log("Posted Numbers to Server!");
    callGuessList()
  })
}

function callGuessList(){
  axios({
    method: 'GET',
    url: '/highorlow'
  }).then(function(response){
    console.log('recieved', response.data)
    renderNewRow(response.data)
    checkIfDone(response.data)

  })
}

function renderNewRow(data){
  let append = `<tr><td>${guessCount}</td>`
  for(let index of data) {
    append += `
      <td>${index.guess}</td>
      <td>${index.status}</td>`
  }
  append+=`</tr>`
  console.log(append)
  document.getElementById('guessContent').innerHTML += append
  guessCount ++
}

function checkIfDone(data){
  console.log('Checking if Number was met loop starting...')
  for(let index of data) {
    if (index.status === `THE NUMBER`) {
      console.log('NUMBER FOUND!')
      document.getElementById('whereShitGo').innerHTML += '<button onclick="resetPage()">Reset</button>'
      guessCount = 1
      return
    }
  }
  console.log('No match found.')
}

onReady()
