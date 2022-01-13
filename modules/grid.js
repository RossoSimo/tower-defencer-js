import {collision} from "./utils.js";
import {mouse as Mouse} from "./mouse.js";

export const cellSize = 100;
export const cellGap = 3;
export const gameGrid = [];
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height= cellSize;
    }
    
    draw() {
        if(Mouse.x && Mouse.y && collision(this, Mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export function createGrid() {
    
    for(let y = cellSize; y < canvas.height; y+=cellSize) {
        for(let x = 0; x < canvas.width; x+=cellSize) {
            gameGrid.push(new Cell(x, y));
        }
    }
}

export function handleGameGrid() {
    for(let i = 0; i <gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

export {Cell};