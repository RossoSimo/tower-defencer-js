import {cellSize, cellGap} from './grid.js';
import {gameOver, updateScore, score, winningScore} from './utils.js';
import {addCoin} from './coins.js';
import {Msg, floatingMsg} from './utils.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const enemies = [];
const enemyPositions = [];
let enemiesTimer = 1000;

const enemyTypes = [];

const enemyA = new Image();
enemyA.src = '../img/enemyA/Walk.png';
enemyTypes.push(enemyA);

const enemyB = new Image();
enemyB.src = '../img/enemyB/Walk.png';
enemyTypes.push(enemyB);


class Enemy {
    constructor(verticalPos, n) {
        this.n = n;
        this.x = canvas.width;
        this.y = verticalPos;
        this.width = cellSize - cellGap*2;
        this.height = cellSize - cellGap*2;
        this.upgrade = false;
        if(n === 1) { // verme
            this.speed = 0.55;
            this.movement = this.speed;
            this.health = 80;
            this.maxHealth = this.health;
            this.enemyTypes = enemyTypes[0];
            this.frameX = 0;
            this.frameY = 0;
            this.minFrame = 0;
            this.maxFrame = 7;
            this.spriteWidth = 140;
            this.spriteHeight = 140;
        } else if(n === 2) { // scheletro
            this.speed = 0.3;
            this.movement = this.speed;
            this.health = 250;
            this.maxHealth = this.health;
            this.enemyTypes = enemyTypes[1];
            this.frameX = 0;
            this.frameY = 0;
            this.minFrame = 0;
            this.maxFrame = 8;
            this.spriteWidth = 22; // cambia
            this.spriteHeight = 33; // cambia
        }
    }
    update() {
        if(score >= 800 && score <= 2000 && this.upgrade == false) {
            this.health *= 1.3;
            this.maxHealth = this.health;
            this.speed *= 1.3;
            this.movement = this.speed;
            this.upgrade = true;
        }
        if(score >= 2001 && score <= 4000 && this.upgrade == false) {
            this.health *= 2;
            this.maxHealth = this.health;
            this.speed *= 2;
            this.movement = this.speed;
            this.upgrade = true;
        }

        this.x -= this.movement;
        if(frame % 15 === 0) {
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
    draw() {
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '21px Roboto Mono';
        ctx.fillText(Math.floor(this.health), this.x + 45, this.y + 40)
        if(this.n == 1) ctx.drawImage(this.enemyTypes, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x-15, this.y, this.width, this.height);
        else  ctx.drawImage(this.enemyTypes, this.frameX * this.spriteWidth, 0, this.spriteWidth-2.5, this.spriteHeight, this.x-10, this.y, this.width-30, this.height);
    }

}

import {frame} from './utils.js';

let mob = 1;
let skeletonTimer = 15;

function handleEnemies() {
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
        if(enemies[i].x < 0) {
            gameOver();
        }
        if(enemies[i].health <= 0) {
            let gain = enemies[i].maxHealth/5
            addCoin(gain);
            updateScore(gain);
            floatingMsg.push(new Msg("+" + gain, 870, 30, 30,'white')); // + su score
            //floatingMsg.push(new Msg("+" + gain, 870, 70, 30,'white')); // + sui coins 
            const find = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(find, 1);
            enemies.splice(i, 1);
            i--;
        }
    }
    if(frame % enemiesTimer === 0 && score < winningScore) {
        let verticalPos = Math.floor(Math.random() * 6 + 1) * cellSize + cellGap;

        if(mob % skeletonTimer === 0) {
            enemies.push(new Enemy(verticalPos, 2));
            if(skeletonTimer > 7) skeletonTimer--;
        }
        else enemies.push(new Enemy(verticalPos, 1));

        mob++;
        enemyPositions.push(verticalPos);
        if(enemiesTimer > 120) enemiesTimer -= 50;
    }

}

export {Enemy, handleEnemies, enemies, enemyPositions};

const bosses = [];

const bossImage = new Image();
bossImage.src = '../img/boss/Walk.png';

class Boss {
    constructor(verticalPos) {
        this.x = canvas.width;
        this.y = verticalPos;
        this.width = (cellSize*3) - cellGap*2;
        this.height = (cellSize*3) - cellGap*2;
        this.health = 2000;
        this.maxHealth = this.health;
        this.speed = 0.6;
        this.movement = this.speed;
        // SPRITE
        this.frame = bossImage;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 140;
        this.spriteHeight = 140;
    }
}