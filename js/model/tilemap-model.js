// Tile types
const TILE_TYPES = {
  BACKGROUND: 0,
  WALKABLE: 1,
  OBSTACLE: 2,
};

// The tilemap model (16x10)
const tiles = [
  [7, 0, 7, 7, 0, 3, 7, 4, 0, 0, 7, 2, 2, 2, 2, 2],
  [0, 7, 0, 0, 0, 0, 7, 4, 0, 7, 0, 2, 6, 6, 6, 2],
  [0, 7, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 6, 6, 6, 2],
  [0, 3, 0, 1, 7, 0, 7, 4, 0, 1, 7, 2, 2, 5, 2, 2],
  [0, 0, 7, 1, 0, 3, 7, 4, 0, 1, 7, 0, 7, 1, 7, 0],
  [1, 1, 1, 1, 0, 0, 0, 4, 7, 1, 1, 1, 1, 1, 0, 7],
  [7, 0, 7, 7, 0, 0, 7, 4, 3, 7, 0, 0, 7, 0, 7, 0],
  [0, 0, 0, 0, 0, 7, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [0, 7, 0, 0, 0, 7, 0, 7, 0, 3, 0, 0, 7, 0, 0, 7],
  [0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 7, 3, 3, 0, 0, 3],
];

// Constants
const MAP_HEIGHT = tiles.length;
const MAP_WIDTH = tiles[0].length;
const TILE_SIZE = 32;

// Get tile value at specific coordinate
function getTileAtCoord({ row, col }) {
  if (row >= 0 && row < MAP_HEIGHT && col >= 0 && col < MAP_WIDTH) {
    return tiles[row][col];
  }
  return -1; // Invalid/out of bounds
}

// Convert coordinate to pixel position
function posFromCoord({ row, col }) {
  return {
    x: col * TILE_SIZE,
    y: row * TILE_SIZE,
  };
}

// Convert pixel position to coordinate
function coordFromPos({ x, y }) {
  return {
    row: Math.floor(y / TILE_SIZE),
    col: Math.floor(x / TILE_SIZE),
  };
}

// Get tile value at pixel position
function getTileAtPos({ x, y }) {
  const coord = coordFromPos({ x, y });
  return getTileAtCoord(coord);
}

export {
  TILE_TYPES,
  tiles,
  MAP_HEIGHT,
  MAP_WIDTH,
  TILE_SIZE,
  getTileAtCoord,
  posFromCoord,
  coordFromPos,
  getTileAtPos,
};
