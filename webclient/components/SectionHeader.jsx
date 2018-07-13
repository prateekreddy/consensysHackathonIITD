import React from 'react';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

class SectionHeader extends React.Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
        <div style= {{borderBottom : '4px solid black' }}>
          <span style={{fontSize : '30px', fontWeight : '600'}}>{this.props.title}</span>
          <Divider/>
        </div>
      );
   }
}
export default SectionHeader;
