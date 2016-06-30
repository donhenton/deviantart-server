
/**
 * class that takes  the results '/deviant/tagImages' call
 * processes is using the service/classes/imageData class
 * and stores it in memory, representing the current 'state' or images
 * displayed on the page
 */
import postal from 'postal';
import deviantService from './../deviantService'
import ImageData from './../classes/imageData'
class ImageLoader
{
    
    constructor()
    {
        let me = this;
        this.tag = null;
        postal.subscribe({
            channel: "deviant-system",
            topic: "select-tag",
            callback: function (data, envelope) {

                me.tag = data.tag;
                let limit = 10;
                let offset = 0;
                let tag = me.tag;
                
                me.processPromise(deviantService.getTagImages(tag,offset,limit))
                

            }
        });


    }


    processPromise(p)
    {
        p.then(function(data)
        {
            let imageData = new ImageData(data);
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
        
        
        
    }



}

var imageLoaderInstance = new ImageLoader();
export default imageLoaderInstance;
 