import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './../components/main';
 
import TagSearchPage from './../pages/tagSearchPage'; 
import MorgueFoldersPage from './../pages/morgueFoldersPage';

export const createRoutes = () => (
  <Route path="/" component={Main} >
    <IndexRoute component={MorgueFoldersPage} />
    <Route path="morgueFolders" component={TagSearchPage} />  
    
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
 
 
 
 
  