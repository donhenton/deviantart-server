// Invoke 'strict' JavaScript mode
'use strict';

// this is the deviant art client id and secret 
// the dev copy is not saved in git and must be recreated 

/*
module.exports = {
	 client_id: deviant id,
         client_secret: deviant secrete,
         deviantStorageDB: {url: 'mongodb://localhost/deviantart'},
         sessionSecret: "somesession secret"
};
*/


module.exports =  {
     client_id: process.env.DA_CLIENT_ID,
     client_secret: process.env.DA_CLIENT_SECRET,
     deviantStorageDB: process.env.DA_STORAGE_DB,
     sessionSecret: process.env.DA_CLIENT_SECRET 
 };