import React from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Employee from '../components/Employee.jsx';

class EmployeeContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      employees : [],
      selected: [],
      upsertEmployeeDetails : {

      },
      modify : false
    }
    this.styles = {
      actionDivStyle : {
        width : "100%",
        textAlign : "right"
      }
    }
  }
  componentDidMount(){
    this.getEmployeesData();
   }
   getEmployeesData(){
     const that = this;
     axios.get('http://localhost:3000/employees')
     .then(function (response) {
       that.setState({
         employees : response.data,
         upsertEmployeeDetails : {
           id : response.data[response.data.length-1].id+1,
           name : "",
           salary : 0
         },
         modify : false
       });
     })
     .catch(function (error) {
       console.log(error);
     });
   }
   createEmployeeList(){
     return this.state.employees.map((employee, index) => {
       return (<TableRow selected={this.isSelected(index)}>
        <TableRowColumn>{employee.id}</TableRowColumn>
        <TableRowColumn>{employee.name}</TableRowColumn>
        <TableRowColumn>{employee.salary}</TableRowColumn>
       </TableRow>);
     });
   }
   handleRowSelection(selectedRows){
     this.setState({
       selected: selectedRows,
     });
   };
   isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
   };
   deleteEmployees(){

     const that = this;
     const index = this.state.selected[0];
     console.log('state', this.state);
     axios.delete('http://localhost:3000/employees/'+that.state.employees[index].id)
     .then(function(response){
       let employees = that.state.employees;
       employees.splice(index, 1);
       that.setState({employees, selected : []});
     })
   }
   changeEmployeeDetails(paramName, event){
     const employee = this.state.upsertEmployeeDetails;
     employee[paramName] = event.target.value;
     this.setState({upsertEmployeeDetails : employee});
   }
   upsertEmployee(){
     const that = this;

     let param = '';
     if(this.state.modify){
       param = '/'+this.state.upsertEmployeeDetails.id;
     }
     axios({
       url : 'http://localhost:3000/employees'+param,
       method : this.state.modify? 'put':'post',
       data : this.state.upsertEmployeeDetails
     }).then(function(response){
       that.getEmployeesData();
     })
   }
   updateDetails(){
     const employee = this.state.employees[this.state.selected[0]];
     this.setState({upsertEmployeeDetails : employee, modify : true});
   }
   render() {
     const employeeList = this.createEmployeeList();
      return (
         <Paper>
            <div>
              <TextField
                hintText="Number"
                floatingLabelText="Employee ID"
                disabled = {true}
                value = {this.state.upsertEmployeeDetails.id}
              />
              <TextField
                hintText="Annesha"
                floatingLabelText="Employee Name"
                value = {this.state.upsertEmployeeDetails.name}
                onChange = {this.changeEmployeeDetails.bind(this, "name")}
              />
              <TextField
                hintText="15000"
                floatingLabelText="Employee Salary"
                value = {this.state.upsertEmployeeDetails.salary}
                onChange = {this.changeEmployeeDetails.bind(this, "salary")}
              />
              <div style = {this.styles.actionDivStyle}>
                <RaisedButton label = "Add" primary = {true} onClick = {this.upsertEmployee.bind(this)}/>
              </div>
            </div>
            <Table onRowSelection={this.handleRowSelection.bind(this)}>
              <TableHeader>
                <TableRow >
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Salary</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {employeeList}
              </TableBody>
            </Table>
            <div style = {this.styles.actionDivStyle}>
              <RaisedButton label = "Modify" primary = {true} onClick = {this.updateDetails.bind(this)}/>
              <RaisedButton label = "Delete" secondary = {true} onClick = {this.deleteEmployees.bind(this)}/>
            </div>
          </Paper>
      );
   }
}
export default EmployeeContainer;
