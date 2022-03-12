import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.product}</td>
            <td>{d.brand}</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
