import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainPage from './component/MainPage';

class App extends Component {
  render() {
      return (
      <div className="App">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <MainPage/>
          </MuiThemeProvider>
       </div>
    );
  }
}
export default App;
