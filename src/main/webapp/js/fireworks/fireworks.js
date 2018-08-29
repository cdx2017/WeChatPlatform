/*//�л�����
 cutController = function () {
 //3����֮����ת��ָ����ҳ��
 setTimeout(window.location.href='http://localhost:8100/fireworks3D',5);
 setTimeout(window.location.href='http://localhost:8100/fireworks',6);
 };*/

//==============================================================
//fireworks=====================================================
//==============================================================

var canvas = document.getElementById("cas");
var ocas = document.createElement("canvas");
var octx = ocas.getContext("2d");
var ctx = canvas.getContext("2d");
ocas.width = canvas.width = window.innerWidth;
ocas.height = canvas.height = window.innerHeight;
var bigbooms = [];

window.onload = function () {
    initAnimate()
};

function initAnimate() {
    drawBg();

    lastTime = new Date();
    animate();
}

var lastTime;
function animate() {
    ctx.save();
    ctx.fillStyle = "rgba(0,5,24,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();


    var newTime = new Date();
    if (newTime - lastTime > 500 + (window.innerHeight - 767) / 2) {
        var random = Math.random() * 100 > 2 ? true : false;
        var x = getRandom(canvas.width / 5, canvas.width * 4 / 5);
        var y = getRandom(50, 200);
        if (random) {
            var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {x: x, y: y});
            bigbooms.push(bigboom)
        }
        else {
            var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {
                x: canvas.width / 2,
                y: 200
            }, document.querySelectorAll(".shape")[parseInt(getRandom(0, document.querySelectorAll(".shape").length))]);
            bigbooms.push(bigboom)
        }
        lastTime = newTime;
        console.log(bigbooms)
    }

    stars.foreach(function () {
        this.paint();
    })

    drawMoon();

    bigbooms.foreach(function (index) {
        var that = this;
        if (!this.dead) {
            this._move();
            this._drawLight();
        }
        else {
            this.booms.foreach(function (index) {
                if (!this.dead) {
                    this.moveTo(index);
                }
                else if (index === that.booms.length - 1) {
                    bigbooms[bigbooms.indexOf(that)] = null;
                }
            })
        }
    });

    raf(animate);
}

function drawMoon() {
    var moon = document.getElementById("moon");
    var centerX = canvas.width - 200, centerY = 100, width = 80;
    if (moon.complete) {
        ctx.drawImage(moon, centerX, centerY, width, width)
    }
    else {
        moon.onload = function () {
            ctx.drawImage(moon, centerX, centerY, width, width)
        }
    }
    var index = 0;
    for (var i = 0; i < 10; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX + width / 2, centerY + width / 2, width / 2 + index, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(240,219,120,0.005)";
        index += 2;
        ctx.fill();
        ctx.restore();
    }

}

Array.prototype.foreach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== null) callback.apply(this[i], [i])
    }
}

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

canvas.onclick = function () {
    var x = event.clientX;
    var y = event.clientY;
    var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {x: x, y: y});
    bigbooms.push(bigboom)
}

// canvas.addEventLisener("touchstart" , function(event){
// 	var touch = event.targetTouches[0];
// 	var x = event.pageX;
// 	var y = event.pageY;
// 	var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:x , y:y});
// 	bigbooms.push(bigboom)
// })

var Boom = function (x, r, c, boomArea, shape) {
    this.booms = [];
    this.x = x;
    this.y = (canvas.height + r);
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.boomArea = boomArea;
    this.theta = 0;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200));
}
Boom.prototype = {
    _paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.restore();
    },
    _move: function () {
        var dx = this.boomArea.x - this.x, dy = this.boomArea.y - this.y;
        this.x = this.x + dx * 0.01;
        this.y = this.y + dy * 0.01;

        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapBoom();
            }
            else this._boom();
            this.dead = true;
        }
        else {
            this._paint();
        }
    },
    _drawLight: function () {
        ctx.save();
        ctx.fillStyle = "rgba(255,228,150,0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    },
    _boom: function () {
        var fragNum = getRandom(30, 200);
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255))
            }
        }

        var fanwei = parseInt(getRandom(300, 400));
        for (var i = 0; i < fragNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255))
                }
            }
            var a = getRandom(-Math.PI, Math.PI);
            var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
            var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
            var radius = getRandom(0, 2)
            var frag = new Frag(this.x, this.y, radius, color, x, y);
            this.booms.push(frag);
        }
    },
    _shapBoom: function () {
        var that = this;
        putValue(ocas, octx, this.shape, 5, function (dots) {
            var dx = canvas.width / 2 - that.x;
            var dy = canvas.height / 2 - that.y;
            for (var i = 0; i < dots.length; i++) {
                color = {a: dots[i].a, b: dots[i].b, c: dots[i].c}
                var x = dots[i].x;
                var y = dots[i].y;
                var radius = 1;
                var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
                that.booms.push(frag);
            }
        })
    }
}

