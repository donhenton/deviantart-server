import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
       
  }
  
 
  
        
        
  render() {
      var me = this;
    return (
       
        <div>
        
            <TagSearchComponent />
                    
                    
       </div>
       
    );
  }
}