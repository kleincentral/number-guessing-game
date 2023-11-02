function onReady() {
  console.log("JavaScript is loaded!")
}

function pushGuesses(event) {
  event.preventDefault()
  console.log('Attempt to push.')
  let arrayToPush = []
  for(i=1; i<=6; i++){
    arrayToPush.push(document.getElementById(`guess${i}`).value)
  }
  axios({
    method: 'POST',
    url: '/highorlow',
    data: {arrayToPush}
  }).then(function(response) {
      console.log("SUCCESS!!!");
      getList();
})
}

onReady()
