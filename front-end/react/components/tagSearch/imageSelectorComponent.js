
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
      this.subscription = null;
  }
         
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
  
  componentWillMount()
  {
      this.state = {'tag': null,hasMore: false,  imagePageData: null,isProcessing: false,offset: 0 };
      var me = this;
      this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.setState({'tag': data.tag,offset: 0});
                                me.moveToPage('MORE',data.tag,0);
                             
                        }
               });
      
      
      //data:  {tag: tagName}

 
  }
  //type is 'MORE' or 'PREVIOUS'
  navClick(type)
  {
           
          this.moveToPage(type,this.state.tag,this.state.offset);
 
  }
  
  
  moveToPage(type,tag,offsetStart)
  {
      let me = this;
      me.setState({isProcessing:true});
      let offset = 0;
       
      if (type === 'MORE')
      {
           offset = offset + offsetStart;
           
      }
      
      if (type === 'PREVIOUS')
      {
          
           offset = offsetStart - 2*(imageCount-1)
           if (offset < 0)
           {
               offset = 0;
           }
          
      }
      imageLoader.getPage(tag,offset, imageCount)
        .then(function(data )
        {
           
            me.setState({isProcessing: false,offset:offset, imagePageData: data.listData,hasMore: data.hasMore, offset: data.nextOffset})
             
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
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
          if (this.state.offset === 0 || (this.state.offset - (imageCount -1))===0)
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