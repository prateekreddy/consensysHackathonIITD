import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EmployeeContainer from './containers/EmployeeContainer.jsx';
import PortInitContainer from './containers/PortInitContainer.jsx';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer.jsx';
import PublicContainer from './containers/PublicContainer.jsx';
import UserDashboard from './containers/UserDashboard.jsx';
import UserNotifications from './containers/UserNotifications.jsx';
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider >
        <BrowserRouter>
          <Switch>
            <PublicContainer exact path='/' component={UserDashboard}/>
            <EnsureLoggedInContainer exact path='/dashboard' component={UserDashboard}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
      );
   }
}
export default App;
