let playerHand = [];
let computerHand = [];
let theShoe = []

let playerTotalValue = null;
let computerTotalValue = null;

let playerRoundWins = 0;
let computerRoundWins = 0;

let playerGameWins = 0;
let computerGameWins = 0;

let tradesLeft = 3;

initialize()
function initialize() {
  document.getElementById("shuffleButton").disabled = false;
  document.getElementById("dealButton").disabled = true;

  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;

  document.querySelector('#showPlayerRoundsWon').innerHTML = `${playerRoundWins}`
  document.querySelector('#showComputerRoundsWon').innerHTML = `${computerRoundWins}`

  document.querySelector('#showPlayerGamesWon').innerHTML = `${playerGameWins}`
  document.querySelector('#showComputerGamesWon').innerHTML = `${computerGameWins}`

  clearPlayerCards();
  clearComputerCards();
  
  playerHand = [];
  computerHand = []; 
 
  playerTotalValue = null;
  computerTotalValue = null;
  
  playerRoundWins = 0;
  computerRoundWins = 0;
  document.querySelector('#showPlayerRoundsWon').innerHTML = 0;
  document.querySelector('#showComputerRoundsWon').innerHTML = 0;

  tradesLeft = 3;
}

// Simple version of the casino baccarat card game that deals 3 cards to two Players (p-vs-computer) from one deck of 52 cards. This game is decided with 3 round wins, with tie rounds not counting. The winner for one round is whomever has their 3 cards add up to 9. 10-J-Q-K cards, and any value of 10 added up, have 0 point value. Ace has 1 point value. Every round, the Player can choose to trade one card that they have with the computer until the player is satisfied, up to a maximum of 3 trades per round.  9 being the highest, the highest value of the 3 cards' value wins. 

function explainTheGame() {
  document.getElementById("text").innerHTML = "~WELCOME TO WINNER 9~<br /><br />Winner 9 is a simple version of the casino baccarat card game that deals 3 cards each to the PLAYER and the COMPUTER from one standard deck of 52 cards.<br />10, J, Q, and K are worth 0 points.<br />A is 1 point, 2 is 2 points, 3 is 3 points, etc.<br />The object of this game is to have the highest point value of a hand, which is 9 points.<br />The value of a hand is the sum of the 3 cards; the suit of the card does not matter.<br />For example: the value of the 10 + 8 + 8 is not 26, but has the point value of 6.<br /><br />The winner of this game is decided with 3 round wins, with tie rounds not counting.<br />Furthermore, for every round, the PLAYER can choose to trade any single card that they have with the COMPUTER until the player is satisfied, up to a maximum of 3 trades per round.<br /><br />>>Let's start the game!<<<br />>>Click the Shuffle the Deck button to shuffle the cards.<br />>>Then click Deal a Hand.<br />>>Good luck!"
}

class card {
  constructor(name, suit, value, deck, image) {
    this.name = name;
    this.image = image;
    this.suit = suit;
    this.deck = deck;
    this.value = value > 10 ? 0 : value;
  }
}

function createShoe() {
  theShoe = [];
  createTheShoe();
  shuffleTheCards(theShoe);
  document.getElementById("shuffleButton").replaceWith(document.getElementById("shuffleButton").cloneNode(true));
  document.getElementById("shuffleButton").addEventListener("click", createShoe);
}
  
function createTheShoe() {
  const names = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
  ];

  const images = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  const suits = ["Spades", "Clubs", "Diamonds","Hearts"];
  const decks = 1;
  if (theShoe.length === 0) {
    for (let deck = 0; deck < decks; deck++) {
      for (let suit = 0; suit < suits.length; suit++) {
        for (let name = 0; name < names.length; name++) {
          theShoe.push(
            new card(
              names[name],
              suits[suit],
              name + 1,
              deck,
              images[name]
            )
          );
        }
      }
    }
  }
  return theShoe;
} 

