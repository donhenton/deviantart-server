import React from 'react';
import { Component } from 'react';
import MorgueFolderTree from './morgueFolderTree' 
import postal from 'postal';
import storageService from './../../services/storageService'

/**
 * Read only folder tree component, this component provide the data
 * for the component
 * 
 * 
 */
export default class ReadOnlyFolderTree extends Component {

constructor()
{
        super();
        this.folderData = null;
        this.folderIdx = {};
        
}


 
componentWillMount()
{ 
      let me = this;
      this.folderData = storageService.getFolderData()[0].children;
      this.state = {  folderData: this.folderData};
      let idxObj = storageService.getIndex(); 
      
      
      postal.subscribe({
          
            channel: "deviant-system-folder-tree",
            topic: "select-folder" ,
            callback: function (data, envelope) {

               let folderName = idxObj[data.selectedKey].name 
               let folderData = {name: folderName , key: data.selectedKey }


               postal.publish({
               channel: "deviant-system",
               topic: "select-target-folder" ,
               data:  folderData
            });





            }
               });
      
}
 


render() {
     var me = this;
       
      
    return (
              <MorgueFolderTree  folderData={this.state.folderData} />

                );  
      
      
      
      
}//end render 
 



}
  