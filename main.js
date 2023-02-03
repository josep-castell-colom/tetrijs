import { board, holdBoard, nextBoard, paneBoard } from './js/board.js';
import { O, I, L, J, S, Z, T } from './js/pieces.js';
import { settings } from './settings.js';
import {
  checkFilledRow,
  fillMatrix,
  initMatrix,
  matrix,
  resetMatrix,
} from './js/matrix.js';
import { mainTheme, titleTheme } from './js/media.js';

export const display = document.getElementById('display');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const linesDisplay = document.getElementById('lines');
const gameOverDisplay = document.getElementById('game-over');
const yourScore = document.getElementById('your-score');
export const nextDisplay = document.getElementById('next');
export const holdDisplay = document.getElementById('hold');
export const paneDisplay = document.getElementById('pane');
export const blockSize = settings.blockSize;
export const boardWidth = settings.boardWidth * blockSize;
export const boardHeight = settings.boardHeight * blockSize;
export const startPosition = Math.round(boardWidth / 2);

const startButton = document.getElementById('start');

let gameSpeed;
let updateGameInterval;
let gravityInterval;

let runningGame = false;
let currentPiece;
let phantomPiece;
let nextPhantomPiece;
let nextPiece;
let holdedPiece;
let dropDistance;
let score;
let level;
let clearedLines;
let linesForNextLevel = 10;

