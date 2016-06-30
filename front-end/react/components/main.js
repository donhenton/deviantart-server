import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import deviantService from './../services/stateful/imageLoader';


export default class Main extends Component {
        
  constructor()
  {
      super();
       
  }
        
  render() {
    return (
      <div>
      
      <header>

                <figure className="logo"><a href="/">React Stuff</a><br/></figure> 
 
                <nav className="topMenu grouping">


                    <ul>


                <li><aside>Credits</aside>
                            <ul>
                                <li><a href="/app/home.html">Home</a></li>
                                <li><a href="/app/credits">Credits</a></li>
                            </ul>
                        </li>

                         
                                <li><Link to="/">Tag Search </Link></li>
                                <li><Link to="/categoryTree"> Category Tree</Link></li>
                          
                        
                    </ul>    


                </nav>




       </header>
      
      
      
            <section id="main" className="grouping">

                    {this.props.children}
            </section>
    
    
      </div>
      
    );
  }
}