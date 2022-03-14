import React, { Component } from "react";
import ProductTable from "../productTable";
import Form from "./form";

class ProductForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    rows: [
      {
        id: 1,
        product: "TV",
      },
      {
        id: 4,
        product: "Air",
      },
      {
        id: 5,
        product: "Washing",
      },
    ],
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    return (
      <form className="container m-2 row">
        <div className="col mt-4">
          <ProductTable
            rows={this.state.rows}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
        </div>
        <div className="col">
          {this.renderInput("")}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default ProductForm;
