import React from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { all_routes } from "../../Router/all_routes";
import CommonFooter from "../../core/common/footer/commonFooter";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const NewDashboard = () => {
  const route = all_routes;

  const salesDayChart = {
    chart: {
      height: 245,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#fc931c", "#dbdbdb"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 3,
        borderRadiusWhenStacked: "all",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    series: [
      {
        name: "Sales",
        data: [18, 20, 10, 18, 25, 18, 10, 20, 40, 8, 30, 20],
      },
      {
        name: "Purchase",
        data: [40, 30, 30, 50, 40, 50, 30, 30, 50, 30, 40, 30],
      },
    ],
    xaxis: {
      categories: [
        "2 am",
        "4 am",
        "6 am",
        "8 am",
        "10 am",
        "12 am",
        "14 pm",
        "16 pm",
        "18 pm",
        "20 pm",
        "22 pm",
        "24 pm",
      ],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}K`,
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: {
        left: -16,
        top: 0,
        bottom: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const customerChart = {
    chart: {
      type: "radialBar",
      height: 130,
      width: "100%",
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "30%",
        },
        track: {
          background: "#E6EAED",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            offsetY: -5,
          },
          value: {
            offsetY: 5,
          },
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#E04F16", "#0E9384"],
    labels: ["First Time", "Return"],
  };

  const series = [70, 70];

  return (
    <div className="page-wrapper dashboard-current">
      <div className="content">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
          <div className="mb-3">
            <h1 className="mb-1 font-bold text-xl">Welcome, Ganesh Bhel</h1>
          </div>
        </div>
        {/* FIRST COLUMN  */}
        <div className="row sales-row">
          <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-primary fs-16 me-2">
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                </div>
                <ul className="nav btn-group custom-btn-group">
                  <Link className="btn btn-outline-light" to="#">
                    1D
                  </Link>
                  <Link className="btn btn-outline-light" to="#">
                    1W
                  </Link>
                  <Link className="btn btn-outline-light" to="#">
                    1M
                  </Link>
                  <Link className="btn btn-outline-light" to="#">
                    3M
                  </Link>
                  <Link className="btn btn-outline-light" to="#">
                    6M
                  </Link>
                  <Link className="btn btn-outline-light active" to="#">
                    1Y
                  </Link>
                </ul>
              </div>
              <div className="card-body pb-0">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="border p-2 br-8">
                      <p className="d-inline-flex align-items-center mb-1">
                        <i className="ti ti-circle-filled fs-8 text-primary-300 me-1" />
                        Total Purchase
                      </p>
                      <h4>120k</h4>
                    </div>
                    <div className="border p-2 br-8">
                      <p className="d-inline-flex align-items-center mb-1">
                        <i className="ti ti-circle-filled fs-8 text-[#fc931c] me-1" />
                        Total Sales
                      </p>
                      <h4>50k</h4>
                    </div>
                  </div>
                  <div id="sales-daychart">
                    <Chart
                      options={salesDayChart}
                      series={salesDayChart.series}
                      type="bar"
                      height={245}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-xl-5 d-flex">
            <div className="card flex-fill h-fit">
              <div className="card-header">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-info fs-16 me-2">
                    <i className="ti ti-info-circle" />
                  </span>
                  <h5 className="card-title mb-0">Overall Information</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-[#fc931c]  fs-24">
                        <i className="ti ti-building-store" />
                      </div>
                      <p className="mb-1">Franchises</p>
                      <h5 className="font-bold">50</h5>
                    </div>
                  </div>
                  <div>
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-[#fc931c]  fs-24">
                        <i className="ti ti-truck-delivery" />
                      </div>
                      <p className="mb-1">Orders</p>
                      <h5 className="font-bold">500+</h5>
                    </div>
                  </div>
                  <div>
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-[#fc931c]   fs-24">
                        <i className="ti ti-stack-3" />
                      </div>
                      <p className="mb-1">Products</p>
                      <h5 className="font-bold">200+</h5>
                    </div>
                  </div>
                  <div>
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-[#fc931c]   fs-24">
                        <i className="ti ti-category" />
                      </div>
                      <p className="mb-1">Categories</p>
                      <h5 className="font-bold">40</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FIRST COLUMN  */}

        {/* SECOND COLUMN  */}
        <div className="row color-card-row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-primary sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-primary">
                  <i className="ti ti-file-text fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">0</h4>
                    <span className="badge badge-soft-primary">
                      <i className="ti ti-arrow-up me-1" />
                      0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-secondary sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-secondary">
                  <i className="ti ti-repeat fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Sales Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">0</h4>
                    <span className="badge badge-soft-danger">
                      <i className="ti ti-arrow-down me-1" />
                      0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-teal sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-teal">
                  <i className="ti ti-gift fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">0</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-info sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-white text-info">
                  <i className="ti ti-brand-pocket fs-24" />
                </span>
                <div className="ms-2">
                  <p className="text-white mb-1">Total Purchase Return</p>
                  <div className="d-inline-flex align-items-center flex-wrap gap-2">
                    <h4 className="text-white">0</h4>
                    <span className="badge badge-soft-success">
                      <i className="ti ti-arrow-up me-1" />0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SECOND COLUMN  */}
      </div>
      <CommonFooter />
    </div>
  );
};

export default NewDashboard;
