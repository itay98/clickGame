class Leader {
    constructor(name, score, date) {
        this.name = name;
        this.score = score;
        this.date = date;
    }
}
var start = document.getElementById("start");
var click = document.getElementById("click");
var black = document.getElementById("black");
var score = document.getElementById("score");
var ctnl = document.getElementById("CTNL");
var level = document.getElementById("level");
var miss = document.getElementById("miss");
var timer = document.getElementById("timer");
var leaderBoard = document.getElementById("leader");
var leaders = [new Leader("John Lenon", 512, "1/1/1970"),
new Leader("Paul McCartney", 496, "1/1/1970"), new Leader("George Harrison", 317, "1/1/1970"),
new Leader("Ringo Star", 278, "1/1/1970"), new Leader("Tete a Claque", 256, "1/1/1970")];
score.innerText = 0;
ctnl.innerText = 10;
level.innerText = 1;
miss.innerText = 0;
timer.innerText = 60;
var leadJSON = localStorage.getItem("leaders");
if (leadJSON != null) {
    leaders = JSON.parse(leadJSON);
}
leaderBoard.innerHTML = createLeaderBoard();
start.addEventListener("click", startGame);
var hover = 0, game = 0, scr = 0, cNL = 10, lvl = 1, time = 60;
function createLeaderBoard() {
    var toAppend = "";
    leaders.forEach(function (gamer) {
        toAppend += `<div class="leader"><b>${gamer.score}</b>- ${gamer.name}<span class="date">${gamer.date}</span></div>`;
    });
    return toAppend;
}
function startText() {
    start.innerText = "Click to Start";
}
function catchText() {
    start.innerText = "CATCH ME IF YOU CAN!";
}
function startGame() {
    var con = confirm("Start the game?");
    if (con) {
        start.removeEventListener("click", startGame);
        click.addEventListener("click", clickMe);
        click.addEventListener("mouseover", escape);
        click.addEventListener("mouseout", quickHover);
        click.style.animation = "rotate 2s linear infinite";
        black.addEventListener("click", clickBlack);
        game = setInterval(function () {
            time--;
            timer.innerText = time;
            if (time == 0)
                endGame();
        }, 1000);
    }
}
function clickMe() {
    scr -= lvl * 10;
    score.innerText = scr;
    cNL--;
    ctnl.innerText = cNL;
    if (cNL == 0) {
        if (lvl == 5) {
            alert("You WON the game");
            endGame();
        }
        else {
            click.style.animationDuration = 2 - 0.25 * lvl + "s";
            cNL = 10;
            ctnl.innerText = cNL;
            lvl++;
            level.innerText = lvl;
            time += 10;
            timer.innerText = time;
        }
    }
}
function escape() {
    hover = setTimeout(function () {
        click.style.left = (Math.floor(Math.random() * 836) + 154) + "px";
        click.style.top = (Math.floor(Math.random() * 488) + 130) + "px";
    }, 350 - 50 * lvl);
}
function quickHover() {
    clearTimeout(hover);
}
function clickBlack() {
    scr -= lvl;
    score.innerText = lvl;
    miss.innerText++;
}
function endGame() {
    clearInterval(game);
    alert("You got a score of " + scr);
    if (scr > leaders[4].score) {
        var name = prompt("You entered the leaderboard!!!\nEnter your name!");
        leaders.pop();
        var leader = new Leader(name, scr, new Date().toLocaleDateString());
        if (scr > leaders[3].score) {
            if (scr > leaders[2].score) {
                if (scr > leaders[1].score) {
                    if (scr > leaders[0].score) {
                        leaders.unshift(leader);
                    }
                    else {
                        leaders.splice(1, 0, leader);
                    }
                }
                else {
                    leaders.splice(2, 0, leader);
                }
            }
            else {
                leaders.splice(3, 0, leader);
            }
        }
        else {
            leaders.push(leader);
        }
        localStorage.setItem("leaders", JSON.stringify(leaders));
        leaderBoard.innerHTML = createLeaderBoard();
    }
    scr = 0;
    cNL = 10;
    lvl = 1;
    time = 60;
    score.innerText = 0;
    ctnl.innerText = 10;
    level.innerText = 1;
    miss.innerText = 0;
    timer.innerText = 60;
    start.addEventListener("click", startGame);
    click.removeEventListener("click", clickMe);
    click.removeEventListener("mouseover", escape);
    click.removeEventListener("mouseout", quickHover);
    click.style.animation = "";
    black.removeEventListener("click", clickBlack);
}