function shuffleTheCards() {
  clearPlayerCards();
  
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * theShoe.length);
    let location2 = Math.floor(Math.random() * theShoe.length);
    let temp = theShoe[location1];
    theShoe[location1] = theShoe[location2];
    theShoe[location2] = temp;
  }
  
  document.getElementById("text").innerHTML = ">>The cards are shuffled. Click on Deal a Hand to deal the cards."
  
  document.getElementById("shuffleButton").disabled = true;
  document.getElementById("dealButton").disabled = false;
  document.getElementById("dealButton").addEventListener("click", dealAHand);
}

function dealAHand() {
  clearPlayerCards();
  dealThreeCardsEach();
  showPlayerCards();
}

function clearPlayerCards() {
  document.querySelector("#playerFirst .suit").innerText = '';
  document.querySelector("#playerFirst .image").innerText = '';
  document.querySelector("#playerSecond .suit").innerText = '';
  document.querySelector("#playerSecond .image").innerText = '';
  document.querySelector("#playerThird .suit").innerText = '';
  document.querySelector("#playerThird .image").innerText = '';
  document.querySelector("#playerFirst").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
  document.querySelector("#playerSecond").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
  document.querySelector("#playerThird").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
}

function dealThreeCardsEach() {
  playerHand = [];
  computerHand = [];
  for(let i = 0; i < 3; i++) {
    playerHand.push(theShoe.shift());
    computerHand.push(theShoe.shift());
  }
}

function suitChanger(suit) {
  if (suit === "Spades") {
    return "&spades;";
  } else if (suit === "Clubs") {
    return "&clubs;";
  } else if (suit === "Diamonds") {
    return "&diams;";
  } else if (suit === "Hearts") {
    return "&hearts;";
  }
}

function showPlayerCards() {
  if (playerHand[0]) {
    document.querySelector("#playerFirst .suit").innerHTML = suitChanger(
      playerHand[0].suit
    );
    document.querySelector("#playerFirst .image").innerHTML =
      playerHand[0].image;
    document.querySelector("#playerFirst").classList.add(playerHand[0].suit);
  }
  if (playerHand[1]) {
    document.querySelector("#playerSecond .suit").innerHTML = suitChanger(
      playerHand[1].suit
    );
    document.querySelector("#playerSecond .image").innerHTML =
      playerHand[1].image;
    document.querySelector("#playerSecond").classList.add(playerHand[1].suit);
  }
  if (playerHand[2]) {
    document.querySelector("#playerThird .suit").innerHTML = suitChanger(
      playerHand[2].suit
    );
    document.querySelector("#playerThird .image").innerHTML =
      playerHand[2].image;
    document.querySelector("#playerThird").classList.add(playerHand[2].suit);
  }
  totalTheHands();

  if(tradesLeft === 0) {
    document.getElementById("text").innerHTML = '>>There are no trades left, let\'s see who won!'
    setTimeout(function () {roundCompareHandsFinal();} ,3000)
  }
  else { 
    wantToTrade();
  }
}

function showComputerCards() {
  if (computerHand[0]) {
    document.querySelector("#computerFirst .suit").innerHTML = suitChanger(
      computerHand[0].suit
    );
    document.querySelector("#computerFirst .image").innerHTML =
    computerHand[0].image;
    document.querySelector("#computerFirst").classList.add(computerHand[0].suit);
  }
  if (computerHand[1]) {
    document.querySelector("#computerSecond .suit").innerHTML = suitChanger(
      computerHand[1].suit
    );
    document.querySelector("#computerSecond .image").innerHTML =
    computerHand[1].image;
    document.querySelector("#computerSecond").classList.add(computerHand[1].suit);
  }
  if (computerHand[2]) {
    document.querySelector("#computerThird .suit").innerHTML = suitChanger(
      computerHand[2].suit
    );
    document.querySelector("#computerThird .image").innerHTML =
    computerHand[2].image;
    document.querySelector("#computerThird").classList.add(computerHand[2].suit);
  }
}

