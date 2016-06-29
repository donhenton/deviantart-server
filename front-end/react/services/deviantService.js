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


    searchTag(searchTag)
    {
        var me = this;
        return this.proxyService.searchTags(searchTag)
              .then(function(data)
              {
                  var dData = JSON.parse(data)
                  var newData = dData.results.map((t)=>{

                      return {value: t.tag_name, label: t.tag_name}
                  })
                  return newData;
              });
        
        
    }
    
    /**
     * labels include slashes
     * 
     */
    getCategories(categoryLabel)
    {
        var me = this;
        if (!categoryLabel)
        {
            categoryLabel = "/"
        }
        
         
            if (me.cache[categoryLabel])
            {
                
                return new Promise((resolve,reject) => {
                        if (me.baseData)
                        {
                            resolve(me.baseData);
                        }
                        else
                        {
                            reject(Error("nothing in cache despite what you think"))
                        }
                       
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
                    me.cache[categoryLabel] = 'occupied'
                    return me.baseData;
                });
            }
 
        
         
          
    }
    
    
    
    
    
}

var deviantService = new DeviantService();

export default deviantService;
 