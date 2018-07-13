import React from 'react';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import NotificationItem from '../components/NotificationItem.jsx';
import NavBar from '../components/NavBar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

class UserNotifications extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notifications : [
        {timeStamp : new Date(), text : 'Your port request is accepted by the system.'},
        {timeStamp : new Date(), text : 'Your port request is accepted by the system.'}
      ]
    }
  }

  generateNotificationList(){
    return this.state.notifications.map((notification, ind) => {
      return <NotificationItem notification={notification} key={ind}/>
    });
  }
  render() {
    console.log('aaa');
    const notList = this.generateNotificationList();
    console.log(notList);
    return (
      <div>
        <NavBar />
        <div className = 'contentContainer'>
        <SectionHeader title = 'Notifications'/>
        <Divider />
        <List>
          {notList}
        </List>
        </div>
      </div>
      );
   }
}
export default UserNotifications;
