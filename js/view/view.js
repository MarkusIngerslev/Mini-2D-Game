function displayPlayer(x, y) {
  const playerElement = document.getElementById("player");
  if (playerElement) {
    playerElement.style.transform = `translate(${x}px, ${y}px)`;
  }
}

function displayEnemy(x, y) {
  const enemyElement = document.getElementById("enemy");
  if (enemyElement) {
    enemyElement.style.transform = `translate(${x}px, ${y}px)`;
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
