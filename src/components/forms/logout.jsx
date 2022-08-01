import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;