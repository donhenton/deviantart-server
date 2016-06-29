import ProxyService from './proxyService';
import postal from 'postal';
import treeService from './treeService';

class DeviantService
    {

    constructor()
    {
        var baseURL = 'http://'+location.hostname+":"+ location.port+'/deviant';
        this.proxyService =    new ProxyService(baseURL);
        this.baseData = null;
        this.cache = {};
             
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
            if (me.cache[categoryLabel])
            {
                var processedData = me.cache[categoryLabel];
                return new Promise((resolve) => {
                        resolve();
                        return processedData;
                    });
            }
            else
            {
                return this.proxyService.getCategories(categoryLabel)
                    .then(function(data)
                {
                    var dData = JSON.parse(data)
                    var processedData =  treeService.addKeys(dData,me.baseData);
                    me.baseData = processedData;
                    me.cache[categoryLabel] =me.baseData
                    return processedData;
                });
            }
            
            
            
        }
        
        
        this.proxyService.getCategories(categoryLabel)
        .then(function(dataAsString)
        {
            var processedData = null;
            if (me.cache[categoryLabel])
            {
                processedData = me.cache[categoryLabel];
            }
            else
            {
                var data = JSON.parse(dataAsString)
                processedData = treeService.addKeys(data,me.baseData);            
                me.baseData = processedData;
                me.cache[categoryLabel]= me.baseData;
            }
            
            
            postal.publish({
                channel: "deviant-system",
                topic: "categoryData" ,
                data: {label: categoryLabel, fullData: processedData} 
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
 