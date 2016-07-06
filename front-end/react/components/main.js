import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';



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

 
                         
                                
                                <li><Link to="/morgueFolders">Morgue Folders</Link></li>
                                <li><Link to="/">Home</Link></li>
                          
                        
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