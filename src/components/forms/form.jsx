import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  validateInput(input, data) {
    let errors = "";
    if (!input) errors = "Input can't be empty";
    if (data) errors = input + " already exists in database";

    return errors;
  }

  renderButton(label, error) {
    return (
      <button
        disabled={error}
        type="submit"
        className="btn btn-primary btn-block btn-lg w-100"
      >
        {label}
      </button>
    );
  }

  renderLink(label, link, className) {
    return (
      <Link className={className} to={link}>
        {label}
      </Link>
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
