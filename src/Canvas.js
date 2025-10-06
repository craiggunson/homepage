import React from "react";

function Canvas() {
  React.useEffect(() => {
    let ctx;
    let wh;
    let ww;
    let maxy;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function buildMountainPoints(baseY, amplitude, step) {
      const points = [];
      let y = baseY;
      let drift = 0;

      for (let x = 0; x <= ww + step; x += step) {
        // Gentle drift (low frequency) + local jitter (high frequency)
        drift += rand(-amplitude * 0.2, amplitude * 0.2);
        drift = Math.max(-amplitude, Math.min(amplitude, drift));

        const local = rand(-amplitude * 0.3, amplitude * 0.3);
        y = baseY + drift + local;

        points.push({ x, y });
        if (y < maxy) maxy = y;
      }
      return points;
    }

    function drawSmoothMountain(baseY, color, options = {}) {
      const {
        amplitude = 80,
        step = 20
      } = options;

      const pts = buildMountainPoints(baseY, amplitude, step);

      ctx.beginPath();
      ctx.moveTo(0, wh);
      ctx.lineTo(pts[0].x, pts[0].y);

      // Quadratic smoothing
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const xc = (p0.x + p1.x) / 2;
        const yc = (p0.y + p1.y) / 2;
        ctx.quadraticCurveTo(p0.x, p0.y, xc, yc);
      }

      // Last point
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.lineTo(ww, wh);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
    }

    function init() {
      window.addEventListener("resize", init, false);
      const canvas = document.getElementById("canvas");
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;

      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, wh * 0.5);
      sky.addColorStop(0, "rgba(200, 100, 50, 1)");
      sky.addColorStop(1, "rgba(250, 200, 100, 1)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, ww, wh);

      render();
    }

    function sun(sunheight) {
      const sunplace = ww * Math.random();
      for (let ang = 0; ang <= 1.9; ang += 0.2) {
        ctx.beginPath();
        ctx.lineTo(sunplace, sunheight);
        ctx.arc(sunplace, sunheight, 9000, ang * Math.PI, (ang + 0.1) * Math.PI);
        ctx.lineTo(sunplace, sunheight);
        ctx.fillStyle = "rgba(255,255,255,.1)";
        ctx.fill();
      }
      for (let a = 0.1; a <= 2; a += 0.2) {
        ctx.beginPath();
        ctx.lineTo(sunplace, sunheight);
        ctx.arc(sunplace, sunheight, wh / 20, a * Math.PI, (a + 0.1) * Math.PI);
        ctx.lineTo(sunplace, sunheight);
        ctx.fillStyle = "rgba(255,255,255,.1)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(sunplace, sunheight, wh / 30, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255,255,255,.1)";
      ctx.fill();
    }

    function render() {
      maxy = wh; // reset for sun placement ref
      // Back (lighter) mountains
      drawSmoothMountain(wh * 0.35, "rgba(200, 50, 50, 1)", { amplitude: wh * 0.12, step: 55 });
      // Mid
      drawSmoothMountain(wh * 0.55, "rgba(140, 20, 40, 1)", { amplitude: wh * 0.15, step: 50 });
      // Front (darker)
      drawSmoothMountain(wh * 0.75, "rgba(80, 10, 40, 1)", { amplitude: wh * 0.18, step: 45 });

      sun(maxy - wh / 40);
    }

    init();
  }, []);

  return ;
}

export default Canvas;