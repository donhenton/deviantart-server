import ProxyService from './proxyService';
import postal from 'postal';

class DeviantService
    {

    constructor()
    {
            var baseURL = 'http://'+location.hostname+":"+ location.port+'/deviant';
            this.proxyService = 
                    new ProxyService(baseURL);
            
            
            console.log("base "+baseURL)
        
             
    }

    
    /**
     * labels include slashes
     */
    getCategories(categoryLabel)
    {
        this.proxyService.getCategories(categoryLabel)
        .then(function(dataAsString)
        {
            var data = JSON.parse(dataAsString)
             
            var simpleData = data.categories.map((cat)=>{
                
                var s = {};
                s.name = cat.title;
                s.key = cat.catpath;
                s.catpath = cat.catpath;
                s.has_subcategory = cat.has_subcategory;
                 return s;
                
            })
            
            
            postal.publish({
                channel: "deviant-system",
                topic: "categoryData" ,
                data: {label: categoryLabel, categories: simpleData} 
            });
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"


            postal.publish({
                channel: "restaurants-system",
                topic: "item.save.request.complete" ,
                data: {error: err.message}
            });
        })
          
    }
    
    
    
    
    
}

var deviantService = new DeviantService();

export default deviantService;
 