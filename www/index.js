import { World, Cell } from "wasm-astar-visualizer";
import { memory } from "wasm-astar-visualizer/wasm_astar_visualizer_bg";

const CELL_SIZE = 20; // px
const GRID_COLOR = "#CCCCCC";
const OBSTACLE_COLOR = "#000000";
const START_COLOR = "#FF0000";
const GOAL_COLOR = "#00FF00";


const world = World.new();
const width = world.width();
const height = world.height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("astar");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = world.nodes();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
  console.log(cells)
  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      ctx.fillStyle = cells[idx] === Cell.Obstacle
        ? OBSTACLE_COLOR
        : cells[idx] === Cell.Start ? START_COLOR : GOAL_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

const renderLoop = () => {


  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);

