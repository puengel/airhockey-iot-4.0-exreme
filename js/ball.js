/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createBall = (x, y) => {
    let that = {};
    
    that.dir = x ? createVector(0, 0) : p5.Vector.random2D(1, 1);
    that.dir.setMag(10);
    that.x = x ? x : width/2;
    that.y = y ? y : height/2;
    that.radius = 20;
    that.maxMag = 40;
    that.lastPlayer = -1;
    

    that.draw = () => {
        that.animate();
        fill(255, 0, 0);
        ellipseMode(RADIUS);
        ellipse(that.x, that.y, that.radius, that.radius);
    }

    that.animate = () => {
        that.x += that.dir.x;
        that.y += that.dir.y;

        // Wall collision x
        if (that.x - that.radius <= 0 ||
            that.x + that.radius >= width) {
                that.dir.x = -that.dir.x;        
                that.x += that.dir.x;
            }

            
        // Wall collision y
        if (that.y - that.radius <= tableBorder ||
            that.y + that.radius >= height - tableBorder) {

                // Check goal collision
                let idx = that.y - that.radius <= tableBorder ? 0 : 1;
                let goal = goals[idx]
                let standing = standings[abs(idx-1)]
                if(that.x >= goal.x - goal.width/2 && that.x <= goal.x + goal.width/2){
                    console.log("GOAL!!!");
                    standing.score()
                    resetBall(width/2, that.y - that.radius <= tableBorder ? height/2 - playerBorder - that.radius : height/2 + playerBorder + that.radius);
                    return;
                }

                that.dir.y = -that.dir.y;
                that.y += that.dir.y;
            }

        // Player collision
        players.map((player, idx) => {
            
            if(dist(player.x, player.y, that.x, that.y) <= that.radius + player.radius){
                // console.log("player collision");
                that.lastPlayer = idx;

                let oldMag = that.dir.mag() >= 10 ? that.dir.mag() : 10;

                that.dir = createVector(that.x - player.x, that.y - player.y);

                // console.log(that.dir.mag());
                
                //accellerate
                that.dir.setMag(oldMag * 1.1);

                // console.log(player.speed.mag());
                
                that.dir = p5.Vector.sub(that.dir, player.speed);
                // console.log(that.dir.mag());
            }
        });

        // Gravity
        // m1 = ball
        // m2 much bigger, the field
        // m1 * a = G (m1*m2)/r**2
        // a into direction of m2

        // a = G * m2 / r**2


        // v_delta = a * t
        // t = 1
        if (gravityField) {
            let dist_gravity = dist(gravityField.x, gravityField.y, that.x, that.y)
            if (dist_gravity < gravityField.radius * 1.5
                && that.dir.mag() > 0) {
                let a = ( gravityField.G * gravityField.mass ) / pow(dist_gravity, 2)
                let posGF = createVector(gravityField.x, gravityField.y)
                let posBall = createVector(that.x, that.y)
                v_delta = posGF.sub(posBall)
                v_delta.setMag(a * random())
                that.dir = that.dir.add(v_delta)
            }
        }


        // Max magnitude
        if(that.dir.mag() > that.maxMag){
            that.dir.setMag(that.maxMag);
        }

        // Get slower over time if
        if(that.dir.mag() > 10){
            that.dir.setMag(that.dir.mag()*0.999);
        }

        // Powerup collision
        if (powerup && dist(that.x, that.y, powerup.x, powerup.y) <= that.radius + powerup.radius){
            console.log("Powerup");
            if (that.lastPlayer === -1){
                return;
            }
            powerup.collision(that.lastPlayer)
            console.log(players[that.lastPlayer].powerup)
        }
    }

    return that;
}