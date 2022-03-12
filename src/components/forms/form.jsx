import React, { Component } from "react";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  state = {};

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  renderInput(name, type = "text") {
    return <Input name={name} type={type} />;
  }

  renderSelect(name, label, options) {
    return <Select name={name} label={label} options={options} />;
  }
}

export default Form;
