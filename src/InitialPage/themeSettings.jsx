import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import ImageWithBasePath from "../core/img/imagewithbasebath";
// import { ColorPicker } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  resetAllMode,
  // setDataColor,
  setDataColorAll,
  // setDataLayout,
  // setDataSidebar,
  setDataSidebarAll,
  // setDataSidebarBg,
  setDataTheme,
  setDataTopbarAll,
  setDataTopBarColorAll,
  // setDataWidth,
  // setRtl,
  // setTopBarColor,
} from "../core/redux/themeSettingSlice";
// import { all_routes } from "../Router/all_routes";
const ThemeSettings = () => {
  const buyNow = () => {
    window.open(
      "https://themeforest.net/item/dreamspos-pos-inventory-management-admin-dashboard-template/38834413?s_rank=13",
      "_blank"
    );
  };

  const dispatch = useDispatch();

  // Redux state selectors
  const dataLayout = useSelector((state) => state.themeSetting.dataLayout);
  const dataWidth = useSelector((state) => state.themeSetting.dataWidth);
  const dataTopBar = useSelector((state) => state.themeSetting.dataTopBar);
  const dataTopBarColor = useSelector(
    (state) => state.themeSetting.dataTopBarColor
  );
  const dataTheme = useSelector((state) => state.themeSetting.dataTheme);
  const dataSidebarAll = useSelector(
    (state) => state.themeSetting.dataSidebarAll
  );
  const dataColorAll = useSelector((state) => state.themeSetting.dataColorAll);
  const dataTopBarColorAll = useSelector(
    (state) => state.themeSetting.dataTopBarColorAll
  );
  const dataTopbarAll = useSelector(
    (state) => state.themeSetting.dataTopbarAll
  );
  const dataSidebar = useSelector((state) => state.themeSetting.dataSidebar);
  const dataSidebarBg = useSelector(
    (state) => state.themeSetting.dataSidebarBg
  );
  const dataTopbarBg = useSelector((state) => state.themeSetting.dataTopbarBg);
  const dataColor = useSelector((state) => state.themeSetting.dataColor);

  // State for RGB colors
  const [colorRgb, setColorRgb] = useState(`rgb(${dataSidebarAll})`);
  const [colorRgb2, setColorRgb2] = useState(`rgb(${dataTopbarAll})`);
  const [colorRgb3, setColorRgb3] = useState(`rgb(${dataTopBarColorAll})`);
  const [colorRgb4, setColorRgb4] = useState(`rgb(${dataColorAll})`);
  // const [formatRgb, setFormatRgb] = useState("rgb");

  // RGB String calculations
  const rgbString = React.useMemo(
    () => (typeof colorRgb === "string" ? colorRgb : colorRgb?.toRgbString()),
    [colorRgb]
  );

  const rgbString2 = React.useMemo(
    () =>
      typeof colorRgb2 === "string" ? colorRgb2 : colorRgb2?.toRgbString(),
    [colorRgb2]
  );

  const rgbString3 = React.useMemo(
    () =>
      typeof colorRgb3 === "string" ? colorRgb3 : colorRgb3?.toRgbString(),
    [colorRgb3]
  );

  const rgbString4 = React.useMemo(
    () =>
      typeof colorRgb4 === "string" ? colorRgb4 : colorRgb4?.toRgbString(),
    [colorRgb4]
  );

  // Dispatch updates when color values change
  useEffect(() => {
    dispatch(setDataSidebarAll(rgbString.replace(/rgb\(|\)/g, "").trim()));
    dispatch(setDataTopbarAll(rgbString2.replace(/rgb\(|\)/g, "").trim()));
    dispatch(setDataTopBarColorAll(rgbString3.replace(/rgb\(|\)/g, "").trim()));
    dispatch(setDataColorAll(rgbString4.replace(/rgb\(|\)/g, "").trim()));
  }, [dispatch, rgbString, rgbString2, rgbString3, rgbString4]);

  // Event handlers for dispatching actions
  // const handleLayoutChange = (layout) => {
  //   dispatch(setDataLayout(layout));
  // };

  // const handleLayoutWidthChange = (layout) => {
  //   dispatch(setDataWidth(layout));
  // };

  // const handleTopBarColorChange = (color) => {
  //   dispatch(setTopBarColor(color));
  // };

  const handleDataThemeChange = (theme) => {
    dispatch(setDataTheme(theme));
  };

  // const handleDataSidebarChange = (theme) => {
  //   dispatch(setDataSidebar(theme));
  // };

  // const handleDataSidebarBgChange = (bg) => {
  //   dispatch(setDataSidebarBg(bg));
  // };

  // const handleDataColorChange = (bg) => {
  //   dispatch(setDataColor(bg));
  // };

  const handleReset = () => {
    dispatch(resetAllMode());
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-layout", dataLayout);
    document.documentElement.setAttribute("data-width", dataWidth);
    document.documentElement.setAttribute("data-sidebar", dataSidebar);
    document.documentElement.setAttribute("data-theme", dataTheme);
    document.documentElement.setAttribute("data-topbar", dataTopBar);
    document.documentElement.setAttribute("data-topbarcolor", dataTopBarColor);
    document.documentElement.setAttribute("data-color", dataColor);
    document.body.setAttribute("data-sidebarbg", dataSidebarBg);
    document.body.setAttribute("data-topbarbg", dataTopbarBg);
    setColorRgb(`rgb(${dataSidebarAll})`);
    setColorRgb2(`rgb(${dataTopbarAll})`);
    setColorRgb3(`rgb(${dataTopBarColorAll})`);
    setColorRgb4(`rgb(${dataColorAll})`);
  }, [
    dataLayout,
    dataWidth,
    dataSidebar,
    dataSidebarAll,
    dataTheme,
    dataSidebarBg,
    dataTopBarColor,
    dataTopBar,
    dataTopbarBg,
    dataColor,
    dataColorAll,
    dataTopBarColorAll,
    dataTopbarAll,
  ]);
  return (
    <>
      <>
        <div className="sidebar-contact hidden ">
          <div
            className="toggle-theme"
            data-bs-toggle="offcanvas"
            data-bs-target="#theme-setting"
          >
            <i className="fa fa-cog fa-w-16 fa-spin" />
          </div>
        </div>
        <div
          className="sidebar-themesettings offcanvas offcanvas-end"
          id="theme-setting"
        >
          <div className="offcanvas-header d-flex align-items-center justify-content-between bg-dark">
            <div>
              <h3 className="mb-1 text-white">Theme Customizer</h3>
              <p className="text-light">
                Switch between Light &amp; Dark mode.
              </p>
            </div>
            <Link
              to="#"
              className="custom-btn-close d-flex align-items-center justify-content-center text-white"
              data-bs-dismiss="offcanvas"
            >
              <i className="ti ti-x" />
            </Link>
          </div>
          <div className="themecard-body offcanvas-body">
            <div
              className="accordion accordion-customicon1 accordions-items-seperate"
              id="settingtheme"
            >
              <div className="accordion-item 5 border px-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16 px-0 py-3 bg-transparent"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#modesetting"
                    aria-expanded="true"
                  >
                    Theme Mode
                  </button>
                </h2>
                <div
                  id="modesetting"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body px-0 py3 border-top">
                    <div className="d-flex align-items-center">
                      <div className="theme-mode flex-fill text-center w-100 me-3">
                        <input
                          type="radio"
                          name="theme"
                          id="lightTheme"
                          defaultValue="light"
                          checked={dataTheme === "light" ? true : false}
                          onChange={() => handleDataThemeChange("light")}
                        />
                        <label
                          htmlFor="lightTheme"
                          className="rounded fw-medium w-100"
                        >
                          <span className="d-inline-flex rounded me-2">
                            <i className="ti ti-sun-filled" />
                          </span>
                          Light
                        </label>
                      </div>
                      <div className="theme-mode flex-fill text-center w-100 me-3">
                        <input
                          type="radio"
                          name="theme"
                          id="darkTheme"
                          defaultValue="dark"
                          checked={dataTheme === "dark" ? true : false}
                          onChange={() => handleDataThemeChange("dark")}
                        />
                        <label
                          htmlFor="darkTheme"
                          className="rounded fw-medium w-100"
                        >
                          <span className="d-inline-flex rounded me-2">
                            <i className="ti ti-moon-filled" />
                          </span>
                          Dark
                        </label>
                      </div>
                      <div className="theme-mode flex-fill text-center w-100 me-3">
                        <input
                          type="radio"
                          name="theme"
                          id="system"
                          defaultValue="system"
                          checked={dataTheme === "system" ? true : false}
                          onChange={() => handleDataThemeChange("system")}
                        />
                        <label
                          htmlFor="system"
                          className="rounded fw-medium w-100"
                        >
                          <span className="d-inline-flex rounded me-2">
                            <i className="ti ti-device-laptop" />
                          </span>
                          System
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 pt-0">
            <div className="row gx-3">
              <div className="col-6">
                <Link
                  to="#"
                  id="resetbutton"
                  className="btn btn-light close-theme w-100"
                  onClick={handleReset}
                >
                  <i className="ti ti-restore me-1" />
                  Reset
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to="#"
                  className="btn btn-primary w-100"
                  onClick={buyNow}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="ti ti-shopping-cart-plus me-1" />
                  Buy Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ThemeSettings;
