import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAsc } from "@fortawesome/free-solid-svg-icons";
import Form from "./form";

library.add(faSortAsc);

class ModelForm extends Form {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = props.state;
  }

  render() {
    const { data } = this.props;
    console.log("aa", this.state);
    return <h1>{data}</h1>;
  }
}

export default ModelForm;
