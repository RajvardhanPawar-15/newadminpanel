import {
  ChevronUp,
  Edit,
  Eye,
  // RotateCcw,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Brand from "../../core/modals/inventory/brand";
import { all_routes } from "../../Router/all_routes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Table from "../../core/pagination/datatable";
import { setToogleHeader } from "../../core/redux/action";
// import { Download } from "react-feather";
import { set_product_list } from "../../core/redux/action";

const FranchiseList = () => {
  const dataSource = useSelector((state) => state.rootReducer.product_list);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rootReducer.toggle_header);
  const route = all_routes;
  const [selectedProductId, setSelectedProductId] = useState("");

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) =>
        imageUrl ? (
          <img
            src={`http://167.88.42.205${imageUrl}`}
            alt="Product"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      sorter: (a, b) => a.category_name?.length - b.category_name?.length,
    },

    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price?.length - b.price?.length,
    },

    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock?.length - b.stock?.length,
    },
    {
      title: "Type",
      dataIndex: "is_veg",
      render: (isveg) => (
        <div className="d-flex align-items-center">
          {isveg ? (
            <span className="text-success me-2">Veg</span>
          ) : (
            <span className="text-danger me-2">Non-Veg</span>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "id",
      render: (productId) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to={`/product-details/${productId}`}>
              <Eye className="feather-view" />
            </Link>
            <Link className="me-2 p-2" to={`/edit-product/${productId}`}>
              <Edit className="feather-edit" />
            </Link>
            <button
              className="confirm-text p-2"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setSelectedProductId(productId)}
            >
              <Trash2 className="feather-trash-2" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const handleDelete = async (productID) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDk3MzU5LCJpYXQiOjE3NDIyMDEzNTksImp0aSI6ImNhYzQ1OTBmNjJlMzRlNDViMTlhOTA1MjVkZmZiMDY5IiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiVXNlciJ9.DDtPnQAgsN9_dnP3us0GIV1Y1-JEi3ydtXMXPpS_P74";

    try {
      const response = await fetch(
        `http://167.88.42.205/api/products/${productID}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      dispatch(
        set_product_list(
          dataSource.filter((product) => product.id !== productID)
        )
      );
      window.location.reload();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting product!");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="text-lg font-bold">Franchise List</h4>
                <h6 className="text-sm">Manage your franchise</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="page-btn">
              <Link to={route.addfranchise} className="btn btn-primary">
                <i className="ti ti-circle-plus me-1"></i>
                Add New Franchise
              </Link>
            </div>
            {/* <div className="page-btn import">
              <Link
                to="#"
                className="btn btn-secondary color"
                data-bs-toggle="modal"
                data-bs-target="#view-notes"
              >
                <Download className="feather me-2" />
                Import Product
              </Link>
            </div> */}
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set"></div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Sort By : Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Desending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last Month
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last 7 Days
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive hey">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
          <Brand />
        </div>
      </div>
      <>
        {/* delete modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content p-5 px-3 text-center">
                  <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                    <i className="ti ti-trash fs-24 text-danger" />
                  </span>
                  <h4 className="fs-20 text-gray-9 fw-bold mb-2 mt-1">
                    Delete Product
                  </h4>
                  <p className="text-gray-6 mb-0 fs-16">
                    Are you sure you want to delete product?
                  </p>
                  <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                      data-bs-dismiss="modal"
                      onClick={() => handleDelete(selectedProductId)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default FranchiseList;
