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
import FolderImageLoader from './../components/images/loaders/folderImageLoader';
 

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
     this.subscription = null;
     this.imageCount = 25;
     this.tagImageLoader = new TagImageLoader(this.imageCount);  
     this.folderImageLoader = new FolderImageLoader(this.imageCount); 
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
  
  getTabSelected()
  {
      let me = this;
      if (me.state && me.state.selectedTab)
      {
          return me.state.selectedTab;
      }
      
      return 0;
      
  }
  
  handleSearchTabSelect(tabIndex)
  {
      let me = this;
      if (tabIndex == 1)
      {
          let selectedFolderInfo = me.refs.folderTarget.getTargetFolder();
          if (selectedFolderInfo.key && selectedFolderInfo.key.length > 0)
          {    
            //this is called before mount on the folder image selector
            //so need to wait
            window.setTimeout(        
                   
                function()   
                {
                    postal.publish({
                    channel: "deviant-system",
                    topic: "select-target-folder" ,
                    data:  selectedFolderInfo });
                }, 200);
          }
          
          

      }
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
                <tr><td colSpan="2"><FolderTarget ref="folderTarget" /></td></tr>
                <tr>
                <td className="imageComponentTableCell">
                
                
                
                 <Tabs selectedIndex={me.getTabSelected()} onSelect={me.handleSearchTabSelect.bind(me)}>
               
                <TabList>
                    <Tab>Search Files</Tab>
                    <Tab>Folder Contents</Tab>
                </TabList>
        
        
                <TabPanel>
                 
                    <ImageSelectorComponent imageLoader={me.tagImageLoader} />
                </TabPanel>
                <TabPanel>
                    
                    <ImageSelectorComponent imageLoader={me.folderImageLoader} />
                </TabPanel>
               
               </Tabs>
                
                
                
                
                
                
                
                
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