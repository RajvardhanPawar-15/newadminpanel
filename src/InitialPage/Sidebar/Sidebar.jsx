import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarData } from "../../core/json/siderbar_data";
import { all_routes } from "../../Router/all_routes";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ChevronsLeft } from "feather-icons-react/build/IconComponents";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const route = all_routes;
  const Location = useLocation();
  const { t } = useTranslation();

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");
  const toggleSidebar = (title) => {
    setSubopen(title === subOpen ? "" : title);
  };
  const toggleSubsidebar = (subitem) => {
    setSubsidebar(subitem === subsidebar ? "" : subitem);
  };

  const [toggle, SetToggle] = useState(false);
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
  };

  const { expandMenus } = useSelector(
    (state) => state.themeSetting.expandMenus
  );
  const dataLayout = useSelector((state) => state.themeSetting.dataLayout);

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  return (
    <div>
      <div
        className={`hey sidebar ${toggle ? "" : "active"} ${
          expandMenus || dataLayout === "layout-hovered" ? "expand-menu" : ""
        }`}
        id="sidebar"
        onMouseLeave={expandMenu}
        onMouseOver={expandMenuOpen}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to={route.newdashboard} className="logo logo-normal">
            <ImageWithBasePath
              src="assets/img/IMRlogo.png"
              alt="Img"
              className="h-12 object-contain"
            />
          </Link>
          <Link to={route.newdashboard} className="logo logo-white">
            <ImageWithBasePath src="assets/img/IMRlogo.png" alt="Img" />
          </Link>
          <Link to={route.newdashboard} className="logo-small">
            <ImageWithBasePath src="assets/img/IMRlogo.png" alt="Img" />
          </Link>
          <Link id="toggle_btn" to="#" onClick={handlesidebar}>
            <ChevronsLeft className="feather-16" />
          </Link>
        </div>
        {/* /Logo */}
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {SidebarData?.filter(
                  (mainLabel) =>
                    ![
                      "Main",
                      "Finance & Accounts",
                      "People",
                      "HRM",
                      "Content (CMS)",
                      "User Management",
                      "Settings",
                      "Pages",
                      "UI Interface",
                    ].includes(mainLabel?.label)
                ).map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => {
                        let link_array = [];
                        title?.submenuItems?.forEach((link) => {
                          link_array.push(link?.link);
                          if (link?.submenu) {
                            link?.submenuItems?.forEach((item) => {
                              link_array.push(item?.link);
                            });
                          }
                        });
                        title.links = link_array;
                        return (
                          <li
                            className={`submenu ${
                              !title?.submenu &&
                              Location.pathname === title?.link
                                ? "custom-active-hassubroute-false"
                                : ""
                            }`}
                            key={i}
                          >
                            <Link
                              to={title?.link}
                              onClick={() => toggleSidebar(title?.label)}
                              className={`${
                                subOpen === title?.label ? "subdrop" : ""
                              } ${
                                title?.links?.includes(Location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <i className={`ti ti-${title.icon} me-2`}></i>
                              <span className="custom-active-span">
                                {t(title?.label)}
                              </span>
                              {title?.submenu && (
                                <span className="menu-arrow" />
                              )}
                            </Link>
                            <ul
                              style={{
                                display:
                                  subOpen === title?.label ? "block" : "none",
                              }}
                            >
                              {title?.submenuItems?.map((item, titleIndex) => (
                                <li
                                  className="submenu submenu-two"
                                  key={titleIndex}
                                >
                                  <Link
                                    to={item?.link}
                                    className={`${
                                      item?.submenuItems
                                        ?.map((link) => link.link)
                                        .includes(Location.pathname) ||
                                      item?.link === Location.pathname
                                        ? "active"
                                        : ""
                                    } ${
                                      subsidebar === item?.label
                                        ? "subdrop"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      toggleSubsidebar(item?.label)
                                    }
                                  >
                                    {item?.label}
                                    {item?.submenu && (
                                      <span className="menu-arrow inside-submenu" />
                                    )}
                                  </Link>
                                  <ul
                                    style={{
                                      display:
                                        subsidebar === item?.label
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    {item?.submenuItems?.map(
                                      (items, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            to={items?.link}
                                            className={`${
                                              items?.link === Location.pathname
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {items?.label}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
