let currentRound = 1; // Set the current round to 1
let player1Score = 0; // Set the player 1 score to 0
let player2Score = 0; // Set the player 2 score to 0
let player1Rolls = []; // Set the player 1 rolls to an empty array
let player2Rolls = []; // Set the player 2 rolls to an empty array

document.getElementById('roll-button').addEventListener('click', playRound); // Add event listener to the roll button
document.getElementById('restart-button').addEventListener('click', restartGame); // Add event listener to the restart button

function rollDice() { // Function to roll the dice
    return Math.floor(Math.random() * 6) + 1; // Return a random number between 1 and 6
}

function updateDiceDisplay(player, die1, die2) { // Function to update the dice display
    let die1Element = document.getElementById(`${player}-die1`); // Get the die 1 element
    let die2Element = document.getElementById(`${player}-die2`); // Get the die 2 element

    die1Element.src = `assets/images/dice${die1}.png`; // Set the source of the die 1 element
    die2Element.src = `assets/images/dice${die2}.png`; // Set the source of the die 2 element
}

function clearDiceDisplay() { // Function to clear the dice display
    let defaultDie = 1; // Set the default die to 1

    let die1ElementPlayer1 = document.getElementById('player1-die1'); // Get the die 1 element for player 1
    let die2ElementPlayer1 = document.getElementById('player1-die2'); // Get the die 2 element for player 1
    let die1ElementPlayer2 = document.getElementById('player2-die1'); // Get the die 1 element for player 2
    let die2ElementPlayer2 = document.getElementById('player2-die2'); // Get the die 2 element for player 2
    
    die1ElementPlayer1.src = `assets/images/dice${defaultDie}.png`; // Set the source of the die 1 element for player 1
    die2ElementPlayer1.src = `assets/images/dice${defaultDie}.png`; // Set the source of the die 2 element for player 1
    die1ElementPlayer2.src = `assets/images/dice${defaultDie}.png`; // Set the source of the die 1 element for player 2
    die2ElementPlayer2.src = `assets/images/dice${defaultDie}.png`; // Set the source of the die 2 element for player 2
}


function playRound() { // Function to play a round
    if (currentRound > 3) return; // If the current round is greater than 3, return

    document.getElementById('roll-button').disabled = true; // Disable the roll button

    let player1Die1 = rollDice(); // Roll the die for player 1
    let player1Die2 = rollDice(); // Roll the die for player 1
    let player2Die1 = rollDice(); // Roll the die for player 2
    let player2Die2 = rollDice(); // Roll the die for player 2

    setTimeout(() => {
        updateDiceDisplay('player1', player1Die1, player1Die2); // Update both dice for player 1
        setTimeout(() => {
            updateDiceDisplay('player2', player2Die1, player2Die2); // Update both dice for player 2
            setTimeout(() => {
                processResults(player1Die1, player1Die2, player2Die1, player2Die2); // Process the results
                setTimeout(() => {
                    if (currentRound <= 3) { // If the current round is less than or equal to 3
                        document.getElementById('roll-button').disabled = false; // Enable the roll button
                    }
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function processResults(player1Die1, player1Die2, player2Die1, player2Die2) { // Function to process the results
    let player1Total = player1Die1 + player1Die2; // Calculate the total for player 1
    let player2Total = player2Die1 + player2Die2; // Calculate the total for player 2

    player1Rolls.push(player1Total); // Push the total for player 1 to the player 1 rolls array
    player2Rolls.push(player2Total); // Push the total for player 2 to the player 2 rolls array

    document.getElementById('player1-previous-rolls').innerText = player1Rolls.join(', '); // Set the text of the player 1 previous rolls element
    document.getElementById('player2-previous-rolls').innerText = player2Rolls.join(', '); // Set the text of the player 2 previous rolls element

    if (player1Total > player2Total) { // If the total for player 1 is greater than the total for player 2
        player1Score++; // Increment the player 1 score
        currentRound++; // Increment the current round
    } else if (player2Total > player1Total) { // If the total for player 2 is greater than the total for player 1
        player2Score++; // Increment the player 2 score
        currentRound++; // Increment the current round
    } else {
        setTimeout(() => alert("You hit the same number, throw again!"), 500); // Alert the user that they hit the same number
    }

    document.getElementById('player1-score').innerText = player1Score; // Set the text of the player 1 score element
    document.getElementById('player2-score').innerText = player2Score; // Set the text of the player 2 score element
    document.getElementById('current-round').innerText = currentRound; // Set the text of the current round element

    if (currentRound > 3) { // If the current round is greater than 3
        document.getElementById('roll-button').disabled = true; // Disable the roll button
        setTimeout(determineWinner, 1000); // Determine the winner
    }
}

function determineWinner() { // Function to determine the winner
    let winnerMessage = ''; // Set the winner message to an empty string

    if (player1Score > player2Score) { // If the player 1 score is greater than the player 2 score
        winnerMessage = 'Player 1 wins!'; // Set the winner message to 'Player 1 wins!'
    } else if (player2Score > player1Score) { // If the player 2 score is greater than the player 1 score
        winnerMessage = 'Player 2 wins!'; // Set the winner message to 'Player 2 wins!'
    } else { // Otherwise
        winnerMessage = "It's a tie!"; // Set the winner message to "It's a tie!"
    }

    alert(winnerMessage); // Alert the winner message
}

function restartGame() { // Function to restart the game
    currentRound = 1; // Set the current round to 1
    player1Score = 0; // Set the player 1 score to 0
    player2Score = 0; // Set the player 2 score to 0
    player1Rolls = []; // Set the player 1 rolls to an empty array
    player2Rolls = []; // Set the player 2 rolls to an empty array

    document.getElementById('player1-score').innerText = player1Score; // Set the text of the player 1 score element
    document.getElementById('player2-score').innerText = player2Score; // Set the text of the player 2 score element
    document.getElementById('current-round').innerText = currentRound; // Set the text of the current round element
    document.getElementById('player1-previous-rolls').innerText = ''; // Set the text of the player 1 previous rolls element
    document.getElementById('player2-previous-rolls').innerText = ''; // Set the text of the player 2 previous rolls element
    
    clearDiceDisplay(); // Clear the dice display

    document.getElementById('roll-button').disabled = false; // Enable the roll button
}

clearDiceDisplay(); // Clear the dice display