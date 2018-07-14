import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import NavBar from '../components/NavBar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import PortOrderItem from '../components/PortOrderItem.jsx';

class CarrierOrderApprovalList extends React.Component {

 constructor(props){
   super(props);
   this.state = {
     orders : [
       {
         id : 0,
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
         id : 1,
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
     paperStyle : {
       marginLeft : 'auto',
       marginRight : 'auto',
       padding : '10px',
       textAlign : 'center',
       backgroundColor : '#eee',
       opacity : '0.9',
       color : 'white'
     },
     orderItemPaperStyle : {
       padding : '10px',
       textAlign : 'center',
       marginBottom : '20px'
     }
   }
 }
 handleAcceptRequest(orderId){
   console.log(orderId);
 }
 handleRejectRequest(orderId){

 }
 generateOrderList(){
   return this.state.orders.map((order,ind) => {
     return (
      <div id = {order.id} style = {{textAlign : 'center', marginBottom : '20px', backgroundColor : 'white'}}>
        <PortOrderItem order = {order}/>
        <RaisedButton
          label = 'Reject'
          onClick = {() => this.handleRejectRequest(order.id, ind)}
          backgroundColor = {'red'}
        />
        <RaisedButton
          label = 'Accept'
          onClick = {() => this.handleAcceptRequest(order.id, ind)}
          backgroundColor = {'green'}
        />
      </div>
     );
   });
 }
 render() {
   const orderList = this.generateOrderList();
   return (
     <div>
       <NavBar />
       <div className = 'contentContainer'>
       <SectionHeader title = 'Order History'/>
       <Paper style = {this.styles.paperStyle}>
         {orderList}
       </Paper>
       </div>
     </div>
     );
  }
}
export default CarrierOrderApprovalList;
