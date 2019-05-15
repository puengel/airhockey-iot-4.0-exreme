/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createPowerup = () => {
    let that = {};
    that.x = random(0, width);
    that.y = random(height/2 - playerBorder, height/2 + playerBorder);
    that.radius = 60;
    that.rotation = 0;
    that.rotVec = createVector(0, 0, 1);
    that.power = floor(random(0, 3));
    that.colors = [color(101, 124, 116, 200), color(237, 226, 23, 200), color(77, 226, 72, 200)]

    that.draw = () => {
        that.animate();
        push()
        fill(that.colors[that.power]);
        stroke(64);
        translate(that.x, that.y);
        rectMode(CENTER);
        rotate(that.rotation, that.rotVec);
        rect(0, 0, that.radius, that.radius);
        rectMode(CORNER);
        pop()
    }

    that.animate = () => {
        that.rotation += 0.1;
        if(that.rotation >= TWO_PI){
            that.rotation = 0;
        }
    }

    that.collision = (player_idx, power) => {
        //players[player_idx].powerup = powerup.power;
        let pu_events = [() => {
                gravityField = createGravityField(width * random(), height * random(0.2, 0.8))
            }, 
            () => {
                goals[player_idx].pu_counter = 1800
            },
            () => {
                players[player_idx].zoom_counter = 1800
            }]
        pu_events[that.power]()
        powerup = null
        powerup_timer = 400
    }


    return that;
}