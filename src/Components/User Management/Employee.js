import React, { useEffect, useState } from "react";
import { admin, add, deleteCard, ViewCard, update, userDropdown } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Employee.module.css";
import { message, Typography, Input, Select, Form } from "antd"; 

function Employee() {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { Option } = Select;
  const [deleteModal, setDeleteModal] = useState(false); // State for delete modal

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    let formdata=new FormData();
    formdata.append('token',selector.token);
    formdata.append("isDealer",1);
    userDropdown(formdata).then((res)=>{
      setDropdown(res.data.data);
    })
  };

  const handleEditUser = (userId) => {
    setUserId(userId);
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("userId", userId);
    ViewCard(formData).then((response) => {
      const card = response.data.data;
      setValues({
        userName: card.userName || "",
        name: card.name || "",
        phoneNumber: card.phoneNumber || "",
        email: card.email || "",
        city: card.city || "",
        state: card.state || "",
        country: card.country || "",
        password: card.password || "",
        pincode: card.pincode || "",
        landline_Number: card.landline_Number || "",
        dealer_id: card.dealer_id || "",
        userId: card.userId || "",
      });
      setIsModalOpen(true);
      setIsEditMode(true);
    });
  };

  const handleDeleteUser = (userId) => {
    setUserId(userId); // Save userId for deletion confirmation
    setDeleteModal(true); // Open delete modal
  };

  const confirmDelete = () => {
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("userId", userId);
    deleteCard(formData)
      .then(() => {
        setData(data.filter((item) => item.userId !== userId));
        message.success("Deleted Successfully");
        closeModal(); // Close modal after successful deletion
      })
      .catch((err) => console.log("API Error:", err));
  };

  const closeModal = () => {
    setDeleteModal(false); // Close delete modal
  };

  const loadAdminData = () => {
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("type", "4");
    admin(formData)
      .then((res) => setData(res.data.data.items))
      .catch((err) => console.log("API Error:", err));
  };

  useEffect(() => {
    if (selector.token) {
      loadAdminData();
    }
  }, [selector.token]);

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string().required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string().required("Password is required"),
    pincode: Yup.number().required("Pincode is required"),
    landline_Number: Yup.number().required("Landline Number is required"),
    dealer_id: Yup.number().required("Dealer ID is required"),
  });

  const handleSubmitValues = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", selector.token);
    formData.append("userType", "4");
  
   
  
      update(formData)
        .then(() => {
          loadAdminData();
          handleModalClose();
          message.success("Updated Successfully");
        })
        .catch((err) => console.log("API Error:", err));
  
      add(formData)
        .then(() => {
          loadAdminData();
          handleModalClose();
          message.success("Added Successfully");
  
          console.log("Fetching dropdown options...");
        })
    
  };
  

  const { handleChange, handleSubmit, errors, touched, values, setValues } = useFormik({
    initialValues: {
      userName: "",
      name: "",
      phoneNumber: "",
      email: "",
      city: "",
      state: "",
      country: "",
      password: "",
      pincode: "",
      landline_Number: "",
      dealer_id: "",
    },
    validationSchema: userValidation,
    onSubmit: handleSubmitValues,
  });
console.log(dropdown);
  return (
    <>
      <div className={classes.tableContainer}>
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>
                    <button type="button" onClick={() => handleEditUser(item.userId)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteUser(item.userId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isEditMode ? "Edit User" : "Add User"}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit} className={classes.formContainer}>
                    {Object.keys(values).map((key) => (
                      <div key={key} className={classes.inputGroup}>
                        <input
                          type={key === "email" ? "email" : "text"}
                          name={key}
                          className={`${classes.formControl} ${touched[key] && errors[key] ? classes.isInvalid : ''}`}
                          placeholder={`Enter ${key.replace('_', ' ')}`}
                          onChange={handleChange}
                          value={values[key]}
                        />
                        {touched[key] && errors[key] && (
                          <div className={classes.invalidFeedback}>{errors[key]}</div>
                        )}
                      </div>
                    ))}
                  
                  <Form.Item label="Dealer ID">
  <Select
    name="dealer_id"
    value={values.dealer_id}
    onChange={(value) => setValues({ ...values, dealer_id: value })}
    dropdownStyle={{ zIndex: 2500 }}
  >
    {dropdown.map((option) => (
      <Option key={option.userId} value={option.userId}>
        {option.userName}
      </Option>
    ))}
  </Select>
  {touched.dealer_id && errors.dealer_id ? (
    <div className={classes.invalidFeedback}>{errors.dealer_id}</div>
  ) : null}
</Form.Item>


                    <button type="submit" className="btn btn-primary">
                      {isEditMode ? "Update" : "Add"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteModal && (
          <div className="modal show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this user?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={confirmDelete}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Employee;
