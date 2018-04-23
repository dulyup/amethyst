import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Spinner = () => {
    return(
        <div className={"spinner hidden"}>
            <MuiThemeProvider>
                <CircularProgress size={80} thickness={5} />
            </MuiThemeProvider>
        </div>
)};

export default Spinner;