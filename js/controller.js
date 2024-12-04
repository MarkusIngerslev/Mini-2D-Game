import * as Model from "./model/model.js";
import * as TilemapModel from "./model/tilemap-model.js";

import * as View from "./view/view.js";
import * as TilemapView from "./view/tilemap-view.js";

// Global variables
const player = new Model.Player(0, 164, 100);

// const enemy = new Model.Enemy(192, 64, 50, 1, "horizontal");
const enemy = new Model.Enemy(196, 64, 50, 1, "vertical", 64);

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

  player.updateState(controls);

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

  View.displayPlayer(player.x, player.y, player.direction, player.isMoving);
}

// *************************
//        Collision
// *************************

function canMove(player, position) {
  // Check all corners of the player sprite
  const corners = [
    { x: position.x, y: position.y }, // Top-left
    { x: position.x + 23, y: position.y }, // Top-right
    { x: position.x, y: position.y + 23 }, // Bottom-left
    { x: position.x + 23, y: position.y + 23 }, // Bottom-right
  ];

  // Check map boundaries
  const maxX = TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 24;
  const maxY = TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 24;

  // Check if any corner is in an obstacle
  for (const corner of corners) {
    const tile = TilemapModel.getTileAtPos(corner);
    const category = TilemapModel.getTileCategory(tile);
    if (category === "OBSTACLE") {
      return false;
    }
  }

  return (
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
    playerPos.x < enemyPos.x + 24 &&
    playerPos.x + 24 > enemyPos.x &&
    playerPos.y < enemyPos.y + 24 &&
    playerPos.y + 24 > enemyPos.y;

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
  View.displayEnemy(x, y, enemy.facing, enemy.isMoving);
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
