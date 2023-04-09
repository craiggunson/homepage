import './App.css';
import React from "react";

function App() {

  return (
    <div className="App">
  <canvas id="canvas" className='background' width="500" height="500" > </canvas>


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
          <a href="https://shopcart.craiggunson.com"><img style={{height:'1em'}} src='box.png' alt="box"/>Fruit Cart GA4</a><br/>
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
