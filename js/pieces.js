import { board } from "./board.js";
import { blockSize, startPosition } from "../main.js";

export class O {
  constructor() {
    this.width = blockSize * 2;
    this.height = blockSize * 2;
    this.x = startPosition - blockSize;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      this.blocks = [
        { x: 0, y: 0 },
        { x: blockSize, y: 0 },
        { x: 0, y: blockSize },
        { x: blockSize, y: blockSize },
      ];
    };
    this.changePosition = function () {
      return;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "yellow";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class I {
  constructor() {
    this.width = blockSize * 4;
    this.height = blockSize * 4;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 3, y: blockSize },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 3 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: 0, y: blockSize * 2 },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
            { x: blockSize * 3, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize, y: blockSize * 3 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "mediumaquamarine";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class L {
  constructor() {
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: 0 },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: 0, y: blockSize * 2 },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 4:
          this.blocks = [
            { x: 0, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "orange";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class J {
  constructor() {
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: 0 },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: 0, y: blockSize * 2 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "blue";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class S {
  constructor() {
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: 0 },
            { x: blockSize * 2, y: 0 },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: 0, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.blocks = [
            { x: 0, y: 0 },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "green";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class Z {
  constructor() {
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: 0, y: blockSize },
            { x: 0, y: blockSize * 2 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "red";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}

export class T {
  constructor() {
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.x = startPosition - blockSize * 2;
    this.y = 0;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: 0 },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 4:
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
      }
    };
    this.changePosition = function () {
      if (this.position === 4) {
        this.position = 1;
      } else {
        this.position++;
      }
      let aux = this.width;
      this.width = this.height;
      this.height = aux;
    };
    this.update = function () {
      const ctx = board.context;
      ctx.fillStyle = "purple";
      this.blocks.forEach((part) => {
        ctx.fillRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
        ctx.strokeRect(this.x + part.x, this.y + part.y, blockSize, blockSize);
      });
    };
  }
}
