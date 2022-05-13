import React, { Component } from "react";
import Table from "../common/table";
import config from "../../config.json";

const fileUrl = config.fileUrl;

class RepairerTable extends Component {
  columns = [
    { path: "employee.fullName", label: "" },
    { path: "employee.departmentName", label: "" },
    { path: "employee.position", label: "" },
    {
      path: "delete",
      content: (repairer) => (
        <button
          type="button"
          onClick={() => this.props.onDelete(repairer)}
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

export default RepairerTable;
