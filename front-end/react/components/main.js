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

                <figure className="logo"><a href="/">Deviant Art Morgue Files</a><br/></figure> 
 
                <nav className="topMenu grouping">


                    <ul>

 
                         
                                
                                
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/exploreFolders">Explore Folders</Link></li>
                                <li><Link to="/maintainFolders">Maintain Folders</Link></li>
                        
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