const player = document.getElementById("player");
const key = document.getElementById("key");
const ghost = document.getElementById("ghost");
const door = document.getElementById("door");
const message = document.getElementById("message");

let hasKey = false;

// Move the player
document.addEventListener("keydown", (e) => {
  const playerRect = player.getBoundingClientRect();
  const gameRect = document.getElementById("game").getBoundingClientRect();

  if (e.key === "ArrowUp" && playerRect.top > gameRect.top) {
    player.style.top = `${player.offsetTop - 10}px`;
  }
  if (e.key === "ArrowDown" && playerRect.bottom < gameRect.bottom) {
    player.style.top = `${player.offsetTop + 10}px`;
  }
  if (e.key === "ArrowLeft" && playerRect.left > gameRect.left) {
    player.style.left = `${player.offsetLeft - 10}px`;
  }
  if (e.key === "ArrowRight" && playerRect.right < gameRect.right) {
    player.style.left = `${player.offsetLeft + 10}px`;
  }

  checkCollision();
});

// Move the ghost randomly
setInterval(() => {
  ghost.style.top = `${Math.random() * 470}px`;
  ghost.style.left = `${Math.random() * 470}px`;
}, 1000);

// Check collisions
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const keyRect = key.getBoundingClientRect();
  const ghostRect = ghost.getBoundingClientRect();
  const doorRect = door.getBoundingClientRect();

  if (isColliding(playerRect, keyRect)) {
    hasKey = true;
    key.style.display = "none";
  }

  if (isColliding(playerRect, ghostRect)) {
    endGame("You were caught by the ghost! Game Over!");
  }

  if (hasKey && isColliding(playerRect, doorRect)) {
    endGame("You escaped! Congratulations!");
  }
}

// Helper function to check collision
function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// End the game
function endGame(msg) {
  message.textContent = msg;
  message.style.display = "block";
  document.removeEventListener("keydown", () => {});
}
