import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';



export default class Main extends Component {
        
  constructor()
  {
      super();
      this.subscription = null;
       
  }
  
  componentWillMount()
  {
      this.state = {waiting: true};
        
  }
  
  componentDidMount()
  {
      //call the mongo service
      //load the data into the storage service via a setter
      
      
  }
        
  render() {
    return (
      <div>
      
      <header>

                <figure className="logo"><a href="/">Deviant Art Morgue Files</a><br/></figure> 
 
                <nav className="topMenu grouping">


                    <ul>

 
                         
                                
                                
                                <li><Link to="/">Search For Images</Link></li>
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