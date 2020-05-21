import React from 'react';
import Header from './Components/Header';
import Home from './Router/Home';
import Doc from './Router/Doc';
import Project from './Router/Project';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ImgUpload from './Router/ImgUpload';
import Todo1 from './Router/Todo1';
import Todo2 from './Router/Todo2';
import Todo3 from './Router/Todo3';

// import axios from 'axios';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/home" render={()=>
          <Home>
            <Route exact path="/home" component={ImgUpload}/>
            <Route path="/home/todo1" component={Todo1}/>
            <Route path="/home/todo2" component={Todo2}/>
            <Route path="/home/todo3" component={Todo3}/>
          </Home>
        } />
        <Route path="/doc" component={Doc}  />
        <Route path="/project" component={Project}  />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
