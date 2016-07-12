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
                   

                       <img  className="currentImageDisplay" src={this.state.imageData.thumbs[2].src} />

                   
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