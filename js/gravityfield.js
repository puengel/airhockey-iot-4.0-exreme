/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createGravityField = (x, y) => {
    let that = {}

    that.x = x
    that.y = y
    that.color = color(101, 124, 116, 51)
    that.radius = height / 10
    that.innerR = [0,that.radius * 0.33, that.radius * 0.66]
    that.mass = 200000000
    that.timer = 1800
    that.G = 0.0002

    that.draw = () => {
        that.animate()
        push()

        fill(that.color)
        noStroke()
        circle(that.x, that.y, that.radius)

        that.innerR.map((r) => {
            circle(that.x, that.y, r)
        })

        pop()
        
    }

    that.animate = () => {
        if (that.timer === 0){
            gravityField = null
        } else that.timer -= 1
        that.innerR.forEach(function(part, index) {
            this[index] = (this[index] + 0.5) % that.radius
          }, that.innerR)
    }
    return that
}