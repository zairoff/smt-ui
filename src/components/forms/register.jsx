import React, { Component } from "react";
import Form from "./form";

class Register extends Form {
  render() {
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

export default Register;
