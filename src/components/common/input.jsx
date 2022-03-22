import React, { Component } from "react";

const Input = ({ name, value, onChange, error, type }) => {
  return (
    <div className="form-group">
      <input
        value={value}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control form-control-lg"
        placeholder={name}
      ></input>
      {error && <div className="alert alert-danger p-2">{error}</div>}
    </div>
  );
};

export default Input;
