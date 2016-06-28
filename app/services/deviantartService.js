var rp = require("request-promise");
var Q = require('q');
var moment = require('moment');


module.exports = function (conf) {


    var daoService = {};
    //server stuff here
    
    var lastUpdateTime = null;
    var cachedAccessToken = null;
    var baseURI = 'https://www.deviantart.com/api/v1/oauth2'
    
    stillActive = function()
    {         
        if (!cachedAccessToken)
        {
            console.log("filling cache");
            return false;
        }
        var currentTime = moment();
        var diff = Math.abs(currentTime.diff(lastUpdateTime,'seconds'));
        //console.log("diff is "+diff)
        if (diff > 3500)
        {
            
            return false;
        }
        //console.log("diff "+diff);
        return true;
         
    }
    
    
    
    getCredentials = function()
    {
        
        var deferredCredentials = Q.defer();
        var options = {
            method: 'POST',
            uri: 'https://www.deviantart.com/oauth2/token',
            json: true,
            gzip: true,
            headers:
                    {
                        'User-Agent': 'Request-Promise'
                    },
            form:
                    {
                        client_secret: conf.client_secret,
                        client_id: conf.client_id,
                        grant_type: 'client_credentials'
                    }

        };
        
        if (!stillActive())
        {
            
            rp(options)
                .then(function (body) {
                   // console.log("success in  service " + JSON.stringify(body));
                    lastUpdateTime = moment();
                    cachedAccessToken = body.access_token;
                    deferredCredentials.resolve(cachedAccessToken);
                    
                })
                .catch(function (err) {

                    console.log("error in  service\n\n\n" + err.message);
                    lastUpdateTime = null;
                    deferredCredentials.reject(err);
                    return;
                });
            
        }
        else
        {
            console.log("using cache "+cachedAccessToken)
            deferredCredentials.resolve(cachedAccessToken);
        }

        return deferredCredentials.promise;
    }

    daoService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };
    daoService.getCategories = function(path)
    {
        var deferredResult = Q.defer();
        var success = function(validatedAccessToken)
        {
           var options = {
            method: 'POST',
            uri: baseURI+'/browse/categorytree',
            json: true,
            gzip: true,
            headers:
                    {
                        'User-Agent': 'Request-Promise'
                    },
            form:
                    {
                        catpath: path,
                        access_token: validatedAccessToken
                    }

        };
            
           rp(options)
                .then(function (body) {
                   // console.log("category stuff " + JSON.stringify(body));
                     deferredResult.resolve(body);
                    
                })
                .catch(function (err) {

                   // console.log("error in  categories service\n\n\n" + err.message);
                    deferredResult.reject(err);
                    
                });
            
            
            return deferredResult.promise;
            
            
        }
        return getCredentials().then(success, console.error);
    }
   
    return daoService;

}
