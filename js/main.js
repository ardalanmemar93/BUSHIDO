// Array to store button colors
const buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store game and user patterns
let gamePattern = [];
let userClickedPattern = [];

// Game state variables
let started = false;
let level = 0;
let isPlayingSequence = false;

// Start game when a key is pressed
document.addEventListener("keypress", function (event) {
  if (!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Handle button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (!isPlayingSequence) {
      // Only check user input when not playing sequence
      let userChosenColour = button.id;
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    }
  });
});

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      if (userClickedPattern.join("") === gamePattern.join("")) {
        // User's pattern matches the current level's game pattern
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").textContent =
      "Game Over, Press Any Key to Restart";

    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// Generate the next sequence in the game
function nextSequence() {
  userClickedPattern = []; // Clear user's input pattern for the current round
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;
  let sequenceLength = 1 + level;
  isPlayingSequence = true;

  for (let i = 0; i < sequenceLength; i++) {
    setTimeout(function () {
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

      document.getElementById(randomChosenColour).style.opacity = "0";
      setTimeout(function () {
        document.getElementById(randomChosenColour).style.opacity = "1";
        playSound(randomChosenColour);

        if (i === sequenceLength - 1) {
          isPlayingSequence = false;
        }
      }, 100);
    }, i * 1000);
  }
}

// Add a pressed animation to the clicked button
function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add("pressed");
  setTimeout(function () {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
}

// Play a sound for a button color
function playSound(name) {
  let audio = new Audio("music/" + name + ".wav");
  audio.play();
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
