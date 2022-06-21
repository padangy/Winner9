// Build deck of 52 cards with the correct values for each card to play Winner 9.
function buildDeck() {
    const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const values = []
    const deck = []
  
    for (let r = 0; r < ranks.length; r++) {
        if(ranks[r] === 'A') {
            values.push(1)
        }
        else if (ranks[r] === '10' || ranks[r] === 'J' || ranks[r] === 'Q' || ranks[r] === 'K') {
            values.push(0)
        }
        else {
            values.push(ranks[r])
        }
        for (let s = 0; s < suits.length; s++) {
            deck.push({suit: suits[s], rank: ranks[r], value: values[r]})
      }
    }
    return deck; 
 
}

console.log(buildDeck())
