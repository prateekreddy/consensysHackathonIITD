import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PortInitContainer from './containers/PortInitContainer.jsx';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer.jsx';
import PublicContainer from './containers/PublicContainer.jsx';
import UserDashboard from './containers/UserDashboard.jsx';
import UserNotifications from './containers/UserNotifications.jsx';
import CarrierLogin from './containers/CarrierLogin.jsx';
import UserOrderHistory from './containers/UserOrderHistory.jsx';
import CarrierOrderApprovalList from './containers/CarrierOrderApprovalList.jsx';
import HomePage from './containers/HomePage.jsx';

  ReactDOM.render((
      <MuiThemeProvider >
        <BrowserRouter>
          <Switch>
            <PublicContainer exact path='/' component={HomePage}/>
            <PublicContainer exact path='/user/login' component={PortInitContainer}/>
            <PublicContainer exact path='/carrier/login' component={CarrierLogin}/>
            <EnsureLoggedInContainer exact path='/carrier/dashboard' component={CarrierOrderApprovalList}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      ), document.getElementById('app'));
