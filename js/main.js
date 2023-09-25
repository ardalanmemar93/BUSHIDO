

  const playButton = document.querySelector(".play");
  const tile = document.querySelector(".tile");
  const arrowContainer = document.querySelector(".arrows");

  const arrowSymbols = {
    "↑": "ArrowUp",
    "↓": "ArrowDown",
    "←": "ArrowLeft",
    "→": "ArrowRight",
  };

  const arrowKeyCodes = {
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowLeft: "←",
    ArrowRight: "→",
  };

  const arrowColors = {
    "↑": "red",
    "↓": "yellow",
    "←": "green",
    "→": "blue",
  };

  let userInput = [];
  let gamePattern = [];
  let level = 0;
  let gameStarted = false;
  let isUserTurn = false;

  function createArrowElement(symbol) {
    const arrowElement = document.createElement("div");
    arrowElement.classList.add("arrow", `arrow-${arrowColors[symbol]}`);
    arrowElement.textContent = symbol;
    return arrowElement;
  }

  function addArrowToTile(symbol) {
    const arrowElement = createArrowElement(symbol);
    arrowContainer.appendChild(arrowElement);
    // Remove the arrow after a delay
    setTimeout(() => {
      arrowElement.remove();
    }, 1000); // Adjust the delay as needed
  }

  function removeArrowsFromTile() {
    const arrowElements = document.querySelectorAll(".arrow");
    arrowElements.forEach((arrow) => arrow.remove());
  }

  function checkUserInput() {
    if ( 
      userInput.length === gamePattern.length &&
      userInput.join("") === gamePattern.join("")
    ) {
      if (level === 3) {
        // User has completed the game (change 3 to the number of levels you want)
        // Show a winner animation or message
        alert("Congratulations! You have won the game.");
        resetGame();
      } else {
        setTimeout(() => {
          nextLevel();
        }, 1000); // Adjust the delay as needed
      }
    } else if (
      userInput.length > 0 &&
      userInput[userInput.length - 1] !== gamePattern[userInput.length - 1]
    ) {
      // User made a mistake, game over
      gameOver();
    }
  }

  function nextLevel() {
    userInput = [];
    level++;
    let patternLength = 4 + (level - 1) * 2; // 4, 6, 8, etc.
    gamePattern = generateRandomPattern(patternLength);
    isUserTurn = true;

    // Remove any previous arrows from the tile
    removeArrowsFromTile();

    // Add the new pattern of arrows to the tile with a delay
    gamePattern.forEach((symbol, index) => {
      setTimeout(() => {
        addArrowToTile(symbol);
        // Check if it's the last arrow in the pattern to enable user input
        if (index === gamePattern.length - 1) {
          isUserTurn = true;
        }
      }, 1000 * (index + 1)); // Adjust the delay as needed
    });
  }

  function generateRandomPattern(length) {
    const pattern = [];
    const symbols = Object.keys(arrowSymbols);
    for (let i = 0; i < length; i++) {
      const randomDirection = symbols[Math.floor(Math.random() * symbols.length)];
      pattern.push(arrowSymbols[randomDirection]);
    }
    return pattern;
  }

  function gameOver() {
    alert("Game Over. Try again!");
    resetGame();
  }

  function resetGame() {
    level = 0;
    gamePattern = [];
    userInput = [];
    isUserTurn = false;

    // Remove any arrows from the tile
    removeArrowsFromTile();

    playButton.disabled = false;
  }

  document.addEventListener("keydown", function (event) {
    if (!gameStarted && event.key === "Enter") {
      startGame();
    } else if (isUserTurn && arrowKeyCodes[event.key]) {
      const symbol = arrowKeyCodes[event.key];
      userInput.push(symbol);
      checkUserInput();
    }
  });

  function startGame() {
    resetGame();
    nextLevel();
    gameStarted = true;
  }

  // Add event listener for the "play" button click
  playButton.addEventListener("click", startGame);







