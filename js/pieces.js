import { board, holdBoard, nextBoard } from './board.js';
import { blockSize, startPosition } from '../main.js';

export class O {
  constructor() {
    this.box = blockSize * 2;
    this.width = blockSize * 2;
    this.height = blockSize * 2;
    this.startX = startPosition - blockSize;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      this.absoluteX = this.x;
      this.absoluteY = this.y;
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
      ctx.fillStyle = 'yellow';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'yellow';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'yellow';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'yellow';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class I {
  constructor() {
    this.box = blockSize * 4;
    this.width = blockSize * 4;
    this.height = blockSize * 1;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.width = blockSize * 4;
          this.height = blockSize * 1;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 3, y: blockSize },
          ];
          break;
        case 2:
          this.width = blockSize * 1;
          this.height = blockSize * 4;
          this.absoluteX = this.x + blockSize * 2;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 3 },
          ];
          break;
        case 3:
          this.width = blockSize * 4;
          this.height = blockSize * 1;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize * 2;
          this.blocks = [
            { x: 0, y: blockSize * 2 },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
            { x: blockSize * 3, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.width = blockSize * 1;
          this.height = blockSize * 4;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'mediumaquamarine';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'mediumaquamarine';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'mediumaquamarine';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'mediumaquamarine';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class L {
  constructor() {
    this.box = blockSize * 3;
    this.width = blockSize * 3;
    this.height = blockSize * 2;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: 0 },
          ];
          break;
        case 2:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.blocks = [
            { x: 0, y: blockSize * 2 },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 4:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'orange';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'orange';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'orange';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'orange';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class J {
  constructor() {
    this.box = blockSize * 3;
    this.width = blockSize * 2;
    this.height = blockSize * 3;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
          this.blocks = [
            { x: 0, y: 0 },
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'blue';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'blue';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'blue';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class S {
  constructor() {
    this.box = blockSize * 3;
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: 0 },
            { x: blockSize * 2, y: 0 },
          ];
          break;
        case 2:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.blocks = [
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: 0, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'green';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'green';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'green';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'green';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class Z {
  constructor() {
    this.box = blockSize * 3;
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
          this.blocks = [
            { x: 0, y: 0 },
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize * 2, y: 0 },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize * 2 },
          ];
          break;
        case 4:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'red';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'red';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'red';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}

export class T {
  constructor() {
    this.box = blockSize * 3;
    this.width = blockSize * 3;
    this.height = blockSize * 3;
    this.startX = startPosition - blockSize * 2;
    this.x = this.startX;
    this.y = 0;
    this.absoluteX;
    this.absoluteY;
    this.position = 1;
    this.blocks = [];
    this.setPosition = function () {
      switch (this.position) {
        case 1:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: 0 },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 2:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x + blockSize;
          this.absoluteY = this.y;
          this.blocks = [
            { x: blockSize, y: 0 },
            { x: blockSize, y: blockSize },
            { x: blockSize * 2, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
          ];
          break;
        case 3:
          this.width = blockSize * 3;
          this.height = blockSize * 2;
          this.absoluteX = this.x;
          this.absoluteY = this.y + blockSize;
          this.blocks = [
            { x: 0, y: blockSize },
            { x: blockSize, y: blockSize },
            { x: blockSize, y: blockSize * 2 },
            { x: blockSize * 2, y: blockSize },
          ];
          break;
        case 4:
          this.width = blockSize * 2;
          this.height = blockSize * 3;
          this.absoluteX = this.x;
          this.absoluteY = this.y;
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
      ctx.fillStyle = 'purple';
      ctx.strokeStyle = 'black';
      this.blocks.forEach(block => {
        ctx.fillRect(this.x + block.x, this.y + block.y, blockSize, blockSize);
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updatePhantom = function () {
      const ctx = board.context;
      ctx.strokeStyle = 'purple';
      this.blocks.forEach(block => {
        ctx.strokeRect(
          this.x + block.x,
          this.y + block.y,
          blockSize,
          blockSize
        );
      });
    };
    this.updateNext = function () {
      const ctx = nextBoard.context;
      ctx.fillStyle = 'purple';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
    this.updateHold = function () {
      const ctx = holdBoard.context;
      ctx.fillStyle = 'purple';
      this.blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
        ctx.strokeRect(block.x, block.y, blockSize, blockSize);
      });
    };
  }
}
