import React from 'react';
import { Component } from 'react';
import CategoryTree from './../components/categoryTree'

export default class Main extends Component {
        
  constructor()
  {
      super();
       
  }
        
        
        
  render() {
    return (
      <div>
        <CategoryTree />
      </div>
    );
  }
}