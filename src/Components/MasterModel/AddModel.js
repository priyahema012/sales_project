import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createuser, dealerDropdown } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowAddModal,
  handleShowUpdateModal,
} from "../../redux/reducers/AuthReducer";
import { useToken } from "../../Utility/hooks";

export default function AddModal({ listapical }) {
  const dispatch = useDispatch();

  const token = useToken();
  const selector = useSelector((state) => state.auth);
  const [dealerId, setDealerId] = useState([]);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(handleShowAddModal(false));
    dispatch(handleShowUpdateModal(false));
  };
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 10 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };
  const handleCreateUser = (values) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("phoneNumber", values.number);
    formData.append("userType", selector.userType);
    formData.append("email", values.email);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("dealer_id", values.dealer_id);
    formData.append("landline_number", values.landline);
    formData.append("password", values.password);
    formData.append("pincode", values.pincode);

    createuser(formData)
      .then((response) => {
        console.log("API response:", response.data);
        listapical();
        message.success(response.data.msg);

        handleCancel();
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const handleDealerId = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("isDealer", "1");
    dealerDropdown(formData).then((response) => {
      setDealerId(response.data.data);
    });
  };

  useEffect(() => {
    handleDealerId();
  }, []);

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    username: Yup.string().required("Username is required"),
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Name is required"),
    city: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    country: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    state: Yup.string().matches(/^[a-zA-Z ]+$/, "Must be alphabets"),
    landline: Yup.string(),
    pincode: Yup.string(),
    dealer_id: Yup.number(),
    number: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      name: "",
      country: "",
      city: "",
      state: "",
      number: "",
      dealer_id: "",
      landline: "",
      password: "",
      pincode: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleCreateUser(values);
    },
  });

  return (
    <>
      <Modal
        title={"ADD DETAILS"}
        open={selector.showAddModal}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width={800}
      >
        <Form {...formItemLayout} style={{ maxWidth: 600 }}>
          <div className="row">
            <div className="col">
              <InputField
                formik={formik}
                name="username"
                label="Username"
                placeholder="Enter username"
              />
            </div>
            <div className="col">
              <InputField
                formik={formik}
                name="name"
                label="Name"
                placeholder="Enter Name"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputField
                formik={formik}
                name="country"
                label="Country"
                placeholder="Enter your country"
              />
            </div>
            <div className="col">
              <InputField
                formik={formik}
                name="number"
                label="Number"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputField
                formik={formik}
                name="landline"
                type="text"
                label="Landline"
                placeholder="Enter your landline"
              />
            </div>
            <div className="col">
              <InputField
                formik={formik}
                name="city"
                label="City"
                placeholder="Enter your city"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputField
                formik={formik}
                name="state"
                label="State"
                placeholder="Enter state"
              />
            </div>
            <div className="col">
              <InputField
                formik={formik}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputField
                formik={formik}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter password"
              />
            </div>
            <div className="col">
              <InputField
                formik={formik}
                name="pincode"
                type="text"
                label="Pincode"
                placeholder="Enter pincode"
              />
            </div>
          </div>
          {selector.userType == "4" && (
            <div className="row ms-2">
              <Form.Item
                name="dealer_id"
                label="Dealer"
                validateStatus={
                  formik.touched.dealer_id && formik.errors.dealer_id
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.dealer_id && formik.errors.dealer_id
                    ? formik.errors.dealer_id
                    : ""
                }
              >
                <Select
                  placeholder="Select Dealer"
                  value={formik.values.dealer_id}
                  onChange={(value) => formik.setFieldValue("dealer_id", value)}
                  onBlur={() => formik.setFieldTouched("dealer_id", true)}
                  allowClear
                >
                  {dealerId?.map((item) => (
                    <Select.Option key={item.userId} value={item.userId}>
                      {item.userName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
}

function InputField({ formik, label, name, type = "text", placeholder }) {
  return (
    <>
      <Form.Item
        label={label}
        validateStatus={
          formik.touched[name] && formik.errors[name] ? "error" : ""
        }
        help={
          formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""
        }
        rules={[{ required: true }]}
      >
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
    </>
  );
}
