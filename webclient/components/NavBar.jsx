import React from 'react';

import AppBar from 'material-ui/AppBar';

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <div>
          <AppBar
            title = 'NumPortal'
            style = {{backgroundColor : 'black'}}
          />
        </div>
      );
   }
}
export default NavBar;
