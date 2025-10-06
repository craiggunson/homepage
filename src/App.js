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
          <h2 className="header col s12 light">Doing what I can, with what I have, where I am.</h2>
        </div>
        
      </div>
    </div>
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i class="fa-solid fa-cloud fa-2x"></i></h2>
              <h3 className="center">Cloud</h3>

              <p className="center light white-text">Years of experience with Amazon Web Services and Google Cloud Platform, catering to their strengths to deliver customer value.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i className="fa fa-github-alt fa-2x" aria-hidden="true"></i></h2> 
              <h3 className="center">DevOps</h3>

              <p className="center light white-text">Brining software engineering, infrastructure, security and testing together, to more switftly deliver product.
 </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center white-text"><i className="fa-solid fa-check-circle fa-2x"></i></h2>
              <h3 className="center">Innovator</h3>

              <p className="center light white-text">Moving at pace with Continuous Integration, Continuous Delivery, and Feedback.</p>
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
          <h4>Bio</h4>
          <p className="white-text">I am passionate about making technology work for people. <br /> I spend my weekends outdoors, and weekdays on the computer. <br />
              If you have a technology problem you need solved, say hello.</p>

        </div>

        <div className="col l3 s12">
          <h4><br/> Projects</h4>
          <a href="https://kitesurf.craiggunson.com"> <b className="projecticon">🍍</b>Serverless Kite Surfing</a><br/>
          <a href="https://tidebubble.craiggunson.com"><b className="projecticon">💧</b> Serverless High Tide</a><br/>
          <a href="https://github.com/craiggunson/weather-pi"><b className="projecticon">🥧</b> IoT Pi Weather</a><br/>
          <a href="https://github.com/craiggunson/mizaru"><b className="projecticon">🙈</b> AI Emotion detection</a><br/>
          <a href="https://github.com/craiggunson/sweet-n-sour"><b className="projecticon">😝</b> GraphQL Sweet-n-Sour</a><br/>
          <a href="https://shopcart.craiggunson.com"><b className="projecticon">📦</b>Fruit Cart GA4</a><br/>
        </div>

        <div className="col l3 s12">
          <h4>Socials</h4>
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
