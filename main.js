import { board } from "./js/board.js";
import { O, I, L, J, S, Z, T } from "./js/pieces.js";
import { settings } from "./settings.js";

export const display = document.getElementById("app");
export const blockSize = settings.blockSize;
export const boardWidth = settings.boardWidth * blockSize;
export const boardHeight = settings.boardHeight * blockSize;
export const startPosition = Math.round(boardWidth / 2);

const startButton = document.getElementById("start");

const gameSpeed = settings.gameSpeed;
let updateGameInterval;
let gravityInterval;

let runningGame = false;
let currentPiece;

function initGame() {
  board.start();
  startButton.innerText = "Start!";
  startButton.addEventListener("click", startGame, { once: true });
}

function startGame() {
  if (!updateGameInterval) {
    updateGameInterval = setInterval(updateGameArea, 30);
  }
  runningGame = true;
  createPiece();
  gravity();
}

function keyHandler(key) {
  if (!runningGame) return;
  if (key === "ArrowRight") {
    moveRight();
  }
  if (key === "ArrowLeft") {
    moveLeft();
  }
  if (key === "ArrowDown") {
    moveDown();
  }
  if (key === "ArrowUp") {
    changePosition();
  }
  if (key === " ") {
    toBottom();
  }
}

function endGame() {
  if (currentPiece.y === 0 && !canMoveDown(currentPiece)) {
    console.log("Ah beneit! Has perdut!");
    clearInterval(gravityInterval);
    gravityInterval = null;
    clearInterval(updateGameInterval);
    updateGameInterval = null;
    runningGame = false;
    startButton.innerText = "Reset";
    startButton.addEventListener("click", initGame, { once: true });
    return true;
  }
}

function createPiece() {
  if (!runningGame) return;
  if (currentPiece) return;
  const rand = Math.floor(Math.random() * (7 - 1 + 1)) + 1; // https://www.w3schools.com/JS/js_random.asp
  switch (rand) {
    case 1:
      currentPiece = new T();
      break;
    case 2:
      currentPiece = new O();
      break;
    case 3:
      currentPiece = new J();
      break;
    case 4:
      currentPiece = new S();
      break;
    case 5:
      currentPiece = new L();
      break;
    case 6:
      currentPiece = new Z();
      break;
    case 7:
      currentPiece = new I();
      break;
  }
}

function stackPiece(piece) {
  const newPiece = { ...piece };
  currentPiece = null;
  board.stack.push(newPiece);
}

export function updateGameArea() {
  if (!endGame()) {
    board.clear();
    board.stack.forEach((piece) => piece.update());
    currentPiece.setPosition();
    currentPiece.update();
  }
}

function gravity() {
  if (!gravityInterval) {
    gravityInterval = setInterval(gravityHandler, gameSpeed);
  }
}

function gravityHandler() {
  if (canMoveDown(currentPiece)) {
    moveDown();
    return;
  }
  stackPiece(currentPiece);
  createPiece();
}

function canMoveRight(piece) {
  if (checkRightCollide(piece)) return false;
  return true;
}

function canMoveLeft(piece) {
  if (checkLeftCollide(piece)) return false;
  return true;
}

function canMoveDown(piece) {
  if (checkVerticalCollide(piece)) return false;
  return true;
}

