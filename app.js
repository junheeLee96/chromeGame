
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const dev = document.getElementById("rank");
let score = 0;
canvas.width = 1200;
canvas.height = 700//window.innerHeight - 100;
let img = new Image();
img.src = 'img/cactus.png';
let img2 = new Image();
img2.src = 'img/dinosaur2.png';

const MAXSCORE = "maxscore";

const getmax = localStorage.getItem(MAXSCORE);



function scsc(){
    score += 1;
}
scsc();
setInterval(scsc,200);

var dino = {
    x: 200,
    y: 351,
    width: 40,
    height: 40,
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2,this.x, this.y);
        ctx.font = "30px verdana";
        ctx.strokeStyle = "blue";
        if(getmax > score){
        ctx.fillText(getmax,1000,150);
    }
    else if(getmax <= score){
        ctx.fillText(score,1000,150)
    }
    
        ctx.fillText(score,1000,200);
    }
}    

class Cactus {
    constructor() {
        this.x = 1500;
        this.y = 350;
        this.width = 40;
        this.height = 40;
    }    
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img,this.x, this.y);
    }    
}    

let jumpTimer = 0;
var cactuses = [];
let cactuses2 = [];
let animation;
let cnt = Math.floor(Math.random() * 200);
var onSpacebar = false;
let speed = 2;


//충돌 확인
function collisionCheck(dino, cactus) {
    let xdifference = cactus.x - (dino.x + dino.width);
    let ydifference = cactus.y - (dino.y + dino.height);
    if (xdifference < 0 && ydifference < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        canvas.classList.remove('back')
        canvas.classList.add('hide');
        const MAX = localStorage.getItem(MAXSCORE);
        if(MAX === null){
            localStorage.setItem(MAXSCORE, score);
        }
        if(MAX < score){
            localStorage.setItem(MAXSCORE,score);
        }
    }
}

function FrameForSec() {
    animation = requestAnimationFrame(FrameForSec);
    cnt++;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (cnt %  299 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
        cactuses2 = cactuses;
        cnt = Math.floor(Math.random() * 300);
        if(cnt < 100){
            while(cnt >100){
                cnt = Math.floor(Math.random() * 300);
            }
        }
    }

    if(score % 50 === 0){
        speed += 0.1;
    }
    cactuses.forEach((a, i, o) => {
        //x좌표가 0미만이면 제거
        if (a.x < 150) {
            o.splice(i, 1);
        }
        a.x = a.x-speed;
        collisionCheck(dino, a)
        a.draw();
    })
    if (onSpacebar === true) {
        dino.y -= 7;
        jumpTimer++;
    }
    if (onSpacebar === false) {
        if (dino.y < 351) {
            dino.y += 7;
        }
    }
    if (jumpTimer > 20) {
        onSpacebar = false;
        jumpTimer = 0;
    }
    dino.draw();
}

FrameForSec();

function onClickSpacebar(event) {
    if (event.code === "Space") {
        onSpacebar = true;
    }
}

document.addEventListener("keydown", onClickSpacebar);