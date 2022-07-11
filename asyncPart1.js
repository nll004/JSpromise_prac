// Part One - Promises
const numfactsURL = 'http://numbersapi.com';
const numArray = [54, 73, 10, 49]

function randomNumber(){
    // generate random number between 0 and 99
    return Math.floor(Math.random() * 100);
}


// 1
async function getSingleNumberFact(){
    const results = await axios.get(`${numfactsURL}/${randomNumber()}?json`)
    console.log("Async single number fact:", results)
};

getSingleNumberFact();

// 2
async function getMultipleNumberFacts(arrayOfNumbers){
    let res = await $.getJSON(`${numfactsURL}/${arrayOfNumbers}?json`)
    console.log('Multiple async facts', res)
    return res
};

getMultipleNumberFacts(numArray)

// 3
async function displayMultipleNumberFacts(num){
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${numfactsURL}/${num}?json`))
      );
      facts.forEach(data => {
        $('#part-one').append(`<p>${data.text}</p>`);
      });
}

displayMultipleNumberFacts(94)
