import React, { useState } from "react";
import * as Yup from "yup";
import { AddCreate, CreateLeadList, leaddrop , dealerdropdown } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import classes from "./Addlead.module.css";

import { Form, message, Select } from "antd"; // Import Select from Ant Design

import { useToken } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";
import Requirements from "../Master/RequirementsMaster";

const { Option } = Select; // Destructure Option from Select

interface AddleadProps {
  isModalOpen: boolean;
  handleAddClose: () => void;
  handleModalClose: () => void;
}

interface DropItem {
  userId: number; // or string, depending on your data
  userName: string;
}

interface DropdownItem {
  RequirementsId: number;
  RequirementsName: string;
}

export function Addlead({ isModalOpen, handleAddClose, handleModalClose }: AddleadProps) {
  const token = useToken();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const [data, setData] = useState<DropdownItem[]>([]);
  const [drop, setDrop] = useState<DropItem[]>([]);


  const userValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    remarks: Yup.string(),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string(),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string(),
    contact_person: Yup.string(),
    address: Yup.string().required("Enter an Address"),
    area: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string(),
    alternative_no: Yup.string(),
    whatsapp_no: Yup.string(),
    customer_category_id: Yup.number(),
    enquiry_type_id: Yup.string(),
    requirements_id: Yup.number().required("Requirements ID is required"),
  });

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } = useFormik({
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
      formData.append("phone_country_code", values.phone_country_code || "+91");
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("requirements_id", values.requirements_id);

      CreateLeadList(formData)
        .then((res) => {
          message.success("Added Successfully");
          handleModalClose();
        })
        .catch((err) => {
          console.error("API Error:", err);
        });
    },
  });

  const handleDrop = () => {
    const formData = new FormData();
    formData.append("token", token);

    leaddrop(formData)
      .then((res) => {
        console.log(res.data); 
        if (Array.isArray(res.data.data)) {
          setData(res.data.data); 
        } else {
          console.error("Expected an array but got:", res.data);
        }
        message.success("Requirements loaded successfully");
      })
      .catch(() => console.log("Error fetching lead dropdown data"));
  };


  const handledealer = () => {
    const formData = new FormData();
    formData.append( "token", token);
    formData.append( "isDealer" , "1" )
    dealerdropdown(formData)
    .then((res) => {
      if (Array.isArray(res.data.data)) {
         setDrop(res.data.data); 
      } else {
        console.error("Expected an array but got:", res.data);
      }
      message.success("Requirements loaded successfully");
    })
    .catch(() => console.log("Error fetching lead dropdown data"));
    
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <h2>Add User</h2>
        <div className="row">
          <div className="col-md-6">
            {[
              "name",
              "remarks",
              "phone",
              "landline_number",
              "whatsapp_country_code",
              "alter_country_code",
              "company_name",
              "contact_person",
              "address",
              "email",
            ].map((field, index) => (
              <div key={index} className={classes.inputGroup}>
                <input
                  type="text"
                  name={field}
                  className={`${classes.formControl} ${touched[field as keyof typeof values] && errors[field as keyof typeof values] ? classes.isInvalid : ''}`}
                  placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[field as keyof typeof values]}
                />
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {[
              "state",
              "country",
              "phone_country_code",
          
              "assignedTo",
              "receivedDate",
              "referedPhone",
              "refer_country_code",
              "notes",
              "description",
            ].map((field, index) => (
              <div key={index} className={classes.inputGroup}>
                <input
                  type="text"
                  name={field}
                  className={`${classes.formControl} ${touched[field as keyof typeof values] && errors[field as keyof typeof values] ? classes.isInvalid : ''}`}
                  placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[field as keyof typeof values]}
                />
              </div>
            ))}
          </div>
        </div>

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
            </div>
            <div className={classes.inputGroup}>
              <Form.Item   name="dealer_id">

              <Select
  
    className={`${classes.formControl} ${touched.dealer_id && errors.dealer_id ? classes.isInvalid : ''}`}
    placeholder="Select dealer ID"
    onChange={(value) => handleChange({ target: { name: "dealer_id", value } })}
    onBlur={handleBlur}
    value={values.dealer_id}
    onClick={handledealer} // Call your handledealer function here
  >
    {Array.isArray(drop) && drop.length > 0 ? (
      drop.map((data) => (
        <Option key={data.userId} value={data.userId}>
          {data.userName}
        </Option>
      ))
    ) : (
      <Option disabled>No data available</Option>
    )}
  </Select>

              </Form.Item>
  
</div>

            <div className={classes.inputGroup}>
              <Form.Item name="requirement_id" label="Requirement Id">
              <Select
                
                onClick={handleDrop}
                className={`${classes.formControl} ${touched.requirements_id && errors.requirements_id ? classes.isInvalid : ''}`}
              
                onChange={(value) => {
                  handleChange({ target: { name: "requirements_id", value } });
                }}
                onBlur={handleBlur}
                value={values.requirements_id}
              >
                {Array.isArray(data) ? (
                  data.map((data) => (
                    <Option key={data.RequirementsId} value={data.RequirementsId}>
                      {data.RequirementsName}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No data available</Option>
                )}
              </Select>
              </Form.Item>
             
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
            </div>

            <div className={classes.inputGroup}>
              <input
                type="file"
                name="upload_file"
                className={`${classes.formControl} ${touched.upload_file && errors.upload_file ? classes.isInvalid : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
}

export default Addlead;
