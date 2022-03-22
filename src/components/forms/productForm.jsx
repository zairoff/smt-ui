import React, { Component } from "react";
import Pagination from "../common/pagination";
import ProductTable from "../tables/productTable";
import { paginate } from "../../utils/paginate";
import Form from "./form";
import _ from "lodash";

class ProductForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    currentPage: 1,
    pageSize: 4,
    rows: [
      {
        id: 1,
        product: "TV",
      },
      {
        id: 2,
        product: "Air",
      },
      {
        id: 3,
        product: "Washing",
      },
      {
        id: 4,
        product: "Washing",
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { rows: allRows, pageSize, currentPage, sortColumn } = this.state;
    const sortedRows = _.orderBy(
      allRows,
      [sortColumn.path],
      [sortColumn.order]
    );
    const rows = paginate(sortedRows, currentPage, pageSize);
    return (
      <form className="container m-2 row" onSubmit={this.handleSubmit}>
        <div className="col mt-4">
          <ProductTable
            rows={rows}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={allRows.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
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
