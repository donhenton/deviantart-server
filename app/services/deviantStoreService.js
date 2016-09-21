module.exports = function (config) {


    var daoService = {};
    var mongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Q = require('q');

    daoService.promisedConnect = function ()
    {
        var deferredDbConnection = Q.defer();
        
        mongoClient.connect(config.deviantStorageDB.url, function (err, database) {
            if (err) {
                deferredDbConnection.reject(err);
                return;
            }
            deferredDbConnection.resolve(database);
        });
        return deferredDbConnection.promise;
    };


    daoService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };


    daoService.getDataForUser = function (userId)
    {

        //    console.log(config.db.url);


        var success = function (db)
        {

            var col = db.collection('morgueFiles');
            var deferredResult = Q.defer();
           
            
            col.find({"user": userId}).toArray(function (err, items) {
                // console.log("error " + err);
                if (err)
                {
                    deferredResult.reject(err);
                } else
                {
                  //  console.log(items[0].data)
                    deferredResult.resolve(items[0].data);
                }

                db.close();
            });
            return deferredResult.promise;
        };
        return   daoService.promisedConnect().then(success, console.error);

    };





    return daoService;

}