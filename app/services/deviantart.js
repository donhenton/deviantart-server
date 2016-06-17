var rp = require("request-promise");
var request = require('request');
module.exports = function (config) {


    var daoService = {};
    //server stuff here
    
    daoService.getCredentials = function ()
    {
        var uri =   
        'https://www.deviantart.com/oauth2/token;
        var options = {
            method: 'POST',
            uri:  uri,
            json:true,
            gzip:true,
            headers:
                    {
                        'User-Agent': 'Request-Promise'
                    }
            
        };
        
         

        rp(options)
                .then(function (body) {
                   console.log("success in  service "+JSON.stringify(body)) 
                })
                .catch(function (err) {
                    
                   console.log("error in  service\n\n\n"+err.message) 
                });


    }
    
    daoService.workinggetCredentials = function ()
    {
        var uri =   
        'https://www.deviantart.com/oauth2/token?client_secret=<secret>&client_id=<id>&grant_type=client_credentials';
        var options = {
            method: 'GET',
            uri:  uri,
            json:true,
            gzip:true,
            headers:
                    {
                        'User-Agent': 'Request-Promise'
                    }
            
        };
        
         

        rp(options)
                .then(function (body) {
                   console.log("success in  service "+JSON.stringify(body)) 
                })
                .catch(function (err) {
                    
                   console.log("error in  service\n\n\n"+err.message) 
                });


    }
    return daoService;

}
