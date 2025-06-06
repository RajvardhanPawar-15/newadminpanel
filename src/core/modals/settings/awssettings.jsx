import React from 'react'

const AwsSettings = () => {
  return (
    <div>
      <>
        {/* Aws Config */}
        <div className="modal fade" id="aws-config">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>AWS Settings</h4>
                    </div>
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-auto me-2">
                      <input
                        type="checkbox"
                        id="user4"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="user4" className="checktoggle">
                        {" "}
                      </label>
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              AWS Access Key <span> *</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Secret Key <span> *</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              {" "}
                              Bucket Name <span> *</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              {" "}
                              Region <span> *</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-0">
                            <label className="form-label">
                              {" "}
                              Base URL <span> *</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer-btn">
                        <button
                          type="button"
                          className="btn btn-cancel me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="button" className="btn btn-submit" data-bs-dismiss="modal">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Aws Config */}
      </>

    </div>
  )
}

export default AwsSettings
