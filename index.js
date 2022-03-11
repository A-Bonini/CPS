/* Timer */

let timer = document.getElementById("timer");
let reset = document.getElementById("reset");
let time10 = document.getElementById("time10");
let time15 = document.getElementById("time15");
let time5 = document.getElementById("time5");

let count = 0;
let timeMax = 0;
let currentTime = 0;

const handleClickCount = () => {
    if(count === 0 && timeMax !== 0){
        initTime();
        count++;
    } else if(currentTime < timeMax){
        count++;
    } else {
        endTime(timeMax);
    }
}

const updateProject = () => {
    timer.innerText = `${currentTime}s`;
}

let interval;
let timeout;

const initTime = () => {
    interval = setInterval(() => {
        if(currentTime < timeMax){
            currentTime++;
            updateProject();
        } else {
            clearInterval(interval);
            endTime(timeMax);
            timeout = setTimeout(() => {
                resetApp();
            },5000);
        }
        
    }, 1000);
}

const endTime = (time) => {
    let expression = (10 / time) * count;
    
    if(expression > 100){
        handleClickCanvas(false,"Nota: 10.0");
    } else if(expression < 10){
        handleClickCanvas(false,`Nota: 0.${expression}`);
    } else {
        let string = expression.toString();
        handleClickCanvas(false,`Nota: ${string[0]}.${string[1]}`);
    }
}

let arr = [time5,time10,time15];

const setTime = (time, element) => {
    if(count <= 0){
        timeMax = time;
        updateProject();
        arr.forEach((item) => {
            item.style.top = "0";
        });
        element.style.top = "2px";
    }
}

const resetApp = () => {
    count = 0;
    currentTime = 0;
    clearInterval(interval);
    clearTimeout(timeout);
    updateProject();
    context.clearRect(0, 0, screen.width, screen.height);
    arrOfPos = [];
}

time10.addEventListener("click", () => setTime(10, time10));
time5.addEventListener("click", () => setTime(5, time5));
time15.addEventListener("click", () => setTime(15, time15));
reset.addEventListener("click", resetApp);


/* Canvas */

const screen = document.getElementById("screen");
const context = screen.getContext('2d');

const verifyWidth = () => {
    let widthScreen = window.screen.width;

    if(widthScreen < 510){
        screen.width = widthScreen - 40;
        screen.style.width = "100%";
    } else{
        screen.width = 510;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    verifyWidth();
});

window.addEventListener("resize", () => {
    verifyWidth();
});

screen.height = 250;

let arrOfPos = [];

const handleClickCanvas = (bool,pont) => {
    context.clearRect(0, 0, screen.width, screen.height);

    let textX = (pont.length * 15) / 2;
    let posX = screen.width / 2;
    let posY = screen.height / 2;

    if(!bool){
        context.fillStyle = "#1e88e5";
        context.font = "30px Arial";
        context.fillText(pont, posX - textX, posY,posX * 2);
    } else {
        context.fillStyle = "rgb(80,80,80)";
        arrOfPos.forEach((pos) => {
            context.beginPath();
            context.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        });
    

        context.fillStyle = "#1e88e5";
        context.font = "30px Arial";
        context.fillText(pont, posX - textX, posY);
    }
}

screen.addEventListener("click", (evt) => handleClickScreen(evt));

const handleClickScreen = (evt) => {
    if(timeMax <= 0){
        handleClickCanvas(false,"Selecione um tempo!");
    } else if(timeMax > currentTime) {
        let pos = getMousePos(screen,evt);
        arrOfPos.push(pos);
        handleClickCount();
        handleClickCanvas(true,`${count}`);
    }
}

const getMousePos = (canvas,evt) => {
    var rect = canvas.getBoundingClientRect();

    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


