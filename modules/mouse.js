const canvas = document.getElementById("game");
//const ctx = canvas.getContext("2d");

// mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
    clicked: false
}

canvas.addEventListener('mousedown', function() {
    mouse.clicked = true;
})

canvas.addEventListener('mouseup', function() {
    mouse.clicked = false;
})

canvas.addEventListener('mousemove', function(e) {
    let canvasPosition = canvas.getBoundingClientRect();
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})

canvas.addEventListener('mouseleave', function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

export {mouse};