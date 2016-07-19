
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import ReactDOM from 'react-dom';
import postal from 'postal';
import ImageList from './imageList';
import ImageData from './../../services/classes/imageData'

//export const this.imageCount = 25;




class ImageLoader
{
    
    constructor(imageLimit,pushFunction)
    {
        let me = this;
        this.tag = null;
        this.imageCount = imageLimit;
        this.pushFunction = pushFunction;
        
        this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.tag = data.tag;
                                me.getPage(0,me.imageCount);
                             
                        }
               });


    }
 
    getPage(offset,limit)
    {
       let me = this;
       return deviantService.getTagImages(this.tag,offset,limit)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            me.pushFunction(imageData.getPageData())
           // return imageData.getPageData();
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
    }



}



let stateHolder = {hasMore: false,  imagePageData: null,isProcessing: false,offset: 0 };

export default class ImageSelectorComponent extends Component  
{
   
   //props object is passed into the constructor
   
   constructor(props)
  {
      super(props);
     
      this.subscription = null;
      this.imageCount = 25;
      this.imageLoader = new ImageLoader(this.imageCount,this.pushDataFunction.bind(this));
      
  }
         
  componentWillUnmount () {
   //   console.log("Unmounting image selector ");
      this.subscription.unsubscribe();
      stateHolder = this.state;
       
       
  } 
  
  pushDataFunction(data,newOffset)
  {
      this.setState({isProcessing: false,  imagePageData: data,hasMore: data.hasMore, offset: data.nextOffset})
  }
  
  componentWillMount()
  {
       
      
      this.state = stateHolder;
      if (this.props.pageCount)
      {
          this.imageCount = this.props.pageCount;
      }
 
 
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
           // certain browsers have a bug such that scrollHeight is too small
           // when content does not fill the client area of the element
           // var scrollHeight = Math.max(this.scrollHeight, this.clientHeight);
           // this.scrollTop = scrollHeight - this.clientHeight;
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
      me.imageLoader.getPage(offset, this.imageCount)
//        .then(function(data )
//        {
//           
//            me.setState({isProcessing: false,  imagePageData: data.listData,hasMore: data.hasMore, offset: data.nextOffset})
//             
//            
//        }) 
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