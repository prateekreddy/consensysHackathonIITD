import React from 'react';

import axios from 'axios';

import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';


const styles = {
  signPageStyle : {
    position : 'absolute',
    top : 0,
    bottom : 0,
    width : '100%',
    backgroundImage : `url('../images/login_page_background.jpg')`,
    backgroundSize : 'cover',
  }
}
class SignPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginPage : true
    }
  }
  showLogin(e){
    e.preventDefault();
    this.setState({loginPage : true});
  }
  showRegister(e){
    e.preventDefault();
    this.setState({loginPage : false});
  }
  render(){
    let showComponent;
    if(this.state.loginPage){
      showComponent = <Login goToRegister = {this.showRegister.bind(this)}/>;
    }else{
      showComponent = <Register goToLogin = {this.showLogin.bind(this)}/>;
    }
    return(
      <div style = {styles.signPageStyle}>
        {showComponent}
      </div>
    )
  }
}

export default SignPage;
