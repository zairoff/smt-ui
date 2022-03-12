import _ from "lodash";
import React, { Component } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ProductBrandTable from "../productBrandTable";
import Form from "./form";

class ProductBrandForm extends Form {
  state = {
    currentPage: 1,
    sortColumn: { column: "", order: "asc" },
    pageSize: 4,
    data: [
      {
        id: 1,
        product: "TV",
        brand: "Artel",
      },
      {
        id: 2,
        product: "TV",
        brand: "TCL",
      },
      {
        id: 3,
        product: "TV",
        brand: "Cultraview",
      },
      {
        id: 4,
        product: "Air",
        brand: "Samsung",
      },
      {
        id: 5,
        product: "Washing",
        brand: "WirePool",
      },
    ],
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (item) => {
    console.log("handleDelete:", item);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      columns,
      data: allData,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const itemsCount = allData.length;
    const sortedData = _.orderBy(
      allData,
      [sortColumn.column],
      [sortColumn.order]
    );
    const data = paginate(sortedData, currentPage, pageSize);

    return (
      <form className="container m-2 row">
        <div className="col mt-4">
          <ProductBrandTable
            data={data}
            columns={columns}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col ms-4">
          {this.renderInput("")}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default ProductBrandForm;
