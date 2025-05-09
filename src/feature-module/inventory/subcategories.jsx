import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../../core/pagination/datatable";
import axios from "axios";

const SubCategories = () => {
  const dataSource = useSelector((state) => state.rootReducer.subcategory_data);
  const loading = dataSource.length === 0;
  const categoryList = useSelector(
    (state) => state.rootReducer.categotylist_data
  );

  const columns = [
    {
      title: "Sub Category",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Category Code",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
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
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-category"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="#"
            >
              <i data-feather="trash-2" className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDk3MzU5LCJpYXQiOjE3NDIyMDEzNTksImp0aSI6ImNhYzQ1OTBmNjJlMzRlNDViMTlhOTA1MjVkZmZiMDY5IiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiVXNlciJ9.DDtPnQAgsN9_dnP3us0GIV1Y1-JEi3ydtXMXPpS_P74";

  const fileInputRef = useRef(null);

  const handleBulk = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (!file) {
      return alert("Please select a CSV file");
    }

    if (file.type !== "text/csv") {
      return alert("Invalid file type. Please upload a .csv file.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://167.88.42.205/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("File uploaded successfully!");
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to upload file.");
    }
  };

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    description: "",
  });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSubCategory = async (e) => {
    e.preventDefault();
    const dataToSend = {
      category_id: formData.category,
      name: formData.subcategory,
      description: formData.description,
    };
    try {
      const response = await axios.post(
        "http://167.88.42.205/api/subcategories/?format=json",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response) {
        return alert("THere is was error ! Please Try Again");
      }
      alert("Subcategory Added Successfully");
    } catch (e) {
      alert("Unable to add Subcategory");
    }
  };

  // const editSubCategory = () => {};

  // const deleteSubCategory = () => {};

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="font-bold text-lg">Sub Category</h4>
                <h6 className="text-sm">Manage your sub categories</h6>
              </div>
            </div>
            <form
              className="border bg-white px-2 mx-3 rounded flex items-center justify-center"
              onSubmit={handleBulk}
            >
              <input
                type="file"
                id="upload-btn"
                ref={fileInputRef}
                accept=".csv"
                required
                className="hidden" // Hide default file input
              />

              <label
                htmlFor="upload-btn"
                className="text-sm cursor-pointer text-black rounded-md mr-2"
              >
                Select CSV
              </label>

              <button
                type="submit"
                className="btn btn-success fs-13 fw-medium p-2 px-3 my-2"
              >
                Send
              </button>
            </form>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-category"
              >
                <i className="ti ti-circle-plus me-1"></i> Add Sub Category
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set"></div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Category
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive sub-category-table">
                {loading ? (
                  <div className="text-center p-3">
                    <p>Loading subcategories...</p>
                    <div
                      className="mt-2 spinner-border text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : dataSource && dataSource.length > 0 ? (
                  <Table columns={columns} dataSource={dataSource} />
                ) : (
                  <div className="text-center p-3">
                    <p>No data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <>
        {/* Add SubCategory */}
        <div className="modal fade" id="add-category">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Add Sub Category</h4>
                    </div>
                    <button
                      type="button"
                      className="close bg-danger text-white fs-16"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={addSubCategory}>
                      <div className="mb-3 flex flex-col items-start">
                        <label className="form-label">Category</label>
                        <select
                          required
                          name="category"
                          className="p-2 rounded border"
                          value={formData.category}
                          onChange={onValueChange}
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categoryList.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Sub Category Name:{" "}
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={onValueChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="categorycode"
                          value={formData.category}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={formData.value}
                          onChange={onValueChange}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary fs-13 fw-medium p-2 px-3"
                        >
                          Create Subcategory
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Add SubCategory */}

        {/* Edit SubCategory */}
        <div className="modal fade" id="edit-category">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Edit Sub Category</h4>
                    </div>
                    <button
                      type="button"
                      className="close bg-danger text-white fs-16"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3 flex flex-col items-start">
                        <label className="form-label">Category</label>
                        <select name="category" className="p-2 rounded border">
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categoryList.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Sub Category Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Laptop"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category Code</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="CT001"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <Link
                          to="#"
                          className="btn btn-primary fs-13 fw-medium p-2 px-3"
                        >
                          Add Sub Category
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit SubCategory */}

        {/* Delete SubCategory */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content p-5 px-3 text-center">
                  <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                    <i className="ti ti-trash fs-24 text-danger" />
                  </span>
                  <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Product</h4>
                  <p className="mb-0 fs-16">
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
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    >
                      Yes Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete SubCategory */}
      </>
    </>
  );
};

export default SubCategories;
