import React from "react";
import { getLines } from "../../services/lineService";
import { getModelByProductBrandId } from "../../services/modelService";
import { getProducts } from "../../services/productService";
import Form from "../forms/form";
import { toast } from "react-toastify";
import ButtonBadge from "../common/buttonBadge";
import { getProductBrandByProductId } from "../../services/productBrandService";
import { getLineDefectByLineId } from "../../services/lineDefectService";
import {
  addReport,
  deleteReport,
  getReportByModelIdAndLineId,
} from "../../services/reportService";
import ReportTable from "../tables/reportTable";
import Pagination from "../common/pagination";
import _ from "lodash";
import { paginate } from "../../utils/paginate";

class Report extends Form {
  barcodeRef = React.createRef();

  state = {
    fields: {
      barcode: "",
    },
    products: [],
    productBrands: [],
    brands: [],
    models: [],
    lines: [],
    defects: [],
    selectedItem: { productId: "", brandId: "", modelId: "", lineId: "" },
    data: [],
    errors: {},
    loading: true,
    sortColumn: { path: "", order: "asc" },
    currentPage: 1,
    pageSize: 7,
  };

  componentDidUpdate() {
    this.setFocusOnBarcode();
  }

  setFocusOnBarcode() {
    this.barcodeRef.current.focus();
  }

  async componentDidMount() {
    try {
      const { data: products } = await getProducts();
      const { data: lines } = await getLines();
      this.setState({ products, lines, loading: false });
    } catch (ex) {
      toast.error(ex.message);
      this.setState({ loading: false });
    }
  }

  handleSelectChange = async ({ target }) => {
    const { name, value: id } = target;

    try {
      switch (name) {
        case "Product":
          {
            const { data: productBrands } = await getProductBrandByProductId(
              id
            );
            const brands = productBrands.map((p) => p.brand);
            this.setState({
              fields: { barcode: "" },
              brands,
              productBrands,
              selectedItem: {
                productId: id,
                brandId: "",
                modelId: "",
                lineId: "",
              },
              models: [],
            });
          }
          break;
        case "Brand":
          {
            const { productBrands, selectedItem } = this.state;
            const productBrand = productBrands.filter(
              (pb) =>
                pb.product.id == selectedItem.productId && pb.brand.id == id
            );

            const { data: models } = await getModelByProductBrandId(
              productBrand[0].id
            );

            selectedItem.brandId = id;
            selectedItem.modelId = null;
            selectedItem.lineId = null;

            this.setState({
              fields: { barcode: "" },
              selectedItem,
              models,
            });
          }
          break;
        case "Model":
          const { selectedItem } = this.state;

          selectedItem.modelId = id;
          selectedItem.lineId = null;

          this.setState({ selectedItem, fields: { barcode: "" } });
          break;
        case "Line":
          {
            const { selectedItem } = this.state;
            selectedItem.lineId = id;

            if (!selectedItem.modelId) return;

            const { data: lineDefects } = await getLineDefectByLineId(id);
            const defects = lineDefects.map((ld) => ld.defect);

            const { data } = await getReportByModelIdAndLineId(
              selectedItem.modelId,
              selectedItem.lineId,
              new Date().toLocaleString() + ""
            );
            this.setState({
              defects,
              selectedItem,
              data,
              fields: { barcode: "" },
            });
          }
          break;
      }
    } catch (ex) {}
  };

  handleButtonClick = async (defect) => {
    const { fields, selectedItem, data } = this.state;
    const { modelId, lineId } = selectedItem;

    if (
      Object.values(fields).every((x) => x === null || x === "") ||
      Object.values(selectedItem).every((x) => x === null || x === "")
    ) {
      toast.warning("Check model choosen and barcode scanned");
      return;
    }

    const report = {
      barcode: fields.barcode,
      lineId: lineId,
      defectId: defect,
      modelId: modelId,
    };

    try {
      await addReport(report);
      const { data } = await getReportByModelIdAndLineId(
        modelId,
        lineId,
        new Date().toLocaleString() + ""
      );
      this.setState({ data, fields: { barcode: "" } });
    } catch (ex) {
      this.setState({ data });
      this.catchExceptionMessage(ex, "barcode");
    }
  };

  handleButtonClear = () => {
    this.setState({ fields: { barcode: "" } });
  };

  currentPageCheck(data) {
    const { pageSize } = this.state;

    return data.length % pageSize == 0;
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (report) => {
    const clone = [...this.state.data];
    const filtered = clone.filter((r) => r.id != report.id);
    this.setState({ data: filtered });
    try {
      await deleteReport(report.id);
    } catch (ex) {
      toast.error(ex.message);
      this.setState({ data: clone });
    }
  };

  render() {
    const {
      fields,
      products,
      brands,
      models,
      defects,
      lines,
      errors,
      data,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;

    const sortedRows = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const rows = paginate(sortedRows, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row mt-2">
          <div className="col">
            {this.renderSelect(
              "Product",
              products,
              "",
              this.handleSelectChange
            )}
          </div>
          <div className="col">
            {this.renderSelect("Brand", brands, "", this.handleSelectChange)}
          </div>
          <div className="col">
            {this.renderSelect("Model", models, "", this.handleSelectChange)}
          </div>
          <div className="col">
            {this.renderSelect("Line", lines, "", this.handleSelectChange)}
          </div>
          <div className="row mt-2">
            <div className="col">
              <ReportTable
                rows={rows}
                onSort={this.handleSort}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
              />
              <Pagination
                itemsCount={data.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
            <div className="col ms-4">
              <div className="row">
                <div className="col">
                  {this.renderInput(
                    "barcode",
                    "",
                    "Barcode",
                    fields.barcode,
                    this.handleInputChange,
                    errors.barcode,
                    true,
                    "text",
                    this.barcodeRef
                  )}
                </div>
                <div className="col-2 my-auto">
                  {this.renderButton(
                    "CLEAR",
                    "button",
                    this.handleButtonClear,
                    "btn btn-primary btn-block mt-4"
                  )}
                </div>
              </div>
              <div
                className="mt-2"
                style={{ fontWeight: "bold", width: "150px", height: "20px" }}
              >
                TOTAL:{" "}
                <span className="badge rounded-pill bg-info">
                  {data.length}
                </span>
              </div>
              <p> </p>
              {defects.map((defect) => (
                <ButtonBadge
                  onClick={this.handleButtonClick}
                  key={defect.id}
                  value={defect.name}
                  id={defect.id}
                  reports={data}
                ></ButtonBadge>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
