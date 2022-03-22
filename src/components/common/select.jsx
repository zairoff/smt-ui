import React, { Component } from "react";

const Select = ({ name, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <select name={name} id={name} className="form-control form-control-lg">
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
