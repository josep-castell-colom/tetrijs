import {
  blockSize,
  boardWidth,
  display,
  holdDisplay,
  nextDisplay,
  paneDisplay,
} from "../main.js";
import { boardHeight } from "../main.js";

export const board = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.id = "board";
    this.context = this.canvas.getContext("2d");
    this.stack = [];
    display.appendChild(this.canvas);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  clearRow: function (rowY) {
    this.context.clearRect(0, rowY * blockSize, this.canvas.width, blockSize);
  },
};

export const nextBoard = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = blockSize * 4;
    this.canvas.height = blockSize * 4;
    this.context = this.canvas.getContext("2d");
    nextDisplay.appendChild(this.canvas);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

export const holdBoard = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = blockSize * 4;
    this.canvas.height = blockSize * 4;
    this.context = this.canvas.getContext("2d");
    holdDisplay.appendChild(this.canvas);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

export const paneBoard = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = blockSize * 8;
    this.canvas.height = blockSize * 3;
    this.context = this.canvas.getContext("2d");
    paneDisplay.appendChild(this.canvas);
  },
  hello: function () {
    const ctx = this.context;
    ctx.font = "10px Arial";
    var gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // ctx.fillStyle = gradient;
    // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "hanging";
    ctx.strokeStyle = "white";
    ctx.fillText = ("Hello!", 0, 0, this.canvas.width);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
