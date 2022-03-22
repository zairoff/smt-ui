import React, { Component } from "react";
import Table from "../common/table";

class ProductBrandTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "product", label: "PRODUCT" },
    { path: "brand", label: "BRAND" },
    {
      path: "button",
      content: (productBrand) => (
        <button
          onClick={() => this.props.onDelete(productBrand)}
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

export default ProductBrandTable;
