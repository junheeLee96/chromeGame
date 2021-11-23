
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const dev = document.getElementById("rank");
let score = 0;



canvas.width = window.innerWidth - 100;
canvas.height = 700//window.innerHeight - 100;

let img = new Image();
img.src = 'img/cactus.png';
let img2 = new Image();
img2.src = 'img/dinosaur2.png';

function scsc(){
    score += 1;
}

scsc();
setInterval(scsc,200);

var dino = {
    x: 300,
    y: 350,
    width: 40,
    height: 40,
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2,this.x, this.y);
        ctx.font = "30px verdana";
        ctx.strokeStyle = "blue";
        ctx.fillText(score,window.innerWidth-1000,200);
    }
}    

ctx.fillText(`your score : ${score}`,200,200);


class Cactus {
    constructor() {
        this.x = 1950;
        this.y = 350;
        this.width = 35;
        this.height = 45;
    }    
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img,this.x, this.y);
    }    
}    


let timer = 0;
let jumpTimer = 0;
var cactuses = [];
let animation;




let cnt = Math.floor(Math.random() * 200);




var onSpacebar = false;

function FrameForSec() {
    animation = requestAnimationFrame(FrameForSec);
    cnt++;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (cnt %  299 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
        cnt = Math.floor(Math.random() * 300);
        if(cnt < 100){
            while(cnt >100){
                cnt = Math.floor(Math.random() * 300);
            }
        }
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
        if (dino.y < 350) {
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
        canvas.classList.remove('back')
        canvas.classList.add('hide');
    }
}


function onClickSpacebar(event) {
    if (event.code === "Space") {
        onSpacebar = true;
    }
}

document.addEventListener("keydown", onClickSpacebar);





/*

let timmer = String(2%2).padStart(4,0);
function runningtime(){
    timmer += 1;
    dev.innerText = `Your score : ${timer}`;
}
*
runningtime();
setInterval(runningtime,500);

*/

/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img = new Image();
img.src = 'img/cactus.png';
let img2 = new Image();
img2.src = 'img/dinosaur2.png';

var dino = {
    x: 300,
    y: 432,
    width: 40,
    height: 40,
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2,this.x, this.y);
    }
}    



class Cactus {
    constructor() {
        this.x = 1950;
        this.y = 428;
        this.width = 35;
        this.height = 45;
    }    
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img,this.x, this.y);
    }    
}    


let timer = 0;
let jumpTimer = 0;
var cactuses = [];
let animation;

function RanNum(){
    let cnt = Math.floor(Math.random() * 300);
    return cnt;

}
RanNum();
if(cnt)


var onSpacebar = false;

function FrameForSec() {
    animation = requestAnimationFrame(FrameForSec);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer %  200 === 0) {
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
        if (dino.y < 432) {
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
        canvas.classList.remove('back')
        canvas.classList.add('hide');
    }
}


function onClickSpacebar(event) {
    if (event.code === "Space") {
        onSpacebar = true;
    }
}

document.addEventListener("keydown", onClickSpacebar)

*/

