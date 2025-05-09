import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const EditCategoryList = ({ categoryId }) => {
  const baseApiUrl = "http://167.88.42.205";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDk3MzU5LCJpYXQiOjE3NDIyMDEzNTksImp0aSI6ImNhYzQ1OTBmNjJlMzRlNDViMTlhOTA1MjVkZmZiMDY5IiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiVXNlciJ9.DDtPnQAgsN9_dnP3us0GIV1Y1-JEi3ydtXMXPpS_P74";

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // State for loading indicators and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch category data when categoryId changes
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/categories/${categoryId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          name: response.data.name || "",
          description: response.data.description || "",
        });
        setErrorMessage("");
      } catch (error) {
        console.error("Can't fetch category data", error);
        if (error.response) {
          setErrorMessage(
            `Error fetching category: ${
              error.response.data?.message || "Server error"
            }`
          );
        } else if (error.request) {
          setErrorMessage("Network error. Please check your connection.");
        } else {
          setErrorMessage("Failed to fetch category data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, baseApiUrl]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Category name is required";
    }
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (formSubmitted) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  // Close modal function
  const closeEditModal = () => {
    const closeButton = document.querySelector(
      '#edit-category [data-bs-dismiss="modal"]'
    );
    if (closeButton) {
      closeButton.click();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const dataToSend = {
      name: formData.name,
      description: formData.description,
    };

    try {
      await axios.put(
        `${baseApiUrl}/api/categories/${categoryId}/`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form submission state
      setFormSubmitted(false);
      setFormErrors({});
      setErrorMessage("");

      // Close modal
      closeEditModal();

      // Show success message or handle UI updates
      // You may want to add a callback function to refresh the parent component's data
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      if (error.response) {
        setErrorMessage(
          `Error updating category: ${
            error.response.data?.message || JSON.stringify(error.response.data)
          }`
        );
      } else if (error.request) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("Error updating category. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="edit-category">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Edit Category</h4>
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
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Category Name:</label>
                    <input
                      name="name"
                      required
                      type="text"
                      className={`form-control ${
                        formErrors.name ? "is-invalid" : ""
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {formErrors.name && (
                      <div className="invalid-feedback d-block">
                        {formErrors.name}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditCategoryList.propTypes = {
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accepts string or number
};

export default EditCategoryList;
