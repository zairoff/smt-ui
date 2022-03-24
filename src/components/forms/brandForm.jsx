import React, { Component } from "react";
import BrandTable from "../tables/brandTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import Form from "./form";
import { toast } from "react-toastify";

class BrandForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    currentPage: 1,
    pageSize: 4,
    rows: [
      {
        id: 1,
        brand: "Artel",
      },
      {
        id: 2,
        brand: "Samsung",
      },
      {
        id: 3,
        brand: "TCL",
      },
      {
        id: 4,
        brand: "Cultraview",
      },
      {
        id: 5,
        brand: "Wire Pool ",
      },
    ],
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
      <form className="container m-2 row">
        <div className="col mt-4">
          <BrandTable
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
        <div className="col ms-4">
          {this.renderInput("")}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default BrandForm;
