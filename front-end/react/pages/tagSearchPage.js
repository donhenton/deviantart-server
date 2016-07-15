import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import SearchAttributes from './../components/tagSearch/searchAttributesComponent';
import ImageSelectorComponent from './../components/tagSearch/imageSelectorComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryTree from './../components/categoryTree'
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import FolderTarget from './../components/tagSearch/folderTarget';
import CurrentImageDisplay from './../components/tagSearch/currentImageDisplay';
import imageLoader from './../services/imageLoader';

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
     
       
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
               <Tabs>
               
                <TabList>
                    <Tab>Morgue File</Tab>
                    <Tab>Categories</Tab>
                </TabList>
        
        
                <TabPanel>
                    <ReadOnlyFolderTree />
                </TabPanel>
                <TabPanel>
                    <CategoryTree />
                </TabPanel>
               
               </Tabs>
                </div>
                
                
           </div>
           <div className="columnRight">
                
                <table className="imageSelectorComponent table table-striped well">
                <tbody>
                <tr><td colSpan="2"><FolderTarget /></td></tr>
                <tr>
                <td className="imageComponentTableCell">
                <ImageSelectorComponent imageSource={imageLoader} pageCount={25}/>
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