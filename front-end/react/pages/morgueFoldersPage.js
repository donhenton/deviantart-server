import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree'; 
import storageService from './../services/storageService'

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
      this.treeRef = null;
      this.folderData = null;
      this.folderIdx = {};
  }
  
 
    componentWillMount()
  {
      this.folderData = storageService.getFolderData();
      this.state = { selectedKey: "", selectedFolderName: "", folderData: this.folderData, actionMode: "INIT"};
      
      
  }
  
  onSelect(selectedKeys,ev)
  {
      
      this.setState({selectedKey: selectedKeys[0], selectedFolderName: "",actionMode: "CHOOSE"})
      
  }
  
  mapFolderNameChange(ev)
  {
      this.setState({selectedFolderName: ev.target.value})
  }
   
  editFolder(e)
  {
      e.preventDefault();
      if (this.state.actionMode === 'CHOOSE')
     {
         //you are requesting an edit
         let idxObj = storageService.getIndex(); 
         let folderName = idxObj[this.state.selectedKey].name   
         this.setState({actionMode: "EDIT", selectedFolderName: folderName})
         
     }
     if (this.state.actionMode === 'EDIT')
     {
        //you are saving an edit, the button says save
        let newFolderData = storageService.saveEdit(this.state.selectedKey, this.state.selectedFolderName)
        this.setState({folderData: newFolderData,selectedFolderName: "", actionMode:"CHOOSE"})
      //console.log('hit form '+this.state.selectedFolderName)
     }
     if (this.state.actionMode === 'ADD')
     {
        //you are saving an add, the button says save
        let newFolderData = storageService.addFolder(this.state.selectedKey, this.state.selectedFolderName)
        this.setState({folderData: newFolderData,selectedFolderName: "", actionMode:"CHOOSE"})
      //console.log('hit form '+this.state.selectedFolderName)
     }
      
  }
  
  addFolder(e)
  {
      e.preventDefault();
       
     if (this.state.actionMode === 'CHOOSE')
     {
         //requesting an add 
         this.setState({actionMode: "ADD", selectedFolderName: ""})
     }
     if (this.state.actionMode === 'EDIT' || this.state.actionMode === 'ADD')
     {
         // this is a cancel request
         this.setState({actionMode: "CHOOSE",  selectedFolderName: ""})
     } 
      
  }
  
  deleteFolder(e)
  {
       e.preventDefault();
      let newFolderData = storageService.deleteFolder(this.state.selectedKey)
        this.setState({folderData: newFolderData,selectedFolderName: "", actionMode:"CHOOSE"})
      
  }
 
  
  getButtonText(type)
  {
     let t = "Add";
     if (this.state.actionMode === 'CHOOSE')
     {
         if (type ==="EDIT")
         {
             t = "Edit"
         }
         
     }
     if (this.state.actionMode === 'ADD' || this.state.actionMode === 'EDIT')
     {
         if (type === "EDIT")
         {
             t = 'Save'
             
         }
         else
         {
             t = 'Cancel'
         }
         
     }    
      
     return t;
      
  }    
  
  
  disableItem(type)
  {
      var disable = false;
      if (this.state.actionMode === "INIT")
      {
           return true;
      }
      
      if (type==="EDIT")
      {
           
          
      }
      if (type==="ADD")
      {
          
          
      }
      if(type==="INPUT")
      {
          if (this.state.actionMode === "CHOOSE")
          {
              disable = true;
          }
          
      }   
      
      return disable;
          
  }
        
        
  render() {
      var me = this;
      
      const loop = (data) => {
      return data.map((item) => {
        
        if (item.children.length > 0) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.name} key={item.key} isLeaf={(item.children.length===0)}  />;
      });
    };
    const folderNodes = loop(this.state.folderData);
      
      
      
    return (
       
         <div>
            <div className="column50Left">
            <h2>Morgue Folders</h2>
               <div className="folderTree">
                      <Tree prefixCls="f-tree" ref={(r) => me.treeRef = r} 
                           showLine={true} defaultExpandAll={true} 
                           onSelect={this.onSelect.bind(this)} 
                           selectedKeys={this.state.selectedKey.length > 1 ? [this.state.selectedKey]: []}
                           checkable={false}>
                        {folderNodes}
                      </Tree>
               </div>
           </div>
            <div className="column50Right">
                
                <form className={this.state.actionMode==='INIT'? 'form well folderForm hidden' : "form well folderForm" }  >
                  <table  className='table table-striped'>
                    <tbody>
                      <tr>
                      <th><label>Key:</label></th><td>{this.state.selectedKey +" ("+this.state.actionMode+")"}</td> 
                      
                      </tr>
                      <tr>
                        <th>
                        <label for="folderName">Folder Name:</label>
                        </th>
                        <td>
                        <input id="folderInput"   type="text" disabled={me.disableItem('INPUT')} onChange={me.mapFolderNameChange.bind(me)} value={this.state.selectedFolderName} size="35" id="folderName" />
                        </td>
                           </tr>
                   </tbody>
               </table>
                       <div className="row">
                        <button id="saveFolder" disabled={me.disableItem('EDIT')}   type="button" onClick={this.editFolder.bind(me)} className="btn btn-primary space-right">
                        {me.getButtonText('EDIT')}</button>
                         
                        <button id="addFolder" disabled={me.disableItem('ADD')} type="button" onClick={this.addFolder.bind(me)}  className="btn btn-primary space-right">
                        {me.getButtonText('ADD')}</button>
                         
                        <button id="deleteFolder"   type="button" onClick={this.deleteFolder.bind(me)}  className="btn btn-red space-left">
                        Delete</button>
                         </div>
                
               
                </form>

            </div>
        </div>
    );
  }
}