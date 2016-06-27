import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import Main from './../components/main';
import TestPage from './../pages/testPage';
//import ListCommDemo from './../components/pages/listCommDemo';
//import ListContainerRow from './../components/listdemo/listContainerRow'; 
//import ListContainerNoRow from './../components/listdemo/listContainerNoRow';
 

export const createRoutes = () => (
  <Route path="/" component={Main} >
    <IndexRoute component={TestPage} />
     
    
  </Route>
);



/*

 
 
  export const createRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={CommDemo} />
    <Route path="listCommDemo"  >
      <IndexRoute component={ListCommDemo} />
    </Route>
   
    <Route path="listdemoRow" component={ListContainerRow} />
    <Route path="listdemoNoRow" component={ListContainerNoRow} />
    
  </Route>
);




/*
  
    <Route path="page2/:id"  >
      <IndexRoute component={Page2} />
    </Route>
 
 */
 
 
 
 
  