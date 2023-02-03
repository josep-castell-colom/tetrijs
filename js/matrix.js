import { getCoordenates } from "./piecesControls.js";
import { settings } from "../settings.js";
import { board } from "./board.js";

export const matrix = [];

export function initMatrix() {
  matrix.splice(0, matrix.length);
  for (let i = 0; i < settings.boardHeight; i++) {
    const row = [];
    for (let j = 0; j < settings.boardWidth; j++) {
      row.push(false);
    }
    matrix.push(row);
  }
}

export function resetMatrix() {
  initMatrix();
  board.stack.forEach((piece) => {
    fillMatrix(getCoordenates(piece));
  });
}

export function fillMatrix(piece) {
  piece.forEach((block) => {
    fillMatrixCell(block[0], block[1]);
  });
}

function fillMatrixCell(x, y) {
  matrix[y][x] = true;
}

export function checkFilledRow(row) {
  let isFilledRow = true;
  for (let i = 0; i < row.length && isFilledRow; i++) {
    isFilledRow = row[i];
  }
  return isFilledRow;
}
