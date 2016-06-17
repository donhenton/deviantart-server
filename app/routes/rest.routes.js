// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app, daService) {

 //dummyService is passed in express.js

 


 

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(daService.createError(errorString, "ErrorClass"));
    }
    
    app.get('/test', function (req, res) {

        var id = req.params.id;
        var resVar = {};
        resVar.message = "got stuff "+  daService.getCredentials();
        res.json(resVar);
        // console.log("zzzrestaurant id " + restaurantId);

//        daoService.getRestaurantById(restaurantId).then(
//                function (restaurantFoundArray)
//                {
//
//
//                    var resVar = {};
//                    resVar.biteMe = "get a job";
//                    if (restaurantFoundArray.length == 0)
//                    {
//                        resVar = daoService.createError('Not Found',
//                                "NotFoundClass");
//                        res.status(404);
//                        res.json(resVar);
//                    }
//                    else
//                    {
//                        resVar = restaurantFoundArray[0];
//                        res.json(resVar);
//
//                    }
//                },
//                function (err)
//                {
//                    reportError(res, err.toString());
//                }
//        );
    });
    //@getAllRestaurants ****
//    app.get('/restaurant', function (req, res) {
//
//        daoService.getAllRestaurants().then(function (items)
//        {
//            //console.log("items zzz "+items.length);
//            res.json(items);
//        }
//        , function (err)
//        {
//            reportError(res, err.toString());
//        });
//    });
//    
};



 