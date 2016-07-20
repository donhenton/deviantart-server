import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import WaitIndicator from './../waitIndicator';
import SingleImageDisplay from './../images/singleImageDisplay'

export default class ImageComponent extends Component  
{
    
   constructor()
  {
      super();
      this.subscriptions = [];
  }
         
   componentWillUnmount () {
      
      this.subscriptions.map((sub) => { sub.unsubscribe()})
       
  } 
  
  componentWillMount()
  {
      let me = this;
       
      this.state = {imageData: null,targetFolder: null};
      let s1 = postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        if ($("div.imageWrapper")[0])
                        {
                            $("div.imageWrapper")[0].scrollTop = 0;
                        }
                        me.setState({'imageData': data});

                }
               });
               
      let s2 = postal.subscribe({
                channel: "deviant-system",
                topic: "select-target-folder" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'targetFolder': data});

                }
               });
               
      this.subscriptions.push(s1);
      this.subscriptions.push(s2);
      
  }
  
   renderFolderButton()
   {
      if (this.state.targetFolder)
      {
          return ( 
              <div className='imageControl'><em>Drag Image to Folder</em></div> 
              )
      }
      else
      {
          return null;
      }
      
       
       
       
   }
   
 
   
   
   
   computePathDisplay()
   {
       let display = 
       this.state.imageData.categoryPath.replace(/\//g, " "+String.fromCharCode(8594)+" ");
       return display;
   }
   
   computeCompleteMessage()
   {
       if (this.state.targetFolder)
           return "Added to "+this.state.targetFolder.name;
       else
           return null;
       
   }
        
   render() {
            var me = this;
            if (this.state.imageData)
            {
                 return (
                   <div className="currentImageControlContainer">
                 
                    
                  <div className='imageControl'><a target="_new" href={this.state.imageData.url}>View Deviant Art Page</a></div>
                  <div className='imageControl'>{'Title: '+this.state.imageData.title}</div>
                  <div className='imageControl'>{'Path: '+ me.computePathDisplay()}</div>
                  {me.renderFolderButton()}
                  
                  <SingleImageDisplay completeMessage={me.computeCompleteMessage()} imageData={this.state.imageData}  />
                  </div>
                  
                 )
            }
            else
            {
                return (
                   <div>  </div>
                 )
            }
        
        }
        
}