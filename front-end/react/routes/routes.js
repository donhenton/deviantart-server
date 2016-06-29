import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './../components/main';
import CategoryPage from './../pages/categoryPage';
import TagSearchPage from './../pages/tagSearchPage'; 

export const createRoutes = () => (
  <Route path="/" component={Main} >
    <IndexRoute component={TagSearchPage} />
     <Route path="categoryTree" component={CategoryPage} />
    
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
 
 
 
 
  