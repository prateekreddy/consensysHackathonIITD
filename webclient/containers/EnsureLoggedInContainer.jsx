import React from 'react';
import {withRouter,Redirect,Route} from 'react-router-dom';
import axios from 'axios';

class EnsureLoggedInContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      done : false
    }
  }
  componentDidMount(){
    const that = this;
    const token = localStorage.getItem('locfin') || '';

    axios({
      method : 'post',
      url : '/auth/authenticate',
      headers : {authorization : 'JWT '+token}
    })
    .then(function(response){
      if(!response.data.success){
        that.setState({success : false});
      }else{
        that.setState({success : true});
      }
      that.setState({done : true});
    })
    .catch(function(err){

    });
  }
  render(){
    if(this.state.success && this.state.done){
      return (
        <Route component={this.props.component}/>
      );
    }else if(this.state.done === true && this.state.success === false){
      return (
        <Redirect to='/' />
      );
    }else {
      return(
        <div></div>
      );
    }

  }
}

export default withRouter(EnsureLoggedInContainer);
