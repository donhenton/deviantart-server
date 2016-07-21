import postal from 'postal';
import storageService from './../../../services/storageService';
import AbstractImageLoader from './abstractImageLoader'; 

export default class FolderImageLoader extends AbstractImageLoader
{
    
    constructor(imageLimit)
    {
        super(imageLimit);
        this.folderData = null;
        this.setStoredState({hasMore: false, offset: 0, imagePageData: null} );
        
    }
    
    activateSubscription()
    {
        let me = this;
        
        this.subscription = postal.subscribe({
                 channel: "deviant-system",
                 topic: "select-target-folder" ,
                        callback: function (data, envelope) {
                                //{name: folderName , key: data.selectedKey }
                               // console.log("fff "+JSON.stringify(data));
                                me.folderData = data;
                                me.getPage(0,me.imageCount);
                             
                        }
               });
    }
    
    
    getFolderData()
    {
        return this.folderData;
    }
    
    deleteFromFolder(imageData)
    {
        storageService.deleteFromFolder(imageData,this.getFolderData());
        this.getPage(this.getStoredState().offset,this.imageCount);  
    }

    getPage(offset)
    {
        let me = this;
        let imageData = storageService.getFolderDeviations(me.folderData.key);
        if (imageData)
        {
            let imageOverage = imageData.length - me.getImageCount();
            let hasMore = false;
            let offset = 0;
            if (imageOverage > 0)
            {
                offset = me.getImageCount() - 1;
                hasMore = true;
            }
            let data = {hasMore: hasMore, nextOffset: offset, listData: imageData}
            //me.setStoredState(data);
            
            me.pushFunction(data);
            
            
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

