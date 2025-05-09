import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FrontendSetting = () => {
  const CATEGORY_DATA = useSelector(
    (state) => state.rootReducer.categotylist_data
  );

  const [tabData, setTabData] = useState({
    name: "",
    position: 1,
    icon: null,
    is_active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setTabData({ ...tabData, [name]: files[0] });
    } else if (type === "radio") {
      setTabData({ ...tabData, [name]: value === "Yes" });
    } else {
      setTabData({ ...tabData, [name]: value });
    }
  };

  const displayChoices = [
    { value: "category", label: "Category" },
    { value: "subcategory", label: "Subcategory" },
    { value: "product", label: "Product" },
  ];

  const viewByChoices = [
    { value: "most_viewed", label: "Most Viewed" },
    { value: "latest", label: "Latest" },
    { value: "discounted", label: "Discounted" },
    { value: "bestsellers", label: "Bestsellers" },
    { value: "seasonal", label: "Seasonal" },
    { value: "trending", label: "Trending" },
    { value: "combo_offers", label: "Combo Offers" },
    { value: "low_stock", label: "Low Stock" },
    { value: "high_rated", label: "High Rated" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4 className="text-lg font-bold">Homepage Settings</h4>
              <h6 className="text-sm">Edit Homepage Content</h6>
            </div>
          </div>
        </div>
        <form className="bg-white rounded-md border w-full p-3 mb-10">
          <div id="tab-setting">
            <h2 className="text-base font-bold p-2">Tab Settings</h2>
            <hr />
            <div className="my-4 grid grid-cols-3 gap-3">
              {/* Name field - text input */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Tab Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Tab Name"
                  value={tabData.name}
                  onChange={handleInputChange}
                  className="p-2 rounded border"
                />
              </div>

              {/* Position field - dropdown */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Tab Position</label>
                <select
                  name="position"
                  value={tabData.position}
                  onChange={handleInputChange}
                  className="p-2 rounded border"
                >
                  {[1, 2, 3, 4, 5].map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              {/* Icon field - file input */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Tab Icon</label>
                <input
                  type="file"
                  name="icon"
                  accept=".svg,.jpeg,.jpg"
                  onChange={handleInputChange}
                  className="p-2 rounded border"
                />
              </div>

              {/* Is active field - radio buttons */}
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Tab Visibility</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="active-yes"
                      name="is_active"
                      value="Yes"
                      checked={tabData.is_active === true}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="active-yes">Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="active-no"
                      name="is_active"
                      value="No"
                      checked={tabData.is_active === false}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="active-no">No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="tab-sections-settings my-5">
            <h2 className="text-base font-bold p-2">Tab Sections</h2>
            <hr />
            <div className="my-4 grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Section Name</label>
                <input
                  type="text"
                  name="name"
                  className="p-2 rounded border"
                  placeholder="Section Name"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">
                  Section Description
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-2 rounded border"
                  placeholder="Section Description"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">Section type</label>
                <select className="p-2 rounded border">
                  {displayChoices.map(({ value, label }) => (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">
                  Select which category to display
                </label>
                <select className="p-2 rounded border">
                  {CATEGORY_DATA.map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-black text-sm">View By</label>
                <select className="p-2 rounded border">
                  {viewByChoices.map(({ value, label }) => (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit button */}

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default FrontendSetting;



