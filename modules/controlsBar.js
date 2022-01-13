const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import { defendersTypeIdle } from "./defenders.js";
import { mouse } from "./mouse.js";
import { collision } from "./utils.js";

export let choseDef = 1;

const cardA = {
    x: 10,
    y: 10,
    height: 85,
    width: 130
};

const cardB = {
    x: 150,
    y: 10,
    height: 85,
    width: 130
};

function handleBar() {
    let cardAstroke = 'black';
    let cardBstroke = 'black';
    if(collision(mouse, cardA) && mouse.clicked) {
        choseDef = 1;
    } else if(collision(mouse, cardB) && mouse.clicked) {
        choseDef = 2;
    }

    if(choseDef === 1) {
        cardAstroke = 'gold';
        cardBstroke = 'black';
    } else if(choseDef === 2) {
        cardAstroke = 'black';
        cardBstroke = 'gold';
    } else {
        cardAstroke = 'black';
        cardBstroke = 'black';
    }
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.font = '40px Roboto Mono';
    
    ctx.fillRect(cardA.x, cardA.y, cardA.width, cardA.height);
    ctx.strokeStyle = cardAstroke;
    ctx.strokeRect(cardA.x, cardA.y, cardA.width, cardA.height);
    ctx.fillText("100", 20, 60);
    ctx.drawImage(defendersTypeIdle[0], 0, 0, 100, 100, 20, -20, 160, 160);

    ctx.fillRect(cardB.x, cardB.y, cardB.width, cardB.height);
    ctx.strokeStyle = cardBstroke;
    ctx.strokeRect(cardB.x, cardB.y, cardB.width, cardB.height);
    ctx.fillText("190", 160, 60);

}

export {handleBar};
