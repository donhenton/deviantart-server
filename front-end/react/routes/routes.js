import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './../components/main';
 
import SearchImagesPage from './../pages/searchImagesPage'; 
import MaintainFoldersPage from './../pages/maintainFoldersPage';
import ExploreFoldersPage from './../pages/exploreFoldersPage';

export const createRoutes = () => (
  <Route path="/" component={Main} >
    <IndexRoute component={SearchImagesPage} />
    <Route path="maintainFolders" component={MaintainFoldersPage} />  
    <Route path="exploreFolders" component={ExploreFoldersPage} /> 
  </Route>
);


 