import React from 'react';
import axios from 'axios';

import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';

import LocationHistoryItem from './LocationHistoryItem.jsx';


class LocationHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locations : [],
      selectedLocation : {},
      locationToChange : {},
      newLocationTag : '',
      openSettingsDialog : false,
      openDeleteMenu : false
    }
    this.styles = {
      listStyle : {
        width : '100%'
      },
      paperStyle : {
        width : '100%',
      },
      dialogStyle : {
        width : '100%',
        textAlign : 'center'
      }
    }
    this.handleSettingsDialogClose = this.handleSettingsDialogClose.bind(this);
  }
  componentDidMount(){
    const that = this;
    const token = localStorage.getItem('locfin') || '';
    axios({
      method : 'post',
      url : '/history/getlocationhistory',
      headers : {authorization : 'JWT '+token}
    })
    .then(function(response){
      if(response.data.success){
        that.setState({locations : response.data.locations || []});
      }

    })
    .catch(function(err){

    })
  }
  handleSettingsDialogClose(){
    console.log('Called');
    this.setState({openSettingsDialog : false});
  }
  handleLocationTagChange(e){
    this.setState({newLocationTag : e.target.value});
  }
  updateLocationTagName(){
    const oldLocation = this.state.locationToChange;
    oldLocation.location_tag = this.state.newLocationTag;
    let locations = this.state.locations;
    const that = this;
    const token = localStorage.getItem('locfin') || '';
    axios({
      method : 'put',
      url : '/history/locationhistory',
      headers : {authorization : 'JWT '+token},
      data : oldLocation
    })
    .then(function(response){
      if(response.data.success){
        const newLocations = locations.map(function(location){
          if(location._id === response.data.location._id){
            return response.data.location;
          }else{
            return location;
          }
        });
        that.setState({locations : newLocations});
        that.handleSettingsDialogClose();
      }else{

      }
    })
    .catch(function(err){

    });
  }
  deleteLocation(){
    const oldLocation = this.state.locationToChange;
    let locations = this.state.locations;
    const that = this;
    const token = localStorage.getItem('locfin') || '';
    axios({
      method : 'delete',
      url : '/history/locationhistory',
      headers : {authorization : 'JWT '+token},
      data : oldLocation
    })
    .then(function(response){
      console.log(response.data.success);
      if(response.data.success){
        const newLocations = locations.filter(location => location._id !== oldLocation._id);
        console.log('del');
        that.setState({locations : newLocations});
        that.handleSettingsDialogClose();
      }else{

      }
    })
    .catch(function(err){

    });
  }
  toggleDeleteMenu(){
    this.setState({openDeleteMenu : !this.state.openDeleteMenu});
  }
  openSettingsDialog(location){
    this.setState({locationToChange : location,openSettingsDialog : true,newLocationTag : location.location_tag});
  }
  createLocationItems(){
    const locations = this.state.locations;
    return locations.map((location,ind) => {
      return <LocationHistoryItem location = {location} key = {ind}
      setLocation = {this.props.setPlaceOnMap.bind(this)} openSettingsDialog = {this.openSettingsDialog.bind(this)}/>;
    });
  }
  render(){
    const locationItems = this.createLocationItems();
    const dialogContent = (
      <div>
        <TextField
          floatingLabelText = 'Location name'
          value = {this.state.newLocationTag}
          onChange = {this.handleLocationTagChange.bind(this)}
        />
        <IconButton onClick = {this.updateLocationTagName.bind(this)}>
          <FontIcon className='material-icons'>save</FontIcon>
        </IconButton>
        <IconMenu iconButtonElement = {
          <IconButton onClick = {this.toggleDeleteMenu.bind(this)}>
            <FontIcon className = 'material-icons'>delete</FontIcon>
          </IconButton>
        }
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
        <MenuItem>
          <div style = {this.styles.dialogStyle}>
          <IconButton onClick = {this.toggleDeleteMenu.bind(this)}>
            <FontIcon className='material-icons'>clear</FontIcon>
          </IconButton>
          <IconButton onClick = {this.deleteLocation.bind(this)}>
            <FontIcon className='material-icons'>done</FontIcon>
          </IconButton>
          </div>
        </MenuItem>
        </IconMenu>
      </div>
    )
    return(
      <div>
        <Dialog open = {this.state.openSettingsDialog} title = 'Change Location Details'
          onRequestClose={this.handleSettingsDialogClose.bind(this)}
        >
          <div style = {this.styles.dialogStyle}>
            {dialogContent}
          </div>
        </Dialog>
        <Paper style = {this.styles.paperStyle} zDepth = {0} >
          <List style = {this.styles.listStyle}>
            <Subheader>Location History</Subheader>
            {locationItems}
          </List>
        </Paper>
      </div>
    )
  }
}

export default LocationHistory;
