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

class ProductForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    product: "",
    currentPage: 1,
    pageSize: 7,
    data: [],
  };

  async componentDidMount() {
    const { data } = await getProducts();
    this.setState({ data });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePaginationChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { data, product } = this.state;
    const obj = { name: product };
    try {
      const { data: result } = await addProduct(obj);
      console.log("data:", result);
      const newData = [...data, result];
      console.log("newData:", newData);
      this.setState({ data: newData, product: "" });
    } catch (ex) {
      toast(ex.message);
    }
  };

  handleInputChange = async ({ currentTarget: input }) => {
    const { value } = input;
    const { data } = await getProductByName(value);
    const errors = this.validateInput(value, data);
    this.setState({ product: value, errors });
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
    console.log("allrows:", allRows);
    console.log("allrowsL:", allRows.length);
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
          />
          <Pagination
            itemsCount={allRows.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePaginationChange}
          />
        </div>
        <div className="col">
          {this.renderInput("product", product, this.handleInputChange, errors)}
          <p className="mt-2"> </p>
          {this.renderButton("Save", errors)}
        </div>
      </form>
    );
  }
}

export default ProductForm;
