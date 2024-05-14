// Initialize variables to track game state
let currentRound = 1; // Tracks the current round number
let player1Score = 0; // Holds the score of player 1
let player2Score = 0; // Holds the score of player 2
let player1Rolls = []; // Stores the individual roll totals for player 1 in each round
let player2Rolls = []; // Stores the individual roll totals for player 2 in each round

document.getElementById('roll-button').addEventListener('click', playRound); // Add event listener to the roll button
document.getElementById('restart-button').addEventListener('click', restartGame); // Add event listener to the restart button

function rollDice() { // Function to simulate rolling a die
    return Math.floor(Math.random() * 6) + 1; // Returns a random number between 1 and 6
}

function updateDiceDisplay(player, die1, die2) { // Function to update the dice display for a player
    document.getElementById(`${player}-die1`).innerText = die1 !== undefined ? die1 : ''; // Update the first die
    document.getElementById(`${player}-die2`).innerText = die2 !== undefined ? die2 : ''; // Update the second die
}

function clearDiceDisplay() { // Function to clear the dice display for both players
    updateDiceDisplay('player1', '', ''); // Clear player 1's dice
    updateDiceDisplay('player2', '', ''); // Clear player 2's dice
}

function playRound() { // Function to simulate a round of the game
    if (currentRound > 3) return; // If the game is over, do nothing

    document.getElementById('roll-button').disabled = true; // Disable the roll button while the dice are rolling

    let player1Die1 = rollDice(); // Roll the first die for player 1
    let player1Die2 = rollDice(); // Roll the second die for player 1
    let player2Die1 = rollDice(); // Roll the first die for player 2
    let player2Die2 = rollDice(); // Roll the second die for player 2

    setTimeout(() => { // Update player 1's first dice with delay
        updateDiceDisplay('player1', player1Die1, ''); // Update player 1's first die
        setTimeout(() => { // Update player 1's second dice with delay
            updateDiceDisplay('player1', player1Die1, player1Die2); // Update player 1's second die
            setTimeout(() => { // Update player 2's first dice with delay
                updateDiceDisplay('player2', player2Die1, ''); // Update player 2's first die
                setTimeout(() => { // Update player 2's second dice with delay
                    updateDiceDisplay('player2', player2Die1, player2Die2); // Update player 2's second die
                    processResults(player1Die1, player1Die2, player2Die1, player2Die2); // Process the results of the round
                    setTimeout(() => { // Reset the dice display with delay
                        clearDiceDisplay(); // Clear the dice display
                        if (currentRound <= 3) { // If the game is not over
                            document.getElementById('roll-button').disabled = false; // Enable the roll button
                        }
                    }, 500); // Reset the dice display after 500ms
                }, 500); // Update player 2's second dice after 500ms
            }, 500); // Update player 2's first dice after 500ms
        }, 500); // Update player 1's second dice after 500ms
    }, 500); // Update player 1's first dice after 500ms
}

function processResults(player1Die1, player1Die2, player2Die1, player2Die2) { // Function to process the results of a round
    let player1Total = player1Die1 + player1Die2; // Calculate the total for player 1
    let player2Total = player2Die1 + player2Die2; // Calculate the total for player 2

    player1Rolls.push(player1Total); // Add the total to player 1's rolls
    player2Rolls.push(player2Total); // Add the total to player 2's rolls

    document.getElementById('player1-previous-rolls').innerText = player1Rolls.join(', '); // Update player 1's previous rolls
    document.getElementById('player2-previous-rolls').innerText = player2Rolls.join(', '); // Update player 2's previous rolls

    if (player1Total > player2Total) { // If player 1 wins the round
        player1Score++; // Increment player 1's score
        currentRound++; // Increment the current round
    } else if (player2Total > player1Total) { // If player 2 wins the round
        player2Score++; // Increment player 2's score
        currentRound++; // Increment the current round
    } else {
        setTimeout(() => alert("You hit the same number, throw again!"), 500); // If it's a tie, alert the players
    }

    document.getElementById('player1-score').innerText = player1Score; // Update player 1's score
    document.getElementById('player2-score').innerText = player2Score; // Update player 2's score
    document.getElementById('current-round').innerText = currentRound; // Update the current round

    if (currentRound > 3) { // If the game is over
        document.getElementById('roll-button').disabled = true; // Disable the roll button
        setTimeout(determineWinner, 1000); // Determine the winner after 1 second
    }
}

function determineWinner() { // Function to determine the winner of the game
    let winnerMessage = ''; // Initialize the winner message

    if (player1Score > player2Score) { // If player 1 wins the game
        winnerMessage = 'Player 1 wins!'; // Set the winner message to player 1
    } else if (player2Score > player1Score) { // If player 2 wins the game
        winnerMessage = 'Player 2 wins!'; // Set the winner message to player 2
    } else { // If it's a tie
        winnerMessage = "It's a tie!"; // Set the winner message to a tie
    }

    alert(winnerMessage); // Alert the winner message
}

function restartGame() { // Function to restart the game
    currentRound = 1; // Reset the current round
    player1Score = 0; // Reset player 1's score
    player2Score = 0; // Reset player 2's score
    player1Rolls = []; // Reset player 1's rolls
    player2Rolls = []; // Reset player 2's rolls

    document.getElementById('player1-score').innerText = player1Score; // Update player 1's score
    document.getElementById('player2-score').innerText = player2Score; // Update player 2's score
    document.getElementById('current-round').innerText = currentRound; // Update the current round
    document.getElementById('player1-previous-rolls').innerText = ''; // Clear player 1's previous rolls
    document.getElementById('player2-previous-rolls').innerText = ''; // Clear player 2's previous rolls
    updateDiceDisplay('player1', '', ''); // Clear player 1's dice display
    updateDiceDisplay('player2', '', ''); // Clear player 2's dice display

    document.getElementById('roll-button').disabled = false; // Enable the roll button
}

clearDiceDisplay(); // Clear the dice display when the page loads