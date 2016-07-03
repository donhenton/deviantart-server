
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import postal from 'postal';
import WaitIndicator from './../waitIndicator';


 
export default class ImageList extends Component  
{
    
   constructor()
  {
      super();
      this.currentCounter = 0;
      this.loadTargetCount = 0; 
      this.imageRefs=[];
  }
  
  
  
  componentWillReceiveProps(nextProps)
  {
      this.setState({isProcessing: nextProps.isProcessing})
      if (nextProps.imagePageData)
        this.loadTargetCount = nextProps.imagePageData.length-1;
      else
        this.loadTargetCount = 0;  
  }
               
  
  
  componentWillMount()
  {
       let me = this;
       this.state = {isProcessing: false,categories: []};
       postal.subscribe({
                channel: "deviant-system",
                        topic: "select-category",
                        callback: function (data, envelope) {
                              
                              console.log("categories are "+JSON.stringify(data.categories))
                                me.setState({'categories': data.categories});
                                 
                             
                        }
               });
      
 
  }
  
  counterCompleteCheck()
  {
     // console.log('current '+this.currentCounter+" target "+this.loadTargetCount)
      if (this.currentCounter == this.loadTargetCount)
      {
         // console.log("hit complete!!!!!!!!!!!!")
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
 
  handleImageErrored(e) {
     //console.log("image error ");
     $(e.target).closest('span.deviantThumb').hide();
     this.currentCounter ++;
     this.counterCompleteCheck();
  }
  
  computeImageRef(ref)
  {
      //css selector in this case img#image-key-5
       this.imageRefs.push(ref);
  }
  
  computeImageCSS(imgData)
  {
      var css = "deviantThumb"
      if (this.state.categories.length)
      {
          var hit = false;
          for (var i1 = 0;i1<this.state.categories.length;i1++)
          {
              let test = this.state.categories[i1];
              if (imgData.categoryPath.indexOf(test) == 0)
              {
                  hit = true;
                  break;
              }
          }
          
           
          if (hit)
          {
              css = css + " categoryHit"
          }
          else
          {
              css = css + " categoryMiss"
          }
      }
      
      
      return css;
  }
  
  
  renderImages()
  {
      var newImages = null;
      this.imageRefs = [];
      let me = this;
      let idx = 0;
      
      if (this.props.imagePageData && this.props.imagePageData.length > 0) 
      {
        newImages =  this.props.imagePageData.map((imgData) => {
            if (imgData.smallestThumb && imgData.smallestThumb.src)
            {
             idx++;
             var css = me.computeImageCSS(imgData)
            return ( 
                    <span  key={imgData.deviationid} className={css}>
                     
                    <a target="_new" href={imgData.url}>
                    <img id={"image-key-"+idx} ref={(ref) => me.computeImageRef(ref)} onLoad={this.handleImageLoaded.bind(this)}
                         onError={this.handleImageErrored.bind(this)}  src={imgData.smallestThumb.src} />
                    </a>
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
      let css = "imageListContainer row visible-visible";
      if (this.state.isProcessing)
          css =  "imageListContainer row visible-hidden";
      return css;
  }
        
  render() {
      var me = this;
    return (
                <div className="imageListControl">
                 <WaitIndicator isProcessing={this.state.isProcessing} />
                 <div className={me.getListContainerCSS()}>
                      {this.renderImages()}

                </div>
                </div>
       
        
    );
  } 
    
 
}