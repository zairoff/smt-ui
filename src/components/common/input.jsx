import React, { Component } from "react";

const Input = ({ name, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input type={type} className="form-control"></input>
    </div>
  );
};

export default Input;
