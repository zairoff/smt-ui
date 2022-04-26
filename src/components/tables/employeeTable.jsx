import React, { Component } from "react";
import Table from "../common/table";

class EmployeeTable extends Component {
  columns = [
    {
      path: "image",
      content: (employee) => (
        <img
          src={employee.image}
          className="rounded-circle"
          style={{ height: "65px", width: "65px", objectFit: "cover" }}
        />
      ),
    },
    { path: "name", label: "NAME" },
    { path: "department", label: "DEPARTMENT" },
    { path: "position", label: "POSITION" },
    { path: "status", label: "STATUS" },
    {
      path: "edit",
      content: (employee) => (
        <button
          type="button"
          onClick={() => this.props.onEdit(employee)}
          className="btn btn-primary"
        >
          Edit
        </button>
      ),
    },
    {
      path: "delete",
      content: (employee) => (
        <button
          type="button"
          onClick={() => this.props.onDelete(employee)}
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

export default EmployeeTable;
