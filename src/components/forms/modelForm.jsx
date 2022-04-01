import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAsc } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import Form from "./form";

library.add(faSortAsc);

class ModelForm extends Form {
  render() {
    return 1 && <ReactLoading className="test" type="balls" color="green" />;
  }
}

export default ModelForm;
