// Select the movable element from the DOM.
const movableBox = document.getElementById("movableBox");

// Define step distance for key movement in pixels.
const moveStep = 20;

// Set initial position variables for x (left) and y (top).
let positionX = 100;
let positionY = 100;

// Applies the current position variables to the element's CSS properties.
function updateElementPosition() {
  movableBox.style.left = `${positionX}px`;
  movableBox.style.top = `${positionY}px`;
}

// Clamps a coordinate value so the box remains entirely within viewport bounds.
function keepWithinBounds(value, maxAllowed) {
  return Math.max(0, Math.min(value, maxAllowed));
}

// 1. Event listener for keyboard navigation (Arrow keys).
window.addEventListener("keydown", (event) => {
  // Get maximum allowed positions based on viewport and box dimensions.
  const maxLeft = window.innerWidth - movableBox.offsetWidth;
  const maxTop = window.innerHeight - movableBox.offsetHeight;

  // Update positionX or positionY based on pressed arrow key.
  if (event.key === "ArrowUp") {
    positionY = keepWithinBounds(positionY - moveStep, maxTop);
  } else if (event.key === "ArrowDown") {
    positionY = keepWithinBounds(positionY + moveStep, maxTop);
  } else if (event.key === "ArrowLeft") {
    positionX = keepWithinBounds(positionX - moveStep, maxLeft);
  } else if (event.key === "ArrowRight") {
    positionX = keepWithinBounds(positionX + moveStep, maxLeft);
  }

  // Render updated coordinates to DOM.
  updateElementPosition();
});

// 2. Event listener for positioning via mouse click.
window.addEventListener("click", (event) => {
  // Center the box on click location while calculating boundaries.
  const targetX = event.clientX - movableBox.offsetWidth / 2;
  const targetY = event.clientY - movableBox.offsetHeight / 2;

  // Get maximum allowed positions.
  const maxLeft = window.innerWidth - movableBox.offsetWidth;
  const maxTop = window.innerHeight - movableBox.offsetHeight;

  // Update coordinates ensuring boundaries are respected.
  positionX = keepWithinBounds(targetX, maxLeft);
  positionY = keepWithinBounds(targetY, maxTop);

  // Render updated coordinates to DOM.
  updateElementPosition();
});

// Initialize position on initial page load.
updateElementPosition();