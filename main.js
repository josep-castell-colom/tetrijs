import { board } from './js/board.js';
import { O, I, L, J, S, Z, T } from './js/pieces.js';

export const display = document.getElementById('app');
export const blockSize = 20;
export const boardWidth = 10 * blockSize;
export const boardHeight = 20 * blockSize;
export const startPosition = blockSize * 4;

const gameSpeed = 1000;

let currentPiece;

function initGame() {
  board.start();
  document.getElementById('start').addEventListener('click', () => {
    startGame();
  });
}

function startGame() {
  setInterval(updateGameArea, 30);

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      moveRight();
    }
    if (e.key === 'ArrowLeft') {
      moveLeft();
    }
    if (e.key === 'ArrowDown') {
      moveDown();
    }
    if (e.key === 'ArrowUp') {
      currentPiece.changePosition();
    }
  });

  createPiece();
  gravity();
}

function createPiece() {
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
  board.stack.push(newPiece);
}

export function updateGameArea() {
  board.clear();
  board.stack.forEach(piece => piece.update());
  currentPiece.setPosition();
  currentPiece.update();
}

function gravity() {
  setInterval(() => {
    if (canMoveDown(currentPiece)) {
      moveDown();
      return;
    }
    stackPiece(currentPiece);
    createPiece();
  }, gameSpeed);
}

function canMoveRight(piece) {
  if (piece.x + piece.width + blockSize > boardWidth) return false;
  if (checkRightCollide()) return false;
  return true;
}

function canMoveLeft(piece) {
  if (piece.x - blockSize < 0) return false;
  if (checkLeftCollide()) return false;
  return true;
}

function canMoveDown(piece) {
  if (piece.y + piece.height + blockSize > boardHeight) return false;
  if (checkVerticalCollide()) return false;
  return true;
}

function checkVerticalCollide() {
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].parts.length; j++) {
      for (let k = 0; k < currentPiece.parts.length; k++) {
        if (
          currentPiece.y + currentPiece.parts[k].y + blockSize ===
            board.stack[i].y + board.stack[i].parts[j].y &&
          currentPiece.x + currentPiece.parts[k].x ===
            board.stack[i].x + board.stack[i].parts[j].x
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkRightCollide() {
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].parts.length; j++) {
      for (let k = 0; k < currentPiece.parts.length; k++) {
        if (
          currentPiece.y + currentPiece.parts[k].y ===
            board.stack[i].y + board.stack[i].parts[j].y &&
          currentPiece.x + currentPiece.parts[k].x + blockSize ===
            board.stack[i].x + board.stack[i].parts[j].x
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkLeftCollide() {
  for (let i = 0; i < board.stack.length; i++) {
    for (let j = 0; j < board.stack[i].parts.length; j++) {
      for (let k = 0; k < currentPiece.parts.length; k++) {
        if (
          currentPiece.y + currentPiece.parts[k].y ===
            board.stack[i].y + board.stack[i].parts[j].y &&
          currentPiece.x + currentPiece.parts[k].x ===
            board.stack[i].x + board.stack[i].parts[j].x + blockSize
        ) {
          return true;
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

function getCoordenates(piece) {
  return piece.parts.map(part => [
    (piece.x + part.x) / blockSize,
    (piece.y + part.y) / blockSize,
  ]);
}

initGame();
