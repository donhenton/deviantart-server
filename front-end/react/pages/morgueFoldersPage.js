import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
 

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
       
  }
  
 
    componentWillMount()
  {
      this.state = {'value': "",options: [], downloading: false};
      
      
  }
        
        
  render() {
      var me = this;
    return (
       
        <div> morgue</div>
    );
  }
}