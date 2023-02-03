import { O, I, L, J, S, Z, T } from "./pieces.js";
import {
  runningGame,
  currentPiece,
  holdedPiece,
  phantomPiece,
  setCurrentPiece,
  setPhantomPiece,
  setNextPhantomPiece,
  setNextPiece,
  setHoldedPiece,
  nextPiece,
  stackPiece,
  nextPhantomPiece,
} from "./game.js";
import { blockSize, boardHeight, boardWidth } from "../main.js";
import { board, holdBoard, nextBoard } from "./board.js";
import { holdSFX } from "./media.js";

export function createPiece() {
  if (!runningGame) return;
  if (!currentPiece) {
    const rand = Math.floor(Math.random() * (7 - 1 + 1)) + 1; // https://www.w3schools.com/JS/js_random.asp
    switch (rand) {
      case 1:
        setCurrentPiece(new T());
        setPhantomPiece(new T());
        break;
      case 2:
        setCurrentPiece(new O());
        setPhantomPiece(new O());
        break;
      case 3:
        setCurrentPiece(new J());
        setPhantomPiece(new J());
        break;
      case 4:
        setCurrentPiece(new S());
        setPhantomPiece(new S());
        break;
      case 5:
        setCurrentPiece(new L());
        setPhantomPiece(new L());
        break;
      case 6:
        setCurrentPiece(new Z());
        setPhantomPiece(new Z());
        break;
      case 7:
        setCurrentPiece(new I());
        setPhantomPiece(new I());
        break;
    }
  } else {
    setCurrentPiece({ ...nextPiece });
    if (nextPhantomPiece) {
      setPhantomPiece({ ...nextPhantomPiece });
    }
  }
  phantomPiece.setPosition();
  phantomHandler();
}

export function createNext() {
  const rand = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  switch (rand) {
    case 1:
      setNextPiece(new T());
      setNextPhantomPiece(new T());
      break;
    case 2:
      setNextPiece(new O());
      setNextPhantomPiece(new O());
      break;
    case 3:
      setNextPiece(new J());
      setNextPhantomPiece(new J());
      break;
    case 4:
      setNextPiece(new S());
      setNextPhantomPiece(new S());
      break;
    case 5:
      setNextPiece(new L());
      setNextPhantomPiece(new L());
      break;
    case 6:
      setNextPiece(new Z());
      setNextPhantomPiece(new Z());
      break;
    case 7:
      setNextPiece(new I());
      setNextPhantomPiece(new I());
      break;
  }
  nextBoard.clear();
  nextPiece.setPosition();
  nextPiece.updateNext();
}

export function deleteBlock(blocks, block) {
  return blocks.filter((e) => e != block);
}

export function canMoveRight(piece) {
  if (checkRightCollide(piece)) return false;
  return true;
}

export function canMoveLeft(piece) {
  if (checkLeftCollide(piece)) return false;
  return true;
}

export function canMoveDown(piece) {
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

export function moveDown(piece) {
  piece.y += blockSize;
}

export function toBottom(piece, type) {
  while (canMoveDown(piece)) {
    moveDown(piece);
  }
  if (type === "current") {
    stackPiece(piece);
    createPiece();
    createNext();
  }
}

export function moveRight() {
  if (canMoveRight(currentPiece)) {
    currentPiece.x += blockSize;
  }
}

export function moveLeft() {
  if (canMoveLeft(currentPiece)) {
    currentPiece.x -= blockSize;
  }
}

export function changePosition() {
  if (currentPiece instanceof O) return;
  if (canChangePosition(currentPiece)) {
    currentPiece.changePosition();
  }
}

export function hold() {
  if (!holdedPiece) {
    const auxHoldedPiece = { ...currentPiece };
    auxHoldedPiece.y = 0;
    auxHoldedPiece.x = auxHoldedPiece.startX;
    auxHoldedPiece.position = 1;
    setHoldedPiece(auxHoldedPiece);
    holdedPiece.updateHold();
    createPiece();
  } else {
    const auxCurrentPiece = { ...holdedPiece };
    const auxHoldedPiece = { ...currentPiece };
    auxHoldedPiece.y = 0;
    auxHoldedPiece.x = holdedPiece.startX;
    auxHoldedPiece.position = 1;
    setHoldedPiece(auxHoldedPiece);
    holdBoard.clear();
    holdedPiece.updateHold();
    setCurrentPiece(auxCurrentPiece);
    setPhantomPiece({ ...auxCurrentPiece });
    phantomHandler();
  }
  holdSFX.play();
}

export function phantomHandler() {
  phantomPiece.x = currentPiece.x;
  phantomPiece.position = currentPiece.position;
  phantomPiece.y = currentPiece.y;
  toBottom(phantomPiece);
}

export function getCoordenates(piece) {
  return piece.blocks.map((part) => [
    (piece.x + part.x) / blockSize,
    (piece.y + part.y) / blockSize,
  ]);
}
