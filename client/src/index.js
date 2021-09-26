import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Editor from './components/newsletter-editor/editor';
import { Login } from './components/login/login';
//import { NotFound } from './components/notfound'
import { About } from './components/about/about'

import history from './history'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router history={history}>
        <Switch>

            <Route exact path="/" component={Login} />
            <Route path="/newsletter-editor" component={Editor} />
            <Route path="/about" component={About}/>
        </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
