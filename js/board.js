import { boardWidth, display } from '../main.js';
import { boardHeight } from '../main.js';
import { updateGameArea } from '../main.js';

export const board = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.id = 'board';
    this.context = this.canvas.getContext('2d');
    this.stack = [];
    display.appendChild(this.canvas);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
