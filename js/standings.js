/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createStandings = () => {
    let that = []

    that.push(createStanding(width / 2, height / 7))
    that.push(createStanding(width / 2, height * 6 / 7 - height / 10 / 1.4))

    return that
}

createStanding = (x, y) => {
    let that = {};

    that.x = x;
    that.y = y;
    that.dist = width/4
    that.count = 0
    that.size = height/10
    that.sizePop = 0
    that.color = color(0, 102, 153)
    that.size_decay = 0.6

    that.draw = () => {
        that.animate();
        noStroke()
        textSize(that.size + that.size * that.sizePop)
        that.color.setAlpha(51)
        fill(that.color)  
        textAlign(RIGHT)
        text(that.count, that.x - that.dist, that.y + height / 10 / 1.4)
        push()
        translate(that.x + that.dist, that.y);
        rotate(PI)
        text(that.count, 0, 0)
        pop()   
    }

    that.animate = () => {
        if (that.sizePop > 0) {
            that.sizePop = that.sizePop * that.size_decay
            if (that.sizePop < 0.001) {
                that.sizePop = 0
            }
        }
    }

    that.score = () => {
        that.sizePop = 1
        that.count += 1
    }

    return that;
}