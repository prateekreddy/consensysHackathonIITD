import React from 'react';

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class NotificationItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <ListItem
          primaryText={
            <p>
              <span>
                {this.props.notification.text}
              </span>
            </p>
          }
          primaryTextLines={2}
          secondaryText = {
            <p style={{color: '#ccc'}}>{this.props.notification.timeStamp.toString()}</p>
          }
        />
        <Divider/>
      </div>
      );
   }
}
export default NotificationItem;
