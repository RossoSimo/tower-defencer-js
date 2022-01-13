const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export let frame = 0;
export function updateFrame() {
    frame++;
}

export let score = 0;
export const winningScore = 90000000000000000000;
export function updateScore(amount) {
    score += amount;
}

/*
COLLISIONI
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

The x position of the ball is greater than the x position of the brick.
The x position of the ball is less than the x position of the brick plus its width.
The y position of the ball is greater than the y position of the brick.
The y position of the ball is less than the y position of the brick plus its height.
*/
export function collision(first, second) {
    if(first == undefined || second == undefined) return false;
    if( !(  first.x >= second.x + second.width ||
            first.x + first.width <= second.x ||
            first.y >= second.y + second.height ||
            first.y + first.height <= second.y)
    ) {
        return true;
    }
}

import {coin} from './coins.js';
import { enemies } from './enemies.js';

export let game_over = false;

// UI
export function handleGameStatus() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Roboto Mono';
    ctx.fillText('Score: ' + score, 760, 80);
    ctx.fillText('Coin: ' + coin, 760, 40);
    if(game_over) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Roboto Mono';
        ctx.fillText('GAME OVER', 135, 330);
    }
    if(score >= winningScore && enemies.length === 0) {
        ctx.fillStyle = 'black';
        ctx.font = '80px Roboto Mono';
        ctx.fillText('STAGE COMPLETED!', 130, 300);
        ctx.font = '30px Roboto Mono';
        ctx.fillText('Score: ' + score, 134, 340);
    }
}

export function gameOver() {
    game_over = true;
}

export const floatingMsg = [];

class Msg {
    constructor(value, x, y, size, color) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.timer = 0;
        this.color = color;
        this.opacity = 1;
    }

    update() {
        this.y -= 0.3;
        this.timer += 1;
        if(this.opacity > 0.01) this.opacity -= 0.01;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'px Roboto Mono';
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

export function handleMsg() {
    for ( let i = 0; i < floatingMsg.length; i++) {
        floatingMsg[i].update();
        floatingMsg[i].draw();
        if(floatingMsg[i].timer > 50) {
            floatingMsg.splice(i, 1);
            i--;
            
        }
    }
}

export {Msg};