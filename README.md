<p align="center"><img src="/client/src/images/logo.png" title="Good News logo" alt="Good News logo" height="150px" width="150px"></p>
                                                                                                                                
<h1 align="center">Good News</h1> 

<h4 align="center">A feed of positive news stories, to brighten your day.</h4>

<div align="center">
  <a href="https://travis-ci.org/kmartin21/good-news">
    <img src="https://img.shields.io/travis/kmartin21/good-news/master.svg?style=flat-square"
      alt="Build Status" />
  </a>
  <a href="http://badges.mit-license.org">
    <img src="http://img.shields.io/:license-mit-blue.svg?style=flat-square"
      alt="License" />
  </a>
</div>

## Basic Overview
A full stack web app built with MongoDB, Express, React and Node. News data is powered by the <a href="https://newsapi.org/">News API</a>.

![Good News screenshot](/client/src/images/Screenshot.png)
<br>
<br>

## Live Site
https://gnewsapp.herokuapp.com
<br>
<br>

## Built With
### Front end
* <a href="https://reactjs.org">React</a>
* <a href="https://redux.js.org">Redux</a>
* <a href="https://github.com/ReactTraining/react-router">React Router</a>
* <a href="https://react.semantic-ui.com/">Semantic UI React</a>
#### Tests
* <a href="https://jestjs.io">Jest</a>
* <a href="https://airbnb.io/enzyme">Enzyme</a>
### Back end
* <a href="https://www.mongodb.com">MongoDB</a>
* <a href="https://expressjs.com/">Express</a>
* <a href="https://nodejs.org/en">Node</a>
#### Tests
* <a href="https://mochajs.org">Mocha</a>
* <a href="https://www.chaijs.com">Chai</a>
* <a href="https://sinonjs.org/">Sinon</a>
* <a href=https://github.com/nock/nock">Nock</a>
* <a href="https://github.com/howardabrams/node-mocks-http">node-mocks-http</a>
### Authentication
* <a href="http://www.passportjs.org/">Passport</a>
<br>

## Run Locally
Run these commands first:
```
$ git clone https://github.com/kmartin21/good-news.git
$ cd good-news
$ npm install
$ cd client
$ npm install
```
Rename the ```.env.example``` files in the root and client directories to ```.env```.

Run the server from the root:
```
$ npm start
```

Run the client from the client directory:
```
$ npm start
```

Visit http://localhost:3000 to view the web app.
<br>
<br>

## License
<a href="https://opensource.org/licenses/mit-license.php">MIT</a>

