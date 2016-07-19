import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import FolderImageLoader from './../components/images/loaders/folderImageLoader';
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import ImageSelectorComponent from './../components/images/imageSelectorComponent';


export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
     this.imageCount = 25;
     
     this.folderImageLoader = new FolderImageLoader(this.imageCount); 
  }
  
 
    componentWillMount()
  {
       
      
  }
  
  componentWillUnmount () {
      
  } 
  
  
   
        
        
  render() {
      var me = this;
           
      
    return (
       
          <section className="exploreFolderComponent">
            <div className="columnLeft">
              <ReadOnlyFolderTree />
            </div>
            <div className="columnRight">
              <ImageSelectorComponent imageLoader={me.folderImageLoader} />
            </div>
         </section>
    );
  }
}