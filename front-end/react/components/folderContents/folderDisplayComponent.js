import React from 'react';
import { Component } from 'react';
import ImageSelectorComponent from './../images/imageSelectorComponent';
import storageService from './../../services/storageService';




class FolderImageLoader 
{
constructor()
    {
        let me = this;
   
    }
    
    getPage(offset,limit)
    {
        
       return deviantService.getTagImages(tag,offset,limit)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            return imageData.getPageData();
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
    }

}

let imageLoader = new FolderImageLoader();

export default class FolderDisplayComponent extends Component  
{
   
        //props object is passed into the constructor

        constructor(props)
       {
           super(props);

           //this.subscription = null;
           //this.imageCount = 25;

       }

       componentWillUnmount () {
        //   console.log("Unmounting image selector ");
          // this.subscription.unsubscribe();
          // stateHolder = this.state;

       } 

       componentWillReceiveProps(nextProps)
       {



       }

       componentWillMount()
       {




       }
       
       render()
       {
           let me = this;
           
           return (
                   
                    <div className="folderDisplayComponent">
                     
                    <ImageSelectorComponent imageSource={imageLoader}   pageCount={25}/>
                    
                    </div>
                    
                    
                    )
           
           
           
           
       }

  
    }