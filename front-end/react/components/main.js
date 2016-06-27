import React from 'react';
import { Component } from 'react';

export default class Main extends Component {
        
  constructor()
  {
      super();
       
  }
        
  render() {
    return (
      <section id="pageContainer">
      
      <header>

                <figure className="logo"><a href="/">React Stuff</a><br/></figure> 
 
                <nav className="topMenu grouping">


                    <ul>




                        <li><aside>Credits<span className="ui-icon ui-icon-circle-triangle-s"></span></aside>
                            <ul>
                                <li><a href="/app/home.html">Home</a></li>
                                <li><a href="/app/credits">Credits</a></li>
                            </ul>
                        </li>
                    </ul>    


                </nav>




       </header>
      
      
      
            <section id="main" className="grouping">

                    {this.props.children}
            </section>
    
    
      </section>
      
    );
  }
}