import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import FolderImageLoader from './../components/images/loaders/folderImageLoader';
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import ImageSelectorComponent from './../components/images/imageSelectorComponent';
import postal from 'postal';
import SingleImageDisplay from './../components/images/singleImageDisplay';

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
     this.imageCount = 25;
     this.subscription = null;
     this.folderImageLoader = new FolderImageLoader(this.imageCount); 
  }
  
 
  componentWillMount()
  {
       this.state = {imageData: null}
       let me = this;
       this.subscription = postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        if ($("div.imageWrapper")[0])
                        {
                            $("div.imageWrapper")[0].scrollTop = 0;
                        }
                        me.setState({'imageData': data});

                }
               });
      
  }
  
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
      this.subscription = null;
      
  } 
  
  
   
        
        
  render() {
      var me = this;
           
      
    return (
       
          <section className="exploreFolderComponent grouping">
          <h4>Explore Folders</h4>
            <div className="exploreFolderFlex">
               
               
                 <ReadOnlyFolderTree />
                
                
               <ImageSelectorComponent imageLoader={me.folderImageLoader} />
               
               <div className="currentImageControlContainer">
               
                    <SingleImageDisplay completeMessage={null} imageData={this.state.imageData}   />
                    
               </div>
            </div>
         </section>
    );
  }
}