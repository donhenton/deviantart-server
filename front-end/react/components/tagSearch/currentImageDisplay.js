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
       
      this.state = {imageData: null };
      postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'imageData': data});

                }
               });
  }
  
   
        
   render() {
            var me = this;
            if (this.state.imageData)
            {
                 return (
                   <div className="currentImageControlContainer">
                 
                        
                  <div className='imageControl'><a target="_new" href={this.state.imageData.url}>View Deviant Art Page</a></div>
                      <div className='imageControl'>
                      click 2</div>
                      <div className="imageWrapper">
                            <img 
                             width={this.state.imageData.thumbs[2].width} 
                             height={this.state.imageData.thumbs[2].height} 
                             className="currentImageDisplay" 
                             src={this.state.imageData.thumbs[2].src} />
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