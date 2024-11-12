export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
