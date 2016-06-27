import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import App from './../components/main';
//import CommDemo from './../components/pages/commDemo';
//import ListCommDemo from './../components/pages/listCommDemo';
//import ListContainerRow from './../components/listdemo/listContainerRow'; 
//import ListContainerNoRow from './../components/listdemo/listContainerNoRow';
 

export const createRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={App} />
   
    
  </Route>
);



/*

 <Route path="listCommDemo"  >
      <IndexRoute component={ListCommDemo} />
    </Route>
   
    <Route path="listdemoRow" component={ListContainerRow} />
    <Route path="listdemoNoRow" component={ListContainerNoRow} />
    */
   
   /*
   <Route path="page2/:id"  >
      <IndexRoute component={Page2} />
    </Route>
    */