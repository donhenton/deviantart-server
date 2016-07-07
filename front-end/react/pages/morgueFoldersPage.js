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
  }
  
 
    componentWillMount()
  {
      let folderData = storageService.getFolderData();
      this.state = {'value': "", parentKey: null, folderData: folderData, downloading: false};
      
      
  }
  
  onSelect(selectedKeys,ev)
  {
      console.log("fred "+JSON.stringify(selectedKeys)+" "+this.treeRef.selectedKeys)
      
      this.setState({parentKey: selectedKeys[0]})
      
  }
  
   
   
        
        
  render() {
      var me = this;
      
      const loop = (data) => {
      return data.map((item) => {
         // console.log(item.key + " has "+item.has_subcategory)
          
          
        if (item.children.length > 0) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.name} key={item.key} isLeaf={!(item.has_subcategory)}  />;
      });
    };
    const folderNodes = loop(this.state.folderData);
      
      
      
    return (
       
         <div className="folderTree">
                <Tree prefixCls="f-tree" ref={(r) => me.treeRef = r} showLine={true}  onSelect={this.onSelect.bind(this)} checkable={false}>
                  {folderNodes}
                </Tree>
            </div>
    );
  }
}