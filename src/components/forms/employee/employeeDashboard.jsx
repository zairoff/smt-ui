import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Department from "../../common/department";
import Pagination from "../../common/pagination";
import EmployeeTable from "../../tables/employeeTable";
import Form from "../form";

class EmployeeDashboard extends Form {
  state = {
    data: {
      id: "37",
      hierarchyid: "/",
      name: "Quality",
      children: [
        {
          id: 39,
          hierarchyid: "/39/",
          name: "QC",
        },
        {
          id: 42,
          hierarchyid: "/42/",
          name: "SMT",
        },
        {
          id: 43,
          hierarchyid: "/43/",
          name: "AUP",
          children: [
            {
              id: 48,
              hierarchyid: "/43/48/",
              name: "Snabjeniya import",
            },
            {
              id: 49,
              hierarchyid: "/43/49/",
              name: "Snabjeniya local",
            },
            {
              id: 50,
              hierarchyid: "/43/50/",
              name: "Accountant",
            },
          ],
        },
        {
          id: 44,
          hierarchyid: "/44/",
          name: "ITR",
          children: [
            {
              id: 45,
              hierarchyid: "/44/45/",
              name: "Elektronics",
            },
            {
              id: 46,
              hierarchyid: "/44/46/",
              name: "Texnolog",
            },
            {
              id: 47,
              hierarchyid: "/44/47/",
              name: "Software",
            },
          ],
        },
      ],
    },

    sortColumn: { path: "", order: "asc" },
    fields: { department: "" },
    errors: {},
    loading: false,
    selected: { id: 0, hierarchyid: "", name: "" },
    currentPage: 1,
    pageSize: 7,
  };

  handleClick = (selected) => {
    console.log(selected);
  };

  currentPageCheck(data) {}

  handleSort = (sortColumn) => {};

  handlePageChange = (page) => {};

  handleDelete = (employee) => {};

  render() {
    const { loading, data, errors, fields, pageSize, currentPage, sortColumn } =
      this.state;

    const test = [
      {
        id: 1,
        image: require("../../../assets/images/img.jpg"),
        name: "Maruf Zairoff",
        department: "IT",
        position: "Developer",
        status: "Active",
      },
      {
        id: 2,
        image: require("../../../assets/images/img.jpg"),
        name: "Maruf Zairoff",
        department: "IT",
        position: "Developer",
        status: "Active",
      },
    ];
    return (
      <React.Fragment>
        <div className="mt-2 row">
          {loading && (
            <ReactLoading className="loading" type="spin" color="blue" />
          )}
          <div className="col-4 m-2">
            <p className="mt-4"> </p>
            <Link to="/employee-add" className="btn btn-primary p-2 w-100">
              ADD EMPLOYEE
            </Link>
            <p className="mt-2"> </p>
            <Department
              className="m-2"
              data={data}
              onClick={this.handleClick}
            />
          </div>
          <div className="col m-2">
            {this.renderInput(
              "search",
              "",
              "Search",
              fields.search,
              this.handleInputChange,
              errors.search,
              true
            )}
            <p className="mt-2"> </p>
            <EmployeeTable
              rows={test}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={test.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeDashboard;
