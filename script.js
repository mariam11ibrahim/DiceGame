'use strict';
//HTML ELEMENT
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');
const btnNewElement = document.querySelector('.btn--new');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const imgElement = document.querySelector('.dice');

//INTIAL STATE
let currentValue = 0;
let score = 0;
score0Element.textContent = 0;
score1Element.textContent = 0;
imgElement.classList.add('hidden');
let activePlayer = 0;
let current = document.querySelector('#current--0');


//ROLL THR DICE EVENT
btnRollElement.addEventListener('click', rolling);
// HOLD SCORE EVENT
btnHoldElement.addEventListener('click', hold);
// NEW GAME EVENT
btnNewElement.addEventListener('click', reset);

//SETTING
//HOLD
function hold() {
  //CORNER CASE
  if (checkWinningCase()) return;
  //HOLDIGN THE CURRNET SCORE
  document.getElementById(`score--${activePlayer}`).textContent =
    +document.getElementById(`score--${activePlayer}`).textContent +
    currentValue;

  currentValue = 0;
  current = switchPlayer();
}
//ROLL THE DICE
function rolling() {
  //CORNER CASE
  if (checkWinningCase()) return;
  //INTIAL DICE STATE
  imgElement.classList.remove('hidden');
  //DICE VALUE
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  //CHANGE THE DICE FACE
  imgElement.src = `dice-${diceNumber}.png`;
  currentValue = currentValue + diceNumber;
  // SWITCHING CONDITION
  if (diceNumber === 1) {
    currentValue = 0;

    current = switchPlayer();
  }
  //UPDATE THE CURRENT VAL
  current.textContent = currentValue;
}

//SWITCH PLAYER
function switchPlayer() {
  //CORNER CASE
  if (checkWinningCase()) return;
  //THE NUMBER OF NOT ACTIVE PLAYER
  let notActivePlayer = activePlayer === 0 ? 1 : 0;

  //deADCTIVATE ACTIVE PLYAER
  let current2 = document.getElementById(`current--${activePlayer}`);
  current2.textContent = 0;

  //SWITCH STYLE
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${notActivePlayer}`)
    .classList.add('player--active');

  //UPDATE THE ACTIVE PLAYER VALUE (SWITCHING PLAYERS)
  activePlayer = notActivePlayer;
  return document.getElementById(`current--${activePlayer}`);
}

// CHECK WINNING CASE
function checkWinningCase() {
  if (document.getElementById(`score--${activePlayer}`).textContent >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
      imgElement.classList.add('hidden');

    return true;
  } else {
    return false;
  }
}
//RESET 
function reset() {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  imgElement.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 1;
  current = switchPlayer();
}