function checkVerticalCollide(piece) {
  for (let i = 0; i < piece.blocks.length; i++) {
    if (piece.y + piece.blocks[i].y + blockSize === boardHeight) return true;
  }
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].blocks.length; j++) {
      for (let k = 0; k < piece.blocks.length; k++) {
        if (
          piece.y + piece.blocks[k].y + blockSize ===
            board.stack[i].y + board.stack[i].blocks[j].y &&
          piece.x + piece.blocks[k].x ===
            board.stack[i].x + board.stack[i].blocks[j].x
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkRightCollide(piece) {
  for (let i = 0; i < piece.blocks.length; i++) {
    if (piece.x + piece.blocks[i].x + blockSize === boardWidth) return true;
  }
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].blocks.length; j++) {
      for (let k = 0; k < piece.blocks.length; k++) {
        if (
          piece.y + piece.blocks[k].y ===
            board.stack[i].y + board.stack[i].blocks[j].y &&
          piece.x + piece.blocks[k].x + blockSize ===
            board.stack[i].x + board.stack[i].blocks[j].x
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkLeftCollide(piece) {
  for (let i = 0; i < piece.blocks.length; i++) {
    if (piece.x + piece.blocks[i].x === 0) return true;
  }
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].blocks.length; j++) {
      for (let k = 0; k < piece.blocks.length; k++) {
        if (
          piece.y + piece.blocks[k].y ===
            board.stack[i].y + board.stack[i].blocks[j].y &&
          piece.x + piece.blocks[k].x ===
            board.stack[i].x + board.stack[i].blocks[j].x + blockSize
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// TODO
function canChangePosition(piece) {
  const futurePiece = { ...piece };
  futurePiece.position++;
  futurePiece.setPosition();
  if (
    checkNegativeLeftCollide(futurePiece) &&
    checkNegativeRightCollide(futurePiece)
  )
    return false;
  if (checkNegativeLeftCollide(futurePiece)) {
    currentPiece.x += blockSize;
  }
  if (checkNegativeRightCollide(futurePiece)) {
    currentPiece.x -= blockSize;
  }
  return true;
}

// DELETE THIS...
// function canChangePosition(piece) {
//   if (checkNegativeLeftCollide(piece) && checkNegativeRightCollide(piece))
//     return false;
//   if (checkNegativeLeftCollide(piece)) {
//     currentPiece.x += blockSize;
//   }
//   if (checkNegativeRightCollide(piece)) {
//     currentPiece.x -= blockSize;
//   }
//   return true;
// }
// ...

function checkNegativeRightCollide(piece) {
  if (piece.x + piece.width > boardWidth) return true;

  for (let i = 0; i < board.stack.length; i++) {
    if (board.stack[i].x > piece.x) {
      for (let j = 0; j < board.stack[i].blocks.length; j++) {
        for (let k = 0; k < piece.blocks.length; k++) {
          if (
            piece.y + piece.blocks[k].y ===
              board.stack[i].y + board.stack[i].blocks[j].y &&
            piece.x + piece.width >
              board.stack[i].x + board.stack[i].blocks[j].x
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function checkNegativeLeftCollide(piece) {
  if (piece.x < 0) return true;

  for (let i = 0; i < board.stack.length; i++) {
    if (board.stack[i].x < piece.x) {
      for (let j = 0; j < board.stack[i].blocks.length; j++) {
        for (let k = 0; k < piece.blocks.length; k++) {
          if (
            piece.y + piece.blocks[k].y ===
              board.stack[i].y + board.stack[i].blocks[j].y &&
            piece.x < board.stack[i].x + board.stack[i].blocks[j].x + blockSize
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function moveDown() {
  if (canMoveDown(currentPiece)) {
    currentPiece.y += blockSize;
  }
}

function toBottom() {
  while (canMoveDown(currentPiece)) {
    moveDown();
  }
  stackPiece(currentPiece);
  createPiece();
}

function moveRight() {
  if (canMoveRight(currentPiece)) {
    currentPiece.x += blockSize;
  }
}

function moveLeft() {
  if (canMoveLeft(currentPiece)) {
    currentPiece.x -= blockSize;
  }
}

function changePosition() {
  if (currentPiece instanceof O) return;
  if (canChangePosition(currentPiece)) {
    currentPiece.changePosition();
  }
}

function getCoordenates(piece) {
  return piece.blocks.map((part) => [
    (piece.x + part.x) / blockSize,
    (piece.y + part.y) / blockSize,
  ]);
}

initGame();
window.addEventListener("keydown", (e) => keyHandler(e.key));
console.log(settings);
