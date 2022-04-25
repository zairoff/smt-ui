import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  state = { fields: {}, errors: {} };

  handleInputChange = async ({ currentTarget: input }) => {
    const { value } = input;

    const errors = { ...this.state.errors };

    //const error = await this.validateInput(input);

    //if (error) errors[input.id] = error;
    //else delete errors[input.id];

    delete errors[input.id];
    const fields = { ...this.state.fields };
    fields[input.id] = value;

    this.setState({ fields, errors });
  };

  catchExceptionMessage(ex, input) {
    if (ex.response && ex.response.status >= 400 && ex.response.status < 500) {
      const errors = { ...this.state.errors };
      errors[input] = ex.response.data.message;
      this.setState({ errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();
  };

  renderButton(
    label,
    type,
    onClick = null,
    className = "btn btn-primary btn-block btn-lg w-100"
  ) {
    return (
      <button onClick={onClick} type={type} className={className}>
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

  renderInput(
    name,
    label,
    placeholder,
    value,
    onChange,
    error,
    required,
    type = "text"
  ) {
    return (
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
        type={type}
      />
    );
  }

  renderSelect(name, options, error, onChange) {
    return (
      <Select name={name} options={options} error={error} onChange={onChange} />
    );
  }
}

export default Form;
