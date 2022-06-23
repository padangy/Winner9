let playerHand = [];
let computerHand = []; 

let playerTotalValue = null;
let computerTotalValue = null;

let playerRoundWins = 0;
let computerRoundWins = 0;

let playerGameWins = 0;
let computerGameWins = 0;

let tradesLeft = 3;

document.getElementById("aboutGame").addEventListener("click", explainTheGame);
document.getElementById("resetButton").addEventListener("click", resetGame);
document.getElementById("shuffleButton").addEventListener("click", createShoe);
document.getElementById("dealButton").disabled = true;

document.getElementById("card1Button").disabled = true;
document.getElementById("card2Button").disabled = true;
document.getElementById("card3Button").disabled = true;
document.getElementById("noTradeButton").disabled = true;

document.querySelector('#showPlayerRoundsWon').innerHTML = `${playerRoundWins}`
document.querySelector('#showComputerRoundsWon').innerHTML = `${computerRoundWins}`

function explainTheGame() {
  console.log("\n~WELCOME TO WINNER 9~");
  console.log("To play baccarat, you must bet on a side, Player or Banker.");
  console.log("The value of a hand is the sum of the cards.");
  console.log("10, J, Q, and K are worth 0 points.");
  console.log("A is 1 point, 2 is 2 points, 3 is 3 points, etc.");
  console.log(
    "The value of a hand is the LAST digit of the total of all the cards."
  );
  console.log("For example 9+8 is not 17, but instead 7");
  console.log("Whichever side gets closest to 9, without going over wins!");
  console.log("\n>>Let's start the game!<<");
  console.log(">>Click the Shuffle the Deck button to shuffle the cards.");
  console.log(">>Then click Deal a Hand.");
  console.log(">>Good luck!");
}

function createShoe() {
  theShoe = [];
  createTheShoe();
  shuffleTheCards(theShoe);

  function card(name, suit, value, deck, image) {
    this.name = name;
    this.image = image;
    this.suit = suit;
    this.deck = deck;
    this.value = value > 10 ? 0 : value;
  }

  function createTheShoe() {
    this.names = [
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

    this.images = [
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

    this.suits = ["Spades", "Clubs", "Diamonds","Hearts"];
    this.decks = 1;
    if (theShoe.length === 0) {
      for (let deck = 1; deck <= this.decks; deck++) {
        for (let suit = 0; suit < suits.length; suit++) {
          for (let name = 0; name < names.length; name++) {
            theShoe.push(
              new card(
                this.names[name],
                this.suits[suit],
                name + 1,
                deck,
                this.images[name]
              )
            );
          }
        }
      }
    }
  }
  return theShoe;
  

  function shuffleTheCards() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * theShoe.length);
      let location2 = Math.floor(Math.random() * theShoe.length);
      let temp = theShoe[location1];
      theShoe[location1] = theShoe[location2];
      theShoe[location2] = temp;
    }
    console.log("\n>>The cards are shuffled. Click on Deal a Hand to deal the cards.");
    
    document.getElementById("shuffleButton").disabled = true;
    document.getElementById("dealButton").disabled = false;
    document.getElementById("dealButton").addEventListener("click", dealAHand);
  }
}

function dealAHand() {
  clearTheTable();
  dealThreeCardsEach();
  showCards();
}

