
/**
 
 */
import postal from 'postal';
import deviantService from './deviantService'
import ImageData from './classes/imageData'
class ImageLoader
{
    
    constructor()
    {
        let me = this;
        this.tag = null;
        


    }

    
    getPage(tag,offset,limit)
    {
        
       return deviantService.getTagImages(tag,offset,limit)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            return imageData.getPageData();;
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
    }


 



}

var imageLoaderInstance = new ImageLoader();
export default imageLoaderInstance;
 