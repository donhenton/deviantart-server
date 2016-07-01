
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import imageLoader from './../../services/imageLoader';
import ReactDOM from 'react-dom';
import postal from 'postal';
import WaitIndicator from './../waitIndicator';


export const imageCount = 25;
export default class ImageComponent extends Component  
{
    
   constructor()
  {
      super();
      this.currentCounter = 0;
      this.loadTargetCount = 0;
  }
  
  
  
  
               
  
  
  componentWillMount()
  {
      this.state = {'tag': null,imagePageData: null,isProcessing: false};
      var me = this;
      postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.setState({'tag': data.tag});
                                imageLoader.getPage(data.tag,0, imageCount)
                                        .then(function(data )
                                {
                                    me.loadTargetCount = data.length-1;
                                    me.setState({imagePageData: data,isProcessing: true})
                                }).catch(function(err)
                                {
                                    throw new Error(err.message);
                                })
                             
                        }
               });
      
      
      //data:  {tag: tagName}

 
  }
  
  counterCompleteCheck()
  {
      console.log('current '+this.currentCounter+" target "+this.loadTargetCount)
      if (this.currentCounter == this.loadTargetCount)
      {
          console.log("hit complete!!!!!!!!!!!!")
          this.loadTargetCount = 0;
          this.currentCounter = 0;
          this.setState({isProcessing: false});
      }
  }
  
  handleImageLoaded() {
     // console.log("image load "+this.currentCounter+" target "+this.loadTargetCount)
     this.currentCounter ++;
     this.counterCompleteCheck();
     
  }
 
  handleImageErrored() {
     console.log("image error")
     this.currentCounter ++;
     this.counterCompleteCheck();
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
                    <img onLoad={this.handleImageLoaded.bind(this)}
                         onError={this.handleImageErrored.bind(this)}  src={imgData.smallestThumb.src} />
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
 
  getListContainerCSS()
  {
      let css = "imageListContainer visible-visible";
      if (this.state.isProcessing)
          css =  "imageListContainer  visible-hidden";
      return css;
  }
        
  render() {
      var me = this;
    return (
       
        <div className="imageComponentContainer">
            
            <WaitIndicator isProcessing={this.state.isProcessing} />
            <div className={me.getListContainerCSS()}>
                 {this.renderImages()}

           </div>
        </div>
        
    );
  } 
    
 
}