function clearTheTable() {
  document.querySelector("#playerFirst .suit").textContent = '';
  document.querySelector("#playerFirst .image").textContent = '';
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

function showCards() {
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
  wantToTrade();
}

function totalTheHands() {
  playerTotalValue = (playerHand[0].value + playerHand[1].value + playerHand[2].value) % 10;
  computerTotalValue = (computerHand[0].value + computerHand[1].value + computerHand[2].value) % 10;
}

function wantToTrade() {
  console.log('\n>>Does PLAYER want to trade one card with the COMPUTER?\n>>Please select one of the buttons: Card 1, Card 2, Card 3, or No Trade.')
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
  let storeCard1 = playerHand[0];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
    roundCompareHandsFinal()
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      tradesLeft--;
      if(tradesLeft === 0) {
        console.log('\n>>There are no trades left, let\'s see who won!')
        roundCompareHandsFinal()
      }
      else {
      computerHand.splice(randomNum, 1, storeCard1) // splice(specified index, deleting 1, insert card)
      playerHand.splice(0, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 1!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
      }
    }
    else {
      console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
      roundCompareHandsFinal()
    }
  }
  else if(computerTotalValue <= 5) {
    tradesLeft--;
    if(tradesLeft === 0) {
      console.log('\nThere are no trades left, let\'s see who won!')
      roundCompareHandsFinal()
    }
    else { // range 5-0
      computerHand.splice(randomNum, 1, storeCard1) // splice(specified index, deleting 1, insert card)
      playerHand.splice(0, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 1!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
    }
  }
}

function tradeCard2() {
  let storeCard2 = playerHand[1];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
    roundCompareHandsFinal()
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      tradesLeft--;
      if(tradesLeft === 0) {
        console.log('\nThere are no trades left, let\'s see who won!')
        roundCompareHandsFinal()
      }
      else {
      computerHand.splice(randomNum, 1, storeCard2) // splice(specified index, deleting 1, insert card)
      playerHand.splice(1, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 2!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
      }
    }
    else {
      console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
      roundCompareHandsFinal()
    }
  }
  else if(computerTotalValue <= 5) {
    tradesLeft--;
    if(tradesLeft === 0) {
      console.log('\nThere are no trades left, let\'s see who won!')
      roundCompareHandsFinal()
    }
    else { // range 5-0
      computerHand.splice(randomNum, 1, storeCard2) // splice(specified index, deleting 1, insert card)
      playerHand.splice(1, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 2!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
    }
  }
}

function tradeCard3() {
  let storeCard3 = playerHand[2];
  let randomNum = Math.floor(Math.random() * 3) // 0, 1, 2
  let computerRandomCard = computerHand[randomNum]

  if(computerTotalValue >= 8) { // range 9-8
    console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
    roundCompareHandsFinal()
  }
  else if(computerTotalValue === 7 || computerTotalValue === 6) { // range 7-6
    if(Math.random() < 0.75) {
      tradesLeft--;
      if(tradesLeft === 0) {
        console.log('\nThere are no trades left, let\'s see who won!')
        roundCompareHandsFinal()
      }
      else {
      computerHand.splice(randomNum, 1, storeCard3) // splice(specified index, deleting 1, insert card)
      playerHand.splice(2, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 3!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
      }
    }
    else {
      console.log('\n>>COMPUTER has a good hand and does not want to trade, sorry!')
      roundCompareHandsFinal()
    }
  }
  else if(computerTotalValue <= 5) {
    tradesLeft--;
    if(tradesLeft === 0) {
      console.log('\nThere are no trades left, let\'s see who won!')
      roundCompareHandsFinal()
    }
    else { // range 5-0
      computerHand.splice(randomNum, 1, storeCard3) // splice(specified index, deleting 1, insert card)
      playerHand.splice(2, 1, computerRandomCard)
      console.log('\n>>COMPUTER trades one card with your Card 3!\n>>PLAYER has ' + tradesLeft + ' out of 3 trades left.')
      showCards()
    }
  }
}

function switchShuffleDealButtons() {
  document.getElementById("shuffleButton").disabled = true
  document.getElementById("dealButton").disabled = false
}

function checkForWinner() {
  if(playerRoundWins === 3) {
    console.log('\n!!! PLAYER is the WINNER !!! \nCongratulations!!! Play again?')
    document.getElementById("resetButton").disabled = false;
    document.getElementById("shuffleButton").disabled = true;
  }
  else if(computerRoundWins === 3) { 
    console.log('\n>>GAME OVER. COMPUTER is the Winner. Better luck next game!<<')
    document.getElementById("resetButton").disabled = false;
    document.getElementById("shuffleButton").disabled = true;
  }
}

function roundCompareHandsFinal() {
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;
  if (playerTotalValue > computerTotalValue) {
    playerRoundWins++;
    console.log('\n>>PLAYER wins the round!')
    console.log('>>PLAYER has ' + playerTotalValue + ' and COMPUTER has ' + computerTotalValue + '. Nice work!')
    console.log('>>PLAYER has won ' + playerRoundWins + ' of 3 rounds and COMPUTER has won ' + computerRoundWins + ' of 3 rounds. \n>>First to 3 wins the game!')
    document.getElementById("shuffleButton").disabled = false;
    document.querySelector('#showPlayerRoundsWon').innerHTML = `${playerRoundWins}`
    tradesLeft = 3
    checkForWinner()
  } else if (playerTotalValue < computerTotalValue) {
    computerRoundWins++;
    console.log('\n>>COMPUTER wins the round!')
    console.log('>>COMPUTER has ' + computerTotalValue + ' and PLAYER has ' + playerTotalValue + '. Try again!')
    console.log('>>COMPUTER has won ' + computerRoundWins + ' of 3 rounds and PLAYER has won ' + playerRoundWins + ' of 3 rounds. \n>>First to 3 wins the game!')
    document.getElementById("shuffleButton").disabled = false;
    document.querySelector('#showComputerRoundsWon').innerHTML = `${computerRoundWins}`
    tradesLeft = 3
    checkForWinner()
  } else if (playerTotalValue === computerTotalValue) {
    console.log('\n>>It\'s a TIE. The PLAYER and COMPUTER both have ' + playerTotalValue + '. Redoing this round.')
    document.getElementById("shuffleButton").disabled = false;
    document.getElementById("shuffleButton").addEventListener("click", switchShuffleDealButtons);
    tradesLeft = 3
  }
}

function resetGame() {
  playerHand = [];
  computerHand = []; 
 
  playerTotalValue = null;
  computerTotalValue = null;
  
  playerRoundWins = 0;
  computerRoundWins = 0;
  document.querySelector('#showPlayerRoundsWon').innerHTML = 0;
  document.querySelector('#showComputerRoundsWon').innerHTML = 0;

  tradesLeft = 3;

  document.getElementById("shuffleButton").disabled = false;
  document.getElementById("dealButton").disabled = true;
  document.getElementById("card1Button").disabled = true;
  document.getElementById("card2Button").disabled = true;
  document.getElementById("card3Button").disabled = true;
  document.getElementById("noTradeButton").disabled = true;
  clearTheTable()
  console.log('\n>>Winner 9 game has been reset.<<')
}