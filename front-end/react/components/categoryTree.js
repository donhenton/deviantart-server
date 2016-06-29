//import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree';
import deviantService from './../services/deviantService';
import postal from 'postal';


 

 

const categoryTree = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      treeData: [],
      checkedKeys: [],
    };
  },
  componentDidMount() {
      
      var me = this;
      
        postal.subscribe({
             channel: "deviant-system",
             topic: "categoryData",
             callback: function (data, envelope) {
                 

                 me.setState({treeData: data.fullData.treeData, store: data.fullData.store})
             }
         });  
      
      
   
    deviantService.getCategories(null,true);



  },
  onSelect(info) {
    console.log('selected', info);
  },
  onCheck(checkedKeys) {
    console.log(checkedKeys);
    this.setState({
      checkedKeys,
    });
  },
  onLoadData(treeNode) {
     // console.log("current Request "+treeNode.props.eventKey);
      var me = this;

      var retVal = deviantService.getCategories(treeNode.props.eventKey,false);
      
      retVal.then(function(data)
      {
          me.setState({treeData: data.treeData,store: data.store});
      });
           
      return retVal;        
      
  },
  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.name} key={item.key} isLeaf={(item.children.length==0)}  />;
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
      <div>
        <h2>dynamic render</h2>
        <Tree onSelect={this.onSelect}
              checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
              loadData={this.onLoadData}>
          {treeNodes}
        </Tree>
      </div>
    );
  },
});


module.exports = categoryTree;