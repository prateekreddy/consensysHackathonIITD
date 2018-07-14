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
import CarrierFromRequestList from './containers/CarrierFromRequestList.jsx';
import CarrierToRequestList from './containers/CarrierToRequestList.jsx';
import CarrierOrderHistory from './containers/CarrierOrderHistory.jsx';
import HomePage from './containers/HomePage.jsx';

  ReactDOM.render((
      <MuiThemeProvider >
        <BrowserRouter>
          <Switch>
            <PublicContainer exact path='/' component={HomePage}/>
            <PublicContainer exact path='/user/login' component={PortInitContainer}/>
            <EnsureLoggedInContainer exact path='/user/dashboard' component={UserDashboard}/>
            <EnsureLoggedInContainer exact path='/carrier/notifications' component={UserNotifications}/>
            <EnsureLoggedInContainer exact path='/carrier/orderhistory' component={UserOrderHistory}/>
            <PublicContainer exact path='/carrier/login' component={CarrierLogin}/>
            <EnsureLoggedInContainer exact path='/carrier/pendingUserRequest' component={CarrierOrderApprovalList}/>
            <EnsureLoggedInContainer exact path='/carrier/pendingCarrierRequest' component={CarrierToRequestList}/>
            <EnsureLoggedInContainer exact path='/carrier/startconnectionprocess' component={CarrierFromRequestList}/>
            <EnsureLoggedInContainer exact path='/carrier/orderhistory' component={CarrierOrderHistory}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      ), document.getElementById('app'));