function putValue(canvas, context, ele, dr, callback) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    if (ele.innerHTML.indexOf("img") >= 0) {
        img.src = ele.getElementsByTagName("img")[0].src;
        imgload(img, function () {
            context.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.width / 2);
            dots = getimgData(canvas, context, dr);
            callback(dots);
        })
    }
    else {
        var text = ele.innerHTML;
        context.save();
        var fontSize = 200;
        context.font = fontSize + "px ���� bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(" + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + " , 1)";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        dots = getimgData(canvas, context, dr);
        callback(dots);
    }
}

function imgload(img, callback) {
    if (img.complete) {
        callback.call(img);
    }
    else {
        img.onload = function () {
            callback.call(this);
        }
    }
}

function getimgData(canvas, context, dr) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dots = [];
    for (var x = 0; x < imgData.width; x += dr) {
        for (var y = 0; y < imgData.height; y += dr) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                var dot = {x: x, y: y, a: imgData.data[i], b: imgData.data[i + 1], c: imgData.data[i + 2]};
                dots.push(dot);
            }
        }
    }
    return dots;
}

function getRandom(a, b) {
    return Math.random() * (b - a) + a;
}


var maxRadius = 1, stars = [];
function drawBg() {
    for (var i = 0; i < 100; i++) {
        var r = Math.random() * maxRadius;
        var x = Math.random() * canvas.width;
        var y = Math.random() * 2 * canvas.height - canvas.height;
        var star = new Star(x, y, r);
        stars.push(star);
        star.paint()
    }

}

var Star = function (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}
Star.prototype = {
    paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.r + ")";
        ctx.fill();
        ctx.restore();
    }
}

var focallength = 250;
var Frag = function (centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
}

Frag.prototype = {
    paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        ctx.fill()
        ctx.restore();
    },
    moveTo: function (index) {
        this.ty = this.ty + 0.3;
        var dx = this.tx - this.x, dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.1);
        this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.1);
        if (dx === 0 && Math.abs(dy) <= 80) {
            this.dead = true;
        }
        this.paint();
    }
}

//==================================================================================
//fireworks3D ======================================================================
//==================================================================================

function initVars() {

    pi = Math.PI;
    ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    playerZ = -25;
    playerX = playerY = playerVX = playerVY = playerVZ = pitch = yaw = pitchV = yawV = 0;
    scale = 600;
    seedTimer = 0;
    seedInterval = 5, seedLife = 100;
    gravity = .02;
    seeds = new Array();
    sparkPics = new Array();
    s = "/images/fireworks/";//https://cantelope.org/NYE/
    for (i = 1; i <= 10; ++i) {
        sparkPic = new Image();
        sparkPic.src = s + "spark" + i + ".png";
        sparkPics.push(sparkPic);
    }
    sparks = new Array();
    pow1 = new Audio("/music/fireworks/pow1.ogg");
    pow2 = new Audio("/music/fireworks/pow2.ogg");
    pow3 = new Audio("/music/fireworks/pow3.ogg");
    pow4 = new Audio("/music/fireworks/pow4.ogg");
    frames = 0;
}

function rasterizePoint(x, y, z) {

    var p, d;
    x -= playerX;
    y -= playerY;
    z -= playerZ;
    p = Math.atan2(x, z);
    d = Math.sqrt(x * x + z * z);
    x = Math.sin(p - yaw) * d;
    z = Math.cos(p - yaw) * d;
    p = Math.atan2(y, z);
    d = Math.sqrt(y * y + z * z);
    y = Math.sin(p - pitch) * d;
    z = Math.cos(p - pitch) * d;
    var rx1 = -1000, ry1 = 1, rx2 = 1000, ry2 = 1, rx3 = 0, ry3 = 0, rx4 = x, ry4 = z, uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
    if (!uc) return {x: 0, y: 0, d: -1};
    var ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
    var ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
    if (!z)z = .000000001;
    if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
        return {
            x: cx + (rx1 + ua * (rx2 - rx1)) * scale,
            y: cy + y / z * scale,
            d: Math.sqrt(x * x + y * y + z * z)
        };
    } else {
        return {
            x: cx + (rx1 + ua * (rx2 - rx1)) * scale,
            y: cy + y / z * scale,
            d: -1
        };
    }
}

