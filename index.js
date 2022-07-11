/** @format */

const btn = document.querySelector("#new-deck");
const cardContainer1 = document.querySelector(".card-container1");
const cardContainer2 = document.querySelector(".card-container2");
const remainingCard = document.querySelector(".remaining-card");
const computer = document.querySelector(".computer");
const player = document.querySelector(".player");
const drawCard = document.getElementById("draw-card");
let deckId;
const cardValue = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCard.textContent = `Remaining Cards: ${data.remaining}`;
    });
}

function getNewCard() {
  if (!deckId) alert(`Please get a new deck first (might take a few seconds)`);
  else {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}//draw/?count=2`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { cards } = data;
        cardContainer1.innerHTML = `<img src="${cards[0].image}" class="card">`;
        cardContainer2.innerHTML = `<img src="${cards[1].image}" class="card">`;
        remainingCard.textContent = `Remaining Cards: ${data.remaining}`;
        determineCardWinner(cards[0], cards[1]);
      });
  }
}

function determineCardWinner(card1, card2) {
  card1ValueIndex = cardValue.indexOf(card1.value);
  card2ValueIndex = cardValue.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computer.textContent = `Computer win! 🤖`;
  } else if (card2ValueIndex > card1ValueIndex) {
    player.textContent = `Player win! 🥳`;
  } else return "War";
}

btn.addEventListener("click", getNewDeck);
drawCard.addEventListener("click", getNewCard);
