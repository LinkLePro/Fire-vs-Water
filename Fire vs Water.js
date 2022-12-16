
var a, b;
var mouvementX, mouvementY;
var x;
var img, img2;
var score1, score2;
var balles;
var vie;
var NombreDeBalles;
var pause;
var framenumber;

function setup() {
    var canva = createCanvas(windowWidth - 50, 700);
    canva.parent("conteneur");
    background(255);
    a = 250;
    b = 250;
    mouvementX = 6;
    x = width / 2;
    couleur = color(0, 255, 0);
    img = loadImage("data/goutted'eau.png");
    img2 = loadImage("data/bouledefeu.png");
    score1 = score2 = 0;
    balles = new Array();
    NombreDeBalles = 3;
    pause = true
    for (var i = 0; i < NombreDeBalles; i++) {
        balles.push(new Balle(parseInt(random(width)), 0, i == 0));
    }
    vie = 3;
    framenumber = 1
}


function draw() {
    nettoyer();
    dessiner();
    if (!pause) 
    {
        bouger();
        framenumber++;
    }
    absorber();
    if (framenumber % 2000 == 0) vie += 1;
}

function nettoyer() {
    background(255);
}

function dessiner() {
    smooth();
    for (var i = 0; i < NombreDeBalles; i++) {
        balles[i].dessiner();
    }
    fill(0);
    //player
    ellipse(x, height - b / 2, a, b);
    rect(0, 1050, 2000, 1050);
    textSize(50);
    text(score1, int(width / 2 - 50), 50);
    text("vie(s)=" + vie, 50, 50);
}

function keyPressed() {
    if (keyCode == ENTER) {
        pause = !pause;
    }
}
function bouger() {
    if (keyIsPressed) {
        if (keyCode == RIGHT_ARROW && x < width - a / 2) {
            x += mouvementX;
        }
        else if (keyCode == LEFT_ARROW && x > a / 2) {
            x -= mouvementX;
        }
    }
    for (var i = 0; i < NombreDeBalles; i++) {
        balles[i].tomber();
    }
}


function absorber() {
    for (var i = 0; i < NombreDeBalles; i++) {
        var balle = balles[i];
        if (balle.y > height - parseInt(a / 2) - 10 && balle.y < height - parseInt(a / 2) + 10) {
            if (x > balle.x - parseInt(a / 2) - 25 && x < balle.x + parseInt(a / 2) + 25) {
                if (!balle.eau) {
                    a += 30;
                    b += 30;
                    mouvementX -= 1;
                    score1 -= 2;
                }
                if (balle.eau) {
                    score1 += 1;
                    if (a < 180) {
                        a -= 10;
                        b -= 10;
                    } else {
                        a -= 30;
                        b -= 30;
                    }
                    if (a < 31) {
                        noLoop();
                        textSize(50);
                        fill(0);
                        text("Gagné !😀", parseInt(width / 2), parseInt(height / 2));
                        pause = true
                        setTimeout(restart,5*1000)
                        
                    }
                    mouvementX += 1;
                }
                balle.reset();
            } else if (balle.eau) {
                vie -= 1;
                balle.reset();
                if (vie == 0) 
                {
                    noLoop();
                    textSize(50);
                    fill(0);
                    text("Perdu !😢", parseInt(width / 2), parseInt(height / 2));
                    pause = true
                    setTimeout(restart,5*1000)
                }
            } else {
                balle.reset();
            }
        }
    }
}

function restart()
{
    a = 250;
    b = 250;
    mouvementX = 6;
    x = width / 2;
    score1 = score2 = 0;
    balles = new Array();
    NombreDeBalles = 3;
    for (var i = 0; i < NombreDeBalles; i++) {
        balles.push(new Balle(parseInt(random(width)), 0, i == 0));
    }
    vie = 3;
    loop();
    framenumber = 1;
}





class Balle {
    constructor(tempX, tempY, tempEau) {
        this.x = tempX;
        this.y = tempY;
        this.eau = tempEau;
        this.mouvementY = parseInt(random(3, 6));
    }

    dessiner() {
        imageMode(CENTER);
        if (this.eau) {
            image(img, this.x, this.y, 50, 75);
        } else {
            image(img2, this.x, this.y, 75, 100);
        }
    }

    tomber() {
        this.y += this.mouvementY;
    }

    reset() {
        this.x = parseInt(random(width));
        this.y = 0;
        this.eau = random(1) > 0.5;
    }
}
