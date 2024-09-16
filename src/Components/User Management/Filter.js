import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { deletehandlefilter } from "../../../src/redux/reducers/AuthReducer"; // Import updated action
import classes from "./Filter.module.css";

function Filter({ functioncall }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    userName: Yup.string().min(3, "Username must be at least 3 characters"),
    phoneNumber: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Phone number must be 10 digits"
    ),
    email: Yup.string().email("Invalid email format"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      functioncall(1, 10, values);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    functioncall();
    dispatch(deletehandlefilter()); // Updated action to handle the reset
  };

  return (
    <Form onFinish={formik.handleSubmit} className={classes.formContainer}>
      <div className={classes.formRow}>
        <Form.Item
          label={<span className={classes.formLabel}>User</span>}
          validateStatus={
            formik.touched.userName && formik.errors.userName ? "error" : ""
          }
          help={
            formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : ""
          }
          className={classes.formItem}
        >
          <Input
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.inputField}
          />
        </Form.Item>

        <Form.Item
          label={<span className={classes.formLabel}>Email</span>}
          validateStatus={
            formik.touched.email && formik.errors.email ? "error" : ""
          }
          help={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          className={classes.formItem}
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.inputField}
          />
        </Form.Item>

        <Form.Item
          label={<span className={classes.formLabel}>Ph No</span>}
          validateStatus={
            formik.touched.phoneNumber && formik.errors.phoneNumber ? "error" : ""
          }
          help={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""
          }
          className={classes.formItem}
        >
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.inputField}
          />
        </Form.Item>
      </div>

      <div className={classes.buttonContainer}>
        <Button type="primary" htmlType="submit" className={classes.submitButton}>
          Submit
        </Button>
        <Button onClick={handleReset} className={classes.resetButton}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

export default Filter;
