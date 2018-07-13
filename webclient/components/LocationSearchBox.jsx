import React from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import {pink500,pink50,pink300} from 'material-ui/styles/colors';

class LocationSearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchedLocation : '',
    }
    this.styles = {
      divStyle : {
        marginTop : '5px',
      },
      mapViewerDivStyle : {
        width : '100%',
        height : '500px'
      },
      floatingLabelStyle : {
        color : pink300
      },
      underlineStyle: {
        borderColor : pink300
      },
      textFieldStyle : {
        width : 'calc(100% - 40px)'
      }
    }
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.map != undefined && this.props.map != nextProps.map){
        this.initAutocomplete(nextProps.map);
    }
  }
  handleLocationChange (e){
    this.setState({searchedLocation : e.target.value});
  }
  render(){
    return(
      <div style = {this.styles.divStyle}>
        <TextField
          id = 'locationsearchbox'
          style = {this.styles.textFieldStyle}
          underlineStyle = {this.styles.underlineStyle}
          underlineFocusStyle = {this.styles.underlineStyle}
          onChange = {this.handleLocationChange.bind(this)}
          value = {this.state.searchedLocation}
        />
        <FloatingActionButton mini={true} backgroundColor = {pink500} className = ''
        onClick = {this.props.saveLocation.bind(this)} id ='save-search-location-button' >
          <FontIcon className = 'material-icons'>done</FontIcon>
        </FloatingActionButton>

      </div>
    )
  }
  initAutocomplete(map){
    if(map != undefined){
      const input = document.getElementById('locationsearchbox')
      const options = {
        types: ['address']
      }
      const geoAutocomplete = new window.google.maps.places.Autocomplete(input);
      geoAutocomplete.bindTo('bounds', map);
      geoAutocomplete.addListener('place_changed', () => {
        const selectedPlace = geoAutocomplete.getPlace()
        const componentForm = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name',
          postal_code: 'short_name'
        }
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
        let selectedSuggest = {}
        console.log(selectedPlace);
        let locationName = '';
    // input.value = selectedPlace.name // Code injection risk (check doc)
        if(selectedPlace.types.includes('locality') || selectedPlace.types.includes('political')
        || selectedPlace.types.includes('route') || selectedPlace.types.includes('street_address')){
          locationName = selectedPlace.formatted_address;
          this.setState({searchedLocation : `${selectedPlace.formatted_address}`}) ;
        }else{
          locationName = selectedPlace.name+','+selectedPlace.formatted_address;
          this.setState({searchedLocation : `${selectedPlace.name},${selectedPlace.formatted_address}`}) ;
        }
        this.props.onPlaceChange({selectedPlace,locationName});
      })
    }
  }
}

export default LocationSearchBox;
