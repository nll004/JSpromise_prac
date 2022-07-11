const cardsApiUrl = 'https://deckofcardsapi.com/api/deck'

// 1.
async function draw1Card() {
  let data = await axios.get(`${cardsApiUrl}/new/draw/`);
  let card = data.data.cards[0];
  console.log(`Async Draw Card: ${card.value} of ${card.suit}`);
};
draw1Card()

// 2.
async function draw2Cards() {
  let res1 = await axios.get(`${cardsApiUrl}/new/draw/`);
  let card1 = res1.data.cards[0]

  let deckId = res1.data.deck_id

  let res2 = await axios.get(`${cardsApiUrl}/${deckId}/draw/`);
  let card2 = res2.data.cards[0]

  console.log(`Async Draw 2 cards: `)
  console.log(`Card 1: ${card1.value} of ${card1.suit}`)
  console.log(`Card 2: ${card2.value} of ${card2.suit}`)
};

draw2Cards()

// ==================================================================================================

let deckIdentifier = ''

async function startGame(){
    await $.getJSON(`${cardsApiUrl}/new/draw/`)
    .then(data => {
      card = data.cards[0]
      deckIdentifier = data.deck_id
      $('#card-container').append(`<img src='${card.image}' width=150px height=300px>`)
    })
}

async function drawCard(){
    await $.getJSON(`${cardsApiUrl}/${deckIdentifier}/draw`)
    .then(data => {
      card = data.cards[0]
      $('#card-container').append(`<img src='${card.image}' width=150px height=300px>`)
    })
}

$('#draw-card').on('click', function(){
    if (!deckIdentifier){
      startGame()
    }
    else {
      drawCard()
    }
})

$('#new-game').on('click', function(e){
    console.log(e.target)
    $('#card-container').empty()
    startGame()
})