function spawnSeed() {

    seed = new Object();
    seed.x = -50 + Math.random() * 100;
    seed.y = 25;
    seed.z = -50 + Math.random() * 100;
    seed.vx = .1 - Math.random() * .2;
    seed.vy = -1.5;//*(1+Math.random()/2);
    seed.vz = .1 - Math.random() * .2;
    seed.born = frames;
    seeds.push(seed);
}

function splode(x, y, z) {

    t = 5 + parseInt(Math.random() * 150);
    sparkV = 1 + Math.random() * 2.5;
    type = parseInt(Math.random() * 3);
    switch (type) {
        case 0:
            pic1 = parseInt(Math.random() * 10);
            break;
        case 1:
            pic1 = parseInt(Math.random() * 10);
            do {
                pic2 = parseInt(Math.random() * 10);
            } while (pic2 == pic1);
            break;
        case 2:
            pic1 = parseInt(Math.random() * 10);
            do {
                pic2 = parseInt(Math.random() * 10);
            } while (pic2 == pic1);
            do {
                pic3 = parseInt(Math.random() * 10);
            } while (pic3 == pic1 || pic3 == pic2);
            break;
    }
    for (m = 1; m < t; ++m) {
        spark = new Object();
        spark.x = x;
        spark.y = y;
        spark.z = z;
        p1 = pi * 2 * Math.random();
        p2 = pi * Math.random();
        v = sparkV * (1 + Math.random() / 6)
        spark.vx = Math.sin(p1) * Math.sin(p2) * v;
        spark.vz = Math.cos(p1) * Math.sin(p2) * v;
        spark.vy = Math.cos(p2) * v;
        switch (type) {
            case 0:
                spark.img = sparkPics[pic1];
                break;
            case 1:
                spark.img = sparkPics[parseInt(Math.random() * 2) ? pic1 : pic2];
                break;
            case 2:
                switch (parseInt(Math.random() * 3)) {
                    case 0:
                        spark.img = sparkPics[pic1];
                        break;
                    case 1:
                        spark.img = sparkPics[pic2];
                        break;
                    case 2:
                        spark.img = sparkPics[pic3];
                        break;
                }
                break;
        }
        spark.radius = 25 + Math.random() * 50;
        spark.alpha = 1;
        spark.trail = new Array();
        sparks.push(spark);
    }
    switch (parseInt(Math.random() * 4)) {
        case 0:
            pow = new Audio("/music/fireworks/pow1.ogg");
            break;
        case 1:
            pow = new Audio("/music/fireworks/pow2.ogg");
            break;
        case 2:
            pow = new Audio("/music/fireworks/pow3.ogg");
            break;
        case 3:
            pow = new Audio("/music/fireworks/pow4.ogg");
            break;
    }
    d = Math.sqrt((x - playerX) * (x - playerX) + (y - playerY) * (y - playerY) + (z - playerZ) * (z - playerZ));
    pow.volume = 1.5 / (1 + d / 10);
    pow.play();
}

function doLogic() {

    if (seedTimer < frames) {
        seedTimer = frames + seedInterval * Math.random() * 10;
        spawnSeed();
    }
    for (i = 0; i < seeds.length; ++i) {
        seeds[i].vy += gravity;
        seeds[i].x += seeds[i].vx;
        seeds[i].y += seeds[i].vy;
        seeds[i].z += seeds[i].vz;
        if (frames - seeds[i].born > seedLife) {
            splode(seeds[i].x, seeds[i].y, seeds[i].z);
            seeds.splice(i, 1);
        }
    }
    for (i = 0; i < sparks.length; ++i) {
        if (sparks[i].alpha > 0 && sparks[i].radius > 5) {
            sparks[i].alpha -= .01;
            sparks[i].radius /= 1.02;
            sparks[i].vy += gravity;
            point = new Object();
            point.x = sparks[i].x;
            point.y = sparks[i].y;
            point.z = sparks[i].z;
            if (sparks[i].trail.length) {
                x = sparks[i].trail[sparks[i].trail.length - 1].x;
                y = sparks[i].trail[sparks[i].trail.length - 1].y;
                z = sparks[i].trail[sparks[i].trail.length - 1].z;
                d = ((point.x - x) * (point.x - x) + (point.y - y) * (point.y - y) + (point.z - z) * (point.z - z));
                if (d > 9) {
                    sparks[i].trail.push(point);
                }
            } else {
                sparks[i].trail.push(point);
            }
            if (sparks[i].trail.length > 5)sparks[i].trail.splice(0, 1);
            sparks[i].x += sparks[i].vx;
            sparks[i].y += sparks[i].vy;
            sparks[i].z += sparks[i].vz;
            sparks[i].vx /= 1.075;
            sparks[i].vy /= 1.075;
            sparks[i].vz /= 1.075;
        } else {
            sparks.splice(i, 1);
        }
    }
    p = Math.atan2(playerX, playerZ);
    d = Math.sqrt(playerX * playerX + playerZ * playerZ);
    d += Math.sin(frames / 80) / 1.25;
    t = Math.sin(frames / 200) / 40;
    playerX = Math.sin(p + t) * d;
    playerZ = Math.cos(p + t) * d;
    yaw = pi + p + t;
}

