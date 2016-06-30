
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import imageLoader from './../../services/imageLoader';
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
      postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.setState({'tag': data.tag});
                                
                                imageLoader.getPage(data.tag,0,10)
                                        .then(function(data )
                                {
                                     
                                    me.setState({imagePageData: data})
                                }).catch(function(err)
                                {
                                    throw new Error(err.message);
                                })
                             
                        }
               });
      
      
      //data:  {tag: tagName}

 
  }
  
  renderImages()
  {
      var newImages = null;
      
      if (this.state.imagePageData && this.state.imagePageData.length > 0) 
      {
        newImages =  this.state.imagePageData.map((imgData) => {
            if (imgData.smallestThumb && imgData.smallestThumb.src)
            {
            return ( 
                    <span  key={imgData.deviationid} className="deviationThumb">
                    <img src={imgData.smallestThumb.src} />
                    </span>
                    )
            }
            else
            {
                return null;
            }
        

        })
      }
      
      return newImages;
  }
 
        
  render() {
      var me = this;
    return (
       
        <div className="imageContainer">
             {this.renderImages()}
            
       </div>
       
       
    );
  } 
    
 
}