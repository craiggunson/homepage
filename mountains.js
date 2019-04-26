

var choose = 0;
var maxy = 1000;
var canvas;
var ctx;
var wh;
var ww;
var y;
var size;
var x;

function tree(x,y,size) {
ctx.lineTo(x-(size/2),y+(size));
ctx.lineTo(x,y-size/2);
ctx.lineTo(x+(size/2),y+(size));
ctx.lineTo(x,y);

}


function coinFlip() {
    return Math.floor(Math.random() * 2);
}


function draw() {
    ctx.beginPath();
    ctx.moveTo(0, wh);

    for (var x = 0; x < ww+50; x=x+30+(Math.random()*10)) {
      choose = coinFlip();
      altitude = Math.floor(Math.random()*25)
      if (choose == 0) {y = y - altitude;}
      else {y = y + altitude;

            }
      if (y < maxy) {maxy = y;}
      ctx.lineTo(x,y);
      choose = coinFlip();
        if (choose == 0) {tree(x,y,size);}
      //console.log('x',x,'y',y,choose,maxy);
    }
    ctx.lineTo(ww,wh);
    ctx.fill();

}

 window.onorientationchange = function() {
        var orientation = window.orientation;
            switch(orientation) {
                case 0:
                case 90:
                case -90: window.location.reload();
                break; }
    };


function init() {
  window.addEventListener('resize', init, false);
  window.addEventListener("orientationchange", function() {
  window.location.reload();});

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
wh = window.innerHeight;
ww = window.innerWidth;
ctx.canvas.width  = ww;
ctx.canvas.height = wh;
console.log('windowsize',ww,wh);
var my_gradient = ctx.createLinearGradient(0, 0, 0, wh/2);
my_gradient.addColorStop(0, "rgba(200, 100, 50, 1)");
my_gradient.addColorStop(1, "rgba(250, 200, 100, 1)");
ctx.fillStyle = my_gradient;
ctx.fillRect(0, 0, ww, wh);
render();
}

init();

function render() {

y = wh/3;
size = 15
ctx.fillStyle = "rgba(200, 50, 50, 1)";
draw();

size = 30
y = wh/2;
ctx.fillStyle = "rgba(140, 20, 40, 1)";
draw();

size = 40
y = wh-(wh/3);
ctx.fillStyle = "rgba(80, 10, 40, 1)";
draw();

function moon() {
var moon = ww*Math.random()
ctx.beginPath();
ctx.arc(moon, maxy-wh/40, wh/40, 0, 2 * Math.PI);
ctx.fillStyle = "rgba(255,255,255,.2)";
ctx.fill();
}

moon();
}
