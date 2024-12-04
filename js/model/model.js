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
        TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 24,
        this.initialX + range
      );
      this.minY = 0;
      this.maxY = TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 24;
    } else {
      this.minX = 0;
      this.maxX = TilemapModel.MAP_WIDTH * TilemapModel.TILE_SIZE - 24;
      this.minY = Math.max(0, this.initialY - range);
      this.maxY = Math.min(
        TilemapModel.MAP_HEIGHT * TilemapModel.TILE_SIZE - 24,
        this.initialY + range
      );
    }
  }

  move(deltaTime) {
    const distance = this.speed * (deltaTime / 1000) * this.direction;
    const position = { x: this.x, y: this.y };

    if (this.movementType === "horizontal") {
      position.x += distance;
      if (
        position.x <= this.minX ||
        position.x >= this.maxX ||
        !this.canMove(position)
      ) {
        this.direction *= -1;
      } else {
        this.x = position.x;
      }
    } else if (this.movementType === "vertical") {
      position.y += distance;
      if (
        position.y <= this.minY ||
        position.y >= this.maxY ||
        !this.canMove(position)
      ) {
        this.direction *= -1;
      } else {
        this.y = position.y;
      }
    }
  }

  canMove(position) {
    const coord = TilemapModel.coordFromPos(position);
    const tile = TilemapModel.getTileAtCoord(coord);
    return TilemapModel.getTileCategory(tile) !== "OBSTACLE";
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

export { Player, Enemy };
