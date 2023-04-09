import React from "react";

function Canvas() {
    React.useEffect(() => {
      var choose = 0;
      var maxy = 1000;
      var canvas;
      var ctx;
      var wh;
      var ww;
      var y;
   
      var altitude;
      
      function coinFlip() {
        return Math.floor(Math.random() * 2);
      }
      
      
      function draw() {
        ctx.beginPath();
        ctx.moveTo(0, wh);
      
        for (var x = 0; x < ww + 50; x = x + 30 + (Math.random() * 10)) {
          choose = coinFlip();
          altitude = Math.floor(Math.random() * 25)
          if (choose === 0) {
            y = y - altitude;
          } else {
            y = y + altitude;
      
          }
          if (y < maxy) {
            maxy = y;
          }
          ctx.lineTo(x, y);
          choose = coinFlip();
      
        }
        ctx.lineTo(ww, wh);
        ctx.fill();
      
      }
      
      window.onorientationchange = function () {
        var orientation = window.orientation;
        switch (orientation) {
          default: 
            case 0:
          case 90:
          case -90:
            window.location.reload();
            break;
        }
      };
      
      
      function init() {
        window.addEventListener('resize', init, false);
        window.addEventListener("orientationchange", function () {
          window.location.reload();
        });
      
        const canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        wh = window.innerHeight;
        ww = window.innerWidth;
        ctx.canvas.width = ww;
        ctx.canvas.height = wh;
        //console.log('windowsize', ww, wh);
        var my_gradient = ctx.createLinearGradient(0, 0, 0, wh / 2);
        my_gradient.addColorStop(0, "rgba(200, 100, 50, 1)");
        my_gradient.addColorStop(1, "rgba(250, 200, 100, 1)");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(0, 0, ww, wh);
        render();
      }
      
      init();
      
      function render() {
      
        y = wh / 3;
  
        ctx.fillStyle = "rgba(200, 50, 50, 1)";
        draw();
      
    
        y = wh / 2;
        ctx.fillStyle = "rgba(140, 20, 40, 1)";
        draw();
      
     
        y = wh - (wh / 3);
        ctx.fillStyle = "rgba(80, 10, 40, 1)";
        draw();
      
        function sun() {
          var sunplace = ww * Math.random()
          var sunheight = maxy - wh / 40
      
          for (var ang = 0; ang <= 1.9; ang = ang + .2) {
            ctx.beginPath();
            ctx.lineTo(sunplace, sunheight);
            ctx.arc(sunplace, sunheight, 9000, ang * Math.PI, (ang + .1) * Math.PI);
            ctx.lineTo(sunplace, sunheight);
            ctx.fillStyle = "rgba(255,255,255,.05)";
            ctx.fill();
            ctx.closePath();
      
          }
      
          for (var angover = .1; angover <= 2; angover = angover + .2) {
            ctx.beginPath();
            ctx.lineTo(sunplace, sunheight);
            ctx.arc(sunplace, sunheight, wh / 20, angover * Math.PI, (angover + .1) * Math.PI);
            ctx.lineTo(sunplace, sunheight);
            ctx.fillStyle = "rgba(255,255,255,.05)";
            ctx.fill();
            ctx.closePath();
          }
      
          ctx.beginPath();
          ctx.arc(sunplace, sunheight, wh / 30, 0, 2 * Math.PI);
          ctx.fillStyle = "rgba(255,255,255,.1)";
          ctx.fill();
          ctx.closePath();
        }
      
        sun();
      }
    }, []);
  
    return ( <div className="Canvas"/> );
}

export default Canvas;