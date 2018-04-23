import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import LoginScreen from "./component/LoginScreen";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoginScreen />, document.getElementById('root'));
registerServiceWorker();
