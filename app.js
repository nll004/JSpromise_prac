const factsBaseURL = 'http://numbersapi.com';
let faveNum = 7;
let nums_list = [10,2,5,9];

// ===============================================================
// ----------------------- Part One -----------------------------
// ===============================================================

// 1.
$.getJSON(`${factsBaseURL}/${faveNum}?json`)
    .then(data => $('#part-one').append(`<p>-- ${data.text}</p>`));

// 2.
$.getJSON(`${factsBaseURL}/${nums_list}?json`)
    .then(data => {
        for(let key in data){
            $('#part-one').append(`<p>${data[key]}</p>`)}});

// 3.
Promise.all(
        Array.from({ length: 4 }, () => {
          return $.getJSON(`${factsBaseURL}/${faveNum}?json`);
        })
      ).then(facts => {
        facts.forEach(data => $("#part-one").append(`<p>=====${data.text}</p>`));
      });


// ===============================================================
// ----------------------- Part Two -----------------------------
// ===============================================================

let cardsBaseURL = 'https://deckofcardsapi.com/api/deck';

// 1.

$.getJSON(`${cardsBaseURL}/new/draw/`).then(data => {
  let card = data.cards[0]
  console.log(`${card.value} of ${card.suit}`);
});


// 2.
const cards = []
let deckId = ''

function useCards(){
  cards.forEach(function(el) {
    console.log(`${el.value} of ${el.suit}`)
  })
}

$.getJSON(`${cardsBaseURL}/new/draw/`)
  .then(data => {
    cards.push(data.cards[0])
    deckId = data.deck_id
    return $.getJSON(`${cardsBaseURL}/${deckId}/draw/`)
  })
  .then(data => {
    cards.push(data.cards[0])
    useCards()
  })


// 3.
let deckIdentifier = ''

function startGame(){
    $.getJSON(`${cardsBaseURL}/new/draw/`)
    .then(data => {
      card = data.cards[0]
      deckIdentifier = data.deck_id
      $('#card-container').append(`<img src='${card.image}' width=150px height=300px>`)
    })
}

function drawCard(){
    $.getJSON(`${cardsBaseURL}/${deckIdentifier}/draw`)
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

$('#new-game').on('click', function(){
    $('#card-container').empty()
    startGame()
})
