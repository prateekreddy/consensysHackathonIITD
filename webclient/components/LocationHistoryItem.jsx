import React from 'react';

import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500,pink50,pink300} from 'material-ui/styles/colors';

class LocationHistoryItem extends React.Component {
  constructor(props){
    super(props);
    this.styles = {
      listItemStyle : {
        width : '100%'
      }
    }
  }
  setLocation(){
    this.props.setLocation(this.props.location);
  }
  locationSettingsRequest(){
    this.props.openSettingsDialog(this.props.location)
  }
  render(){
    const rightIcon = (
        <IconButton onClick = {this.locationSettingsRequest.bind(this)}>
          <FontIcon className = 'material-icons' color = {pink500}>more_vert</FontIcon>
        </IconButton>
    )
    return(
      <ListItem
        primaryText = {this.props.location.location_tag}
        secondaryText = {this.props.location.name}
        rightIconButton = {rightIcon}
        onClick = {this.setLocation.bind(this)}
      />
    )
  }
}

export default LocationHistoryItem;
