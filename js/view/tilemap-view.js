import * as TilemapModel from "../model/tilemap-model.js";

// Tile type to class mapping
const TILE_CLASSES = {
  0: "background",
  1: "path",
  2: "wall",
  3: "tree",
  4: "water",
  5: "door",
  6: "roof",
};

function getClassForTiletype(tileType) {
  return TILE_CLASSES[tileType] || "background";
}

function createTiles() {
  const background = document.querySelector("#background");
  if (!background) return;

  // Set CSS variables
  background.style.setProperty("--GRID_WIDTH", TilemapModel.MAP_WIDTH);
  background.style.setProperty("--TILE_SIZE", `${TilemapModel.TILE_SIZE}px`);

  // Create tiles
  TilemapModel.tiles.flat().forEach(() => {
    const tile = document.createElement("div");
    tile.className = "tile";
    background.appendChild(tile);
  });
}

function displayTiles() {
  const visualTiles = document.querySelectorAll(".tile");

  TilemapModel.tiles.flat().forEach((tileType, index) => {
    const visualTile = visualTiles[index];
    const tileClass = getClassForTiletype(tileType);

    // Remove existing tile classes
    visualTile.classList.remove(...Object.values(TILE_CLASSES));
    // Add new tile class
    visualTile.classList.add(tileClass);
  });
}

function start() {
  createTiles();
  displayTiles();
}

export { start };
