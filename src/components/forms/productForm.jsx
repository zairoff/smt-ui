import React, { Component } from "react";
import Pagination from "../common/pagination";
import ProductTable from "../tables/productTable";
import { paginate } from "../../utils/paginate";
import Form from "./form";
import _ from "lodash";
import {
  getProducts,
  deleteProduct,
  getProductByName,
  addProduct,
} from "../../services/productService";
import { toast } from "react-toastify";
import { cat } from "fontawesome";

class ProductForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    product: "",
    currentPage: 1,
    pageSize: 7,
    data: [],
    errors: "",
  };

  async componentDidMount() {
    try {
      const { data } = await getProducts();
      this.setState({ data });
    } catch (ex) {
      toast(ex.message);
    }
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePaginationChange = (page) => {
    this.setState({ currentPage: page });
  };

  doSubmit = async () => {
    const { data, product } = this.state;
    const obj = { name: product };

    // TODO: need to change
    if (!product) {
      toast("Fill the input");
      return;
    }

    try {
      const { data: result } = await addProduct(obj);
      const newData = [...data, result];
      this.setState({ data: newData, product: "" });
    } catch (ex) {
      toast(ex.message);
    }
  };

  validateInput(value, response) {
    let error = "";
    if (!value) error = "can't be empty";
    if (response) error = "already exists in database";

    return error;
  }

  handleInputChange = async ({ currentTarget: input }) => {
    const { value } = input;
    try {
      const { data } = await getProductByName(value);
      const errors = this.validateInput(value, data);
      this.setState({ product: value, errors });
    } catch (ex) {
      toast(ex.message);
    }
  };

  handleDelete = async ({ id }) => {
    const clone = [...this.state.data];
    const data = clone.filter((d) => d.id !== id);
    this.setState({ data });

    try {
      await deleteProduct(id);
    } catch (ex) {
      this.setState({ data: clone });
      toast(ex.message);
    }
  };

  render() {
    const {
      data: allRows,
      pageSize,
      currentPage,
      sortColumn,
      product,
      errors,
    } = this.state;

    const sortedRows = _.orderBy(
      allRows,
      [sortColumn.path],
      [sortColumn.order]
    );
    const rows = paginate(sortedRows, currentPage, pageSize);
    return (
      <form className="container m-2 row" onSubmit={this.handleSubmit}>
        <div className="col mt-4">
          <ProductTable
            rows={rows}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={allRows.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePaginationChange}
          />
        </div>
        <div className="col m-5">
          <p className="mt-2"> </p>
          {this.renderInput("product", product, this.handleInputChange, errors)}
          <p className="mt-2"> </p>
          {this.renderButton("Save", errors)}
        </div>
      </form>
    );
  }
}

export default ProductForm;
