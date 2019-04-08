import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import * as serviceWorker from './serviceWorker';

//Material UI theme Configuration
const theme = createMuiTheme({
    palette: {
        primary: blue,
        
        
      },
    typography: {
      useNextVariants: true,
    },
  });


ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));

//Service Worker Registered In Production Environment
serviceWorker.register();
