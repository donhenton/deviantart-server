import React from 'react';
import { Component } from 'react';
import Select from 'react-select';
import deviantService from './../services/deviantService';

export default class TagSearchPage extends Component {
        
  constructor()
  {
      super();
       
  }
  
  componentDidMount()
  {
      this.setState({value: null})
  }
        
  getOptions(searchTag) {
        console.log("search for '"+searchTag+"'")
        if (searchTag && searchTag.length >=3)
        {
            return deviantService.searchTag(searchTag).then(function(data) 
            {
                return {options: data};
            })
                    .catch(function(err){
                       return new Error(err.message);


            });
       }
       else
       {
           return {options: []}
       }    
           
    };
    
   onChange (value) {
		this.setState({
			value: value,
		});
	} 
  
  getValue()
  {
      if (this.state && this.state.value)
      {
          return this.state.value;
      }
      else
      {
          return null;
      }
  }
        
        
  render() {
      var me = this;
    return (
       
        <div>
        
             get a job    
                    
                    
       </div>
       
    );
  }
}