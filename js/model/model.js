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
  constructor(x, y, speed = 50, direction = 1) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction; // 1 for forward, -1 for backward
    // Grænser for hvor langt fjenden kan bevæge sig
    this.minX = x - 100; // Left boundary
    this.maxX = x + 100; // Right boundary
  }

  move(deltaTime) {
    const distance = this.speed * (deltaTime / 1000) * this.direction;
    this.x += distance;

    // Reverse direction if reaching boundaries
    if (this.x <= this.minX || this.x >= this.maxX) {
      this.direction *= -1;
    }
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

export { Player, Enemy };
