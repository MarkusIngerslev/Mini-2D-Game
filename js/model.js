export default class Player {
  constructor(x, y, speed = 100) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
