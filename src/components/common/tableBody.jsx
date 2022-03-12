import React, { Component } from "react";

class TableBody extends Component {
  renderCell = (row, column) => {
    if (column.content) return column.content(row);

    return row[column.path];
  };

  render() {
    const { columns, rows } = this.props;

    return (
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.path}>{this.renderCell(row, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
