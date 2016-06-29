import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';

export default class TagSearchPage extends Component  
{
    
   constructor()
  {
      super();
       
  }
  
  componentWillMount()
  {
      this.state = {'value': "",options: [], downloading: false}
  }
        
  renderOptions()
  {
      
       let opts = [];
       let idx = 0;
      
      this.state.options.map((o) => {
          
          opts.push (<div className="tagSearchItem" key={idx}>{o.label}</div>)
          idx ++ ;
          
      })
      
      return opts;
  }
  
  getCSSForList(cssBase)
  {
      var css = cssBase + " "
      if (this.state.options.length === 0)
      {
         css = css + "hidden" 
      }
      
      return css;
  }
  getIndicatorCSS()
  {
       var css = "waitIndicator hidden";
      if (this.state.downloading)
      {
         css = "waitIndicator"
      }
      return css;
  }
  onKeyUp(e)
  {
       
      if (e.keyCode == 27)
      {
           this.setState({value: "", options: [],downloading: false})
      }
      
  }
        
  render() {
      var me = this;
    return (
       
        <div className="tagSearchContainer">
            <table>
              <tbody>
                <tr>
                    <td  className="entryBoxContainer">
                        <input placeholder="Search For..." onKeyUp={me.onKeyUp.bind(me)} size="50" className="tagSearchInput" value={this.state.value} onChange={this.onChange.bind(this)} id="tagSearchInput" /> 

                        <span className = "search"> <i className = "fi-magnifying-glass" > </i></span>
                     
                    </td><td>
                      <img className={me.getIndicatorCSS( )} src="css/images/spiffygif_30x30.gif" /> 
                  </td> 
                </tr>
            </tbody>
          </table>
          <section className={me.getCSSForList('tagSearchList')}>
             {me.renderOptions()}      
          </section>
            
       </div>
       
       
    );
  } 
    
    
 
    getOptions(searchTag) {
            console.log("search for '"+searchTag+"'")
            var me = this;
            if (searchTag && searchTag.length >=3)
            {
                me.setState({downloading: true})
                return deviantService.searchTag(searchTag).then(function(data) 
                {
                    me.setState({options: data,downloading: false});
                })
                        .catch(function(err){
                           return new Error(err.message);


                });
           }
           else
           {
               me.setState({options: [],downloading: false})
           }    

    };

    onChange(e)
    {
        this.getOptions(e.target.value);
        this.setState({  value: e.target.value});
    }
       
}