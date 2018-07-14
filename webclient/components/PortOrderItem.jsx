 import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import NavBar from '../components/NavBar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

class PortOrderItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      orders : [
        {
          username : 'adadas',
          mobile : '929292929292',
          passport : {
            number : 'PO123456'
          },
          fromCarrier : {
            name : 'Vodafone',
            country : 'India'
          },
          toCarrier : {
            name : 'Virgin',
            country : 'US'
          },
          status : {
            code : '01',
            text : 'To be approved by to carrier'
          }
        },
        {
          username : 'adadas',
          mobile : '929292929292',
          passport : {
            number : 'PO123456'
          },
          fromCarrier : {
            name : 'Vodafone',
            country : 'India'
          },
          toCarrier : {
            name : 'Virgin',
            country : 'US'
          },
          status : {
            code : '01',
            text : 'To be approved by to carrier'
          }
        }
      ]
    }
    this.styles = {
      orderItemPaperStyle : {
        padding : '10px',
        textAlign : 'center'
      }
    }
  }

  render() {
    return (
      <Paper style = {this.styles.orderItemPaperStyle}>
          <table style = {{marginLeft : 'auto', marginRight : 'auto'}}>
            <tbody>
              <tr>
                <td>
                  <span>Name :</span>
                </td>
                <td>
                  <span>{this.props.order.username}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Mobile Number :</span>
                </td>
                <td>
                  <span>{this.props.order.mobile}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Passport Number :</span>
                </td>
                <td>
                  <span>{this.props.order.passport.number}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>From Carrier :</span>
                </td>
                <td>
                  <span>{this.props.order.fromCarrier.name + " " + this.props.order.fromCarrier.country}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>To Carrier :</span>
                </td>
                <td>
                  <span>{this.props.order.toCarrier.name + " " + this.props.order.toCarrier.country}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Order status :</span>
                </td>
                <td>
                  <span>{this.props.order.status.text}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>);
   }
}
export default PortOrderItem;
