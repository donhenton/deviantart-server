import React from 'react';
import { Component } from 'react';


export default class ImageSelectorComponent extends Component  
{
   
        //props object is passed into the constructor

        constructor(props)
       {
           super(props);

           //this.subscription = null;
           //this.imageCount = 25;

       }

       componentWillUnmount () {
        //   console.log("Unmounting image selector ");
          // this.subscription.unsubscribe();
          // stateHolder = this.state;

       } 

       componentWillReceiveProps(nextProps)
       {



       }

       componentWillMount()
       {




       }
       
       render()
       {
           
           return (
                   
                    <div className="folderDisplayComponent">
                    
                    
                    
                    </div>
                    
                    
                    )
           
           
           
           
       }

  
    }