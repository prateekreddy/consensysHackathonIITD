import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignPage from './containers/SignPage.jsx';
import UserLocationDashboard from './containers/UserLocationDashboard.jsx';
import UserLocationHistory from './containers/UserLocationHistory.jsx';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer.jsx';
import PublicContainer from './containers/PublicContainer.jsx';

ReactDOM.render((
  <MuiThemeProvider >
    <BrowserRouter>
      <Switch>
        <PublicContainer exact path='/' component={SignPage}/>
        <EnsureLoggedInContainer exact path='/dashboard' component={UserLocationDashboard}/>
        <EnsureLoggedInContainer exact path='/history' component={UserLocationHistory}/>
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
),document.getElementById('app'));
