import React, { Component } from 'react';
import {render} from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'
import LoginPage from './component/LoginScreen';
import Homepage from './component/Homepage';
// class App extends Component {
//   render() {
// // render((
//       return ((
//           <Router history={hashHistory}>
//               <Route path="/" component={App}/>
//           </Router>
//       ), document.getElementById('app'));
//   }
// }

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    {/*<ul className={"login"}>*/}
                        {/*<li><NavLink to="/home">Homepage</NavLink></li>*/}

                    {/*</ul>*/}
                    <div>
                        <Route path="/home/:username" compoenent={Homepage}/>
                        <Route path="/login" compoenent={LoginPage}/>
                        {/*{location.hash === '#/' ? <Redirect to='/login' /> : ''}*/}
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App;
