import React from "react";


function Recursion({ data }) {
  
  const treeData = data;
  let tree = treeData.tree;
  let id = tree.id;

  // function to get the leaf nodes of a given tree , 
  // it checks whether the node have children or not. Push those nodes that doesnt have any children
  
  function getLeafNodes(nodes, result = []) {
    for (var i = 0, length = nodes.length; i < length; i++) {
      if (!nodes[i].children || nodes[i].children.length === 0) {
        result.push(nodes[i].aqlPath);
      } else {
        result = getLeafNodes(nodes[i].children, result);
      }
    }
    return result;
  }

  const array = getLeafNodes([tree]);       //  all leaf nodes are pushed to this array.


  // function to check whether there is a path to selected node, returns a boolean.
  // Travsered through every node until a node with aqlPath === selected nodes aqlPath is matched.
  // if path found then the id of nodes till the selected leaf node is pushed to an array. 

  function hasPath(node, arr, value) {
    if (!node) return false;
    if (node.aqlPath === value) {
      arr.push(node.id);
      return true;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        let child = hasPath(node.children[i], arr, value);
        if (child) {
          arr.push(node.id);
          return true;
        }
      }
    }
    return false;
  }

  // function that is called to print the path of selected node. 

  function printPath(node, value) {
    let arr = [];
    hasPath(node, arr, value);
    arr = arr.reverse().join("/");
    return arr;
  }
  
  // function to copy the given text to clipboard.

  function copyToClipBoard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

// function to copy the path of selected node to clipboard.

  function copyPath(e) {
    let path = printPath(tree, e.target.value);
    copyToClipBoard(path);
    alert(`${path} copied to clipBoard`)
  }
  

  // functional component to get the sub tree if any

  function SubTree({ child }) {
    
    // nestedchild , this gives the children of children, if any, through recursion
    const nestedchilds = (child?.children || []).map((child) => {                 
      return <SubTree key={child.id} child={child} type="child" />;
    });

    return (
      <div style={{ marginLeft: "105px", marginTop: "10px" }}>

        {/* div for keeping copy button only in leaf nodes */}
        <div>
          {array.includes(child.aqlPath) ? (
            <div style={{color:'grey'}}>{" ||------>  "}{child.id}          
                <button style={{ marginLeft: "10px",backgroundColor:'rgb(64,62,103,0.1)' }} value={child.aqlPath} onClick={copyPath}>
                  Copy
                </button>
            </div>
          ) : (<div style={{fontSize:'20px' }}>||------ {child.id}</div>
          )}
        </div>
        
        {nestedchilds}
      
      </div>
    );
  }

  return (
    <div style={{ width:'fit-content',margin:'10px 0 30px 100px',padding:'10px 150px 50px 0'}}>
      <h2 style={{marginLeft:'200px'}}>Tree ID : {id}</h2>
      <div style={{ marginLeft: "150px", marginTop: "40px", fontSize: "20px" }}>
        
        {treeData.tree?.children.map((child) => {
          return <SubTree key={child.id} child={child} />;
        })}
    
      </div>
    </div>
  );
}

export default Recursion;
