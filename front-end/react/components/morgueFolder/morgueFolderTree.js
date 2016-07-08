import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree'; 
import postal from 'postal';

export default class MorgueFolderTree extends Component {

constructor()
{
        super();
        this.treeRef = null;
}


componentWillReceiveProps(nextProps) {
  this.setState({folderData: nextProps.folderData});

}
componentWillMount()
{ 
      this.state = { selectedKey: "", folderData: this.props.folderData};

}
onSelect(selectedKeys, ev)
{

    this.setState({selectedKey: selectedKeys[0]})
    console.log("sending out message "+selectedKeys[0])
     postal.publish({
               channel: "deviant-system-folder-tree",
               topic: "select-folder" ,
               data:  {selectedKey: selectedKeys[0]}
            });
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
                <div className = "folderTree">
                    <Tree prefixCls = "f-tree" ref = {(r) => me.treeRef = r}
                    showLine = {true} defaultExpandAll = {true}
                    onSelect = {this.onSelect.bind(this)}
                    selectedKeys = {(this.state.selectedKey && this.state.selectedKey.length > 1 )? [this.state.selectedKey]: []}
                    checkable = {false}>
                    {folderNodes}
                    </Tree>
                </div>

                );  
      
      
      
      
}//end render 
 



}
  