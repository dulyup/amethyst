import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {Router} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './component/LoginScreen';
import Homepage from './component/Homepage.js';
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Router/>, document.getElementById('root'));

// import {render} from 'react-dom';
// import { Router, Route } from 'react-router';
import {HashRouter, Route, } from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <div>
            <Route path="/" component={App}/>
            <Route path="/home" component={Homepage}/>
            <Route path="/login" component={LoginPage}/>
        </div>
    </HashRouter>

), document.getElementById('root'));

// registerServiceWorker();

{/*<Router history={hashHistory}>*/}
{/*<Route path="/" component={App}/>*/}
{/*<Route path="/home" component={Homepage}/>*/}
{/*<Route path="/login" component={LoginPage}/>*/}
{/*</Router>*/}