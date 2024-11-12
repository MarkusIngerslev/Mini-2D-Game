// imports
import Player from "./model.js";
import * as View from "./view.js";

// Global variables
const player = new Player(0, 0, 100);
let lastTimestamp = 0;W

function movePlayer(deltaTime) {
  // Beregn forskydning baseret på tid og hastighed
  const distance = player.speed * (deltaTime / 1000); // DeltaTime bliver lavet til sekunder
  player.move(distance, 0); // Flytter til højre
}

function tick(timeStamp) {
  requestAnimationFrame(tick);

  // Beregn deltaTime
  const deltaTime = timeStamp - lastTimestamp;
  lastTimestamp = timeStamp;

  // Flyt figuren baseret på deltaTime og hastighed
  movePlayer(deltaTime);

  // Opdater visningen
  const { x, y } = player.getPosition();
  View.displayPlayer(x, y);
}

requestAnimationFrame((timeStamp) => {
  lastTimestamp = timeStamp;
  tick(timeStamp);
});
