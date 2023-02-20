console.log("Scripts loaded!");

cards = document.getElementById("cards");
console.log(cards);

const input = document.getElementById("number-of-cards");
console.log(input);

const time = document.getElementById("time");
const round = document.getElementById("round");
const score = document.getElementById("score");
console.log(score);

var clickCount = 0;
var roundCount = 1;
var cardValue = [0, 0, 0];

cards.addEventListener("click", (e) => {
  //handles clicking on cards
  console.log(e.srcElement);
  var target = e.srcElement;

  //Flips card to Front and add Count
  if (target.className === "card back") {
    target.className = "card front";
    clickCount++;

    //Saves Selected Value on Flip
    cardValue[clickCount - 1] = parseInt(target.innerText);
    console.log(cardValue);
  }

  //Resets Card and Starts New Round
  if (clickCount === 3) {
    console.log(`New Round !`);
    roundCount++;
    round.innerHTML = roundCount;
    clickCount = 0;
    var flippedCards = document.querySelectorAll(".card.front");
    console.log(flippedCards);

    //Flips card from front to back
    if (cardValue.every((v) => v === cardValue[0])) {
      //Triple is Found
      setTimeout(() => {
        flippedCards.forEach((element) => {
          cards.removeChild(element);
        });
        //Adds Score
        score.innerHTML = parseInt(score.innerHTML, 10) + 300;
      }, 1000);
    } else {
      setTimeout(() => {
        flippedCards.forEach((element) => {
          element.className = "card back";
        });
        score.innerHTML = parseInt(score.innerHTML, 10) - 100;
      }, 1000);
    }

    //Resets Memory
    cardValue = [0, 0, 0];
  }
});

input.addEventListener("keydown", (e) => {
  var value = -1;
  // console.log(e.key);
  //Takes input if Enter was pressed
  if (e.key === "Enter") {
    console.log(e.target.value);
    value = parseInt(e.target.value, 10);
    handleInput(value);
  }
});

function handleInput(value) {
  // Early Return if the user input a string
  if (isNaN(value)) {
    console.log("String is detected");
    alert(`Wrong Input ! You should only input a number !`);
    return;
  }

  // Checks if input is a multiple of 3 or not
  if (value % 3 != 0 && value != -1) {
    alert(
      `Wrong Input ! Your input was ${value}, which is not a multiple of 3!`
    );
  } else {
    //Start Timer
    time.innerHTML = 0;
    var timer = setInterval(function () {
      time.innerHTML = parseInt(time.innerHTML, 10) + 1;
    }, 1000);
    //Generate Cards and Shuffle
    createCards(value);
  }
}

function createCards(numberOfCards) {
  const fragment = document.createDocumentFragment();
  const card = fragment
    .appendChild(
      Object.assign(document.createElement("div"), {
        className: "card back",
        // height: `calc(100% / ${numberOfCards} - 10px)`,
        // width: `calc(100% / ${numberOfCards} - 10px)`,
      })
    )
    .appendChild(
      Object.assign(document.createElement("div"), {
        innerHTML: "?",
      })
    );
  //First Clear All existing cards
  var __card__ = document.querySelectorAll(".card");
  __card__.forEach((element) => {
    element.remove();
  });

  //Then Generate New Cards
  for (i = 0; i < numberOfCards; i++) {
    console.log(numberOfCards);
    cards.appendChild(fragment.cloneNode(true));
  }

  //Then Set Styles and add front of the card
  __card__ = document.querySelectorAll(".card");
  __card__.forEach((element, i) => {
    element.style.height = `calc(100% / ${numberOfCards} - 10px)`;
    element.style.width = `calc(100% / ${numberOfCards} - 10px)`;
    element.style.minWidth = `calc(100% / 9 )`;
    element.style.minHeight = `calc(100% / 9 )`;
    element.appendChild(
      Object.assign(document.createElement("div"), {
        className: "front",
        innerHTML: `${Math.floor(i / 3 + 1)}`,
      })
    );
  });
  console.log(document.getElementsByClassName("card back"));
}

function shuffleCards() {
  __card__ = document.querySelectorAll(".card");
}
