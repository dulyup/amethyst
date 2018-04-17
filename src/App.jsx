import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './component/Index';

class App extends Component {
  render() {
      return (
      <div className="App">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Index/>
          </MuiThemeProvider>
       </div>
    );
  }
}
export default App;
