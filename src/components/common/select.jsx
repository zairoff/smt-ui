import React from "react";

const Select = ({ name, options, error, onChange, property }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        required={true}
        className="form-control form-control-lg"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option[property]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger p-2">{error}</div>}
    </div>
  );
};

export default Select;
