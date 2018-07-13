import React from 'react';

import {Link} from 'react-router-dom';
import {Container,Row,Col,Visible,Hidden} from 'react-grid-system';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import {pink500,pink50,pink300,white} from 'material-ui/styles/colors';

import LocationHistory from '../components/LocationHistory.jsx';
import LocationViewer from '../components/LocationViewer.jsx';

class UserLocationHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPlace : {},
      height : '500px',
      buttonMargin : '200px',
      openDrawer : true,
    }
    this.styles = {
      divStyle : {
        backgroundColor : 'red',
        width : '100%'
      },
      drawerStyle : {
        width : '100%',
        overflow : 'hidden',
        float : 'left',
        marginTop : '64px'
      },
      drawerOverlayStyle : {
        overflow : 'hidden',
      },
      fontIconLeftArrowStyle : {
        fontSize : '90px',
        left : '-25px',
        marginTop : ''
      },
      fontIconRightArrowStyle : {
        fontSize : '90px',
        position : 'fixed',
        right : '-20px',
        marginTop : ''
      },
      appBarStyle : {
        // backgroundImage : `url('../images/login_header_background.jpg')`,
        // backgroundSize : 'cover',
        backgroundColor : pink500
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
    };
    this.updateDimentions = this.updateDimentions.bind(this);
  }
  componentDidMount(){
    window.addEventListener('resize',this.updateDimentions);
    this.updateDimentions();
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.updateDimentions);
  }
  updateDimentions(){
    let height = window.innerHeight-64;
    const buttonMargin = (window.innerHeight-64)/2-45;
    this.setState({height,openDrawer : true,buttonMargin});
  }
  toggleDrawer(){
    this.setState({openDrawer : !this.state.openDrawer});
  }
  getMap(map){
    this.setState({map})
  }
  getSelectedPlace(place){
    this.setState({currentPlace : place});
  }
  getSelectedPlaceMobile(place){
    this.setState({currentPlace : place,openDrawer : false});
  }
  render(){
    let openDrawerButton ;
    //this.styles.fontIconArrowStyle.marginTop = this.state.buttonMargin;
    if(this.state.openDrawer){
      openDrawerButton = (
        <div className = 'left-button' style = {{marginTop : this.state.buttonMargin}}
        onClick = {this.toggleDrawer.bind(this)}>
          <FontIcon className = 'material-icons' style = {this.styles.fontIconRightArrowStyle} color = {white}>
            keyboard_arrow_left
          </FontIcon>
        </div>
      );
    }else{
      openDrawerButton = (
        <div className = 'right-button' style = {{marginTop : this.state.buttonMargin}}
        onClick = {this.toggleDrawer.bind(this)}>
          <FontIcon className = 'material-icons' style = {this.styles.fontIconLeftArrowStyle} color = {white}>
            keyboard_arrow_right
          </FontIcon>
        </div>
      );
    }
    return(
      <div>
        <AppBar
          title = 'Locfin'
          titleStyle = {this.styles.appBarTitleStyle}
          iconElementRight = {
            <div>
              <Link to='/dashboard'>
                <IconButton>
                  <FontIcon className = 'material-icons' style = {this.styles.appBarIconStyle} color = {white}>
                    home
                  </FontIcon>
                </IconButton>
              </Link>
              <IconButton disabled={true}>
                <FontIcon className = 'material-icons' style = {this.styles.appBarIconStyle} color = {white}>
                  history
                </FontIcon>
              </IconButton>
            </div>

          }
          style = {this.styles.appBarStyle}
        />
        <Container fluid >
          <Row >
            <Hidden md lg xl >
              {openDrawerButton}
              <Drawer open = {this.state.openDrawer} style = {this.styles.drawerStyle}
               width = {'100%'} containerStyle = {{top : 64}}>
              <div style = {{height : this.state.height , width : '100%'}} className = 'scrollbar' id='style-2'>
                <LocationHistory setPlaceOnMap = {this.getSelectedPlaceMobile.bind(this)} height = {this.state.height}/>
              </div>
              </Drawer>
            </Hidden>
            <Hidden xs sm>
            <Col md = {4} lg = {4} xl = {4} style = {{height : this.state.height}}>
              <div style = {{height : this.state.height , width : '100%'}} className = 'scrollbar' id='style-2'>
                <LocationHistory setPlaceOnMap = {this.getSelectedPlace.bind(this)} height = {this.state.height}/>
              </div>
            </Col>
            </Hidden>
            <Col xs = {12} sm = {12} md = {8} lg = {8} xl = {8} style = {{height : this.state.height}}>
              <LocationViewer currentPlace = {this.state.currentPlace} getMap = {this.getMap.bind(this)}
              map = {this.state.map} height = {this.state.height}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default UserLocationHistory;
