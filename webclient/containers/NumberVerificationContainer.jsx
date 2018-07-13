import React from 'react';

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import NavBar from '../components/NavBar.jsx';
class NumberVerificationContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobTfDisabled : false,
      otpTfDisabled : true
    };
    this.styles = {
      positionDiv : {
        marginLeft : 'auto',
        marginRight : 'auto',
        width : 'fit-content',
        textAlign : 'center',
        marginTop : '100px',
        maxWidth : '800px'
      },
      labelSpan : {
        padding : '10px',
        fontSize : '30px'
      },
      otpInputDiv : {
        border : '2px solid',
        borderColor : 'rgb(0, 188, 212)',
        width : 'fit-content',
        padding : '5px',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop : '10px'
      },
      paperStyle : {
        padding : '20px'
      }
    }
  }
  render() {
    return (
        <div>
          <NavBar/>
          <div style = {this.styles.positionDiv}>
            <Paper style= {this.styles.paperStyle}>
            <p style={{ textAlign: 'justify' }}>
              Enter the one time password you received on the entered mobile number.
            </p>
            <span style= {this.styles.labelSpan}>
            <TextField
                floatingLabelFixed={true}
                style={{ width: '100px' }}
                inputStyle={{ textAlign: 'center', letterSpacing : '10px', fontSize : '20px' }}
                type = 'password'
            />
            </span>
            <FloatingActionButton
              mini = {true}
              zDepth = {1}
            >
              <NavigationArrowForward  />
            </FloatingActionButton>
          </Paper>
        </div>
      </div>
      );
   }
}
export default NumberVerificationContainer;
