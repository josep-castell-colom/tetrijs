import { board, holdBoard, nextBoard, paneBoard } from "./board.js";
import {
  createPiece,
  createNext,
  phantomHandler,
  canMoveDown,
  moveDown,
  moveLeft,
  moveRight,
  changePosition,
  toBottom,
  getCoordenates,
  deleteBlock,
  hold,
} from "./piecesControls.js";
import { settings } from "../settings.js";

import {
  checkFilledRow,
  fillMatrix,
  initMatrix,
  matrix,
  resetMatrix,
} from "./matrix.js";

import {
  scoreDisplay,
  levelDisplay,
  linesDisplay,
  gameOverDisplay,
  startButton,
  boardHeight,
  blockSize,
  display,
  boardDisplay,
} from "../main.js";

import {
  gameOverSFX,
  levelUpSFX,
  lineClearSFX,
  mainTheme,
  mainTheme2,
  stackSFX,
  tetrisSFX,
  titleTheme,
} from "./media.js";

let gameSpeed;
let updateGameInterval;
let gravityInterval;

export let runningGame = false;
export let currentPiece;
export let phantomPiece;
export let nextPhantomPiece;
export let nextPiece;
export let holdedPiece;
let dropDistance;
let score;
let level;
let clearedLines;
let linesForNextLevel = 10;

export function setCurrentPiece(piece) {
  currentPiece = piece;
}

export function setPhantomPiece(piece) {
  phantomPiece = piece;
}

export function setNextPhantomPiece(piece) {
  nextPhantomPiece = piece;
}

export function setNextPiece(piece) {
  nextPiece = piece;
}

export function setHoldedPiece(piece) {
  holdedPiece = piece;
}

export function initGame() {
  initMatrix();
  board.start();
  holdBoard.start();
  nextBoard.start();
  paneBoard.start();
  paneBoard.hello();
  gameSpeed = settings.gameSpeed;
  score = 0;
  level = 0;
  clearedLines = 0;
  linesForNextLevel = 10;
  scoreDisplay.innerText = score;
  levelDisplay.innerText = level;
  linesDisplay.innerText = clearedLines;
  gameOverDisplay.style.display = "none";
  startButton.innerText = "Start!";
  startButton.addEventListener("click", startGame, { once: true });
  titleTheme.play();
}

function startGame() {
  runningGame = true;
  if (!updateGameInterval) {
    updateGameInterval = setInterval(updateGameArea, 30);
  }
  createPiece();
  createNext();
  setGravity();
  phantomPiece.setPosition();
  phantomHandler();
  titleTheme.pause();
  titleTheme.load();
  mainTheme.play();
}

export function keyHandler(key) {
  if (!runningGame) return;
  if (key === "ArrowRight") {
    moveRight();
    phantomHandler();
  }
  if (key === "ArrowLeft") {
    moveLeft();
    phantomHandler();
  }
  if (key === "ArrowDown") {
    if (canMoveDown(currentPiece)) {
      moveDown(currentPiece);
      phantomHandler();
    }
  }
  if (key === "ArrowUp") {
    changePosition();
    phantomHandler();
  }
  if (key === " ") {
    dropDistance = (boardHeight - currentPiece.y) / blockSize;
    toBottom(currentPiece, "current");
  }
  if (key === "d") {
    hold();
  }
}

function endGame() {
  mainTheme.pause();
  mainTheme.load();
  mainTheme2.pause();
  mainTheme2.load();
  gameOverSFX.play();
  console.log("Ah beneit! Has perdut!");
  clearInterval(gravityInterval);
  gravityInterval = null;
  clearInterval(updateGameInterval);
  updateGameInterval = null;
  runningGame = false;
  saveScore();
  gameOverDisplay.style.display = "flex";
  startButton.innerText = "Reset";
  startButton.addEventListener("click", initGame, { once: true });
}

export function stackPiece(piece) {
  const toStackPiece = { ...piece };
  board.stack.push(toStackPiece);
  fillMatrix(getCoordenates(toStackPiece));
  stackSFX.play();
  const filledRows = [];
  matrix.forEach((row, index) => {
    if (checkFilledRow(row)) {
      filledRows.push(index);
      board.clearRow(index);
      updateClearRow(index);
      resetMatrix();
    }
  });
  updateScore(filledRows.length);
  dropDistance = 0;
  if (checkEndGame(piece)) {
    endGame();
  }
}

function checkEndGame(piece) {
  if (piece.y <= 0) return true;
  return false;
}

function checkLevel(rows) {
  clearedLines += rows;
  linesForNextLevel -= rows;
  if (linesForNextLevel === 0) {
    levelUpSFX.play();
    level++;
    linesForNextLevel = 10;
    increaseSpeed();
  }
  if (linesForNextLevel < 0) {
    levelUpSFX.play();
    level++;
    linesForNextLevel = 10 + linesForNextLevel;
    increaseSpeed();
  }
  if (level === 1) {
    mainTheme.pause();
    mainTheme.load();
    mainTheme2.play();
    document.getElementById("board").style.backgroundColor = "#555";
  }
  levelDisplay.innerText = level;
  linesDisplay.innerText = clearedLines;
}

function increaseSpeed() {
  console.log(gameSpeed);
  gameSpeed -= 70;
  console.log(gameSpeed);
  resetGravity();
}

function updateClearRow(y) {
  board.stack.forEach((piece) => {
    piece.blocks.forEach((block) => {
      if (piece.y + block.y === y * blockSize) {
        piece.blocks = deleteBlock(piece.blocks, block);
      } else if (piece.y + block.y < y * blockSize) {
        block.y += blockSize;
      }
    });
  });
}

function updateGameArea() {
  if (runningGame) {
    board.clear();
    board.stack.forEach((piece) => piece.update());
    phantomPiece.setPosition();
    phantomPiece.updatePhantom();
    currentPiece.setPosition();
    currentPiece.update();
  }
}

function setGravity() {
  if (!gravityInterval) {
    gravityInterval = setInterval(gravityHandler, gameSpeed);
  }
}

function resetGravity() {
  clearInterval(gravityInterval);
  gravityInterval = null;
  setGravity();
  console.log(gravityInterval);
}

function gravityHandler() {
  if (canMoveDown(currentPiece)) {
    moveDown(currentPiece);
    return;
  }
  stackPiece(currentPiece);
  createPiece();
  createNext();
}

function saveScore() {
  const name = prompt("Introduce tu nombre: ");
  yourScore.innerText = `Your score: ${score}`;
}

function updateScore(rows) {
  if (rows) {
    score += dropDistance * settings.scores.hardDrop;
    switch (rows) {
      case 1:
        score += settings.scores.single * (level + 1);
        lineClearSFX.play();
        break;
      case 2:
        score += settings.scores.double * (level + 1);
        lineClearSFX.play();
        break;
      case 3:
        score += settings.scores.triple * (level + 1);
        lineClearSFX.play();
        break;
      case 4:
        score += settings.scores.tetris * (level + 1);
        tetrisSFX.play();
        break;
    }
    scoreDisplay.innerText = score;
  }
  checkLevel(rows);
}