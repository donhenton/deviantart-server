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
     * 
     */
    getCategories(categoryLabel)
    {
        var me = this;
        
         
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
    
    
    
    
    
}

var deviantService = new DeviantService();

export default deviantService;
 