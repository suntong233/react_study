import React from 'react';
import Home from './Router/Home';
import Doc from './Router/Doc';
import Project from './Router/Project';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ImgUpload from './Router/ImgUpload';
import ArticleCrud from './Router/ArticleCrud';
import Todo2 from './Router/Todo2';
import Todo3 from './Router/Todo3';
import Login from './Router/Login';
import SignUp from './Router/Signup';
import User from './Router/User';
import UserDocs from './Router/UserDocs';
import UserDocsDetails from './Router/UserDocsDetails';

// import axios from 'axios';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" render={()=>
          <Home>
            <Route exact path="/home" component={ImgUpload}/>
            <Route path="/home/article" component={ArticleCrud}/>
            <Route path="/home/todo2" component={Todo2}/>
            <Route path="/home/todo3" component={Todo3}/>
          </Home>
        } />
        <Route path="/doc" component={Doc}  />
        <Route path="/login" component={Login}  />
        <Route path="/signup" component={SignUp}  />
        <Route path="/project" component={Project}  />
        <Route path="/user" render={()=>
          <User>
            <Route exact path="/user/docs" component={UserDocs}/>
            <Route exact path="/user/docs/:id" component={UserDocsDetails}/>
          </User>
        } />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
