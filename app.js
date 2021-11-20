
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let jumpTimer = 0;
var cactuses = [];
let animation;

function FrameForSec() {
    animation = requestAnimationFrame(FrameForSec);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
    }
    cactuses.forEach((a, i, o) => {
        //x좌표가 0미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x--;
        collisionCheck(dino, a)
        a.draw();
    })
    if (onSpacebar === true) {
        dino.y -= 3;
        jumpTimer++;
    }
    if (onSpacebar === false) {
        if (dino.y < 200) {
            dino.y += 3;
        }
    }
    if (jumpTimer > 40) {
        onSpacebar = false;
        jumpTimer = 0;
    }

    dino.draw();
}

FrameForSec();

//충돌 확인

function collisionCheck(dino, cactus) {
    let xdifference = cactus.x - (dino.x + dino.width);
    let ydifference = cactus.y - (dino.y + dino.height);
    if (xdifference < 0 && ydifference < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var onSpacebar = false;

function onClickSpacebar(event) {
    if (event.code === "Space") {
        onSpacebar = true;
    }
}

document.addEventListener("keydown", onClickSpacebar)


