import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {Container,Row,Col} from 'react-grid-system';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500,pink50,pink300,white} from 'material-ui/styles/colors';

import LocationSearchBox from '../components/LocationSearchBox.jsx';
import LocationViewer from '../components/LocationViewer.jsx';

class UserLocationDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPlace : {},
      height : '500px',
    };
    this.styles = {
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
    }
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
    let height = window.innerHeight-(64+73+5);
    let width = window.innerWidth;
    this.setState({height,width});
  }
  getMap(map){
    this.setState({map})
  }

  onPlaceChange(placeDetails){
    const selectedPlace = placeDetails.selectedPlace;

    let searchResult = {
      location_tag : 'others',
      location_name : placeDetails.locationName,
      geometry : selectedPlace.geometry,
      name : selectedPlace.name,
      icon : selectedPlace.icon,
      formatted_address : selectedPlace.formatted_address
    }
    this.setState({currentPlace : selectedPlace,searchResult});

  }
  trial(place,token,that){
    console.log('now');
    axios({
      method : 'post',
      url : '/history/locationhistory',
      data : place,
      headers : {authorization : 'JWT '+token}
    })
    .then(function(response){
      document.getElementById('save-search-location-button').classList.remove('rotate');
      if(!response.data.success){
        that.setState({searchResult : place});
      }
    })
    .catch(function(err){

    })
  }
  saveToHistory(){
    const place = this.state.searchResult;
    const that = this;
    const token = localStorage.getItem('locfin') || '';

    if(!(Object.keys(place).length === 0 && place.constructor() === Object)){
      document.getElementById('save-search-location-button').classList.add('rotate');
      setTimeout(function(){that.trial(place,token,that)},5000);
    }
    this.setState({searchResult : {}});
  }
  render(){
    return(
      <div>
      <AppBar
        title = 'Locfin'
        titleStyle = {this.styles.appBarTitleStyle}
        iconElementRight = {
          <div>
            <IconButton disabled={true}>
              <FontIcon className = 'material-icons' style = {this.styles.appBarIconStyle} color = {white}>
                home
              </FontIcon>
            </IconButton>
            <Link to='/history'>
            <IconButton>
              <FontIcon className = 'material-icons' style = {this.styles.appBarIconStyle} color = {white}>
                history
              </FontIcon>
            </IconButton>
            </Link>
          </div>

        }
        style = {this.styles.appBarStyle}
      />
        <Container fluid >
          <Row >
            <Col md = {2} lg = {2} xl = {2}></Col>
            <Col xs = {12} sm = {12} md = {8} lg = {8} xl = {8}>
              <div>
                <LocationSearchBox onPlaceChange = {this.onPlaceChange.bind(this)} map = {this.state.map}
                width = {this.state.width} saveLocation = {this.saveToHistory.bind(this)}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md = {2} lg = {2} xl = {2}> </Col>
            <Col xs = {12} sm = {12} md = {8} lg = {8} xl = {8}>
              <div>
                <LocationViewer currentPlace = {this.state.currentPlace}
                getMap = {this.getMap.bind(this)} map = {this.state.map} height = {this.state.height}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default UserLocationDashboard;
