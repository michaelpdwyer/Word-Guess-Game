// Alphabet //
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array of instruments to be randomly selected //
var instList = ["guitar", "piano", "violin", "ukulele", "trumpet", "trombone", "viola", "cello", "flute", "clarinet", "oboe", "saxophone", "accordion", "mandolin", "bassoon", "harmonica", "xylophone", "harp", "tuba", "drums", "banjo", "organ", "piccolo", "bagpipes"];

// Variable that will randomly select a word for the user to guess //
var gameStarted = false;
var instName = "";
var instDashed;
var maxGuesses;
var lettersGuessed;
var instRandom;
var maxGuesses = [];
var correctGuesses;
var numWins = 0;
var numLosses = 0;
var dashesArray = [];
var wordAsArr = [];

// Function with a loop that chooses a word from instList and displays an underscore for each of its letters //
function startGame() {
    gameStarted = true;
    lettersGuessed = [];
    correctGuesses = 0;
    instRandom = Math.floor(Math.random() * (instList.length));
    instName = instList[instRandom];
    maxGuesses = 15 - instName.length;
    instDashed = makeIntoDashes(instName);
    wordAsArr = instName.split('');
    dashesArray = instDashed.split('');
    document.getElementById("instName").innerHTML = instDashed;
    document.getElementById("lettersGuessed").innerHTML = "--";
    document.getElementById("maxGuesses").innerHTML = maxGuesses;

}

function makeIntoDashes(word) {
    var dashes = [""];
    for (i = 0; i < word.length; i++) {
        dashes += "_";
    }
    return dashes;
}

function playGame(letter) {
    letter.toLowerCase();

    if (alphabet.indexOf(letter) > -1) {
        if (wordAsArr.indexOf(letter) > -1) {
            correctGuesses++;
            displayLetter(letter);
        }
        else {
            if (lettersGuessed.indexOf(letter) > -1) {
                return letter;
            }
            else {
                maxGuesses--;
                document.getElementById("maxGuesses").innerHTML = maxGuesses;
                lettersGuessed.push(letter);
                document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join('');
                if (maxGuesses == 0) {
                    alert("Almost! The instrument is " + instName);
                    startGame();
                    numLosses++;
                    document.getElementById("losses").innerHTML = numLosses;
                }
            }
        }
    }
}

function displayLetter(letter) {
    for (i = 0; i < instName.length; i++) {
        if (letter == wordAsArr[i]) {
            dashesArray[i] = letter;
            console.log(dashesArray);
            document.getElementById("instName").innerHTML = dashesArray.join("");
        }
    }
    checkForWin();
}

function checkForWin() {
    if (dashesArray.indexOf("_") === -1) {
        alert("You got it! The instrument is " + instName);
        numWins++;
        document.getElementById("wins").innerHTML = numWins;
        startGame();
    }
}

document.onkeyup = function (event) {
    if (!gameStarted) {
        document.getElementById("letsPlay").innerHTML;
        startGame();
        gameStarted = true;
    }
    else {
        playGame(event.key);
    }
};