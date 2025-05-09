import { React, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import { ArrowLeft } from "feather-icons-react/build/IconComponents";
import { useSelector } from "react-redux";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import { Editor } from "primereact/editor";

const AddProduct = () => {
  const route = all_routes;

  const categoryData = useSelector(
    (state) => state.rootReducer.categotylist_data
  );

  const subCategoryData = useSelector(
    (state) => state.rootReducer.subcategory_data
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    discounted_price: "",
    stock: "",
    barcode: "",
    low_stock_threshold: "",
    season_flag: "",
    sku: "",
    description: "",
    ingredients: "",
    cook_time: "",
    nutrition_info: "",
    calories: "",
    recipes: "",
    unit: "",
    flavour: "",
    expiry_date: "",
    manufacturing_date: "",
    is_veg: false,
  });

  const [variants, setVariants] = useState([]);

  const fields = useMemo(
    () => [
      { name: "name", label: "Product Name", type: "text" },
      { name: "price", label: "Price", type: "number" },
      { name: "discounted_price", label: "Discounted Price", type: "number" },
      { name: "barcode", label: "Barcode", type: "text" },
      {
        name: "low_stock_threshold",
        label: "Low Stock Threshold",
        type: "number",
      },
      { name: "stock", label: "Stock", type: "number" },
      { name: "sku", label: "SKU", type: "text" },
      { name: "description", label: "Description", type: "text" },
      { name: "cook_time", label: "Cook Time", type: "number" },
      { name: "calories", label: "Calories", type: "number" },
      { name: "unit", label: "Unit", type: "text" },
      { name: "flavour", label: "Flavour", type: "text" },
      { name: "manufacturing_date", label: "Manufacturing Date", type: "date" },
      { name: "expiry_date", label: "Expiry Date", type: "date" },
    ],
    []
  );

  const variantFields = useMemo(
    () => [
      { name: "variant_name", label: "Variant Name", type: "text" },
      { name: "price", label: "Price", type: "number" },
      {
        name: "discounted_price",
        label: "Discounted Price",
        type: "number",
      },
      { name: "barcode", label: "Barcode", type: "text" },
      { name: "stock", label: "Stock", type: "number" },
      { name: "sku", label: "SKU", type: "text" },
    ],
    []
  );

  const seasonOptions = useMemo(
    () => [
      { value: "", label: "Select Season" },
      { value: "summer", label: "Summer" },
      { value: "winter", label: "Winter" },
      { value: "monsoon", label: "Monsoon" },
      { value: "all", label: "All" },
    ],
    []
  );

  const filteredSubCategories = useMemo(() => {
    return subCategoryData.filter(
      (sub) => sub.category === Number(formData.category)
    );
  }, [subCategoryData, formData.category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (field) => (content) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: content,
    }));
  };
  const handleisveg = (e) => {
    setFormData((prev) => ({ ...prev, is_veg: e.target.checked }));
  };

  // Add variant handler
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        variant_name: "",
        price: "",
        discounted_price: "",
        barcode: "",
        stock: "",
        sku: "",
      },
    ]);
  };

  // Remove variant handler
  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "price",
      "category",
      "stock",
      "low_stock_threshold",
      "description",
    ];

    for (const field of requiredFields) {
      if (!formData[field].toString().trim()) {
        alert(`Please fill the ${field} field`);
        return;
      }
    }

    if (variants.length > 0) {
      for (let i = 0; i < variants.length; i++) {
        for (const key in variants[i]) {
          if (variants[i][key].toString().trim() === "") {
            alert(`Please fill all fields for Variant ${i + 1}`);
            return;
          }
        }
      }
    }

    const dataToSend = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory || null,
      price: formData.price,
      discounted_price: formData.discounted_price || null,
      stock: formData.stock,
      barcode: formData.barcode || null,
      low_stock_threshold: formData.low_stock_threshold,
      season_flag: formData.season_flag || "all",
      sku: formData.sku || null,
      description: formData.description || null,
      ingredients: formData.ingredients || null,
      cook_time: formData.cook_time ? parseInt(formData.cook_time) : 0,
      nutrition_info: formData.nutrition_info || null,
      calories: formData.calories ? parseInt(formData.calories) : 0,
      recipes: formData.recipes || null,
      unit: formData.unit || null,
      flavour: formData.flavour || null,
      expiry_date: formData.expiry_date
        ? new Date(formData.expiry_date).toISOString().split("T")[0]
        : null,
      manufacturing_date: formData.manufacturing_date
        ? new Date(formData.manufacturing_date).toISOString().split("T")[0]
        : null,
      is_veg: formData.is_veg,

      variants: variants.map((variant) => ({
        variant_name: variant.variant_name,
        price: variant.price,
        discounted_price: variant.discounted_price || null,
        stock: variant.stock,
        barcode: variant.barcode || null,
        sku: variant.sku || null,
      })),
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDk3MzU5LCJpYXQiOjE3NDIyMDEzNTksImp0aSI6ImNhYzQ1OTBmNjJlMzRlNDViMTlhOTA1MjVkZmZiMDY5IiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiVXNlciJ9.DDtPnQAgsN9_dnP3us0GIV1Y1-JEi3ydtXMXPpS_P74";

    try {
      const response = await fetch("http://167.88.42.205/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add product: ${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log("Server response:", responseData);

      alert("Product added successfully!");
      // Reset form
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        price: "",
        discounted_price: "",
        stock: "",
        barcode: "",
        low_stock_threshold: "",
        season_flag: "",
        sku: "",
        description: "",
        ingredients: "",
        cook_time: "",
        nutrition_info: "",
        calories: "",
        recipes: "",
        unit: "",
        flavour: "",
        expiry_date: "",
        manufacturing_date: "",
        is_veg: false,
      });
      setVariants([]);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error adding product: ${error.message}`);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="text-lg font-bold">Create Product</h4>
                <h6 className="text-sm">Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={route.productlist} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* /add */}
          <form
            className="bg-white rounded-md border w-full p-3 mb-10"
            onSubmit={handleSubmit}
          >
            <h2 className="text-base font-bold p-2">Product Information</h2>
            <hr />
            <div className="flex items-center gap-1 my-4">
              <input
                id="is_veg"
                name="is_veg"
                type="checkbox"
                checked={formData.is_veg}
                onChange={handleisveg}
              />
              <label
                htmlFor="is_veg"
                className="ml-2 block text-sm text-gray-900"
              >
                Is this product vegetarian?
              </label>
            </div>
            <div className="main-form my-6 grid grid-cols-2 gap-3">
              {fields.map(({ name, label, type }) => (
                <div key={name} className="flex flex-col gap-3">
                  <label className="text-black text-sm">{label}:</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    className="p-2 rounded border"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="p-2 rounded border"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoryData.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Category Dropdown */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Sub-Category:</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="p-2 rounded border"
                >
                  <option value="" disabled>
                    Select Sub-Category
                  </option>
                  {filteredSubCategories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3 h-fit">
                <label className="text-black text-sm">Ingredients:</label>
                <Editor
                  value={formData.ingredients}
                  onTextChange={(e) =>
                    handleEditorChange("ingredients")(e.htmlValue)
                  }
                  className="h-fit"
                />
              </div>

              <div className="flex flex-col gap-3 h-fit">
                <label className="text-black text-sm">
                  Nutrition Information:
                </label>
                <Editor
                  value={formData.nutrition_info}
                  onTextChange={(e) =>
                    handleEditorChange("nutrition_info")(e.htmlValue)
                  }
                  className="h-fit"
                />
              </div>

              <div className="flex flex-col gap-3 h-fit">
                <label className="text-black text-sm">Recipes:</label>
                <Editor
                  value={formData.recipes}
                  onTextChange={(e) =>
                    handleEditorChange("recipes")(e.htmlValue)
                  }
                  className="h-fit"
                />
              </div>
              {/* Category Dropdown */}

              {/* Season Dropdown */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Season:</label>
                <select
                  name="season_flag"
                  value={formData.season_flag}
                  onChange={handleChange}
                  className="p-2 rounded border"
                >
                  {seasonOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr></hr>
            {/* Variant Options */}
            <div id="product-variant-data" className="mt-2">
              <h2 className="text-base font-bold p-2">Variants Information</h2>
              <button
                type="button"
                className="btn btn-primary fs-13 fw-medium p-2 px-3 mt-2"
                onClick={addVariant}
              >
                Add Variant
              </button>

              {variants.map((variant, index) => (
                <div
                  key={index}
                  className={`variant-${index + 1} border-t pt-4 mt-4`}
                >
                  <h3 className="text-sm font-bold mb-2">
                    Variant {index + 1}
                  </h3>
                  <div className="main-form mt-2 mb-3 grid grid-cols-2 gap-3">
                    {variantFields.map(({ name, label, type }) => (
                      <div
                        key={`${index}-${name}`}
                        className="flex flex-col gap-3"
                      >
                        <label className="text-black text-sm">{label}:</label>
                        <input
                          type={type}
                          name={name}
                          placeholder={label}
                          value={variant[name]}
                          onChange={(e) =>
                            handleVariantChange(index, name, e.target.value)
                          }
                          className="p-2 rounded border"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger fs-13 fw-medium p-2 px-3"
                    onClick={() => removeVariant(index)}
                  >
                    Delete Variant
                  </button>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary mt-20">
              Add Product
            </button>
          </form>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
