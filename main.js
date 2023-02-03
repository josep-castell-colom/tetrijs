import { board, holdBoard, nextBoard, paneBoard } from "./js/board.js";
import { O, I, L, J, S, Z, T } from "./js/pieces.js";
import { settings } from "./settings.js";
import { initGame, keyHandler } from "./js/game.js";

export const display = document.getElementById("display");
export const boardDisplay = document.getElementById("board");
export const scoreDisplay = document.getElementById("score");
export const levelDisplay = document.getElementById("level");
export const linesDisplay = document.getElementById("lines");
export const gameOverDisplay = document.getElementById("game-over");
export const yourScore = document.getElementById("your-score");
export const nextDisplay = document.getElementById("next");
export const holdDisplay = document.getElementById("hold");
export const paneDisplay = document.getElementById("pane");
export const blockSize = settings.blockSize;
export const boardWidth = settings.boardWidth * blockSize;
export const boardHeight = settings.boardHeight * blockSize;
export const startPosition = Math.round(boardWidth / 2);

export const startButton = document.getElementById("start");

initGame();
window.addEventListener("keydown", (e) => keyHandler(e.key));
