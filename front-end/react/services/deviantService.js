import ProxyService from './proxyService';
import postal from 'postal';
import treeService from './treeService';

class DeviantService
    {

    constructor()
    {
            var baseURL = 'http://'+location.hostname+":"+ location.port+'/deviant';
            this.proxyService = 
                    new ProxyService(baseURL);
            
            
            console.log("base "+baseURL)
        this.baseData = null;
             
    }

    
    /**
     * labels include slashes
     * resolvePromise 
     */
    getCategories(categoryLabel,resolvePromise)
    {
        var me = this;
        
        if (!resolvePromise)
        {
            return this.proxyService.getCategories(categoryLabel)
                    .then(function(data)
            {
                var dData = JSON.parse(data)
                var processedData =  treeService.addKeys(dData,me.baseData);
                 me.baseData = processedData;
                return processedData;
            });
        }
        
        
        this.proxyService.getCategories(categoryLabel)
        .then(function(dataAsString)
        {
            var data = JSON.parse(dataAsString)
             
//            var simpleData = data.categories.map((cat)=>{
//                
//                var s = {};
//                s.name = cat.title;
//                s.key = cat.catpath;
//                s.catpath = cat.catpath;
//                s.has_subcategory = cat.has_subcategory;
//                 return s;
//                
//            })
            
            var processedData = treeService.addKeys(data,me.baseData);
            
            me.baseData = processedData;
            
            postal.publish({
                channel: "deviant-system",
                topic: "categoryData" ,
                data: {label: categoryLabel, categories: processedData} 
            });
        }) 
        .catch(function(err) {

            //"400 - {"message":"key: name Restaurant Name cannot be blank,key: zipCode Zipcode cannot be blank,key: state State cannot be blank,key: city City cannot be blank","errorClass":"com.dhenton9000.restaurant.service.impl.ValidatorFailureException"}"


            console.log("error "+err.message)
        })
          
    }
    
    
    
    
    
}

var deviantService = new DeviantService();

export default deviantService;
 