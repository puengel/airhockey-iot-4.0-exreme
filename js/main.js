/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

let ball;
let touches;
let powerup;
let tableBorder = 50;
let playerBorder = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ball = createBall();
    table = createTable();
    // console.log(ball);

    player1 = createPlayer(width/2, height/4);
    player2 = createPlayer(width/2, height*3/4);

    players = [];
    players.push(player1);
    players.push(player2);

    goals = createGoals();

    powerup = createPowerup();
    powerup_timer = 0

    //gravityField = createGravityField(width * random(), height * random())
    gravityField = null
    standings = createStandings()


}

function resetBall(x, y){
    ball = createBall(x, y);
}

function windowResized() {
    setup();
  }

function draw() {
    if (powerup_timer === 0 && powerup === null) {
        powerup = createPowerup()
    } else {
        powerup_timer -= 1
    }
    background(0);
    // ellipse(50, 50, 20);
    table.draw();

    ball.draw();

    players.map((player) => {
        player.draw();
    });

    goals.map((goal) => {
        goal.draw();
    });

    standings.map((standing) => {
        standing.draw()
    })

    if (powerup) powerup.draw()
    if (gravityField) gravityField.draw()
}

function touchStarted(event) {
    touches = event.touches;
    players.map((player) => {
        player.checkTouch(event);
    });
    goals.map((goal) => {
        goal.checkTouch(event);
    });
}


function touchMoved(event){
    touches = event.changedTouches;
    // console.log(touches);
    return false
}

function touchEnded(event) {
    touches = event.touches;
    players.map((player) => {
        player.checkTouchEnd(event);
    });
    goals.map((goal) => {
        goal.checkTouchEnd(event);
    });
}