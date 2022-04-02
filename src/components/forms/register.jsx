import React, { Component } from "react";
import {
  getUserByName,
  loginUser,
  registerUser,
} from "../../services/userService";
import ReactLoading from "react-loading";
import Form from "./form";

class Register extends Form {
  state = {
    data: { username: "", password: "", passwordRepeat: "", telegram: "" },
    errors: {},
    loading: false,
  };

  // TODO: need to find other ways
  async validateInput(input) {
    const { data } = this.state;
    this.setState({ loading: true });
    const { id, value } = input;
    let error = "";
    switch (id) {
      case "username":
        try {
          if (!value) break;
          const { data: user } = await getUserByName(value);
          error = user ? "username already exist" : "";
        } catch (ex) {
          console.log("user", ex.response.data);
        } finally {
          break;
        }

      case "password":
        error = value.length < 5 ? "password length" : "";
        break;

      case "passwordRepeat":
        error = data.password !== value ? "password doesn't match" : "";
        break;

      default:
        break;
    }
    return error;
  }

  doSubmit = async () => {
    this.setState({ loading: true });
    try {
      await registerUser(this.state.data);
      const { username, password } = this.state.data;
      const user = { username: username, password: password };
      const { data } = await loginUser(user);
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (ex) {
      this.catchExceptionMessage(ex);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <React.Fragment>
        {loading && <ReactLoading className="test" type="spin" color="blue" />}
        <div className="d-flex justify-content-center align-items-center p-4">
          <form onSubmit={this.handleSubmit}>
            <p className="mt-2"> </p>
            {this.renderInput(
              "username",
              "Username",
              "", // placeholder
              data.username,
              this.handleInputChange,
              errors.username,
              true
            )}
            <p className="mt-2"> </p>
            {this.renderInput(
              "password",
              "Password",
              "", // placeholder
              data.password,
              this.handleInputChange,
              errors.password,
              true
            )}
            <p className="mt-2"> </p>
            {this.renderInput(
              "passwordRepeat",
              "Confirm password",
              "", // placeholder
              data.passwordRepeat,
              this.handleInputChange,
              errors.passwordRepeat,
              true
            )}
            <p className="mt-2"> </p>
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
