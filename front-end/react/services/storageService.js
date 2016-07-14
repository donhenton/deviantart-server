/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import storage from 'localStorage';
        const LOCALSTORAGE_KEY = "deviant-storage"
        class StorageService
        {


        constructor()
        {
            
            this.data = null;
            this.fetchData();
            this.getIndex();
           // storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.data))

        }
        
        insertIntoFolder(data,folder)
        {
            let key = folder.key;
            let targetFolder = this.getIndex()[key];
            if (!targetFolder['deviations'])
            {
                targetFolder.deviations = [];
            }
            
            let storedData = {};
            storedData.deviationid = data.deviationid;
            storedData.thumbs = data.thumbs;
            storedData.preview = data.preview;
            
            let checkIfPresent = targetFolder.deviations.filter((dev) => {
                
                return dev.deviationid === storedData.deviation;
                
                
            })
            if (!(checkIfPresent) || checkIfPresent.length == 0)
            {
                targetFolder.deviations.push(storedData)
                storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
            }
            
             
        }
        
        /**
         * create the flatten key index
         * reset all keys to use the child array index eg /0/1/2
         */
        flatten(data)
        {
            var accum = {}
            accum[data.key] = {'key': data.key, 'name': data.name, children: data.children}
            var me = this;
            
            function recurse(children,parentKeyString)
            {
                    for (var i= 0;i< children.length;i++)
                    {
                        children[i].key = parentKeyString + "/"+i;
                       // accum[children[i].key] = {name: children[i].name,children: children[i].children};
                       accum[children[i].key] = children[i];
                        if (children[i].children.length > 0)
                        {
                            
                            recurse(children[i].children,children[i].key)
                        } 
                      }//end for loop
  
            }
            
            recurse(data.children,data.key)
            return accum;
         }

        getIndex()
        {
            return this.flatten(this.getFolderData());
        }
        
        getFolderData()
        {
            return this.data;
        }
        
        saveEdit(key,name)
        {
            let index = this.getIndex();
            let target = index[key];
            target.name = name;
            storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
            return this.getFolderData();
              
        }
        
        addFolder(parentKey, name)
        {
             let index = this.getIndex();
             let target = index[parentKey];
             if (target.children)
             {
                target.children.push({name: name, key:"bonzo",children:[]})   
             }
             else
             {
                 
             }
             this.getIndex();
             storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
             
             return this.getFolderData();
        }
        
        deleteFolder(key)
        {
            var keyparts = key.split("/");
            keyparts = keyparts.slice(1)
            if (keyparts.length == 1)
            {
                console.log("cannot delete the root")
                return this.getFolderData();
            }
           
            var parentKey = "";
            for (var i=0;i<keyparts.length-1;i++)
            {
                parentKey = parentKey +"/"+ keyparts[i]
                
            }
            
             let deleteIndexString = keyparts[keyparts.length-1];
             let deleteIndex = parseInt(deleteIndexString)
             //console.log("parent key "+ parentKey+" key "+key+ " deleteIndex "+ deleteIndex)
             let index = this.getIndex();
             let containingArray = index[parentKey].children;
            // console.log("will delete "+containingArray[deleteIndex].name)
             containingArray.splice(deleteIndex,1)
             storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
             this.getIndex();
             return this.getFolderData();
        }
        
        /**
         * get the data from local storage
         */
        fetchData()
        {
             
            this.data = JSON.parse(storage.getItem(LOCALSTORAGE_KEY));
            if (!this.data)
            {
                
                this.data = {key: '/0','name': 'root', children: []}
                storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
            }
        }

         



        }
let _storage = new StorageService();
export default _storage;