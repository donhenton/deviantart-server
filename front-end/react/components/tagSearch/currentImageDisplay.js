import React from 'react';
import { Component } from 'react';
import postal from 'postal';

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
       
      this.state = {imageData: null,targetFolder: null, didTransfer: false };
      let s1 = postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'imageData': data,didTransfer: false});

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
   
   //////DND ///////////////////////////////////////////////////////////////
   
   sourceDragStart(e)
   {
       
       e.target.style.opacity = 0.2;
       e.dataTransfer.setData('application/json',JSON.stringify(this.state.imageData))
       e.dataTransfer.effectAllowed = 'move';
   }
   
   sourceDragEnd(e)
   {
       if(e.dataTransfer.dropEffect !== 'none'){
         
         //do the stuff to set up 
         this.setState({didTransfer: true})
       }
       else
       {
           console.log("you bailed")
       }
       e.target.style.opacity = 1;
       
   }
  
   
   ////////////////////////////////////////////////////////////////////////
   
   
   addImageSelectedLabel() 
   {
              
       if (this.state.didTransfer)
          return  <span className="completedText">{'Image Added To '+this.state.targetFolder.name}</span> 
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
                  
                  {me.renderFolderButton()}
                  
                  
                  
                  <div className="imageWrapper">
                            <div className="imageExpander">
                            <img 
                             onDragStart={me.sourceDragStart.bind(me)}
                             onDragEnd={me.sourceDragEnd.bind(me)}
                             className="currentImageDisplay" 
                             src={this.state.imageData.thumbs[2].src} />
                                     
                        {me.addImageSelectedLabel()}        
                           </div>
                            
                       </div>         
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