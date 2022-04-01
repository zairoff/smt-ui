import { cat } from "fontawesome";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { getUserByName, registerUser } from "../../services/userService";
import ReactLoading from "react-loading";
import Form from "./form";

class Register extends Form {
  state = {
    data: {
      account: { username: "", password: "", passwordRepeat: "", telegram: "" },
      loading: false,
    },
    errors: {},
  };

  componentDidMount() {
    console.log("mount");
  }

  componentDidUpdate() {
    {
      0 && <ReactLoading className="test" type="balls" color="green" />;
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // TODO: need to find other ways
  async validateInput(input) {
    this.setState({ loading: true });
    const { account } = this.state.data;
    const { id, value } = input;
    let error = "";
    switch (id) {
      case "username":
        try {
          if (!value) break;
          const { data } = await getUserByName(value);
          error = data ? "username already exist" : "";
        } catch (ex) {
          if (ex.response.status !== 404) {
            error = ex.message;
            toast(ex.message);
          }
        } finally {
          break;
        }

      case "password":
        error = value.length < 5 ? "password length" : "";
        break;

      case "passwordRepeat":
        error = account.password !== value ? "password doesn't match" : "";
        break;

      default:
        break;
    }
    return error;
  }

  doSubmit = async () => {
    try {
      console.log("aa", this.state.data.account);
      const { data } = await registerUser(this.state.data.account);
      console.log("data: ", data);
    } catch (ex) {
      toast(ex.message);
    }
  };

  render() {
    const { data, errors, loading } = this.state;
    const { account, roles } = data;

    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        {loading && <ReactLoading className="test" type="spin" color="blue" />}
        <form onSubmit={this.handleSubmit}>
          <p className="mt-2"> </p>
          {this.renderInput(
            "username",
            "Username",
            "", // placeholder
            account.username,
            this.handleInputChange,
            errors.username,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderInput(
            "password",
            "Password",
            "", // placeholder
            account.password,
            this.handleInputChange,
            errors.password,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderInput(
            "passwordRepeat",
            "Confirm password",
            "", // placeholder
            account.passwordRepeat,
            this.handleInputChange,
            errors.passwordRepeat,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
