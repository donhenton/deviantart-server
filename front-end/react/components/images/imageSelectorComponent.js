
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import ImageList from './imageList';

// let stateHolder = {hasMore: false,  imagePageData: null,isProcessing: false,offset: 0 };

/**
 * this.props.imageLoader is derived from ./images/loaders/tagImageLoader and the like
 * It is a composition element which allows the Selector component to display images
 * from a variety of sources.
 * 
 * An image loader needs the following functions 
 * 
 * setPushFunction
 * getImageCount
 * getPage(offset)
 * onMount (optional)
 * onUnMount (optional)
 */
export default class ImageSelectorComponent extends Component  
{
   
   //props object is passed into the constructor
   
   constructor(props)
  {
      super(props);
      
  }
         
  componentWillUnmount () {
   
      this.props.imageLoader.setStoredState(this.state); 
     //// stateHolder = this.state;
      if (this.props.imageLoader.onUnMount)
            this.props.imageLoader.onUnMount();
       
  } 
  
  /**
   * callback for imageLoader takes data and new value for offset
   * 
   * if an error occurs would use this function to set state to declare it
   */
  pushDataFunction(data)
  {
      
      
      this.setState({isProcessing: false,  imagePageData: data,hasMore: data.hasMore, offset: data.nextOffset})
  }
  
  componentWillMount()
  {
       
      
      this.state = this.props.imageLoader.getStoredState(); 
      let p = this.pushDataFunction.bind(this);
      this.props.imageLoader.setPushFunction(p);
      this.imageCount = this.props.imageLoader.getImageCount();
      if (this.props.imageLoader.onMount)
            this.props.imageLoader.onMount();
 
 
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