function onReady() {
  console.log("JavaScript is loaded!")
}

function pushGuesses(event) {
  event.preventDefault()
  console.log('Attempt to push to guess')
  axios({
    method: 'POST',
    url: '/highorlow',
    data: {guess1: 'blank'}
  }).then(function(response) {
      console.log("SUCCESS!!!");
      getList();
})
}

onReady()
