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
      this.state = { selectedKey: "", selectedFolderName: "", folderData: this.folderData, actionMode: "ADD"};
      
      
  }
  
  onSelect(selectedKeys,ev)
  {
      let idxObj = storageService.getIndex(); 
      let folderName = idxObj[selectedKeys[0]].name   
      this.setState({selectedKey: selectedKeys[0], selectedFolderName: folderName})
      
  }
  
  mapFolderNameChange(ev)
  {
      this.setState({selectedFolderName: ev.target.value})
  }
   
  saveEdit(e)
  {
      e.preventDefault();
      let newFolderData = storageService.saveEdit(this.state.selectedKey, this.state.selectedFolderName)
      this.setState({folderData: newFolderData})
      console.log('hit form '+this.state.selectedFolderName)
  }
  
  addOrCancelFolder(e)
  {
      e.preventDefault();
      if(this.state.actionMode === "ADD")
      {
          let newFolderData = storageService.addFolder(this.state.selectedKey, this.state.selectedFolderName)
          this.setState({folderData: newFolderData})
          
          
      }
      if(this.state.actionMode === "EDIT")
      {
          //you are canceling an edit
          this.setState({ selectedKey: "", selectedFolderName: "", actionMode: "ADD"})
          
          
      }
      
      
  }
  
  getAddText()
  {
     let t = "Add";
     if (this.state.actionMode === 'EDIT')
         t = 'Cancel';
     
     return t;
      
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
                
                <form className="form well folderForm">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                      <th><label>Key:</label></th><td  colSpan="3">{this.state.selectedKey}</td> 
                      
                      </tr>
                      <tr>
                        <th>
                        <label for="folderName">Folder Name:</label>
                        </th>
                        <td>
                        <input type="text"  onChange={me.mapFolderNameChange.bind(me)} value={this.state.selectedFolderName} size="35" id="folderName" />
                        </td>
                        <td>
                        <button id="saveEdit" disabled={this.state.actionMode =='ADD'}  type="button" onClick={this.saveEdit.bind(me)} className="btn btn-primary">Save</button>
                        </td>
                <td>
                        <button id="addFolder" type="button" onClick={this.addOrCancelFolder.bind(me)}  className="btn btn-primary">
                        {me.getAddText()}</button>
                        </td>
                     </tr>
                   </tbody>
               </table>
               
                </form>

            </div>
        </div>
    );
  }
}