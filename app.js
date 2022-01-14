const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 700;
/*
let background = new Image();
background.src = './img/background/back.png';

background.onload = function() {
    console.log('background loaded');
    ctx.drawImage(background, 50,100);
}
*/
// improts
import * as Grid from './modules/grid.js';
import { handleDefender, handleProjectile} from './modules/defenders.js';
import { handleGameStatus, updateFrame, game_over, handleMsg} from './modules/utils.js';
import { handleBoss, handleEnemies } from './modules/enemies.js';
import { handleDrops } from './modules/coins.js';
import { handleBar } from './modules/controlsBar.js';

// code


// control bar
const controlsBar = {
    width: canvas.width,
    height: Grid.cellSize,
}

// grid gen
Grid.createGrid();



// cerca metodo migliore per aggiornare canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // control bar gen
    ctx.fillStyle = "rgb(111, 45, 0)";
    ctx.fillRect(0,0,controlsBar.width,controlsBar.height);

    Grid.handleGameGrid();

    handleDefender();
    handleProjectile();
    handleEnemies();
    handleBoss();

    handleDrops();

    handleMsg();

    handleBar();

    handleGameStatus();

    updateFrame();

    if( !game_over ) requestAnimationFrame(animate);
    //if(pause) {
    //    handlePause();
    //} 
}
animate();

//let pause = false;

//function handlePause() {

//}