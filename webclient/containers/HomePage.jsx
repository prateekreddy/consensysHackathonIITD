import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500,pink50,pink300,white} from 'material-ui/styles/colors';

class SectionHeader extends React.Component {

  constructor(props){
    super(props);
    this.styles = {
      appBarStyle : {
        // backgroundImage : `url('../images/login_header_background.jpg')`,
        // backgroundSize : 'cover',
        backgroundColor : 'black'
      },
      appBarTitleStyle : {
        fontSize : '30px',
        fontStyle : 'italic',
        fontWeight : 600,
        color : '#FFF'
      },
      appBarIconStyle : {
        fontSize : '40px'
      }
    }
  }
  render() {
    return (
        <div>
        <AppBar
      title = 'NumPortal'
      iconElementRight = {
        <div>

        </div>
      }
      style = {this.styles.appBarStyle}
    />
          <div className = 'contentContainer'>
            <div></div>
            <div style = {{marginLeft : 'auto', marginRight : 'auto', width : 'fit-content'}}>
            <Link to='/user/login'>
            <RaisedButton
              label = 'Port Number'
              labelStyle = {{color : 'white'}}
              backgroundColor = 'red'
            />
          </Link>
            <Link to='/carrier/login'>
            <RaisedButton
              label = 'CarrierLogin'
              labelStyle = {{color : 'white'}}
              backgroundColor = 'black'
            />
            </Link>
            </div>
          </div>
        </div>
      );
   }
}
export default SectionHeader;
