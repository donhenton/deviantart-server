
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import ReactDOM from 'react-dom';
import postal from 'postal';



export default class ImageComponent extends Component  
{
    
   constructor()
  {
      super();
       
  }
  
  
  
  
               
  
  
  componentWillMount()
  {
      this.state = {'tag': null,imagePageData: null};
      var me = this;
      
      
      
      //data:  {tag: tagName}

 
  }
  
  componentWillUnmount () {
     
  }
  
   
  
 
        
  render() {
      var me = this;
    return (
       
        <div className="imageContainer">
             Selected Tag: {me.state.tag}
            
       </div>
       
       
    );
  } 
    
 
}