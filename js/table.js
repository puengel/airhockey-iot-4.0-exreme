/*
Copyright by Daniel Puengel and Daniel Ketterer
Created at University Esslingen in 2019
License: MIT
*/

createTable = () => {
    let that = {};

    that.draw = () => {
        let h = height;
        let w = width;

        
        //Outer Border

        fill(255);
        noStroke();
        rect(0, tableBorder, w, h - tableBorder * 2);
        // console.log(h - tableBorder);
        // console.log(height);
        // console.log(".");

        // beginShape();

        // vertex(w * 0.1, 0);
        // vertex(w * 0.9, 0);
        // vertex(w, h * 0.1);
        // vertex(w, h * 0.9);
        // vertex(w * 0.9, h);
        // vertex(w * 0.1, h);
        // vertex(0, h * 0.9);
        // vertex(0, h * 0.1);
        // vertex(w * 0.1, 0);

        // endShape();

        //Center Line
        stroke(0);
        line(0, h/2, w, h/2);

        //Player Border Lines
        stroke(180);
        line(0, h/2 - playerBorder, w, h/2 - playerBorder);
        line(0, h/2 + playerBorder, w, h/2 + playerBorder);

        noFill();
        stroke(128);
        ellipseMode(RADIUS);
        ellipse(w/2, h/2, playerBorder);
    }

    

    that.move = () => {
        
    }


    return that;
}