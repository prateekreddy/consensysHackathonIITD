import React from 'react';

class FeatureList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      featureListData : []
    }
  }
  createList(){
    return this.state.featureListData.map((itemData,id) => {
      return this.createListItems(itemData,id);
    })
  }
  createListItems(itemData,id){
    
  }
  render(){
    return (
      <div></div>
    )
  }
}

export default FeatureList;
