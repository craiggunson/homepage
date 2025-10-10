import React from "react";

function Canvas() {
  const mountainDataRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const timeRef = React.useRef(0);

  React.useEffect(() => {
    console.log("Canvas useEffect running");
    let ctx;
    let wh;
    let ww;
    let maxy;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function buildMountainPoints(baseY, amplitude, step, totalWidth) {
      const points = [];
      let y = baseY;
      let drift = 0;

      // Generate points for the full width
      for (let x = 0; x <= totalWidth; x += step) {
        drift += rand(-amplitude * 0.15, amplitude * 0.15);
        drift = Math.max(-amplitude, Math.min(amplitude, drift));

        const local = rand(-amplitude * 0.6, amplitude * 0.6);
        y = baseY + drift + local;

        points.push({ x, y });
      }
      return points;
    }

    function drawMountainFromPoints(points, color, xOffset, loopWidth) {
      // Wrap offset to create seamless loop
      const wrappedOffset = ((xOffset % loopWidth) + loopWidth) % loopWidth;
      
      ctx.beginPath();
      ctx.moveTo(0, wh);
      
      let hasDrawnFirstPoint = false;
      
      // Draw two copies of the mountain for seamless looping
      for (let copy = 0; copy < 2; copy++) {
        const copyOffset = copy * loopWidth - wrappedOffset;
        
        for (let i = 0; i < points.length - 1; i++) {
          const p0x = points[i].x + copyOffset;
          const p0y = points[i].y;
          const p1x = points[i + 1].x + copyOffset;
          const p1y = points[i + 1].y;
          
          // Skip if completely off-screen
          if (p1x < -50) continue;
          if (p0x > ww + 50) continue;
          
          if (!hasDrawnFirstPoint) {
            ctx.lineTo(p0x, p0y);
            hasDrawnFirstPoint = true;
          }
          
          const xc = (p0x + p1x) / 2;
          const yc = (p0y + p1y) / 2;
          ctx.quadraticCurveTo(p0x, p0y, xc, yc);
          
          if (p0y < maxy) maxy = p0y;
        }
      }

      ctx.lineTo(ww, wh);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
    }

    function init() {
      const canvas = document.getElementById("canvas");
      console.log("Canvas element:", canvas);
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;
      console.log("Canvas dimensions:", ww, wh);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const loopWidth = ww * 2; // Use screen width for loop size

      // Generate mountain shapes once
      mountainDataRef.current = {
        back: {
          points: buildMountainPoints(wh * 0.35, wh * 0.12, 55, loopWidth),
          color: "rgba(200,50,50,1)",
          speed: 0.5,  // Slowest (farthest away)
          loopWidth: loopWidth
        },
        mid: {
          points: buildMountainPoints(wh * 0.55, wh * 0.15, 50, loopWidth),
          color: "rgba(140,20,40,1)",
          speed: 1.2,  // Medium speed
          loopWidth: loopWidth
        },
        front: {
          points: buildMountainPoints(wh * 0.75, wh * 0.18, 45, loopWidth),
          color: "rgba(80,10,40,1)",
          speed: 2.0,  // Fastest (closest)
          loopWidth: loopWidth
        }
      };
      console.log("Mountains generated");

      animate();
    }

    function sun(sunheight) {
      const sunplace = ww / 2;
      const sunX = sunplace + Math.sin(timeRef.current * 0.0005) * 50; // Sun sways gently
      
      for (let ang = 0; ang <= 1.9; ang += 0.2) {
        ctx.beginPath();
        ctx.lineTo(sunX, sunheight);
        ctx.arc(sunX, sunheight, 9000, ang * Math.PI, (ang + 0.1) * Math.PI);
        ctx.lineTo(sunX, sunheight);
        ctx.fillStyle = "rgba(255,255,255,.07)";
        ctx.fill();
      }
      for (let a = 0.1; a <= 2; a += 0.2) {
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

      const sky = ctx.createLinearGradient(0, 0, 0, wh * 0.5);
      sky.addColorStop(0, "rgba(217,136,70,1)");
      sky.addColorStop(1, "rgba(250,200,100,1)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, ww, wh);

      if (!mountainDataRef.current) return;

      maxy = wh;
      const mountains = mountainDataRef.current;

      // Draw mountains with continuous horizontal movement
      drawMountainFromPoints(
        mountains.back.points, 
        mountains.back.color, 
        timeRef.current * mountains.back.speed,
        mountains.back.loopWidth
      );
      drawMountainFromPoints(
        mountains.mid.points, 
        mountains.mid.color, 
        timeRef.current * mountains.mid.speed,
        mountains.mid.loopWidth
      );
      drawMountainFromPoints(
        mountains.front.points, 
        mountains.front.color, 
        timeRef.current * mountains.front.speed,
        mountains.front.loopWidth
      );

      sun(maxy - wh / 40);
    }

    function animate() {
      timeRef.current += 1;
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      mountainDataRef.current = null;
      init();
    }

    init();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas id="canvas" style={{ 
    width: "100%", 
    height: "100vh", 
    display: "block", 
    position: "fixed", 
    top: 0, 
    left: 0, 
    zIndex: -1,
    pointerEvents: "none"
  }} />;
}

export default Canvas;