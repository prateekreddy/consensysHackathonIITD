import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import NavBar from '../components/NavBar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

class CarrierLogin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : ''
    }
    this.styles = {
      paperStyle : {
        marginLeft : 'auto',
        marginRight : 'auto',
        padding : '10px',
        textAlign : 'center',
        backgroundColor : '#fff',
        opacity : '0.9',
        color : 'white'
      }
    }
  }

  handleSubmitLoginDetails(){

  }

  handleChange(e, name){
    this.setDate({[name] : e.target.value});
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className='contentContainer'>
        <SectionHeader title='Carrier Login'/>
          <Paper style={this.styles.paperStyle}>
            <TextField
            floatingLabelText = 'Username'
            value = {this.state.username}
            inputStyle={{ textAlign: 'center', letterSpacing : '2px', fontSize : '20px' }}
            onChange = {(e) => this.handleChange(e,'username')}
            />
            <br/>
            <TextField
              floatingLabelText = 'Password'
              inputStyle={{ textAlign: 'center', letterSpacing : '10px', fontSize : '20px' }}
              type = 'password'
              value = {this.state.password}
              onChange = {(e) => this.handleChange(e,'password')}
            />
            <br/>
            <RaisedButton
              label = 'Login'
              labelPosition="before"
              backgroundColor = '#000000'
              style = {{marginTop : '30px'}}
              labelStyle = {{color : 'white'}}
              icon = {<NavigationArrowForward color={'#fff'} />}
              onClick = {this.handleSubmitLoginDetails.bind(this)}
            />
          </Paper>
        </div>
      </div>
      );
   }
}
export default CarrierLogin;
