import { PlusCircle } from 'feather-icons-react/build/IconComponents'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const AddUsers = () => {
    const status = [
        { value: 'Choose', label: 'Choose' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Admin', label: 'Admin' },
    ];
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const handleToggleConfirmPassword = () => {
        setConfirmPassword((prevShowPassword) => !prevShowPassword);
    };
  
    return (
        <div>
            {/* Add User */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add User</h4>
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
                                <div className="modal-body custom-modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="new-employee-field">
                                                    <span>Avatar</span>
                                                    <div className="profile-pic-upload mb-2">
                                                        <div className="profile-pic">
                                                            <span>
                                                                <PlusCircle className="plus-down-add" />
                                                                Profile Photo
                                                            </span>
                                                        </div>
                                                        <div className="input-blocks mb-0">
                                                            <div className="image-upload mb-0">
                                                                <input type="file" />
                                                                <div className="image-uploads">
                                                                    <h4>Change Image</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>User Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Role</label>

                                                    <Select
                                                        classNamePrefix="react-select"
                                                        options={status}
                                                        placeholder="Choose Status"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Password</label>
                                                    <div className="pass-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="pass-input"
                                                            placeholder="Enter your password"
                                                        />
                                                        <span
                                                            className={`ti toggle-password ${showPassword ? 'ti-eye' : 'ti-eye-off'}`}
                                                            onClick={handleTogglePassword}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Confirm Passworrd</label>
                                                    <div className="pass-group">
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            className="pass-input"
                                                            placeholder="Enter your password"
                                                        />
                                                        <span
                                                            className={`ti   toggle-password  ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}
                                                            onClick={handleToggleConfirmPassword}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-0 input-blocks">
                                                    <label className="form-label">Descriptions</label>
                                                    <textarea
                                                        className="form-control mb-1"
                                                        defaultValue={"Type Message"}
                                                    />
                                                    <p>Maximum 600 Characters</p>
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
                                            <Link to="#" className="btn btn-submit">
                                                Submit
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add User */}
        </div>
    )
}

export default AddUsers
