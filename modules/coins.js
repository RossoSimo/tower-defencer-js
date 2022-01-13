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

class Drop {
    constructor() {
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.value = 20;
    }
    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Roboto Mono';
        ctx.fillText(this.value, this.x + 15, this.y + 15);
    }
}

function handleDrops() {
    if(frame % 500 === 0 && score < winningScore) {
        drops.push(new Drop());
    }
    for ( let i = 0; i < drops.length; i++) {
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