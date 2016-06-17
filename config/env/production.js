// Invoke 'strict' JavaScript mode
'use strict';

// this is the deviant art client id and secret 
// the dev copy is not saved in git and must be recreated
//module.exports = {
//    client_id: 4,
//    client_secret: "client_secret"
//};

module.exports =  {
     client_id: process.env.DA_CLIENT_ID,
     client_secret: process.env.DA_CLIENT_SECRET
 };