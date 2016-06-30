import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import ImageComponent from './../components/tagSearch/imageComponent';

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
       
  }
  
 
  
        
        
  render() {
      var me = this;
    return (
       
       <section className="searchContainer row">
            <div className="columnLeft">

                <TagSearchComponent />


           </div>
           <div className="columnRight">

                <ImageComponent />


           </div>
       </section>
    );
  }
}