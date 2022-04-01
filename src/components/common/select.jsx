import React, { Component } from "react";

const Select = ({ name, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <select
        name={name}
        id={name}
        required={true}
        className="form-control form-control-lg"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
