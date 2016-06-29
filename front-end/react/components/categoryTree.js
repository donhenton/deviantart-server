//import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree';
import deviantService from './../services/deviantService';


 

 

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
      var retVal = deviantService.getCategories(null);
      
      retVal.then(function(data)
      {
          me.setState({treeData: data.treeData,store: data.store});
      });


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

      var retVal = deviantService.getCategories(treeNode.props.eventKey);
      
      retVal.then(function(data)
      {
          me.setState({treeData: data.treeData,store: data.store});
      });
           
      return retVal;        
      
  },
  render() {
    const loop = (data) => {
      return data.map((item) => {
         // console.log(item.key + " has "+item.has_subcategory)
          
          
        if (item.children.length > 0) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.name} key={item.key} isLeaf={!(item.has_subcategory)}  />;
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
        <div className="columnLeft">
            <h2>Deviant Art Categories</h2>
            <div className="categoryTree">
                <Tree onSelect={this.onSelect}
                      checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
                      loadData={this.onLoadData}>
                  {treeNodes}
                </Tree>
            </div>
        </div>
    );
  },
});


module.exports = categoryTree;