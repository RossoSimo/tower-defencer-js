const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

export let coin = 300;

export function addCoin(amount) {
    coin += amount;
}

export function removeCoin(amount) {
    coin -= amount;
}

import { cellSize } from './grid.js';
import { frame, score, winningScore, collision } from './utils.js';
import { mouse } from './mouse.js'
import { Msg, floatingMsg} from './utils.js'

const drops = [];

let coinImage = new Image();
coinImage.src = '../img/coin/coin.png';

class Drop {
    constructor() {
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.value = 20;

        this.frame = coinImage;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 13;
        this.spriteWidth = 60;
        this.spriteHeight = 60;
    }
    update() {
        if(frame % 10 === 0) {
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
    draw() {
        ctx.drawImage(this.frame, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function handleDrops() {
    if(frame % 500 === 0 && score < winningScore) {
        drops.push(new Drop());
    }
    for ( let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw();
        if ( drops[i] && mouse.x && mouse.y && collision(drops[i], mouse)) {
            addCoin(drops[i].value);
            floatingMsg.push(new Msg("+" + drops[i].value, drops[i].x, drops[i].y, 22,'black')); // + sui droops
            floatingMsg.push(new Msg("+" + drops[i].value, 870, 30, 30,'white')); // + su coin
            drops.splice(i, 1);
            i--;
        }
    }
}

export {handleDrops}