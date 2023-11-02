function onReady() {
  console.log("JavaScript is loaded!")

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
}



let guessCount = 1

function pushGuesses(event) {
  
  event.preventDefault()
  console.log('Attempt to push.')
  let arrayToPush = []
  for(i=1; i<=6; i++){
    arrayToPush.push(document.getElementById(`guess${i}`).value)
    document.getElementById(`guess${i}`).value = ''
  }
  for(let i=0; i<=arrayToPush.length; i++) {
    for(let o=0; o<=arrayToPush.length; o++) {
      if (o===i){
        console.log('carry on')
      }
      else if (arrayToPush[i] === arrayToPush[o]){
        console.log(arrayToPush[i], 'and', arrayToPush[o], 'match')
        return
      }
    }
  }
  axios({
    method: 'POST',
    url: '/highorlow',
    data: {arrayToPush}
  }).then(function(response) {
    console.log("SUCCESS!!!");
    callGuessList()
  })
}

function callGuessList(){
  axios({
    method: 'GET',
    url: '/highorlow'
  }).then(function(response){
    console.log(response.data)

    console.log(response.data[1])
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
  for(let index of data) {
    if (index.status === 'THE NUMBER')
      console.log('NUMBER FOUND!')

  }

}

onReady()
