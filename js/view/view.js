function displayPlayer(x, y, direction, isMoving) {
  const playerElement = document.getElementById("player");
  if (playerElement) {
    playerElement.style.transform = `translate(${x}px, ${y}px)`;

    // Remove all direction classes
    playerElement.classList.remove(
      "face-down",
      "face-up",
      "face-left",
      "face-right",
      "walking"
    );

    // Add current direction and walking state
    playerElement.classList.add(`face-${direction}`);
    if (isMoving) {
      playerElement.classList.add("walking");
    }
  }
}

function displayEnemy(x, y, facing, isMoving) {
  const enemyElement = document.getElementById("enemy");
  if (enemyElement) {
    enemyElement.style.transform = `translate(${x}px, ${y}px)`;

    // Remove all direction classes
    enemyElement.classList.remove(
      "face-down",
      "face-up",
      "face-left",
      "face-right",
      "walking"
    );

    // Add current direction and walking state
    enemyElement.classList.add(`face-${facing}`);
    if (isMoving) {
      enemyElement.classList.add("walking");
    }
  }
}

function applyCollisionEffect() {
  const playerElement = document.getElementById("player");
  if (playerElement && !playerElement.classList.contains("player-collide")) {
    playerElement.classList.add("player-collide");
  }
}

function removeCollisionEffect() {
  const playerElement = document.getElementById("player");
  if (playerElement && playerElement.classList.contains("player-collide")) {
    playerElement.classList.remove("player-collide");
  }
}

export {
  displayPlayer,
  displayEnemy,
  applyCollisionEffect,
  removeCollisionEffect,
};
