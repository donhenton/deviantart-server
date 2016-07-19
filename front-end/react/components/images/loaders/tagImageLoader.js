import postal from 'postal';
import deviantService from './../../../services/deviantService';
import ImageData from './../../../services/classes/ImageData';

export default class TagImageLoader
{
    
    constructor(imageLimit)
    {
        let me = this;
        this.tag = null;
        this.imageCount = imageLimit;
        if (!this.imageCount)
        {
            this.imageCount = 5;
        }
        this.pushFunction = null;
        
        this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.tag = data.tag;
                                me.getPage(0,me.imageCount);
                             
                        }
               });


    }
    
    getImageCount()
    {
        return this.imageCount;
    }
    
    setPushFunction(f)
    {
        this.pushFunction = f;
    }
 
    getPage(offset)
    {
       let me = this;
       return deviantService.getTagImages(this.tag,offset,this.imageCount)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            me.pushFunction(imageData.getPageData())
           // return imageData.getPageData();
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
    }



}

