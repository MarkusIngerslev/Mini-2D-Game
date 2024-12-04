import * as Model from "./model/model.js";
import * as TilemapModel from "./model/tilemap-model.js";

import * as View from "./view/view.js";
import * as TilemapView from "./view/tilemap-view.js";

// Global variables
const player = new Model.Player(0, 160, 100);

// const enemy = new Model.Enemy(192, 64, 50, 1, "horizontal");
const enemy = new Model.Enemy(192, 64, 50, 1, "vertical", 64);

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

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
  const position = { x: player.x, y: player.y };
  const distance = player.speed * (deltaTime / 1000);

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

  if (canMove(player, position)) {
    player.x = position.x;
    player.y = position.y;
  }

  View.displayPlayer(player.x, player.y);
}

// *************************
//        Collision
// *************************

function canMove(player, position) {
  // Check tilemap collision
  const coord = TilemapModel.coordFromPos(position);
  const tile = TilemapModel.getTileAtCoord(coord);

  // Check map boundaries
  const maxX = TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 32; // Player width
  const maxY = TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 32; // Player height

  return (
    tile !== TilemapModel.TILE_TYPES.OBSTACLE &&
    position.x >= 0 &&
    position.x <= maxX &&
    position.y >= 0 &&
    position.y <= maxY
  );
}

function checkCollisions() {
  const playerPos = player.getPosition();
  const enemyPos = enemy.getPosition();

  const isColliding =
    playerPos.x < enemyPos.x + 32 &&
    playerPos.x + 32 > enemyPos.x &&
    playerPos.y < enemyPos.y + 32 &&
    playerPos.y + 32 > enemyPos.y;

  if (isColliding) {
    View.applyCollisionEffect();
  } else {
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

  const deltaTime = timeStamp - lastTimestamp;
  lastTimestamp = timeStamp;

  movePlayer(deltaTime);
  moveEnemy(deltaTime);

  checkCollisions();
}

// Start spillet
TilemapView.start();
requestAnimationFrame((timeStamp) => {
  lastTimestamp = timeStamp;
  tick(timeStamp);
});
