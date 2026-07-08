(function () {
  var ctx, ww, wh, maxy;
  var mountainData = null;
  var animationFrame = null;
  var time = 0;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function buildMountainPoints(baseY, amplitude, step, totalWidth) {
    var points = [];
    var drift = 0;
    for (var x = 0; x <= totalWidth; x += step) {
      drift += rand(-amplitude * 0.15, amplitude * 0.15);
      drift = Math.max(-amplitude, Math.min(amplitude, drift));
      var local = rand(-amplitude * 0.6, amplitude * 0.6);
      var y = baseY + drift + local;
      points.push({ x: x, y: y });
    }
    return points;
  }

  function drawMountainFromPoints(points, color, xOffset, loopWidth) {
    var wrappedOffset = ((xOffset % loopWidth) + loopWidth) % loopWidth;
    ctx.beginPath();
    ctx.moveTo(0, wh);
    var hasDrawnFirstPoint = false;
    for (var copy = 0; copy < 2; copy++) {
      var copyOffset = copy * loopWidth - wrappedOffset;
      for (var i = 0; i < points.length - 1; i++) {
        var p0x = points[i].x + copyOffset;
        var p0y = points[i].y;
        var p1x = points[i + 1].x + copyOffset;
        var p1y = points[i + 1].y;
        if (p1x < -50) continue;
        if (p0x > ww + 50) continue;
        if (!hasDrawnFirstPoint) {
          ctx.lineTo(p0x, p0y);
          hasDrawnFirstPoint = true;
        }
        var xc = (p0x + p1x) / 2;
        var yc = (p0y + p1y) / 2;
        ctx.quadraticCurveTo(p0x, p0y, xc, yc);
        if (p0y < maxy) maxy = p0y;
      }
    }
    ctx.lineTo(ww, wh);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawSun(sunheight) {
    var sunX = ww / 2 + Math.sin(time * 0.0005) * 50;
    for (var ang = 0; ang <= 1.9; ang += 0.2) {
      ctx.beginPath();
      ctx.lineTo(sunX, sunheight);
      ctx.arc(sunX, sunheight, 9000, ang * Math.PI, (ang + 0.1) * Math.PI);
      ctx.lineTo(sunX, sunheight);
      ctx.fillStyle = "rgba(255,255,255,.07)";
      ctx.fill();
    }
    for (var a = 0.1; a <= 2; a += 0.2) {
      ctx.beginPath();
      ctx.lineTo(sunX, sunheight);
      ctx.arc(sunX, sunheight, wh / 20, a * Math.PI, (a + 0.1) * Math.PI);
      ctx.lineTo(sunX, sunheight);
      ctx.fillStyle = "rgba(255,255,255,.05)";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(sunX, sunheight, wh / 30, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,255,255,.1)";
    ctx.fill();
  }

  function render() {
    ctx.clearRect(0, 0, ww, wh);

    var sky = ctx.createLinearGradient(0, 0, 0, wh * 0.5);
    sky.addColorStop(0, "rgba(217,136,70,1)");
    sky.addColorStop(1, "rgba(250,200,100,1)");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, ww, wh);

    if (!mountainData) return;

    maxy = wh;
    drawMountainFromPoints(mountainData.back.points, mountainData.back.color, time * mountainData.back.speed, mountainData.back.loopWidth);
    drawMountainFromPoints(mountainData.mid.points, mountainData.mid.color, time * mountainData.mid.speed, mountainData.mid.loopWidth);
    drawMountainFromPoints(mountainData.front.points, mountainData.front.color, time * mountainData.front.speed, mountainData.front.loopWidth);

    drawSun(maxy - wh / 40);
  }

  function animate() {
    time += 1;
    render();
    animationFrame = requestAnimationFrame(animate);
  }

  function init() {
    var canvas = document.getElementById("canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    ww = window.innerWidth;
    wh = window.innerHeight;
    canvas.width = ww;
    canvas.height = wh;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    var loopWidth = ww * 2;
    mountainData = {
      back:  { points: buildMountainPoints(wh * 0.35, wh * 0.12, 55, loopWidth), color: "rgba(200,50,50,1)",  speed: 0.2, loopWidth: loopWidth },
      mid:   { points: buildMountainPoints(wh * 0.55, wh * 0.15, 50, loopWidth), color: "rgba(140,20,40,1)",  speed: 0.5, loopWidth: loopWidth },
      front: { points: buildMountainPoints(wh * 0.75, wh * 0.18, 45, loopWidth), color: "rgba(80,10,40,1)",   speed: 0.9, loopWidth: loopWidth }
    };

    animate();
  }

  function handleResize() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    mountainData = null;
    init();
  }

  window.addEventListener("resize", handleResize);
  init();
})();
