import { values } from "lodash";
import React, { Component } from "react";
import Form from "./form";

class Login extends Form {
  state = { account: { username: "", password: "" }, errors: {} };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "username is required";
    if (account.password.trim() === "")
      errors.password = "password is requiered";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            account.username,
            this.handleChange,
            errors.username
          )}
          <p className="mt-2"> </p>
          {this.renderInput(
            "password",
            account.password,
            this.handleChange,
            errors.password
          )}
          {this.renderLink(
            "forgot password?",
            "/reset",
            "d-flex justify-content-end"
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
