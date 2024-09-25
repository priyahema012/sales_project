import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { viewlead, updatelead } from "../../axios/Services";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import { message } from "antd";
import { useToken } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import classes from "./Edit.module.css";


interface EditModelProps {
  selectedLeadId: string | null;
  loadAdminData: () => void;
  userid: string;
  leadId: string;
  closeModal: () => void;
}

interface LeadData {
  name: string;
  phone_country_code: string;
  address: string;
  phone: string;
  requirements_id: string;
}

interface FormikData extends LeadData {
  remarks: string;
  state: string;
  country: string;
  city: string;
  dealer_id: string;
  assignedTo: string;
  receivedDate: string;
  referedBy: string;
  referedPhone: string;
  refer_country_code: string;
  notes: string;
  description: string;
  isNew: string;
  latitude: string;
  longitude: string;
  customerId: string;
  Pincode: string;
  schedule_date: string;
  upload_file: string;
  approximate_amount: string;
  landline_number: string;
  company_name: string;
  whatsapp_country_code: string;
  alter_country_code: string;
  contact_person: string;
  email: string;
}

function Editlead({
  selectedLeadId,
  loadAdminData,
  closeModal,
  leadId,
  userid,
}: EditModelProps) {
  const token = useToken();
  const { state: editdata } = useLocation();

  const [data, setData] = useState<LeadData>({
    name: "",
    phone_country_code: "",
    address: "",
    phone: "",
    requirements_id: "",
  });

  useEffect(() => {
    if (token && editdata) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("leadId", editdata.leadId);

      viewlead(formData)
        .then((response) => {
          const leadData = response.data?.data || {};
          setData({
            name: leadData.name || "",
            phone_country_code: leadData.phone_country_code || "",
            address: leadData.address || "",
            phone: leadData.phone || "",
            requirements_id: leadData.requirements_id || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching lead details", error);
        });
    }
  }, [token, editdata]);

  const userValidationSchema = Yup.object({
    name: Yup.string(),
    phone_country_code: Yup.string(),
    address: Yup.string(),
    phone: Yup.string(),
    requirements_id: Yup.string(),
    remarks: Yup.string(),
    state:Yup.string(),
    country: Yup.string(),
    city:Yup.string(),
    dealer_id: Yup.string(),
    assignedTo: Yup.string(),
    receivedDate: Yup.string(),
    referedBy: Yup.string(),
    referedPhone: Yup.string(),
    refer_country_code: Yup.string(),
    notes: Yup.string(),
    description:Yup.string(),
    isNew:Yup.string(),
    latitude: Yup.string(),
    longitude: Yup.string(),
    customerId: Yup.string(),
    Pincode: Yup.number(),
    schedule_date: Yup.string(),
    upload_file: Yup.string(),
    approximate_amount: Yup.string(),
    landline_number: Yup.string(),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string(),
    contact_person: Yup.string(),
    email: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name,
      phone_country_code: data.phone_country_code,
      address: data.address,
      phone: data.phone,
      requirements_id: data.requirements_id,
      remarks: "",
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
      landline_number: "",
      whatsapp_country_code: "",
      alter_country_code: "",
      company_name: "",
      contact_person: "",
      email: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values: FormikData) => {
      handleUpdateUser(values);
    },
  });

  const handleUpdateUser = (values: FormikData) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phone_country_code", values.phone_country_code);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("requirements_id", values.requirements_id);
    formData.append("leadId", editdata.leadId);

    updatelead(formData)
      .then((response) => {
        message.success(response.data.msg);
        loadAdminData();
        closeModal();
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Edit Lead</h2>
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
              "isNew",
              "email",
            ].map((field, index) => (
              <div key={index} className={classes.inputGroup}>
                <input
                  type="text"
                  name={field}
                  className={`${classes.formControl} ${
                    formik.touched[field as keyof typeof formik.values] &&
                    formik.errors[field as keyof typeof formik.values]
                      ? classes.isInvalid
                      : ""
                  }`}
                  placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field as keyof typeof formik.values]}
                />
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {[
              "state",
              "country",
              "phone_country_code",
              "dealer_id",
              "city",
              "assignedTo",
              "referedBy",
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
                  className={`${classes.formControl} ${
                    formik.touched[field as keyof typeof formik.values] &&
                    formik.errors[field as keyof typeof formik.values]
                      ? classes.isInvalid
                      : ""
                  }`}
                  placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field as keyof typeof formik.values]}
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
                className={`${classes.formControl} ${
                  formik.touched.latitude && formik.errors.latitude
                    ? classes.isInvalid
                    : ""
                }`}
                placeholder="Enter latitude"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.latitude}
              />
            </div>

            <div className={classes.inputGroup}>
              <input
                type="text"
                name="customerId"
                className={`${classes.formControl} ${
                  formik.touched.customerId && formik.errors.customerId
                    ? classes.isInvalid
                    : ""
                }`}
                placeholder="Enter customer ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customerId}
              />
            </div>

            <div className={classes.inputGroup}>
              <input
                type="number"
                name="requirements_id"
                className={`${classes.formControl} ${
                  formik.touched.requirements_id && formik.errors.requirements_id
                    ? classes.isInvalid
                    : ""
                }`}
                placeholder="Enter requirements ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.requirements_id}
              />
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 mt-3">
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Editlead;
