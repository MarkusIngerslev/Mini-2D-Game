import * as TilemapModel from "./tilemap-model.js";

class Player {
  constructor(x, y, speed = 100) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

class Enemy {
  constructor(x, y, speed = 50, direction = 1, movementType = "horizontal") {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction; // 1 for forward, -1 for backward
    this.movementType = movementType;

    // Boundaries for both axes
    this.minX = 0;
    this.maxX = TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 32;
    this.minY = 0;
    this.maxY = TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 32;
  }

  move(deltaTime) {
    const distance = this.speed * (deltaTime / 1000) * this.direction;

    if (this.movementType === "horizontal") {
      const newX = this.x + distance;
      // Horizontal movement
      if (newX <= this.minX || newX >= this.maxX) {
        this.direction *= -1;
      } else {
        this.x = newX;
      }
    } else if (this.movementType === "vertical") {
      const newY = this.y + distance;
      // Vertical movement
      if (newY <= this.minY || newY >= this.maxY) {
        this.direction *= -1;
      } else {
        this.y = newY;
      }
    }
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

export { Player, Enemy };
