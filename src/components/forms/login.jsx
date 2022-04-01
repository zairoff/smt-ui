import { values } from "lodash";
import React, { Component } from "react";
import Form from "./form";

class Login extends Form {
  state = { account: { username: "", password: "" }, errors: {} };

  handleSubmit = (e) => {
    e.preventDefault();
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
            errors.username,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderInput(
            "password",
            account.password,
            this.handleChange,
            errors.password,
            true
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
