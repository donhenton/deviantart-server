import React from 'react';
import { Component } from 'react';
import postal from 'postal';

export default class ImageComponent extends Component  
{
    
   constructor()
  {
      super();
      
  }
         
  
  
  componentWillMount()
  {
      let me = this;
      let targetInfo = {name: "", key: "" }
      this.state = {targetFolder: targetInfo };
      postal.subscribe({
                channel: "deviant-system",
                topic: "select-target-folder" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'targetFolder': data});

                }
               });
  }
  
   
        
   render() {
      var me = this;
    return (
             <div  className="currentImageDisplay">
              
                  stuff goes here
             
             </div>
           )
   
        
        
        }
        
}