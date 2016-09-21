module.exports = function (app) {

     
  
    
     var indexRender = function (req, res) {
         
        

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'DeviantArt Application',
            userId: 100 
        });

    };
    
    
 ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/', indexRender);
       // app.get('/windows.doc', windowsRender);
         
}