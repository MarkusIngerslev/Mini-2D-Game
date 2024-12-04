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
  constructor(
    x,
    y,
    speed = 50,
    direction = 1,
    movementType = "horizontal",
    range = 100
  ) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.speed = speed;
    this.direction = direction;
    this.movementType = movementType;
    this.range = range;

    // Calculate boundaries based on range and map limits
    if (movementType === "horizontal") {
      this.minX = Math.max(0, this.initialX - range);
      this.maxX = Math.min(
        TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 32,
        this.initialX + range
      );
      this.minY = 0;
      this.maxY = TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 32;
    } else {
      this.minX = 0;
      this.maxX = TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 32;
      this.minY = Math.max(0, this.initialY - range);
      this.maxY = Math.min(
        TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 32,
        this.initialY + range
      );
    }
  }

  move(deltaTime) {
    const distance = this.speed * (deltaTime / 1000) * this.direction;

    if (this.movementType === "horizontal") {
      const newX = this.x + distance;
      if (newX <= this.minX || newX >= this.maxX) {
        this.direction *= -1;
      } else {
        this.x = newX;
      }
    } else if (this.movementType === "vertical") {
      const newY = this.y + distance;
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
