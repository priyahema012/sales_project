import React from "react";
import * as Yup from "yup";
import { add } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { message, Typography, Input } from "antd"; 
import classes from "./AddModule.module.css";


export default function AdminModule({ showModal, handleAddClose }) {
  const selector = useSelector((state) => state.auth);

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    state: Yup.string(),
    country: Yup.string(),
    landline_Number: Yup.number(),
    password: Yup.string().required("Password is required"),
    pincode: Yup.number(),
    city: Yup.string(),
    dealer_id: Yup.number()
  });

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      userName: "",
      name: "",
      phoneNumber: "",
      email: "",
      landline_Number: "",
      state: "",
      country: "",
      city: "",
      password: "",
      pincode: "",
      dealer_id: ""
    },
    validationSchema: userValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("token", selector.token);
      formData.append("name", values.name);
      formData.append("userName", values.userName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("userType", "2");
      formData.append("city", values.city);
      formData.append("landline_number", values.landline_Number);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("password", values.password);
      formData.append("pincode", values.pincode);
      formData.append("dealer_id", values.dealer_id);

      add(formData)
        .then(() => {
          console.log("success");
          handleAddClose();
          message.success("Added Succesfully");
        })
        .catch((err) => {
          console.log("API Error:", err);
        });

        

    }
  });

  return (
    <div>
      {showModal && (
       <div className="modal show" style={{ display: "block" }} tabIndex="-1">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <button
               type="button"
               className="btn-close"
               aria-label="Close"
               onClick={handleAddClose}
             ></button>
           </div>
           <div className="modal-body">
             <form onSubmit={handleSubmit} className={classes.formContainer}>
               <h2>Add User</h2>
               <div className="row">
                 <div className="col-md-6">
                   <div className={classes.inputGroup}>
                     <input
                       type="text"
                       name="name"
                       className={`${classes.formControl} ${touched.name && errors.name ? classes.isInvalid : ''}`}
                       placeholder="Enter your name"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.name}
                     />
                     {touched.name && errors.name && (
                       <div className={classes.invalidFeedback}>
                         {errors.name === "required" ? "Name is required." : errors.name}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="text"
                       name="userName"
                       className={`${classes.formControl} ${touched.userName && errors.userName ? classes.isInvalid : ''}`}
                       placeholder="Enter your username"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.userName}
                     />
                     {touched.userName && errors.userName && (
                       <div className={classes.invalidFeedback}>
                         {errors.userName === "required"
                           ? "Username is required."
                           : errors.userName}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="number"
                       name="phoneNumber"
                       className={`${classes.formControl} ${touched.phoneNumber && errors.phoneNumber ? classes.isInvalid : ''}`}
                       placeholder="Enter your phone number"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.phoneNumber}
                     />
                     {touched.phoneNumber && errors.phoneNumber && (
                       <div className={classes.invalidFeedback}>
                         {errors.phoneNumber === "required"
                           ? "Phone number is required."
                           : errors.phoneNumber}
                       </div>
                     )}
                   </div>
                 </div>
                 <div className="col-md-6">
                   <div className={classes.inputGroup}>
                     <input
                       type="email"
                       name="email"
                       className={`${classes.formControl} ${touched.email && errors.email ? classes.isInvalid : ''}`}
                       placeholder="Enter your email"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.email}
                     />
                     {touched.email && errors.email && (
                       <div className={classes.invalidFeedback}>
                         {errors.email === "required"
                           ? "Email is required."
                           : errors.email === "invalidEmail"
                           ? "Please enter a valid email."
                           : errors.email}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="number"
                       name="landline_Number"
                       className={`${classes.formControl} ${touched.landline_Number && errors.landline_Number ? classes.isInvalid : ''}`}
                       placeholder="Enter your landline number"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.landline_Number}
                     />
                     {touched.landline_Number && errors.landline_Number && (
                       <div className={classes.invalidFeedback}>
                         {errors.landline_Number === "required"
                           ? "Landline number is required."
                           : errors.landline_Number}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="text"
                       name="state"
                       className={`${classes.formControl} ${touched.state && errors.state ? classes.isInvalid : ''}`}
                       placeholder="Enter your state"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.state}
                     />
                     {touched.state && errors.state && (
                       <div className={classes.invalidFeedback}>
                         {errors.state === "required"
                           ? "State is required."
                           : errors.state}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="text"
                       name="city"
                       className={`${classes.formControl} ${touched.city && errors.city ? classes.isInvalid : ''}`}
                       placeholder="Enter your city"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.city}
                     />
                     {touched.city && errors.city && (
                       <div className={classes.invalidFeedback}>
                         {errors.city === "required" ? "City is required." : errors.city}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="text"
                       name="country"
                       className={`${classes.formControl} ${touched.country && errors.country ? classes.isInvalid : ''}`}
                       placeholder="Enter your country"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.country}
                     />
                     {touched.country && errors.country && (
                       <div className={classes.invalidFeedback}>
                         {errors.country === "required"
                           ? "Country is required."
                           : errors.country}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="password"
                       name="password"
                       className={`${classes.formControl} ${touched.password && errors.password ? classes.isInvalid : ''}`}
                       placeholder="Enter your password"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.password}
                     />
                     {touched.password && errors.password && (
                       <div className={classes.invalidFeedback}>
                         {errors.password === "required"
                           ? "Password is required."
                           : errors.password}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="number"
                       name="pincode"
                       className={`${classes.formControl} ${touched.pincode && errors.pincode ? classes.isInvalid : ''}`}
                       placeholder="Enter your pincode"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.pincode}
                     />
                     {touched.pincode && errors.pincode && (
                       <div className={classes.invalidFeedback}>
                         {errors.pincode === "required"
                           ? "Pincode is required."
                           : errors.pincode}
                       </div>
                     )}
                   </div>
                   <div className={classes.inputGroup}>
                     <input
                       type="number"
                       name="dealer_id"
                       className={`${classes.formControl} ${touched.dealer_id && errors.dealer_id ? classes.isInvalid : ''}`}
                       placeholder="Enter dealer ID"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.dealer_id}
                     />
                     {touched.dealer_id && errors.dealer_id && (
                       <div className={classes.invalidFeedback}>
                         {errors.dealer_id === "required"
                           ? "Dealer ID is required."
                           : errors.dealer_id}
                       </div>
                     )}
                   </div>
                 </div>
               </div>
               <div className="d-grid gap-2 mt-3">
                 <button
                   type="submit"
                   className="btn btn-primary"
                   
                 >
                   Add User
                 </button>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
     
      )}
    </div>
  );
}
