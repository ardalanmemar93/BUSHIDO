// Array to store button colors
const buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store game and user patterns
let gamePattern = [];
let userClickedPattern = [];

// Game state variables
let started = false;
let level = 0;

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
    let userChosenColour = button.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
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
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;
  let sequenceLength = 2 + level * 2; // Start with 2 and increment by 2 for each level
  for (let i = 0; i < sequenceLength; i++) {
    setTimeout(function () {
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

      // Display and animate the next color in the sequence
      document.getElementById(randomChosenColour).style.opacity = "0";
      setTimeout(function () {
        document.getElementById(randomChosenColour).style.opacity = "1";
        playSound(randomChosenColour);
      }, 100);
    }, i * 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
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
