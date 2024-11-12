// imports
import Player from "./model.js";
import * as View from "./view.js";

// Global variables
const player = new Player(290, 210, 100);
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
//       Move player
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

function canMove(player, position) {
  // Tjek om den nye position er inden for grænserne af gamefield
  return (
    position.x >= 0 &&
    position.x <= GAMEFIELD_WIDTH - 64 &&
    position.y >= 0 &&
    position.y <= GAMEFIELD_HEIGHT - 64
  );
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
}

requestAnimationFrame((timeStamp) => {
  lastTimestamp = timeStamp;
  tick(timeStamp);
});
