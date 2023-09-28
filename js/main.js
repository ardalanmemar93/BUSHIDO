
// Array to store button colors
const buttonColours = ["red", "blue", "green", "yellow"];



// Define the initial volume level and playing state
let currentVolume = 0.2; 
let isPlaying = true;   

// Access the volume control and play/pause buttons
const volumeButton = document.getElementById("volume-control");
const playPauseButton = document.getElementById("play-pause");

// Access the audio element for the background music
const backgroundMusic = new Audio("music/backgroundmusic.mp3");

// Set the initial volume
backgroundMusic.volume = currentVolume;

// Add a click event listener to the volume control button
volumeButton.addEventListener("click", () => {
  // Toggle between different volume levels (you can customize these levels)
  if (currentVolume === 0.2) {
    currentVolume = 0.5; 
  } else if (currentVolume === 0.5) {
    currentVolume = 1.0; 
  } else {
    currentVolume = 0.2; 
  }

  // Set the new volume for the background music
  backgroundMusic.volume = currentVolume;
  volumeButton.textContent = `Volume: ${Math.round(currentVolume * 100)}%`;
});

// Add a click event listener to the play/pause button
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    backgroundMusic.pause();
    playPauseButton.textContent = "Play";
  } else {
    backgroundMusic.play();
    playPauseButton.textContent = "Pause";
  }
  
  // Toggle the playing state
  isPlaying = !isPlaying;
});



// Arrays to store game and user patterns
let gamePattern = [];
let userClickedPattern = [];

// Game state variables
let started = false;
let level = 0;
let isPlayingSequence = false;
const totalLevels = 5;

// Start game when a key is pressed
document.addEventListener("keypress", (event) => {
  if (!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Handle button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
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
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      if (userClickedPattern.join("") === gamePattern.join("")) {
        if (level === totalLevels) {
          // Display "Congratulations" message when the user completes all levels
          document.querySelector("#level-title").textContent =
            "Congratulations! You Won! Press Any Key to restart!";
          setTimeout(() => {
            startOver(); // Reset the game after a delay
          }, 2000);
        } else {
          // User's pattern matches the current level's game pattern
          setTimeout(() => {
            nextSequence();
          }, 1000);
        }
      }
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").textContent =
      "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    startOver();
  }
};

// Generate the next sequence in the game
const nextSequence = () => {
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;
  let sequenceLength = 1 + level;
  isPlayingSequence = true;

  for (let i = 0; i < sequenceLength; i++) {
    setTimeout(() => {
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

      document.getElementById(randomChosenColour).style.opacity = "0";
      setTimeout(() => {
        document.getElementById(randomChosenColour).style.opacity = "1";
        playSound(randomChosenColour);

        if (i === sequenceLength - 1) {
          isPlayingSequence = false;
        }
      }, 100);
    }, i * 1000);
  }
};

// Add a pressed animation to the clicked button
const animatePress = (currentColor) => {
  document.getElementById(currentColor).classList.add("pressed");
  setTimeout(() => {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
};

// Play a sound for a button color
const playSound = (name) => {
  let audio = new Audio("music/" + name + ".wav");
  audio.play();
};

// Reset the game
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
  isPlayingSequence = false;
  userClickedPattern = [];
};
