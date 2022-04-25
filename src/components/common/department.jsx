import React, { Component } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem } from "@mui/lab";

class Department extends Component {
  getTreeItems(nodes) {
    return (
      Object.keys(this.props.data).length != 0 && (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.hierarchyid}
          label={nodes.name}
          onClick={() =>
            this.props.onClick({
              id: nodes.id,
              hierarchyid: nodes.hierarchyid,
              name: nodes.name,
            })
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => this.getTreeItems(node))
            : null}
        </TreeItem>
      )
    );
  }

  render() {
    return (
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {this.getTreeItems(this.props.data)}
      </TreeView>
    );
  }
}

export default Department;
