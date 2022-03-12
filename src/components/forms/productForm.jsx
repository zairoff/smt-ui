import React, { Component } from "react";
import ListGroup from "../common/listGroup";
import Form from "./form";

class ProductForm extends Form {
  state = {
    items: [
      { id: 1, name: "TV" },
      { id: 2, name: "Air" },
      { id: 3, name: "Washing" },
    ], // temp
    listSelectedItem: null, // temp
  };

  handleListSelect = () => {
    console.log("listChange: ", this);
  };

  render() {
    return (
      <form className="container m-2 row">
        <div className="col mt-4">
          <ListGroup
            items={this.state.items}
            onItemSelect={this.handleListSelect}
            selectedItem={this.state.listSelectedItem}
          />
        </div>
        <div className="col">
          {this.renderInput("")}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default ProductForm;
