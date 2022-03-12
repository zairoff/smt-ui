import React, { Component } from "react";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

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
    const { data, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} rows={data} />
      </table>
    );
  }
}

export default ProductBrandTable;
