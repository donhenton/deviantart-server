import React from 'react';
import { Component } from 'react';
import MoreLikeThisImageLoader from './../images/loaders/MoreLikeThisImageLoader';
import ImageSelectorComponent from './../images/imageSelectorComponent';
 
 


export default class MoreLikeThisComponent extends Component {
            
            
            constructor()
            {
                super();
                this.imageCount = 25;
                this.moreLikeThisImageLoader = new MoreLikeThisImageLoader(this.imageCount);  
                 
            }
            
           
            
            
            render()
            {
                let me = this;
                
                return (
                 <div className="moreLikeThisComponent">
                     <ImageSelectorComponent showFolderInfo={false} imageLoader={me.moreLikeThisImageLoader} />
                </div>
                 
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

 