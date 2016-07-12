import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import SearchAttributes from './../components/tagSearch/searchAttributesComponent';
import ImageComponent from './../components/tagSearch/imageSelectorComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryTree from './../components/categoryTree'
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import FolderTarget from './../components/tagSearch/folderTarget';
import CurrentImageDisplay from './../components/tagSearch/currentImageDisplay';


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
                    <Tab>Categories</Tab>
                    <Tab>Morgue File</Tab>
                </TabList>
        
        
                <TabPanel>
                    <CategoryTree />
                </TabPanel>
                <TabPanel>
                    <ReadOnlyFolderTree />
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
                <ImageComponent />
                </td><td  className="currentImageTableCell">
                 <div className="currentImageControlContainer">
                 
                        
                  <div className='imageControl'>
                      click 1</div>
                      <div className='imageControl'>
                      click 2</div>
                      
                          <CurrentImageDisplay />
                      
                     
                </div>
                </td>
                </tr>
                </tbody>
                </table>

           </div>
       </section>
    );
  }
}