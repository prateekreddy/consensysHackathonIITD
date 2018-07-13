import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';

import {teal300,cyan300,pink500,pink50,pink300} from 'material-ui/styles/colors';

const styles = {
  paperStyle : {
    marginTop : '30px',
    width : 'fit-content',
    minWidth : '400px',
    marginLeft : 'auto',
    marginRight : 'auto',
    paddingBottom : '10px',
    backgroundColor : pink50,
    opacity : '1',
    borderRadius : '10px'
  },
  subheaderStyle : {
    height : '100px',
    textAlign : 'center',
    backgroundColor : teal300,
    backgroundImage : `url('../images/login_header_background.jpg')`,
    backgroundSize : 'cover',
    paddingTop : '30px'
  },
  textFieldStyle : {

  },
  floatingLabelStyle : {
    color : pink300
  },
  underlineStyle: {
    borderColor : pink300
  },
  textFieldDivStyle : {
    textAlign : 'center'
  },
  loginButtonStyle : {
    marginLeft : 'auto',
    marginRight : 'auto'
  },
  signInTextStyle : {
    fontSize : '30px',
    fontStyle : 'italic',
    fontWeight : 600,
    color : '#FFF'
  }
}
class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData : {
        fullname : '',
        email : '',
        password : '',
        confirmPassword : '',
      },
      errorfullname : '',
      erroremail : '',
      errorpassword : '',
      errorconfirmPassword : '',
      status : {
        fullname : false,
        email : false,
        password : false,
        confirmPassword : false
      },
      submitDisabled : true,
      openDialog : false,
      submitMessage : '',
      registrationSuccess : false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event){
    const userData = this.state.userData;
    userData[event.target.name] = event.target.value;
    this.setState({userData});
    this.validateInputs(event.target.name,event.target.value);
  }
  validateInputs(name,value){
    const status = this.state.status;
    switch (name) {
      case 'fullname':
        if(value === ''){
          status[name] = false;
          this.setState({errorfullname : 'Required',status : status});
        }else {
          status[name] = true;
          this.setState({errorfullname : '',status : status});
        }
        break;
      case 'email':
        if(value === ''){
          status[name] = false;
          this.setState({erroremail : 'Required',status});
        }else {
          status[name] = true;
          this.setState({erroremail : '',status});
        }
        break;
      case 'password':
        if(value === ''){
          status[name] = false;
          this.setState({errorpassword : 'Required',status});
        }else {
          status[name] = true;
          this.setState({errorpassword : '',status});
        }
        break;
      case 'confirmPassword':
        if(value === ''){
          status[name] = false;
          this.setState({errorconfirmPassword : 'Required',status});
        }else {
          if (value !== this.state.userData.password) {
            status[name] = false;
            this.setState({errorconfirmPassword : 'Password does not match',status});
          }else {
            status[name] = true;
            this.setState({errorconfirmPassword : '',status});
          }
        }
        break;
      default:

    }
    this.setState({submitDisabled : !Object.values(this.state.status).every((ele) => {return ele})});
  }
  handleClose(e){
    this.setState({openDialog : false});
    if(this.state.registrationSuccess){
      this.props.goToLogin(e);
    }
  }
  handleRegister(){
    if(Object.values(this.state.status).every((ele) => {return ele})){
      const that = this;
      axios({
        method : 'post',
        url : '/auth/register',
        data : that.state.userData
      })
      .then(function(response){
        that.setState({submitMessage : response.data.message,openDialog : true,registrationSuccess : true});
      })
      .catch(function(error){
        console.log(error);
        that.setState({submitMessage : 'Internal Server Error!!',openDialog : true, registrationSuccess : false});
      });
    }
  }
  render(){
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ];
    return (
      <Paper style = {styles.paperStyle}>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.state.submitMessage}
        </Dialog>
        <Subheader style = {styles.subheaderStyle}><span style = {styles.signInTextStyle}>LocFin</span></Subheader>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Fullname'
            errorText = {this.state.errorfullname}
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'fullname'
            value = {this.state.userData.fullname}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Email Id'
            errorText = {this.state.erroremail}
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'email'
            value = {this.state.userData.email}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Password'
            errorText = {this.state.errorpassword}
            type = 'password'
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'password'
            value = {this.state.userData.password}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Confirm Password'
            errorText = {this.state.errorconfirmPassword}
            type = 'password'
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'confirmPassword'
            value = {this.state.userData.confirmPassword}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <RaisedButton
            label = 'Sign Up'
            backgroundColor = {pink500}
            labelColor = '#FFF'
            onClick = {this.handleRegister.bind(this)}
            disabled = {this.state.submitDisabled}
          />
        </div>
        <br/>
        <div style = {styles.textFieldDivStyle}>
          <Link onClick = {this.props.goToLogin} to='/'>Already have an account?</Link>
        </div>
      </Paper>
    )
  }
}

export default Register;
