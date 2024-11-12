// imports
import * as Model from "./model.js";
import * as View from "./view.js";

// Global variables
const player = new Model.Player(290, 210, 100);
const enemy = new Model.Enemy(400, 100, 300);

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

const GAMEFIELD_WIDTH = 640;
const GAMEFIELD_HEIGHT = 480;

let lastTimestamp = 0;

// *************************
//          Events
// *************************

// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Event handlers
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      controls.left = true;
      break;
    case "ArrowRight":
      controls.right = true;
      break;
    case "ArrowUp":
      controls.up = true;
      break;
    case "ArrowDown":
      controls.down = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
      controls.left = false;
      break;
    case "ArrowRight":
      controls.right = false;
      break;
    case "ArrowUp":
      controls.up = false;
      break;
    case "ArrowDown":
      controls.down = false;
      break;
  }
}

// *************************
//     Player movement
// *************************

function movePlayer(deltaTime) {
  // Start position for player
  const position = { x: player.x, y: player.y };
  // Beregn distance baseret på deltaTime
  const distance = player.speed * (deltaTime / 1000);

  // Tjek om en tast er trykket ned og flyt positionen
  if (controls.up) {
    position.y -= distance;
  }
  if (controls.down) {
    position.y += distance;
  }
  if (controls.left) {
    position.x -= distance;
  }
  if (controls.right) {
    position.x += distance;
  }

  // Tjek om figuren kan flyttes til den nye position
  if (canMove(player, position)) {
    player.x = position.x;
    player.y = position.y;
  }

  // Opdater visningen
  const { x, y } = player.getPosition();
  View.displayPlayer(x, y);
}

// *************************
//        Collision
// *************************

function canMove(player, position) {
  // Tjek om den nye position er inden for grænserne af gamefield
  return (
    position.x >= 0 &&
    position.x <= GAMEFIELD_WIDTH - 64 &&
    position.y >= 0 &&
    position.y <= GAMEFIELD_HEIGHT - 64
  );
}

function checkCollisions() {
  const playerPos = player.getPosition();
  const enemyPos = enemy.getPosition();

  const isColliding =
    playerPos.x < enemyPos.x + 64 &&
    playerPos.x + 64 > enemyPos.x &&
    playerPos.y < enemyPos.y + 64 &&
    playerPos.y + 64 > enemyPos.y;

  if (isColliding) {
    View.applyCollisionEffect();
  } else {
    // Remove any collision effects if not colliding
    View.removeCollisionEffect();
  }
}

// *************************
//      Enemy movement
// *************************

function moveEnemy(deltaTime) {
  enemy.move(deltaTime);
  const { x, y } = enemy.getPosition();
  View.displayEnemy(x, y);
}

// *************************
//       Game loop
// *************************

function tick(timeStamp) {
  requestAnimationFrame(tick);

  // Beregn deltaTime
  const deltaTime = timeStamp - lastTimestamp;
  lastTimestamp = timeStamp;

  // Flyt figuren baseret på deltaTime og hastighed
  movePlayer(deltaTime);
  moveEnemy(deltaTime);

  // Tjek for kollision
  checkCollisions();
}

// Start spillet
requestAnimationFrame((timeStamp) => {
  lastTimestamp = timeStamp;
  tick(timeStamp);
});
