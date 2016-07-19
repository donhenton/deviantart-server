import postal from 'postal';
import storageService from './../../../services/storageService';
import AbstractImageLoader from './abstractImageLoader'; 

export default class FolderImageLoader extends AbstractImageLoader
{
    
    constructor(imageLimit)
    {
        super(imageLimit);
        this.folderData = null;
         
        
    }
    
    activateSubscription()
    {
        let me = this;
        
        this.subscription = postal.subscribe({
                 channel: "deviant-system",
                 topic: "select-target-folder" ,
                        callback: function (data, envelope) {
                                //{name: folderName , key: data.selectedKey }
                                console.log("fff "+JSON.stringify(data));
                                me.folderData = data;
                              //  me.getPage(0,me.imageCount);
                             
                        }
               });
    }

    getPage(offset)
    {
        let me = this;
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
        let imageData = storageService.getFolderDeviations(me.folderData.key);
        if (imageData)
        {
            me.pushFunction(imageData);
            
            
        }
        
        


        
    }
    
    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
         console.log("did unsub 1 "+JSON.stringify(this.folderData))
        this.subscription.unsubscribe();
        this.subscription = null;
        
    }

    onMount()
    {
        let me = this;
         console.log("did subsribe 1 "+JSON.stringify(this.folderData))
        if(!this.subscription)
        {
            me.activateSubscription();
        }
        
        
    }

}

