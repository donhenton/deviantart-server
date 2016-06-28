import rp from 'request-promise' ;

export default class ProxyService
    {

    constructor(baseURL)
    {
            
             this.rootURL = baseURL;
        
             
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
    
    
    
    
    
}

 
 