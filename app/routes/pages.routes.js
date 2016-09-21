module.exports = function (app) {

     
  
    
     var deviantRender = function (req, res) {
         
        

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('deviantapp', {
            title: 'DeviantArt Application',
            userId: 100 
        });

    };
     var indexRender = function (req, res) {
         
        

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'Login'
        });

    };
    
 ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/', indexRender);
        app.get('/main', deviantRender);
       // app.get('/windows.doc', windowsRender);
         
}