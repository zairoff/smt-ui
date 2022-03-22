import React, { Component } from "react";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  state = {};

  renderButton(label) {
    return (
      <button className="btn btn-primary btn-block btn-lg w-100">
        {label}
      </button>
    );
  }

  renderInput(name, value, onChange, error, type = "text") {
    return (
      <Input
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        type={type}
      />
    );
  }

  renderSelect(name, options) {
    return <Select name={name} options={options} />;
  }
}

export default Form;
