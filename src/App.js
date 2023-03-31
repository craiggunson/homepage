import './App.css';
import React from "react";

function App() {
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
    
      canvas = document.getElementById('canvas');
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

  return (
    <div className="App">
  <canvas id="canvas" className='background'     
     width="500"
        height="500"
        >

</canvas>


  <main>
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        
        <h1 className="header center">Craig Gunson</h1>
        <div className="row center">
          <h3 className="header col s12 light">Doing what I can, with what I have, where I am.</h3>
        </div>
        
      </div>
    </div>
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i className="fas fa-cloud fa-2x"></i></h2>
              <h5 className="center">Cloud Tradie</h5>

              <p className="center light white-text">Delivering value with cloud technology to enable customer
                success. DevOps, Coaching, design, build on AWS or GCP.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i className="fas fa-wrench fa-2x"></i></h2>
              <h5 className="center">Engineer</h5>

              <p className="center light white-text">Curious how things work, comfortable hands on. Keeping it simple &
                sustainable. </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i className="fas fa-code fa-2x"></i></h2>
              <h5 className="center">Innovator</h5>

              <p className="center light white-text">Infrastructure or code, frontend or backend.  Like to muck with UI/UX & data visualization.</p>
            </div>
          </div>
        </div>

      </div>
      </div>
  </main>

  <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5>Bio</h5>
          <p className="white-text">Raised in New Zealand, now home is the Mornington Peninsula.  I am passionate
            about technology and making it work for people. I spend my weekends outdoors, and weekdays on the computer. 
              If you have a technology problem you need solved, say <a href = "mailto: hello@craiggunson.com"><u>hello@craiggunson.com</u></a> </p>

        </div>

        <div className="col l3 s12">
          <h5><br/> Projects</h5>
          <a href="https://kitesurf.craiggunson.com"><img style={{height: '1em'}} src='pineapple.png' alt="pineapple"/> Serverless Kite Surfing</a><br/>
          <a href="https://tidebubble.craiggunson.com"><img style={{height:'1em'}} src='droplet.png' alt="droplet"/> Serverless High Tide</a><br/>
          <a href="https://github.com/craiggunson/weather-pi"><img style={{height: '1em'}} src='pi.png' alt="pi"/> IoT Pi Weather</a><br/>
          <a href="https://github.com/craiggunson/mizaru"><img style={{height: '1em'}} src='pear.png' alt="pear"/> AI Emotion detection</a><br/>
          <a href="https://github.com/craiggunson/sweet-n-sour"><img style={{height:'1em'}} src='sour.png' alt="sour"/> GraphQL Sweet-n-Sour</a><br/>
          <a href="http://cart.craiggunson.com"><img style={{height:'1em'}} src='box.png' alt="box"/>Fruit Cart GA4</a><br/>
        </div>

        <div className="col l3 s12">
          <h5>Socials</h5>
          <a href="https://github.com/craiggunson"><i className="fab fa-github fa-3x" title="Github"></i></a>
          <a href="https://www.linkedin.com/in/craiggunson/"><i className="fab fa-linkedin-in fa-3x" title="Linkedin"></i></a>
          <a href="https://www.imdb.com/name/nm6043920/"><i className="fab fa-imdb fa-3x" title="IMDB"></i></a>

        </div>
      </div>
    </div>

    <div className="footer-copyright">
      <div className="container">
        Aww Yeah!!!
      </div>
    </div>

  </footer>


 


</div>
  );
}

export default App;