function initGame() {
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
  gameOverDisplay.style.display = 'none';
  startButton.innerText = 'Start!';
  startButton.addEventListener('click', startGame, { once: true });
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

function keyHandler(key) {
  if (!runningGame) return;
  if (key === 'ArrowRight') {
    moveRight();
    phantomHandler();
  }
  if (key === 'ArrowLeft') {
    moveLeft();
    phantomHandler();
  }
  if (key === 'ArrowDown') {
    if (canMoveDown(currentPiece)) {
      moveDown(currentPiece);
      phantomHandler();
    }
  }
  if (key === 'ArrowUp') {
    changePosition();
    phantomHandler();
  }
  if (key === ' ') {
    dropDistance = (boardHeight - currentPiece.y) / blockSize;
    toBottom(currentPiece, 'current');
  }
  if (key === 'd') {
    hold();
  }
}

function endGame() {
  mainTheme.pause();
  mainTheme.load();
  console.log('Ah beneit! Has perdut!');
  clearInterval(gravityInterval);
  gravityInterval = null;
  clearInterval(updateGameInterval);
  updateGameInterval = null;
  runningGame = false;
  saveScore();
  gameOverDisplay.style.display = 'flex';
  startButton.innerText = 'Reset';
  startButton.addEventListener('click', initGame, { once: true });
}

function saveScore() {
  const name = prompt('Introduce tu nombre: ');
  yourScore.innerText = `Your score: ${score}`;
}

function createPiece() {
  if (!runningGame) return;
  if (!currentPiece) {
    const rand = Math.floor(Math.random() * (7 - 1 + 1)) + 1; // https://www.w3schools.com/JS/js_random.asp
    switch (rand) {
      case 1:
        currentPiece = new T();
        phantomPiece = new T();
        break;
      case 2:
        currentPiece = new O();
        phantomPiece = new O();
        break;
      case 3:
        currentPiece = new J();
        phantomPiece = new J();
        break;
      case 4:
        currentPiece = new S();
        phantomPiece = new S();
        break;
      case 5:
        currentPiece = new L();
        phantomPiece = new L();
        break;
      case 6:
        currentPiece = new Z();
        phantomPiece = new Z();
        break;
      case 7:
        currentPiece = new I();
        phantomPiece = new I();
        break;
    }
  } else {
    currentPiece = { ...nextPiece };
    if (nextPhantomPiece) {
      phantomPiece = { ...nextPhantomPiece };
    }
  }
  phantomPiece.setPosition();
  phantomHandler();
}

function createNext() {
  const rand = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  switch (rand) {
    case 1:
      nextPiece = new T();
      nextPhantomPiece = new T();
      break;
    case 2:
      nextPiece = new O();
      nextPhantomPiece = new O();
      break;
    case 3:
      nextPiece = new J();
      nextPhantomPiece = new J();
      break;
    case 4:
      nextPiece = new S();
      nextPhantomPiece = new S();
      break;
    case 5:
      nextPiece = new L();
      nextPhantomPiece = new L();
      break;
    case 6:
      nextPiece = new Z();
      nextPhantomPiece = new Z();
      break;
    case 7:
      nextPiece = new I();
      nextPhantomPiece = new I();
      break;
  }
  nextBoard.clear();
  nextPiece.setPosition();
  nextPiece.updateNext();
}

function stackPiece(piece) {
  const toStackPiece = { ...piece };
  board.stack.push(toStackPiece);
  fillMatrix(getCoordenates(toStackPiece));
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

function updateScore(rows) {
  if (rows) {
    score += dropDistance * settings.scores.hardDrop;
    switch (rows) {
      case 1:
        score += settings.scores.single * (level + 1);
        break;
      case 2:
        score += settings.scores.double * (level + 1);
        break;
      case 3:
        score += settings.scores.triple * (level + 1);
        break;
      case 4:
        score += settings.scores.tetris * (level + 1);
        break;
    }
    scoreDisplay.innerText = score;
  }
  checkLevel(rows);
}

function checkLevel(rows) {
  clearedLines += rows;
  linesForNextLevel -= rows;
  if (linesForNextLevel === 0) {
    level++;
    linesForNextLevel = 10;
    increaseSpeed();
  }
  if (linesForNextLevel < 0) {
    level++;
    linesForNextLevel = 10 + linesForNextLevel;
    increaseSpeed();
  }
  levelDisplay.innerText = level;
  linesDisplay.innerText = clearedLines;
}

function increaseSpeed() {
  console.log(gameSpeed);
  // gameSpeed = gameSpeed * 0.9;
  gameSpeed -= 70;
  console.log(gameSpeed);
  resetGravity();
}

function updateClearRow(y) {
  board.stack.forEach(piece => {
    piece.blocks.forEach(block => {
      if (piece.y + block.y === y * blockSize) {
        piece.blocks = deleteBlock(piece.blocks, block);
      } else if (piece.y + block.y < y * blockSize) {
        block.y += blockSize;
      }
    });
  });
}

function deleteBlock(blocks, block) {
  return blocks.filter(e => e != block);
}

export function updateGameArea() {
  if (runningGame) {
    board.clear();
    board.stack.forEach(piece => piece.update());
    phantomPiece.setPosition();
    phantomPiece.updatePhantom();
    currentPiece.setPosition();
    currentPiece.update();
  }
}

function phantomHandler() {
  phantomPiece.x = currentPiece.x;
  phantomPiece.position = currentPiece.position;
  phantomPiece.y = currentPiece.y;
  toBottom(phantomPiece);
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

function moveDown(piece) {
  piece.y += blockSize;
}

function toBottom(piece, type) {
  while (canMoveDown(piece)) {
    moveDown(piece);
  }
  if (type === 'current') {
    stackPiece(piece);
    createPiece();
    createNext();
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

function changePosition() {
  if (currentPiece instanceof O) return;
  if (canChangePosition(currentPiece)) {
    currentPiece.changePosition();
  }
}

function hold() {
  if (!holdedPiece) {
    holdedPiece = { ...currentPiece };
    holdedPiece.y = 0;
    holdedPiece.x = holdedPiece.startX;
    holdedPiece.position = 1;
    holdedPiece.updateHold();
    createPiece();
  } else {
    const aux = { ...holdedPiece };
    holdedPiece = { ...currentPiece };
    holdedPiece.y = 0;
    holdedPiece.x = holdedPiece.startX;
    holdedPiece.position = 1;
    holdBoard.clear();
    holdedPiece.updateHold();
    currentPiece = aux;
    phantomPiece = { ...aux };
    phantomHandler();
  }
}

export function getCoordenates(piece) {
  return piece.blocks.map(part => [
    (piece.x + part.x) / blockSize,
    (piece.y + part.y) / blockSize,
  ]);
}

initGame();
window.addEventListener('keydown', e => keyHandler(e.key));