function clearComputerCards() {
  document.querySelector("#computerFirst .suit").innerText = '';
  document.querySelector("#computerFirst .image").innerText = '';
  document.querySelector("#computerSecond .suit").innerText = '';
  document.querySelector("#computerSecond .image").innerText = '';
  document.querySelector("#computerThird .suit").innerText = '';
  document.querySelector("#computerThird .image").innerText = '';
  document.querySelector("#computerFirst").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
  document.querySelector("#computerSecond").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
  document.querySelector("#computerThird").classList.remove("&spades;", "&clubs;", "&diams;","&hearts;");
}

function totalTheHands() {
  playerTotalValue = (playerHand[0].value + playerHand[1].value + playerHand[2].value) % 10;
  computerTotalValue = (computerHand[0].value + computerHand[1].value + computerHand[2].value) % 10;
}

function wantToTrade() {
  document.getElementById("text").innerHTML = '>>Does PLAYER want to trade one card with the COMPUTER?<br />>>Please select one of the buttons: Card 1, Card 2, Card 3, or No Trade.'
  document.getElementById("card1Button").disabled = false;
  document.getElementById("card2Button").disabled = false;
  document.getElementById("card3Button").disabled = false;
  document.getElementById("noTradeButton").disabled = false;

  document.getElementById("shuffleButton").disabled = true;
  document.getElementById("dealButton").disabled = true;

  document.getElementById("card1Button").addEventListener("click", tradeCard1);
  document.getElementById("card2Button").addEventListener("click", tradeCard2);
  document.getElementById("card3Button").addEventListener("click", tradeCard3);
  document.getElementById("noTradeButton").addEventListener("click", roundCompareHandsFinal);
}

function tradeCard1() {
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;

  let storeCard1 = playerHand[0];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!'
    setTimeout(function () {roundCompareHandsFinal();} ,3000)
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      if(tradesLeft === 0) {
        showPlayerCards();
      }
      else {
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard1) // splice(specified index, deleting 1, insert card)
      playerHand.splice(0, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 1!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
      }
    }
    else {
      document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!'
      setTimeout(function () {roundCompareHandsFinal();} ,3000)
    }
  }
  else if(computerTotalValue <= 5) {
    if(tradesLeft === 0) {
      showPlayerCards();
    }
    else { // range 5-0
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard1) // splice(specified index, deleting 1, insert card)
      playerHand.splice(0, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 1!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
    }
  }
}

function tradeCard2() {
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;

  let storeCard2 = playerHand[1];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!'
    setTimeout(function () {roundCompareHandsFinal();} ,3000)
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      if(tradesLeft === 0) {
        showPlayerCards();
      }
      else {
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard2) // splice(specified index, deleting 1, insert card)
      playerHand.splice(1, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 2!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
      }
    }
    else {
      document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!'
      setTimeout(function () {roundCompareHandsFinal();} ,3000)
    }
  }
  else if(computerTotalValue <= 5) {
    if(tradesLeft === 0) {
      showPlayerCards();
    }
    else { // range 5-0
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard2) // splice(specified index, deleting 1, insert card)
      playerHand.splice(1, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 2!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
    }
  }
}

function tradeCard3() {
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;

  let storeCard3 = playerHand[2];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!'
    setTimeout(function () {roundCompareHandsFinal();} ,3000)
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      if(tradesLeft === 0) {
        showPlayerCards();
      }
      else {
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard3) // splice(specified index, deleting 1, insert card)
      playerHand.splice(2, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 3!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
      }
    }
    else {
      document.getElementById("text").innerHTML = '>>COMPUTER has a good hand and does not want to trade, sorry!';
      setTimeout(function () {roundCompareHandsFinal();} ,3000)
    }
  }
  else if(computerTotalValue <= 5) {
    if(tradesLeft === 0) {
      showPlayerCards();
    }
    else { // range 5-0
      tradesLeft--;
      computerHand.splice(randomNum, 1, storeCard3) // splice(specified index, deleting 1, insert card)
      playerHand.splice(2, 1, computerRandomCard)
      document.getElementById("text").innerHTML = '>>COMPUTER trades one card with your Card 3!<br />>>PLAYER has ' + tradesLeft + ' out of 3 trades left.'
      setTimeout(function () {showPlayerCards();} ,3000)
    }
  }
}

