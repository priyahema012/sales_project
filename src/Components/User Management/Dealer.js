import React, { useEffect, useState } from "react";
import { admin, add, deleteCard, ViewCard, update } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Dealer.module.css";
import DeleteModule from "../Model/DeleteModule";
import { message } from "antd";


function Dealer() {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
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
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("userId", userId);
    deleteCard(formData)
      .then(() => {
        setData(data.filter((item) => item.userId !== userId));
        message.success("Deleted Successfully");
      })
      .catch((err) => console.log("API Error:", err));
  };


//   const handleDeleteUser=(values)=>{
//     setUserid(values);
    
//     dispatch(handledeleteds(true));
// }

  const loadAdminData = () => {
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("type", "3");
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
    formData.append("userType", "3");

    if (isEditMode) {
      update(formData)
        .then(() => {
          loadAdminData();
          handleModalClose();
          message.success("Edited Successfully");
        })
        .catch((err) => console.log("API Error:", err));
    } else {
      add(formData)
        .then(() => {
          loadAdminData();
          handleModalClose();
          message.success("added Successfully");
        })
        .catch((err) => console.log("API Error:", err));
    }
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
                <tr key={item.userId}>
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
                          type={ "text"}
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
                    <button type="submit" className={classes.submitButton}>
                      {isEditMode ? "Update" : "Add"} User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dealer;
