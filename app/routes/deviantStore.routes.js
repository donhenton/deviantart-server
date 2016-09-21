// Invoke 'strict' JavaScript mode
'use strict';
var url = require("url");
// Define the routes module' method
module.exports = function (app, deviantStoreService) {

    //dummyService is passed in express.js

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(deviantStoreService.createError(errorString, "ErrorClass"));
    };

    var getDataForUser = function (req, res)
    {
        
        
        var userId = parseInt(req.params.userId);
        deviantStoreService.getDataForUser(userId).then(function (data)
        {
           // console.log("items zzz "+JSON.stringify(data));
            res.json(data);
        }
        , function (err)
        {
            reportError(res, err.toString());
        });
    }

    app.get(['/storage/getDataForUser/:userId'], getDataForUser);
}


