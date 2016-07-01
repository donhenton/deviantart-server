
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import imageLoader from './../../services/imageLoader';
import ReactDOM from 'react-dom';
import postal from 'postal';

import ImageList from './imageList';


export const imageCount = 25;
export default class ImageComponent extends Component  
{
    
   constructor()
  {
      super();
      
  }
         
  
  
  componentWillMount()
  {
      this.state = {'tag': null,imagePageData: null,isProcessing: false};
      var me = this;
      postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.setState({'tag': data.tag,isProcessing:true});
                                imageLoader.getPage(data.tag,0, imageCount)
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
  
    
   
        
  render() {
      var me = this;
    return (
       <div className="displayComponent">
            <div className="row pagingControls">
                    <button className="btn btn-primary">More</button>
                    <button className="btn btn-primary">Previous</button>
                  </div>
             <div className="imageComponentContainer">

                 

                <ImageList isProcessing={this.state.isProcessing} imagePageData={this.state.imagePageData} />

             </div>
        </div>
        
    );
  } 
    
 
}