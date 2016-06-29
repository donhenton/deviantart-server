import rp from 'request-promise' ;

export default class ProxyService
    {

    constructor(baseURL)
    {
            
             this.rootURL = baseURL;
           //the local node app eg http://localhost:3000/deviant
    }
    
    /**
     * @param categoryLabel: eg '/Literature' does contain slashes
     * returns: Promise containing deviant art categories
     * 
     */
    getCategories(categoryLabel)
    {
        var categoryPath = "";
        if (categoryLabel )
        {
             
            categoryPath = categoryLabel;
        }
        
        
          
        return rp(this.rootURL+"/getCategories"+categoryPath);
    }
    
    
    searchTags(tagName)
    {
 
        
          
        return rp(this.rootURL+"/tagSearch?tag_name="+tagName);
    }
    
    
    
}

 
 