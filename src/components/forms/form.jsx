import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  state = { fields: {}, errors: {} };

  handleInputChange = async ({ currentTarget: input }) => {
    const { value } = input;
    console.log(input);
    console.log(input.id);

    const fields = { ...this.state.fields };
    fields[input.id] = value;

    this.setState({ fields });
  };

  catchExceptionMessage(ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.fields.message;
      this.setState({ errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();
  };

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

  renderSelect(name, options) {
    return <Select name={name} options={options} />;
  }
}

export default Form;
