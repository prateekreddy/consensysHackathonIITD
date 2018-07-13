import React from 'react';
import axios from 'axios';

import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
class Employee extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
         <TableRow>
          <TableRowColumn>{this.props.employee.id}</TableRowColumn>
          <TableRowColumn>{this.props.employee.name}</TableRowColumn>
          <TableRowColumn>{this.props.employee.salary}</TableRowColumn>
         </TableRow>
      );
   }
}
export default Employee;
