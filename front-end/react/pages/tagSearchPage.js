import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import SearchAttributes from './../components/tagSearch/searchAttributesComponent';
import ImageComponent from './../components/tagSearch/imageComponent';

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


           </div>
           <div className="columnRight">

                <ImageComponent />


           </div>
       </section>
    );
  }
}