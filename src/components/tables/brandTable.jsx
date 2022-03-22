import React, { Component } from "react";
import Table from "../common/table";

class BrandTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "brand", label: "BRAND" },
    {
      path: "button",
      content: (product) => (
        <button
          onClick={() => this.props.onDelete(product)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { rows, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        rows={rows}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BrandTable;
