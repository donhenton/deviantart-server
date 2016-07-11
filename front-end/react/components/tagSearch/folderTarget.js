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
  
  getFolderText()
  {
      if (this.state.targetFolder.name.length > 0)
      {
          return "Selected Folder: "+ this.state.targetFolder.name
      }
      else
      {
          return null;
      }
  }
        
   render() {
      var me = this;
    return (
             <span id="targetFolderArea" className="targetFolder pull-right">
              
                 <span className="targetFolderText">   {me.getFolderText()}</span>  
                 <span id="targetFolderIcon" className="fi-folder" />
             
             </span>
           )
   
        
        
        }
        
}