/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createPlayer = (x, y) => {
    let that = {};

    that.dir = p5.Vector.random2D(1, 1);
    that.dir.setMag(5);
    that.north = y < height/2;
    that.x = x;
    that.y = y;
    that.radius = 50;
    that.innerR = 0
    that.touchId = null;
    that.touchIdZoom = null;
    that.zoom_counter = 0;
    that.speed = createVector(0,0);
    that.powerup = null;
    that.goal = null;
    

    that.draw = () => {
        that.animate();
        fill(255, 0, 0);
        ellipseMode(RADIUS);
        ellipse(that.x, that.y, that.radius, that.radius);
        if (that.zoom_counter > 0) {
            fill(77, 226, 72, 100)
            circle(that.x, that.y, that.innerR)
        }

        //PowerupButton
        if(that.powerup !== null){
            fill(0, 255, 0);
            noStroke();
            if(that.north){
                ellipse(tableBorder/2, tableBorder/2, tableBorder/2);
                ellipse(width - tableBorder/2, tableBorder/2, tableBorder/2);
            } else {
                ellipse(tableBorder/2, height - tableBorder/2, tableBorder/2);
                ellipse(width - tableBorder/2, height - tableBorder/2, tableBorder/2);
            }
        }
    }

    that.animate = () => {
        //Update radius
        if(that.zoom_counter > 0){
            that.zoom_counter -= 1;
            that.innerR = (that.innerR + 0.7) % that.radius
        }
        if (that.zoom_counter === 0 || that.touchId === null || that.touchIdZoom === null){
            if (that.radius !== 50){
                let diff = that.radius - 50;
                that.radius = 50 + diff * 0.95;
            }
        }
        
        if(that.touchId !== null){
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === that.touchId){
                    let tX = touches[i].pageX;
                    let tY = touches[i].pageY;
                    // Check Borders
                    that.speed = createVector(that.x - touches[i].pageX, that.y - touches[i].pageY);
                    if (that.north){
                        if(tY - that.radius < tableBorder){
                            that.y = tableBorder + that.radius;
                            that.speed.x = 0;
                        } else if(tY + that.radius > height/2 - playerBorder){
                            that.y = height/2 - playerBorder - that.radius;
                            that.speed.x = 0;
                        } else {
                            that.y = tY;
                        }
                    } else {
                        if(tY + that.radius > height - tableBorder){
                            that.y = height - tableBorder - that.radius;
                            that.speed.y = 0;
                        } else if(tY - that.radius < height/2 + playerBorder){
                            that.y = height/2 + playerBorder + that.radius;
                            that.speed.y = 0;
                        } else {
                            that.y = tY;
                        }
                    }
                    if(tX - that.radius < 0){
                        that.x = 0 + that.radius;
                    } else if(tX + that.radius > width){
                        that.x = width - that.radius;
                    } else {
                        that.x = tX;
                    }
                } else if(that.zoom_counter > 0 && touches[i].identifier === that.touchIdZoom){
                    that.radius = min(dist(touches[i].pageX, touches[i].pageY, that.x, that.y), 150);
                }
            }
        }
    }

    that.checkTouch = (event) => {
        if (event.type !== "touchstart"){
            return;
        }
        // console.log(event);

        let touched = false;

        let touches = event.changedTouches;
        for(i = 0; i < event.changedTouches.length; i++){
            let touch = touches[i];

            // Check racket touch
            if(dist(that.x, that.y, touch.pageX, touch.pageY) <= that.radius){
                console.log("hit");
                if (that.touchId === null){
                    that.touchId = touch.identifier;
                    touched = true;
                } else if (that.zoom_counter > 0) {
                    that.touchIdZoom = touch.identifier;
                    touched = true;
                }
                // event.stopPropagation();
            } else if(dist(that.x, that.y, touch.pageX, touch.pageY) <= that.radius * 3){
                if (that.zoom_counter > 0) {
                    that.touchIdZoom = touch.identifier;
                    touched = true;
                }
            }
        }
        if (touched){
            event.stopPropagation();
        }
    }
        
    that.checkTouchEnd = (event) => {
        if (event.type !== "touchend"){
            return;
        }
        // console.log(event);
        
        let touch = event.changedTouches[0];

        if(touch.identifier === that.touchId){
            that.touchId = null;
        }

        if(touch.identifier === that.touchIdZoom){
            that.touchIdZoom = null;
        }
    }

    return that;
}