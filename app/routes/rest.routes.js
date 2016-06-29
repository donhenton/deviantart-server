// Invoke 'strict' JavaScript mode
'use strict';
var url = require("url");
// Define the routes module' method
module.exports = function (app, daService) {

    //dummyService is passed in express.js

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(daService.createError(errorString, "ErrorClass"));
    }
    
    
    var processGetCategories = function (req, res) {
        var url_parts = url.parse(req.url);
        var path = url_parts.pathname.replace('/deviant/getCategories','');
         console.log('replaced '+path);
         
        if (path === '' || !path)
        {
            path = "/";
        }
         
        daService.getCategories(path).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        );


    }
    
    var processTagSearch = function(req,res)
    {
        
        var tagName = req.query.tag_name;
      //  tagName = tagName.replace(/ +?/g, '');
         
        daService.searchTags(tagName).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        ); 
         
         
    }
     
    
    app.get(['/deviant/getCategories','/deviant/getCategories*'], processGetCategories);
    app.get(['/deviant/tagSearch' ], processTagSearch); 

};



 