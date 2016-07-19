import postal from 'postal';
import storageService from './../../../services/storageService';
 

export default class FolderImageLoader
{
    
    constructor(imageLimit)
    {
        let me = this;
        //let folderData = {name: folderName , key: data.selectedKey }
        this.folderData = null;
        this.imageCount = imageLimit;
        if (!this.imageCount)
        {
            this.imageCount = 5;
        }
        this.pushFunction = null;
  
    }
    
    getImageCount()
    {
        return this.imageCount;
    }
    
    /**
     * signature on the f variable is handle(imageData.getPageData());
     */
    setPushFunction(f)
    {
        this.pushFunction = f;
    }
 

    getPage(offset)
    {
//       let me = this;
//       return deviantService.getTagImages(this.tag,offset,this.imageCount)
//        .then(function(data)
//        {
//            let parseData = JSON.parse(data);
//            let imageData = new ImageData(parseData);
//            me.pushFunction(imageData.getPageData())
//           // return imageData.getPageData();
//            
//        }).catch(function(err)
//        {
//            //would handle error here by calling push function with error
//            //data
//            throw new Error(err.message);
//        })
        
    }
    
    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
        //console.log("did unsub 1")
        this.subscription.unsubscribe();
        
        
    }

    onMount()
    {
        let me = this;
        //console.log("did subsribe 1")
        this.subscription = postal.subscribe({
                 channel: "deviant-system",
                 topic: "select-target-folder" ,
                        callback: function (data, envelope) {
                              
                                me.folderData = data.folderData;
                                me.getPage(0,me.imageCount);
                             
                        }
               });
        
    }

}

