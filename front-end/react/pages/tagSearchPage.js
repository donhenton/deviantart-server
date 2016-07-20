import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import SearchAttributes from './../components/tagSearch/searchAttributesComponent';
import ImageSelectorComponent from './../components/images/imageSelectorComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryTree from './../components/categoryTree'
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import FolderTarget from './../components/tagSearch/folderTarget';
import CurrentImageDisplay from './../components/tagSearch/currentImageDisplay';
import postal from 'postal';
import TagImageLoader from './../components/images/loaders/tagImageLoader';

 

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
     this.subscription = null;
     this.imageCount = 25;
     this.tagImageLoader = new TagImageLoader(this.imageCount);  
      
  }
  
 componentWillMount()
  {
      let me = this;
      this.state = {'selectedTab': 0 };
      this.subscription =  postal.subscribe({
               channel: "deviant-system",
               topic: "starting-search" ,
               callback: function(data,envelope)
               {
                   
                        me.setState({'selectedTab': 0})
                   
                   
               }
            });
  }
  
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
  

  render() {
      var me = this;
    return (
       
       <section className="searchContainer grouping">
            <div className="columnLeft">
                 
                    <SearchAttributes />
                
                <div className="row">
                    <TagSearchComponent />
                </div>

                <div className="row">
                
               
                  <ReadOnlyFolderTree />
                 
               
                
                </div>
                
                
           </div>
           <div className="columnRight">
                
                <table className="imageSelectorComponent table table-striped well">
                <tbody>
                <tr><td colSpan="2"><FolderTarget ref="folderTarget" /></td></tr>
                <tr>
                <td className="imageComponentTableCell">
                     <ImageSelectorComponent showFolderInfo={true} imageLoader={me.tagImageLoader} />
                </td><td  className="currentImageTableCell">
                          <CurrentImageDisplay />
                 </td>
                </tr>
                </tbody>
                </table>

           </div>
       </section>
    );
  }
}