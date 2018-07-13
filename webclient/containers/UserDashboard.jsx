import React from 'react';

import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import NavBar from '../components/NavBar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

class UserDashboard extends React.Component {
  constructor(props){
    super(props);
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate() + 20);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      currentCountry : '02',
      currentCarrier : '01',
      newSelectedCountry : '91',
      activationDate : minDate,
      countries : [{name : 'India', code : '91'}, {name : 'US', code : '02'}],
      carriersInSelectedCountry : [{name : 'Vodafone', id : '01'},{name : 'Airtel', id : '02'} ],
      newCarrierOpCountries : [{name : 'India', code : '91'}, {name : 'US', code : '02'}],
      minDate : minDate,
      maxDate : maxDate
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
  handleCurrCountryChange(event, index, value){
    this.setState({currentCountry : value});
  }
  handleCurrCarrierChange(event, index, value){
    this.setState({currentCarrier : value});
  }
  handleNewCountryChange(event, index, value){
    this.setState({newSelectedCountry : value});
  }
  handleActivationDateChange(event, chosenDate){
    this.setState({activationDate : chosenDate});
  }
  getList(items, valueName, textName){
    return items.map((item,id) => {
      return (<MenuItem value={item[valueName]} key={id} primaryText={item[textName]}/>);
    });
  }
  render(){
    const countryList = this.getList(this.state.countries, 'code', 'name');
    const carriersList = this.getList(this.state.carriersInSelectedCountry, 'id', 'name');
    const newCountryList = this.getList(this.state.newCarrierOpCountries, 'code', 'name');
    return (
      <div>
        <NavBar />
        <div className = 'contentContainer'>
        <SectionHeader title = 'Port details'/>
        <Paper style = {this.styles.paperStyle}>
          <div style = {{marginLeft : 'auto', marginRight : 'auto', width : 'fit-content'}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Current country :</span>
                </td>
                <td>
                  <DropDownMenu maxHeight={300} value={this.state.currentCountry} onChange={this.handleCurrCountryChange.bind(this)}>
                    {countryList}
                  </DropDownMenu>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Current Carrier :</span>
                </td>
                <td>
                  <DropDownMenu maxHeight={300} value={this.state.currentCarrier} onChange={this.handleCurrCarrierChange.bind(this)}>
                    {carriersList}
                  </DropDownMenu>
                </td>
              </tr>
              <tr>
                <td>
                  <span>New country :</span>
                </td>
                <td>
                  <DropDownMenu maxHeight={300} value={this.state.newSelectedCountry} onChange={this.handleNewCountryChange.bind(this)}>
                    {newCountryList}
                  </DropDownMenu>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Activation Date :</span>
                </td>
                <td>
                  <DatePicker
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    value = {this.state.activationDate}
                    onChange = {this.handleActivationDateChange.bind(this)}
                    textFieldStyle = {{ width : '100px'}}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>KYC Details :</span>
                </td>
                <td>
                <RaisedButton
                  label = 'Login to u-port'
                  labelPosition="before"
                  backgroundColor = '#1A589E'
                  labelStyle = {{color : 'white'}}
                  zDepth = {4}
                />
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <RaisedButton
            label = 'Initiate Port'
            labelPosition="before"
            backgroundColor = '#000000'
            style = {{marginTop : '30px'}}
            labelStyle = {{color : 'white'}}
            icon = {<NavigationArrowForward color={'#fff'} />}
            zDepth = {4}
          />
        </Paper>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
