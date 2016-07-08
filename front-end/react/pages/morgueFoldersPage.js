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
      this.state = { selecteKey: "", selectedFolderName: "", folderData: this.folderData};
      
      
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
                      <Tree prefixCls="f-tree" ref={(r) => me.treeRef = r} showLine={true} defaultExpandAll={true} onSelect={this.onSelect.bind(this)} checkable={false}>
                        {folderNodes}
                      </Tree>
               </div>
           </div>
            <div className="column50Right">
                
                <div className="form well">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                      <th><label>Key:</label></th><td  colSpan="2">{this.state.selectedKey}</td> 
                      
                      </tr>
                      <tr>
                        <th>
                        <label for="folderName">Folder Name:</label>
                        </th>
                        <td>
                        <input type="text" onChange={me.mapFolderNameChange} value={this.state.selectedFolderName} size="35" id="folderName" />
                        </td>
                        <td>
                        <button className="btn btn-primary">Save</button>
                        </td>
                     </tr>
                   </tbody>
               </table>
               
                </div>

            </div>
        </div>
    );
  }
}