function rgb(col) {

    var r = parseInt((.5 + Math.sin(col) * .5) * 16);
    var g = parseInt((.5 + Math.cos(col) * .5) * 16);
    var b = parseInt((.5 - Math.sin(col) * .5) * 16);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function draw() {

    ctx.clearRect(0, 0, cx * 2, cy * 2);

    ctx.fillStyle = "#ff8";
    for (i = -100; i < 100; i += 3) {
        for (j = -100; j < 100; j += 4) {
            x = i;
            z = j;
            y = 25;
            point = rasterizePoint(x, y, z);
            if (point.d != -1) {
                size = 250 / (1 + point.d);
                d = Math.sqrt(x * x + z * z);
                a = 0.75 - Math.pow(d / 100, 6) * 0.75;
                if (a > 0) {
                    ctx.globalAlpha = a;
                    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
                }
            }
        }
    }
    ctx.globalAlpha = 1;
    for (i = 0; i < seeds.length; ++i) {
        point = rasterizePoint(seeds[i].x, seeds[i].y, seeds[i].z);
        if (point.d != -1) {
            size = 200 / (1 + point.d);
            ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
        }
    }
    point1 = new Object();
    for (i = 0; i < sparks.length; ++i) {
        point = rasterizePoint(sparks[i].x, sparks[i].y, sparks[i].z);
        if (point.d != -1) {
            size = sparks[i].radius * 200 / (1 + point.d);
            if (sparks[i].alpha < 0)sparks[i].alpha = 0;
            if (sparks[i].trail.length) {
                point1.x = point.x;
                point1.y = point.y;
                switch (sparks[i].img) {
                    case sparkPics[0]:
                        ctx.strokeStyle = "#f84";
                        break;
                    case sparkPics[1]:
                        ctx.strokeStyle = "#84f";
                        break;
                    case sparkPics[2]:
                        ctx.strokeStyle = "#8ff";
                        break;
                    case sparkPics[3]:
                        ctx.strokeStyle = "#fff";
                        break;
                    case sparkPics[4]:
                        ctx.strokeStyle = "#4f8";
                        break;
                    case sparkPics[5]:
                        ctx.strokeStyle = "#f44";
                        break;
                    case sparkPics[6]:
                        ctx.strokeStyle = "#f84";
                        break;
                    case sparkPics[7]:
                        ctx.strokeStyle = "#84f";
                        break;
                    case sparkPics[8]:
                        ctx.strokeStyle = "#fff";
                        break;
                    case sparkPics[9]:
                        ctx.strokeStyle = "#44f";
                        break;
                }
                for (j = sparks[i].trail.length - 1; j >= 0; --j) {
                    point2 = rasterizePoint(sparks[i].trail[j].x, sparks[i].trail[j].y, sparks[i].trail[j].z);
                    if (point2.d != -1) {
                        ctx.globalAlpha = j / sparks[i].trail.length * sparks[i].alpha / 2;
                        ctx.beginPath();
                        ctx.moveTo(point1.x, point1.y);
                        ctx.lineWidth = 1 + sparks[i].radius * 10 / (sparks[i].trail.length - j) / (1 + point2.d);
                        ctx.lineTo(point2.x, point2.y);
                        ctx.stroke();
                        point1.x = point2.x;
                        point1.y = point2.y;
                    }
                }
            }
            ctx.globalAlpha = sparks[i].alpha;
            ctx.drawImage(sparks[i].img, point.x - size / 2, point.y - size / 2, size, size);
        }
    }
}

function frame() {

    if (frames > 100000) {
        seedTimer = 0;
        frames = 0;
    }
    frames++;
    draw();
    doLogic();
    requestAnimationFrame(frame);
}

window.addEventListener("resize", function () {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
});

initVars();
frame();