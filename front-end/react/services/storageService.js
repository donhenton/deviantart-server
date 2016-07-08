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
        
        
        /**
         * create the flatten key index
         * reset all keys to use the child array index eg /0/1/2
         */
        flatten(data)
        {
            var accum = {}
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
            
            recurse(data,"")
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
             let target = index[key];
             target.children.push({name: name, key:"bonzo",children:[]})        
             storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()))
             return this.getFolderData();
        }
        
        /**
         * get the data from local storage
         */
        fetchData()
        {
             
            this.data = JSON.parse(storage.getItem(LOCALSTORAGE_KEY));
        }

        sampleData()
        {

        let tempData = [
        {

        'key': '/1',
                'name':'bonzo the clown',
                children: []
        },
        {

        'key': '/2',
                'name':'3 stooges',
                children: [
                {'key': '/2/0', 'name': 'Manny', children: []},
                {'key': '/2/1', 'name': 'Moe', children: []},
                {'key': '/2/2', 'name': 'Jack', children: [    {'key': '/2/2/0', 'name': 'Jack Dog', children: []}  ]}

                ]
        },
        {

        'key': '/3',
                'name':'Eggs',
        children: []
        },
        ]



                 
                this.data =  [{key: '/0','name': 'root', children: tempData}];
        }



        }
let _storage = new StorageService();
        export default _storage;