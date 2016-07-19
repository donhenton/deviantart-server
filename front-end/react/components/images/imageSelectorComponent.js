
import React from 'react';
import { Component } from 'react';

import ReactDOM from 'react-dom';

import ImageList from './imageList';
import ImageData from './../../services/classes/imageData'

 




let stateHolder = {hasMore: false,  imagePageData: null,isProcessing: false,offset: 0 };

export default class ImageSelectorComponent extends Component  
{
   
   //props object is passed into the constructor
   
   constructor(props)
  {
      super(props);
     
      this.subscription = null;
       
     
      
  }
         
  componentWillUnmount () {
   
       
      stateHolder = this.state;
       
       
  } 
  
  /**
   * callback for 
   */
  pushDataFunction(data,newOffset)
  {
      this.setState({isProcessing: false,  imagePageData: data,hasMore: data.hasMore, offset: data.nextOffset})
  }
  
  componentWillMount()
  {
       
      
      this.state = stateHolder;
      let p = this.pushDataFunction.bind(this);
      this.props.imageLoader.setPushFunction(p);
      this.imageCount = this.props.imageLoader.getImageCount();

 
 
  }
  //type is 'MORE' or 'PREVIOUS'
  navClick(type)
  {
           
          this.moveToPage(type,this.state.offset);
 
  }
  
  
  moveToPage(type,offsetStart)
  {
      let me = this;
      me.setState({isProcessing:true});
      $("div.imageComponentContainer").each( function() 
        {
          
           this.scrollTop = 0;
           
           
        });
      let offset = 0;
       
      if (type === 'MORE')
      {
           offset = offset + offsetStart;
           
      }
      
      if (type === 'PREVIOUS')
      {
          
           offset = offsetStart - 2*(this.imageCount-1)
           if (offset < 0)
           {
               offset = 0;
           }
          
      }
      this.props.imageLoader.getPage(offset)
 
  }
  
  
  
  getButtonCSS(type)
  {
      let css = "btn btn-primary";
      if (!this.state.imagePageData)
      {
          return  css + " hidden";
      }
     
      if (type === 'MORE')
      {
           if (this.state.hasMore == false)
           {
               return  css + " hidden";
           }
      }
      if (type === 'PREVIOUS')
      {
          if (this.state.offset === 0 || (this.state.offset - (this.imageCount -1))===0)
          {
              css = css + " hidden";
          }
      }
      
      
      return css;
  }
  
  
   
        
  render() {
      var me = this;
    return (
       <div className="displayComponent">
            <div className="pagingControls">
                     <button  onClick={me.navClick.bind(this,"PREVIOUS")} className={me.getButtonCSS('PREVIOUS')}>Previous</button>
                   <button  onClick={me.navClick.bind(this,"MORE")}    className={me.getButtonCSS('MORE')}>More</button>
                    <span>({this.state.offset})</span>
                  </div>
             <div className="imageComponentContainer">

                 

                <ImageList isProcessing={this.state.isProcessing} imagePageData={this.state.imagePageData} />
                
             </div>
        </div>
        
    );
  } 
    
 
}