console.log("Scripts loaded!");

cards = document.getElementById("cards");
console.log(cards);

input = document.getElementById("number-of-cards");
console.log(input);

cards.addEventListener("click", (e) => {
  console.log(e.srcElement);
});

input.addEventListener("submit", (e) => {
  console.log(e);
});
