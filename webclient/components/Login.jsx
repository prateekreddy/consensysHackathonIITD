import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Container,Row,Col,Visible,Hidden} from 'react-grid-system';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import {teal300,cyan300,pink500,pink50,pink300} from 'material-ui/styles/colors';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginData : {
        email : '',
        password : ''
      },
      error : {
        email : '',
        password : ''
      },
      status : {
        email : false,
        password : false
      },
      errorMessage : '',
      submitDisabled : true
    }
    this.styles = {
      paperStyle : {
        width : '100%',
        marginLeft : 'auto',
        marginRight : 'auto',
        paddingBottom : '10px',
        backgroundColor : pink50,
        opacity : '1',
        borderRadius : '10px'
      },
      paperStyleSmall : {
        height : window.innerHeight,
        width : '100%',
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
      subheaderStyleSmall : {
        height : '100px',
        textAlign : 'center',
        backgroundColor : teal300,
        backgroundImage : `url('../images/login_header_background.jpg')`,
        backgroundSize : 'cover',
        paddingTop : '30px',
        marginBottom : '20%',
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
      },
      containerStyle : {
        padding : '0px',
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleInputChange(event){
    const loginData = this.state.loginData;
    loginData[event.target.name] = event.target.value;
    this.setState({loginData});
    this.validateInputs(event.target.name,event.target.value);
  }
  validateInputs(name,value){
    const status = this.state.status;
    const error = this.state.error;
    switch (name) {
      case 'email':
        if(value === ''){
          error.email = 'Required';
          status.email = false;
        }else{
          error.email = '';
          status.email = true;
        }
        break;
      case 'password':
        if(value === ''){
          error.password = 'Required';
          status.password = false;
        }else{
          error.password = '';
          status.password = true;
        }
        break;
      default:

    }
    this.setState({submitDisabled : !Object.values(status).every((ele) => {return ele}),status,error});
  }
  handleLogin(){
    if(Object.values(this.state.status).every((ele) => {return ele})){
      const that = this;
      axios({
        method : 'post',
        url : '/auth/login',
        data : that.state.loginData
      })
      .then(function(response){
        if(response.status === 200 && response.data.success){
          localStorage.setItem('locfin',response.data.access_token);
          that.props.history.push('/dashboard');
        }
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
  render(){
    return (
      <div>
      <Hidden xs sm md>
      <Container fluid>
        <Row>
          <Col md = {2} lg = {4} xl = {4}></Col>
          <Col xs = {12} sm = {12} md = {8} lg = {4} xl = {4}>
          <Paper style = {this.styles.paperStyle}>
            <Subheader style = {this.styles.subheaderStyle}><span style = {this.styles.signInTextStyle}>LocFin</span></Subheader>
            <div style = {this.styles.textFieldDivStyle}>
              <TextField
                floatingLabelText = 'Email Id'
                errorText = {this.state.error.email}
                floatingLabelStyle = {this.styles.floatingLabelStyle}
                underlineStyle = {this.styles.underlineStyle}
                underlineFocusStyle = {this.styles.underlineStyle}
                name = 'email'
                value = {this.state.loginData.email}
                onChange = {this.handleInputChange}
              />
            </div>
            <div style = {this.styles.textFieldDivStyle}>
              <TextField
                floatingLabelText = 'Password'
                errorText = {this.state.error.password}
                type = 'password'
                floatingLabelStyle = {this.styles.floatingLabelStyle}
                underlineStyle = {this.styles.underlineStyle}
                underlineFocusStyle = {this.styles.underlineStyle}
                name = 'password'
                value = {this.state.loginData.password}
                onChange = {this.handleInputChange}
              />
            </div>
            <div style = {this.styles.textFieldDivStyle}>
              <RaisedButton
                label = 'Sign In'
                backgroundColor = {pink300}
                labelColor = '#FFF'
                disabled = {this.state.submitDisabled}
                onClick = {this.handleLogin}
              />
            </div>
            <br/>
            <div style = {this.styles.textFieldDivStyle}>
              <Link onClick = {this.props.goToRegister} to = '/'>Create an account?</Link>
            </div>
          </Paper>
          </Col>
        </Row>
      </Container>
      </Hidden>
      <Hidden lg xl>
      <Container fluid style = {{padding : '0px'}}>
        <Row>
          <Col md = {2} lg = {4} xl = {4}></Col>
          <Col xs = {12} sm = {12} md = {8} lg = {4} xl = {4}>
          <Paper style = {this.styles.paperStyleSmall}>
            <Subheader style = {this.styles.subheaderStyleSmall}><span style = {this.styles.signInTextStyle}>LocFin</span></Subheader>
            <div style = {this.styles.textFieldDivStyle}>
              <TextField
                floatingLabelText = 'Email Id'
                errorText = {this.state.error.email}
                floatingLabelStyle = {this.styles.floatingLabelStyle}
                underlineStyle = {this.styles.underlineStyle}
                underlineFocusStyle = {this.styles.underlineStyle}
                name = 'email'
                value = {this.state.loginData.email}
                onChange = {this.handleInputChange}
              />
            </div>
            <div style = {this.styles.textFieldDivStyle}>
              <TextField
                floatingLabelText = 'Password'
                errorText = {this.state.error.password}
                type = 'password'
                floatingLabelStyle = {this.styles.floatingLabelStyle}
                underlineStyle = {this.styles.underlineStyle}
                underlineFocusStyle = {this.styles.underlineStyle}
                name = 'password'
                value = {this.state.loginData.password}
                onChange = {this.handleInputChange}
              />
            </div>
            <div style = {this.styles.textFieldDivStyle}>
              <RaisedButton
                label = 'Sign In'
                backgroundColor = {pink300}
                labelColor = '#FFF'
                disabled = {this.state.submitDisabled}
                onClick = {this.handleLogin}
              />
            </div>
            <br/>
            <div style = {this.styles.textFieldDivStyle}>
              <Link onClick = {this.props.goToRegister} to = '/'>Create an account?</Link>
            </div>
          </Paper>
          </Col>
        </Row>
      </Container>
      </Hidden>
      </div>
    )
  }
}

export default withRouter(Login);
