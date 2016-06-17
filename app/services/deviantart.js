var rp = require("request-promise");

module.exports = function (conf) {


    var daoService = {};
    //server stuff here

    daoService.getCredentials = function ()
    {
        var uri = 'https://www.deviantart.com/oauth2/token';

        var options = {
            method: 'POST',
            uri: uri,
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



        rp(options)
                .then(function (body) {
                    console.log("success in  service " + JSON.stringify(body))
                })
                .catch(function (err) {

                    console.log("error in  service\n\n\n" + err.message)
                });


    }

   
    return daoService;

}
