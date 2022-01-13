import {cellSize, cellGap} from './grid.js';
import {mouse} from './mouse.js';
import * as Coin from './coins.js';
import {enemies, enemyPositions} from './enemies.js';
import {collision, floatingMsg, Msg, frame} from './utils.js';
import { choseDef } from './controlsBar.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

export let defenders = [];
export const projectiles = [];

let arrow = new Image();
arrow.src = '../img/arrow/Move.png';

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24; // 10
        this.height = 5; // 10
        this.power = 20;
        this.speed = 5;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 1;
        this.spriteWidth = 24;
        this.spriteHeight = 5;
    }
    update() {
        if(this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
        this.x += this.speed;
    }


    // NEED FIX 
    draw() {
        //ctx.fillStyle = 'black';
        //ctx.beginPath();
        //ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        //ctx.fill();
        ctx.drawImage(arrow, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function handleProjectile() {
    for(let i = 0 ; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();

        for ( let j = 0 ; j < enemies.length ; j++) {
            if( enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

const defenderAAttack = new Image();
defenderAAttack.src = '../img/defenderA/Attack.png';

const defenderAIdle = new Image();
defenderAIdle.src = '../img/defenderA/Idle.png';

const defenderBAttack = new Image();
defenderBAttack.src = '../img/defenderB/Attack.png';

const defenderBIdle = new Image();
defenderBIdle.src = '../img/defenderB/Idle.png';

export let defendersTypeIdle = [];
export let defendersTypeAttack = [];

defendersTypeAttack.push(defenderAAttack);
defendersTypeIdle.push(defenderAIdle);
defendersTypeAttack.push(defenderBAttack);
defendersTypeIdle.push(defenderBIdle);

class Defender {
    constructor(x, y) {
        this.n = choseDef-1;
        this.x = x; 
        this.y = y;
        this.width = cellSize - cellGap*2;
        this.height = cellSize - cellGap*2;
        this.idle = true;

        this.frameX = 0;
        this.frameY = 0;

        if(choseDef == 1) { // A
            this.health = 100;
            this.firerate = 25;
            this.maxFrame = 5;
            this.spriteWidth = 100;
            this.spriteHeight = 100;
        } else if(choseDef == 2) { 
            this.health = 40;
            this.maxFrame = 1;
            this.firerate = 10;
            this.spriteWidth = 62;
            this.spriteHeight = 62;
        }
        this.minFrame = 0;
        
    }

    draw() {
        //ctx.fillStyle = 'blue';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Roboto Mono';
        ctx.fillText(Math.floor(this.health), this.x, this.y + 30)
        if(this.idle === true) {
            if(this.n === 0) ctx.drawImage(defendersTypeIdle[this.n], this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x-25, this.y-20, this.width+70, this.height+70);
            else ctx.drawImage(defendersTypeIdle[this.n], this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x-25, this.y-20, this.width, this.height);
        } else {
            if(this.n === 0) ctx.drawImage(defendersTypeAttack[this.n], this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x-25, this.y-20, this.width+70, this.height+70);
            else ctx.drawImage(defendersTypeAttack[this.n], this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x-25, this.y-20, this.width, this.height);
        }
        
    }
    update() {
        if(frame % this.firerate === 0) {
            if(this.frameX < this.maxFrame) {
                this.frameX++;
                
            }
            else this.frameX = this.minFrame;
            if( this.frameX === 4) this.shootNow = true;
        }

        if(!this.idle && this.shootNow) {
            projectiles.push(new Projectile(this.x + 70, this.y + 50));
            this.shootNow = false;
        }
    }
}

canvas.addEventListener('click', function() {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if(gridPositionY < cellSize) return;
    for ( let i = 0 ; i < defenders.length; i++) {
        if ( defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
    }
    let defenderCost = 100;
    if(choseDef == 2) {
        defenderCost = 190;
    }
    if(Coin.coin >= defenderCost) {
        defenders.push(new Defender(gridPositionX, gridPositionY));
        Coin.removeCoin(defenderCost);
    } else {
        floatingMsg.push(new Msg("Need more coins", mouse.x, mouse.y, 20, 'black'))
    }

});

function handleDefender() {
    for(let i = 0; i < defenders.length; i++) {
        defenders[i].draw();
        defenders[i].update();
        if(enemyPositions.indexOf(defenders[i].y) !== -1) {
            defenders[i].idle = false;
            if(defenders[i].n === 1) {
                defenders[i].maxFrame = 5;
            }
        } else {
            defenders[i].idle = true;
            if(defenders[i].n === 1) {
                defenders[i].maxFrame = 1;
            }
        }
        for ( let j = 0 ; j < enemies.length; j++) {
            if (defenders[i] && collision(defenders[i], enemies[j])) {
                defenders[i].health -= 0.2;
                enemies[j].movement = 0;
            }
            if (defenders[i] && defenders[i].health <= 0) {
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }
        
    }
}

export {handleDefender, Defender, handleProjectile, Projectile};
