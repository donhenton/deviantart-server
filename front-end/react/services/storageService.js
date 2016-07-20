/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import storage from 'localStorage';
import postal from 'postal';



const LOCALSTORAGE_KEY = "deviant-storage";
class StorageService
{


constructor()
{
    this.deviationLookup = {};
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

    let checkIfPresent = targetFolder.deviations.filter((dev) => {

        return dev.deviationid === data.deviationid;


    })
    if (!(checkIfPresent) || checkIfPresent.length == 0)
    {
        targetFolder.deviations.push(data)
        storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
        postal.publish({
            channel: "deviant-system",
            topic: "folder-image-change" ,
            data:  {folder: folder, data: data}
        });
        this.getIndex();
    }


}

/**
 * create the flatten key index
 * reset all keys to use the child array index eg /0/1/2
 * creates the deviationid index
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

                for (var k=0;k< children[i].deviations.length;k++)
                {   

                     let cloneData = JSON.parse(JSON.stringify(children[i].deviations[k]));    
                     cloneData.folderKey= children[i].key;
                     me.deviationLookup[children[i].deviations[k].deviationid] = cloneData;

                }



            }//end for loop

    }

    recurse(data.children,data.key)
    // console.log("XXXX\n"+JSON.stringify(this.deviationLookup))
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
    this.getIndex();
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

getFolderDeviations(folderKey)
{
      let index = this.getIndex();
      if (index[folderKey])
      {
           return index[folderKey].deviations;
      }



}

getFolderDeviation(deviationid)
{
    let devInfo =  this.deviationLookup[deviationid]

    if (devInfo)
    {
         let index = this.getIndex();
        devInfo['folderName'] = index[devInfo.folderKey].name;


    }
    return devInfo;
}



}
let _storage = new StorageService();
export default _storage;