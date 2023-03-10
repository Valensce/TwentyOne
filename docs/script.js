let suits = ['c', 'd', 'h', 's'];
let faces = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
let deck = [];
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//create arrays to store the different suit and face values
let win = 0;
let round = 1;
//sets up the initial scores
let j;
let playerHand = [];
let dealerHand = [];
let dealerScore;
let playerScore;
//sets the number of wins for the respective user
let pValue = 0;
let dValue = 0;
//sets the hand values for the respective user


function createDeck(){
    for (let i = 0; i < suits.length; i++) {
        //i is a local counter
        for (let j = 0; j < faces.length; j++) {
            //suits.length is more maintainable code, because if more suits were added, this code would still work
            //calculate the value
            let value = j + 1;
            //j cannot begin with 1 because the faces would not match correctly to their respective values
            if (value > 10) {
            value = 10;
            //if the value of 'value' is greater than 10, set it to 10 (i.e., j, q, k have a value of 10 and not 11, 12, 13)
            }
            //create card object and append to the deck array
            deck.push({'face': faces[j], 'suit': suits[i], 'value': value})
        }
    }
    console.log(deck);
}

function shuffleDeck(){
    for (let i = deck.length - 1; i > 0; i--) {
    //i is once again a local counter
    j = Math.floor(Math.random() * i);
    //j is the random integer (decimal rounded to its nearest whole numb)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
    }
    //shuffles the array 'deck[]'
}

//this function sets up the start of index page
function init(){
    round = 0;
    //local round is 0
}

function dealCard(cards){
    dealerHand.push(cards[0], cards[1]);
    //appends the first two cards of shuffledDeck to dealerHand
    playerHand.push(cards[2], cards[3]);
    //appends the next two cards of shuffledDeck to playerHand

    console.log(playerHand);
    console.log(dealerHand);
    //logged for debugging

    document.getElementById('dealerCard' + 1).src = 'images/' + dealerHand[0].face + dealerHand[0].suit + '.png';
    document.getElementById('dealerCard' + 2).src = 'images/cb.png';
    //dealer's side of game is set up manually because one card must be hidden (i.e., cb.png)

    for(let u = 0; u < 2; u++){
        document.getElementById('playerCard' + (1 + u)).src = 'images/' + playerHand[u].face + playerHand[u].suit + '.png';
    }
    //player's side is looped to increase maintainability
}

function hit(cards){
    playerValue();

    if (pValue < 21) {
        for(let i = 0; i < playerHand.length; i++) {
            document.getElementById('playerCard' + (1 + i)).src = 'images/' + playerHand[i].face + playerHand[i].suit + '.png';
        }
        } else {
                document.getElementById('hit').style.display = 'none';
                document.getElementById('sit').style.display = 'none';
                sit();
        }
}

function sit(){
    document.getElementById('dealerCard' + 2).src = 'images/' + dealerHand[1].face + dealerHand[1].suit + '.png';
    //create an if statement to compare the player's hand value to the dealer's and determine the winner of the round
    dealerValue();
    playerValue();
    //calls dealerValue() and playerValue() to display values for each user
    results();
}

function results() {
    if (pValue > dValue) {
        win = 1;
    }
    
}
function nextRound() {
    round ++;
    document.getElementById('round').innerHTML = "Round:" + round;
}

function dealerValue() {
    for(let i = 0; i < dealerHand.length; i++){
        //console.log(dValue);
        dValue += dealerHand[i].value;
        //console.log(dValue);
    }
    document.getElementById('dealerScore').innerHTML = "Dealer's value = " + dValue;
    return dValue;
    }
      
function playerValue() {
    for (let i = 0; i < playerHand.length; i++) {
        pValue += playerHand[i].value;
    }
    document.getElementById('playerScore').innerHTML = "Your value = " + pValue;
    return pValue;
}