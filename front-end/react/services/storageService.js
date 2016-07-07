/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import storage from 'localStorage';


const LOCALSTORAGE_KEY = "deviant-storage"
class StorageService
{
    

    constructor( )
    {
           storage.setItem(LOCALSTORAGE_KEY, JSON.stringify({})) 
             
    }
    
    
    
    getFolderData()
    {
        
        let data = [
            {
                
                'key': '/bonzo',
                'name':'bonzo the clown',
                children: []
            },
            
            {
                
                'key': '/stooges',
                'name':'3 stooges',
                children: [
                    {'key': '/stooges/manny',  'name': 'Manny', children: []},
                    {'key': '/stooges/moe',    'name': 'Moe',   children: []},
                    {'key': '/stooges/jack',   'name': 'Jack',  children: [    {'key': '/stooges/jack/dog',  'name': 'Jack Dog', children: []}  ]} 
                    
                ]
            },
             {
                
                'key': '/eggs',
                'name':'Eggs',
                children: []
            },
        
        
        
        
        
        ]
        
        
        
        
        return data;
    }
    
    
    
}
let _storage = new StorageService();
export default _storage;