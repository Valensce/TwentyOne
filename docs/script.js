let suits = ['c', 'd', 'h', 's'];
let faces = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
let deck = [];
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//create arrays to store the different suit and face values
let win = 0;
let tie = 0;
let winner;
//sets up the initial scores
let round = 1;
//sets up the initial round number
let playerHand = [];
let dealerHand = [];
//sets the hand of player and dealer
let playerCards = [];
let dealerCards = [];
//sets the an array for which the user's hand draws from
let dealerScore;
let playerScore;
//sets the number of wins for the respective user
let pValue = 0;
let dValue = 0;
//sets the hand values for the respective user
let cardCount;

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

function dealCard() {
    for(let u = 0; u < 2; u++){
        playerHand.push(deck[u]);
        document.getElementById('playerCard' + (1 + u)).src = 'images/' + playerHand[u].face + playerHand[u].suit + '.png';
    }
    //player's side is looped to increase maintainability

    dealerHand.push(deck[2], deck[3]);
    //append the next two cards from deck to dealerHand
    cardCount = 3;
    //a variable used for the hit function later

    console.log(playerHand);
    console.log(dealerHand);

    document.getElementById('dealerCard' + 1).src = 'images/' + dealerHand[0].face + dealerHand[0].suit + '.png';
    document.getElementById('dealerCard' + 2).src = 'images/cb.png';
    //dealer's side of game is set up manually because one card must be hidden (i.e., cb.png)

}

function hit(){
    cardCount = cardCount++;
    //cardCount increases for iterative purposes
    playerHand.push(deck[cardCount]);
    if (pValue < 21) {
        document.getElementById('playerCard' + (cardCount - 1)).src = 'images/' + playerHand[cardCount].face + playerHand[cardCount].suit + '.png';
        document.getElementById('playerCard' + (cardCount - 1)).style.display = 'inline-block';
        //the playerCardID will always be one less than that of cardCount
        //for instance, when cardCount is 4, playerCardID=(4-1) is called, which is playerCard3
        }
        else if (pValue > 21) {
                results();
                playerValue();
                dealerValue()
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

    if (pValue > 21) {
        win = win;
        tie = tie;
        document.getElementById('dealerCard' + 2).src = 'images/' + dealerHand[1].face + dealerHand[1].suit + '.png';
        //since the round is already over, the dealer's hidden card can be revealed
        document.getElementById('hit').style.display = 'none';
        document.getElementById('sit').style.display = 'none';
        document.getElementById('outcome').innerHTML = "Player went bust, Dealer wins!";
        document.getElementById('next').style.display = 'inline-block';
    }
    else if (pValue > dValue) {
        win = win++;
        tie = tie;
        document.getElementById('dealerCard' + 2).src = 'images/' + dealerHand[1].face + dealerHand[1].suit + '.png';
        document.getElementById('hit').style.display = 'none';
        document.getElementById('sit').style.display = 'none';
        document.getElementById('outcome').innerHTML = "Player wins!";
        document.getElementById('next').style.display = 'inline-block';
    }
    else if (pValue == dValue) {
        win = win;
        tie = tie++;
        document.getElementById('dealerCard' + 2).src = 'images/' + dealerHand[1].face + dealerHand[1].suit + '.png';
        document.getElementById('hit').style.display = 'none';
        document.getElementById('sit').style.display = 'none';
        document.getElementById('outcome').innerHTML = "Player ties with dealer!";
        document.getElementById('next').style.display = 'inline-block';
    }
    else {
        win = win;
        tie = tie;
        document.getElementById('dealerCard' + 2).src = 'images/' + dealerHand[1].face + dealerHand[1].suit + '.png';
        document.getElementById('hit').style.display = 'none';
        document.getElementById('sit').style.display = 'none';
        document.getElementById('outcome').innerHTML = "Dealer wins!";
        document.getElementById('next').style.display = 'inline-block';
    }
    dealerScore = round - win - tie;
    playerScore = win;

    document.getElementById('outcome').innerHTML += "<br> Player score: " + playerScore + "<br> Dealer score:" + dealerScore;
}

function nextRound() {
    if (round <= 7) {
        round++;
        playerHand = [];
        dealerHand = [];
        cardCount = 0;
        shuffleDeck();
        dealCard();

        document.getElementById('round').innerHTML = "Round: " + round;
        document.getElementById('outcome').innerHTML = "";
        document.getElementById('next').style.display = "none";
        document.getElementById('playerValue').innerHTML = "Player:";
        document.getElementById('dealerValue').innerHTML = "Dealer:";
        document.getElementById('hit').style.display = 'inline-block';
        document.getElementById('sit').style.display = 'inline-block';
    }
    else {
        if (dealerScore > playerScore) {
            winner = "Dealer!";
        }
        else if (playerScore > dealerScore) {
            winner = "Player!";
        }
        else {
            winner = "Player tied with dealer!"
        }
        document.getElementById('cardtray').innerHTML = "Best of seven hands goes to: <br>" + winner;
    }
}

function dealerValue() {
    for(let i = 0; i < dealerHand.length; i++){
        //console.log(dValue);
        dValue += dealerHand[i].value;
        //console.log(dValue);
    }
    document.getElementById('dealerValue').innerHTML = "Dealer's value = " + dValue;
    return dValue;
}
      
function playerValue() {
    for (let i = 0; i < playerHand.length; i++) {
        pValue += playerHand[i].value;
    }
    document.getElementById('playerValue').innerHTML = "Your value = " + pValue;
    return pValue;
}