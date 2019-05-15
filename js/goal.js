/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createGoals = () => {
    let that = [];

    let gwidth = 250;
    let gheight = 50;
    
    that.push(createGoal(width/2, 0, gwidth, gheight));
    that.push(createGoal(width/2, height - gheight, gwidth, gheight));

    return that;
}


createGoal = (x, y, gwidth, gheight) => {
    let that = {};
    
    that.x = x;
    that.y = y;
    that.width = gwidth;
    that.touchId = null;
    that.touchBoxX = gwidth;
    that.height = gheight;
    that.decay = 0.1
    that.pu_counter = 0

    that.draw = () => {
        that.animate()
        fill(255, 0, 0);
        if (that.pu_counter > 0) fill(237, 226, 23)
        rect(-that.width/2 + that.x, that.y, that.width, that.height);
    }

    that.animate = () => {
        if(that.touchId !== null && that.pu_counter > 0){
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === that.touchId){
                    let tX = touches[i].pageX;
                    let tY = touches[i].pageY;
                    // Check Borders
                    that.speed = createVector(that.x - touches[i].pageX, that.y - touches[i].pageY);
                    
                    that.x = tX
                    if (tX <= that.width / 2) {
                        that.x = that.width / 2
                    } else if (tX >= width - that.width / 2) {
                        that.x  = width - that.width / 2
                    }

                }
            }
        } else {
            // top goal
            if (that.x < width / 2) {
                let distance = width / 2 - that.x
                that.x = that.x + distance * that.decay
            // bottom goal
            } else if (that.x > width / 2) {
                let distance = that.x - width / 2
                that.x = that.x - distance * that.decay
            }
        }
        if (that.pu_counter > 0) {
            that.pu_counter -= 1
        }

    }

    that.checkTouch = (event) => {
        if (event.type !== "touchstart"){
            return;
        }
        // console.log(event);

        let touch = event.changedTouches[0];

        if(abs(that.x - touch.pageX) <= that.width / 2 &&
        (abs(that.y - touch.pageY) <= that.height)){
            that.touchId = touch.identifier;
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
    }

    return that;
}