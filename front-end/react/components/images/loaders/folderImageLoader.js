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
        this.subscription = null;
        
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
        let hasMore = false;
        let nextOffset = 0;
        let imageCount = me.getImageCount(); 
        let sentData = [];
        let readLimit = readLimit;
        
        if (imageData)
        {
            let pageCount = Math.floor((imageData.length - offset)/imageCount);
            if (pageCount > 0)
            {
                hasMore = true;
                nextOffset = offset + imageCount;
                readLimit = nextOffset; 
            }
            else
            {
                
                let pageRemainder = imageData.length - offset;
                if (pageRemainder > 0)
                {
                    hasMore = false;
                    nextOffset = offset;
                    readLimit = imageData.length; 
                }
                else
                {
                    hasMore = false;
                    nextOffset = 0;
                    offset = 0;
                    readLimit = 0;
                }
            }
            
            for (var i= offset;i<readLimit;i++)
            {
                sentData.push(imageData[i]);
            }
            nextOffset = nextOffset -1;
            if (nextOffset < 0)
                nextOffset = 0;
            
            
            let data = {hasMore: hasMore, nextOffset: nextOffset, listData: sentData}
            me.pushFunction(data);
            
            
        }
        
    }
    
    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
        // console.log("did unsub 1 "+JSON.stringify(this.folderData))
        if (this.subscription)
        {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        
    }

    onMount()
    {
        let me = this;
         
        if(!this.subscription)
        {
           // console.log("did subsribe 1 "+JSON.stringify(this.folderData))
            me.activateSubscription();
        }
        
        
    }

}

