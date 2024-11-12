function displayPlayer(x, y) {
  const playerElement = document.getElementById('player');
  if (playerElement) {
    playerElement.style.transform = `translate(${x}px, ${y}px)`;
  }
}


export { displayPlayer };
