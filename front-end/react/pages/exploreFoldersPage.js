import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import storageService from './../services/storageService'
import MorgueFolderTree from './../components/morgueFolder/morgueFolderTree'
import postal from 'postal';
import FolderImageLoader from './../components/images/loaders/folderImageLoader';

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
       this.imageCount = 25;
     
     this.folderImageLoader = new FolderImageLoader(this.imageCount); 
  }
  
 
    componentWillMount()
  {
       
      
  }
  
  componentWillUnmount () {
      
  } 
  
  
   
        
        
  render() {
      var me = this;
           
      
    return (
       
         <div> get a job
        </div>
    );
  }
}