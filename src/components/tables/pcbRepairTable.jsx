import React, { Component } from "react";
import Table from "../common/table";

class PcbRepairTable extends Component {
  columns = [
    { path: "report.barcode", label: "" },
    { path: "report.model.name", label: "" },
    { path: "report.line.name", label: "" },
    { path: "report.defect.name", label: "" },
    { path: "action", label: "" },
    { path: "employee.fullName", label: "" },
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

export default PcbRepairTable;
