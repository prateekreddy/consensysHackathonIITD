import React from 'react';


import Paper from 'material-ui/Paper';

class LocationViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      map : {},
    };
    this.styles = {
      paperStyle : {
        width : '100%',
        height : '',
        marginLeft : 'auto',
        marginRight : 'auto'
      }
    }
    this.marker = null;
  }
  componentDidMount(){
    this.showLocationOnMap();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.map != undefined && this.props.map != nextProps.map){
        this.setMapToState(nextProps.map);
    }
  }

  setMapToState(map){
    if(map != undefined){
      this.setState({map});
    }
  }
  showLocationOnMap(){
    const mapElement = document.getElementById('map');
    const map = new google.maps.Map(mapElement, {
      center: {lat: 22.3436288, lng: 15.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
    });
    //this.setState({map})
    this.props.getMap(map);
  }
  setMarkerOnMap(place){
    if (!place.geometry) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    if(this.marker){
      this.marker.setMap(null);
    }
    // Create a marker for each place.
    let marker = new google.maps.Marker({
      map: this.state.map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    });
    marker.setVisible(false);
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      this.state.map.fitBounds(place.geometry.viewport);
    } else {
      this.state.map.setCenter(place.geometry.location);
      this.state.map.setZoom(20);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    this.marker = marker;
  }
  render(){
    this.setMarkerOnMap(this.props.currentPlace);
    this.styles.paperStyle.height = this.props.height;
    return(
      <div>
        <Paper id = 'map' style = {this.styles.paperStyle}>

        </Paper>

      </div>
    )
  }
}

export default LocationViewer;