function switchShuffleDealButtons() {
  document.getElementById("shuffleButton").disabled = true
  document.getElementById("dealButton").disabled = false
}

function checkForWinner() {
  if(playerRoundWins === 3) {
    playerGameWins++;
    document.querySelector('#showPlayerGamesWon').innerHTML = `${playerGameWins}`
    document.getElementById("text").innerHTML = '!!! PLAYER is the WINNER !!! <br />Congratulations!!! Play again?'
    document.getElementById("resetButton").disabled = false;
    document.getElementById("shuffleButton").disabled = false;
    document.getElementById("shuffleButton").replaceWith(document.getElementById("shuffleButton").cloneNode(true));
    document.getElementById("shuffleButton").addEventListener("click", initialize);
  }
  else if(computerRoundWins === 3) { 
    computerGameWins++;
    document.querySelector('#showComputerGamesWon').innerHTML = `${computerGameWins}`
    document.getElementById("text").innerHTML = '>>>GAME OVER. COMPUTER is the Winner. Better luck next game!<<<'
    document.getElementById("resetButton").disabled = false;
    document.getElementById("shuffleButton").disabled = false;
    document.getElementById("shuffleButton").replaceWith(document.getElementById("shuffleButton").cloneNode(true));
    document.getElementById("shuffleButton").addEventListener("click", initialize);
  }
  else {
    document.getElementById("shuffleButton").disabled = false;
    document.getElementById("shuffleButton").addEventListener("click", clearComputerCards);
  }
}

function roundCompareHandsFinal() {
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;

  if (playerTotalValue > computerTotalValue) {
    playerRoundWins++;
    showComputerCards();
    document.getElementById("text").innerHTML = '>>PLAYER wins the round!<br />>>PLAYER has ' + playerTotalValue + ' and COMPUTER has ' + computerTotalValue + '. Nice work!<br />>>PLAYER has won ' + playerRoundWins + ' of 3 rounds and COMPUTER has won ' + computerRoundWins + ' of 3 rounds.<br />>>First to 3 wins the game!'
    document.querySelector('#showPlayerRoundsWon').innerHTML = `${playerRoundWins}`
    tradesLeft = 3
    setTimeout(function () {checkForWinner();} ,3000)
  } else if (playerTotalValue < computerTotalValue) {
    computerRoundWins++;
    showComputerCards();
    document.getElementById("text").innerHTML = '>>COMPUTER wins the round!<br />>>COMPUTER has ' + computerTotalValue + ' and PLAYER has ' + playerTotalValue + '. Try again!<br />>>PLAYER has won ' + playerRoundWins + ' of 3 rounds and COMPUTER has won ' + computerRoundWins + ' of 3 rounds.<br />>>First to 3 wins the game!'
    document.querySelector('#showComputerRoundsWon').innerHTML = `${computerRoundWins}`
    tradesLeft = 3;
    setTimeout(function () {checkForWinner();} ,3000)
  } else if (playerTotalValue === computerTotalValue) {
    showComputerCards();
    document.getElementById("text").innerHTML = '>>It\'s a TIE. The PLAYER and COMPUTER both have ' + playerTotalValue + '. Redoing this round.'
    document.getElementById("shuffleButton").disabled = false;
    document.getElementById("shuffleButton").addEventListener("click", switchShuffleDealButtons);
    tradesLeft = 3;
  }
}

function resetGame() {
  playerGameWins = 0;
  computerGameWins = 0;
  document.querySelector('#showPlayerGamesWon').innerHTML = 0;
  document.querySelector('#showComputerGamesWon').innerHTML = 0;


  initialize();
  document.getElementById("text").innerHTML = '>>Winner 9 game has been reset.<<'
}