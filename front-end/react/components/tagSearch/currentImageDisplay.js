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
       
      this.state = {imageData: null,targetFolder: null };
      postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'imageData': data});

                }
               });
               
      postal.subscribe({
                channel: "deviant-system",
                topic: "select-target-folder" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'targetFolder': data});

                }
               });
  }
  
   renderFolderButton()
   {
      if (this.state.targetFolder)
      {
          return ( 
              <div className='imageControl'>click 222</div> 
              )
      }
      else
      {
          return null;
      }
      
       
       
       
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
                            <a target="_new" href={this.state.imageData.url}>
                            <img 
                             className="currentImageDisplay" 
                             src={this.state.imageData.thumbs[2].src} />
                            </a>
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