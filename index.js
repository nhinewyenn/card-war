/** @format */

let deckId;
let playerScore = 0;
let computerScore = 0;
const title = document.querySelector(".title");
const btn = document.querySelector("#new-deck");
const cardContainer1 = document.querySelector(".card-container1");
const cardContainer2 = document.querySelector(".card-container2");
const remainingCard = document.querySelector(".remaining-card");
const computer = document.querySelector(".computer");
const player = document.querySelector(".player");
const drawCard = document.getElementById("draw-card");
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
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCard.textContent = `Remaining Cards: ${data.remaining}`;
    })
    .catch((err) => alert(err.message));
}

function getNewCard() {
  if (!deckId) alert(`Please get a new deck first (might take a few seconds)`);
  else {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((res) => res.json())
      .then((data) => {
        const { cards } = data;
        cardContainer1.innerHTML = `<img src="${cards[0].image}" class="card">`;
        cardContainer2.innerHTML = `<img src="${cards[1].image}" class="card">`;
        remainingCard.textContent = `Remaining Cards: ${data.remaining}`;
        const winnerText = determineCardWinner(cards[0], cards[1]);
        title.textContent = winnerText;

        if (data.remaining === 0 && playerScore > computerScore) {
          title.textContent = "Player is the main winner! 🥳";
          disableButton();
        } else if (data.remaining === 0 && computerScore > playerScore) {
          title.textContent = "Computer is the main winner! 🤖";
          disableButton();
        } else title.textContent = "It's a tie!";
      })
      .catch((err) => alert(err.message));
  }
}

function determineCardWinner(card1, card2) {
  card1ValueIndex = cardValue.indexOf(card1.value);
  card2ValueIndex = cardValue.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore += 1;
    computer.textContent = `Computer's score: ${computerScore}`;
    return "Computer win this round! ";
  } else if (card2ValueIndex > card1ValueIndex) {
    playerScore += 1;
    player.textContent = `Player's score: ${playerScore}`;
    return "You win this round! ";
  } else return "War";
}

function disableButton() {
  drawCard.className += " disabled";
  drawCard.disabled = true;
}

btn.addEventListener("click", getNewDeck);
drawCard.addEventListener("click", getNewCard);
