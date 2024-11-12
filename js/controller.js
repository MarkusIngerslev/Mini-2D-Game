// imports
import Player from "./model.js";
import * as View from "./view.js";

// Global variables
const player = new Player(290, 210, 100);
let lastTimestamp = 0;
const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

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
  // Beregn distance baseret på deltaTime
  const distance = player.speed * (deltaTime / 1000);

  // Tjek om en tast er trykket ned og flyt figuren
  if (controls.up) {
    player.move(0, -distance);
  }
  if (controls.down) {
    player.move(0, distance);
  }
  if (controls.left) {
    player.move(-distance, 0);
  }
  if (controls.right) {
    player.move(distance, 0);
  }

  // Opdater visningen
  const { x, y } = player.getPosition();
  View.displayPlayer(x, y);
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
