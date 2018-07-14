import React from 'react';

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ContentUndo from 'material-ui/svg-icons/content/undo';

import NavBar from '../components/NavBar.jsx';
class PortInitContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobTfDisabled : false,
      otpTfDisabled : true,
      mobileNumber : ''
    };
    this.constant = {
      easingType : 200
    }
    this.styles = {
      positionDiv : {
        marginLeft : 'auto',
        marginRight : 'auto',
        width : 'fit-content',
        textAlign : 'center',
        marginTop : '70px',
        maxWidth : '800px',
        minWidth : '250px'
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
  openOptVerification(){
    const that = this;
    $("#number-reg").hide("slide", that.constant.easingType, function(){$("#number-verify").show("slide",{direction: 'right'}, that.constant.easingType)});

  }
  changeMobileNumber(){
    const that = this;
    $("#number-verify").hide("slide", {direction: 'right'}, that.constant.easingType, function(){$("#number-reg").show("slide",{direction: 'left'}, that.constant.easingType)});
  }
  verifyOTP(){
    axios({
      method : 'post',
      url : '/carrier/submitOTP'
    //  headers : {authorization : 'JWT '+token}
    },(err, response)=>{
      if(!response.data){
        that.setState({success : false});
      }else{
        that.setState({success : true});
      }
      that.setState({done : true});
    });
    // .then(function(response){
    //   if(!response.data.success){
    //     that.setState({success : false});
    //   }else{
    //     that.setState({success : true});
    //   }
    //   that.setState({done : true});
    // })
    // .catch(function(err){
    //
    // });
  }
  resendOTP(){

  }

  changeMobileNumberText(e){
    if(!isNaN(e.target.value) && e.target.value.length <= 12){
      this.setState({mobileNumber : e.target.value});
    }
  }

  render() {
    return (
        <div>
          <NavBar/>
          <div style = {this.styles.positionDiv} id = "number-reg">
            <Paper style= {this.styles.paperStyle}>
            <p style={{ textAlign: 'justify' }}>
              Enter the mobile number you want to port. By proceeding,
              It will generate an one time password which will be sent to your entered mobile number.
            </p>
            <span style= {this.styles.labelSpan}>
            <TextField
              style={{ width: '200px' }}
              disabled = {this.state.mobTfDisabled}
              inputStyle={{ textAlign: 'center' }}
              floatingLabelText = 'Mobile Number'
              value = {this.state.mobileNumber}
              onChange = {this.changeMobileNumberText.bind(this)}
            />
            </span>
            <FloatingActionButton
              mini = {true}
              zDepth = {1}
              onClick = {this.openOptVerification.bind(this)}
            >
              <NavigationArrowForward  />
            </FloatingActionButton>
          </Paper>
        </div>
        <div style = {Object.assign({},this.styles.positionDiv, {display : 'none'} )} id = 'number-verify'>
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
            onClick = {this.verifyOTP.bind(this)}
            tooltip = 'Verify'
          >
            <NavigationArrowForward/>
          </FloatingActionButton>
          <br/>

          <IconButton
            mini = {true}
            zDepth = {1}
            onClick = {this.resendOTP.bind(this)}
          >
            <NavigationRefresh tooltip = 'Resend OTP'/>
          </IconButton>
          <IconButton
            mini = {true}
            zDepth = {1}
            onClick = {this.changeMobileNumber.bind(this)}
            tooltip = 'Change number'
          >
            <ContentUndo/>
          </IconButton>

        </Paper>
      </div>
      </div>
      );
   }
}
export default PortInitContainer;
