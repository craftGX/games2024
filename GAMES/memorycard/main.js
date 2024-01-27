const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; //carte bloquée
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  /*console.log("i was clicked!");
  console.log(this);*/
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    /*console.log({hasFlippedCard,firstCard})*/
    return;
  }
  //second click
  secondCard = this;
  /*console.log({firstCard,secondCard});*/
  //do cards match?
  /*console.log(firstCard.dataset.framework);
    console.log(secondCard.dataset.framework);*/
  /*console.log("function was executed");*/
  checkForMatch();
}
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
function disableCards() {
  //match!
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  //no match - unflip the cards
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); //fonction auto invoquée

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
