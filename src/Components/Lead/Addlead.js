import React, { useState } from "react";
import * as Yup from "yup";
import { AddCreate, CreateLeadList, LeadList } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import classes from "./Addlead.module.css";
import Lead from "./Lead";
import { message, Typography, Input } from "antd";

import { useToken } from "../../Utility/hooks";

export function Addlead({ isModalOpen, handleAddClose, handleModalClose }) {
  const token = useToken();
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const userValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    remarks: Yup.string(),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string(),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string(),
    contact_person: Yup.string(),
    address: Yup.string().required("enter a Address "),
    area: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string(),
    alternative_no: Yup.string(),
    whatsapp_no: Yup.string(),
    customer_category_id: Yup.number(),
    enquiry_type_id: Yup.string(),
    requirements_id: Yup.number().required("Requirements ID is required"),
  });

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        name: "",
        remarks: "",
        phone_country_code: "",
        landline_number: "",
        whatsapp_country_code: "",
        alter_country_code: "",
        company_name: "",
        contact_person: "",
        address: "",
        area: "",
        phone: "",
        email: "",
        alternative_no: "",
        whatsapp_no: "",
        customer_category_id: "",
        enquiry_type_id: "",
        requirements_id: "",
        state: "",
        country: "",
        city: "",
        dealer_id: "",
        assignedTo: "",
        receivedDate: "",
        referedBy: "",
        referedPhone: "",
        refer_country_code: "",
        notes: "",
        description: "",
        isNew: "",
        latitude: "",
        longitude: "",
        customerId: "",
        Pincode: "",
        schedule_date: "",
        upload_file: "",
        approximate_amount: "",
      },

      validationSchema: userValidation,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append("token", token);

        formData.append("name", values.name);
        formData.append(
          "phone_country_code",
          values.phone_country_code || "+91"
        );
        formData.append("address", values.address);
        formData.append("phone", values.phone);
        formData.append("requirements_id", values.requirements_id);

        console.log("formdata");
        CreateLeadList(formData)
          .then((res) => {
            console.log("Successfully submitted");
            message.success("Added Successfully ");
            handleModalClose();
          })
          .catch((err) => {
            console.error("API Error:", err);
          });

      
      },
    });

    return (
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <h2>Add User</h2>
          <div className="row">
            <div className="col-md-6">
              {[
                'name',
                'remarks',
                'phone',
                'landline_number',
                'whatsapp_country_code',
                'alter_country_code',
                'company_name',
                'contact_person',
                'address',
                'email'
              ].map((field, index) => (
                <div key={index} className={classes.inputGroup}>
                  <input
                    type={
                      field === 'phone' ||
                      field === 'landline_number' ||
                      field === 'email'
                        ? 'text'
                        : 'text'
                    }
                    name={field}
                    className={`${classes.formControl} ${touched[field] && errors[field] ? classes.isInvalid : ''}`}
                    placeholder={`Enter your ${field.replace(/_/g, ' ')}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field]}
                  />
                  {touched[field] && errors[field] && (
                    <div className={classes.invalidFeedback}>{errors[field]}</div>
                  )}
                </div>
              ))}
            </div>
  
            <div className="col-md-6">
              {[
                'state',
                'country',
                'phone_country_code',
                'dealer_id',
                'assignedTo',
                'receivedDate',
                'referedPhone',
                'refer_country_code',
                'notes',
                'description'
              ].map((field, index) => (
                <div key={index} className={classes.inputGroup}>
                  <input
                    type={
                      field.includes('number') || field.includes('Pincode')
                        ? 'number'
                        : 'text'
                    }
                    name={field}
                    className={`${classes.formControl} ${touched[field] && errors[field] ? classes.isInvalid : ''}`}
                    placeholder={`Enter your ${field.replace(/_/g, ' ')}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field]}
                  />
                  {touched[field] && errors[field] && (
                    <div className={classes.invalidFeedback}>{errors[field]}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          {/* Row for latitude, longitude, customerId, Pincode, requirements_id, and upload_file */}
          <div className="row">
            <div className="col-md-6">
              <div className={classes.inputGroup}>
                <input
                  type="text"
                  name="latitude"
                  className={`${classes.formControl} ${touched.latitude && errors.latitude ? classes.isInvalid : ''}`}
                  placeholder="Enter latitude"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.latitude}
                />
                {touched.latitude && errors.latitude && (
                  <div className={classes.invalidFeedback}>{errors.latitude}</div>
                )}
              </div>
  
              <div className={classes.inputGroup}>
                <input
                  type="text"
                  name="customerId"
                  className={`${classes.formControl} ${touched.customerId && errors.customerId ? classes.isInvalid : ''}`}
                  placeholder="Enter customer ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.customerId}
                />
                {touched.customerId && errors.customerId && (
                  <div className={classes.invalidFeedback}>{errors.customerId}</div>
                )}
              </div>
  
              <div className={classes.inputGroup}>
                <input
                  type="number"
                  name="requirements_id"
                  className={`${classes.formControl} ${touched.requirements_id && errors.requirements_id ? classes.isInvalid : ''}`}
                  placeholder="Enter requirements ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.requirements_id}
                />
                {touched.requirements_id && errors.requirements_id && (
                  <div className={classes.invalidFeedback}>{errors.requirements_id}</div>
                )}
              </div>
            </div>
  
            <div className="col-md-6">
              <div className={classes.inputGroup}>
                <input
                  type="text"
                  name="longitude"
                  className={`${classes.formControl} ${touched.longitude && errors.longitude ? classes.isInvalid : ''}`}
                  placeholder="Enter longitude"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.longitude}
                />
                {touched.longitude && errors.longitude && (
                  <div className={classes.invalidFeedback}>{errors.longitude}</div>
                )}
              </div>
  
              <div className={classes.inputGroup}>
                <input
                  type="number"
                  name="Pincode"
                  className={`${classes.formControl} ${touched.Pincode && errors.Pincode ? classes.isInvalid : ''}`}
                  placeholder="Enter Pincode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Pincode}
                />
                {touched.Pincode && errors.Pincode && (
                  <div className={classes.invalidFeedback}>{errors.Pincode}</div>
                )}
              </div>
  
              <div className={classes.inputGroup}>
                <input
                  type="file"
                  name="upload_file"
                  className={`${classes.formControl} ${touched.upload_file && errors.upload_file ? classes.isInvalid : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.upload_file && errors.upload_file && (
                  <div className={classes.invalidFeedback}>{errors.upload_file}</div>
                )}
              </div>
            </div>
          </div>
  
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Addlead;