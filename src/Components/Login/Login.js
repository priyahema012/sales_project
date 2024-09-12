import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import sha1 from "sha1";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/reducers/AuthReducer";
import { login } from "../../axios/Services";
import { message } from "antd";
import classes from "../Login/Login.module.css";

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("password", values.password);
      formData.append("device_type", "3");
      formData.append("authcode", sha1("lkjfjIHJL@fdj385!jhg" + values.userName));

      login(formData)
        .then(response => {
          dispatch(handleLogin(response.data.token));
          localStorage.setItem("userdata", JSON.stringify(response.data.token));
          message.success("Login Successfully! Welcome to Dashboard Page");
          navigate("/dash");
        })
        .catch(error => {
          console.error("Login error:", error);
        });
    },
  });

  return (
    <div className={`container-fluid ${classes.container}`}>
      <div className="row g-0">
       
        <div className={`col-lg-6 col-md-12 ${classes.leftSection}`}>
          <div className={classes.loginBox}>
            <h3 className={`${classes.heading}`}>
              Welcome Back, Please login to continue
            </h3>
            <form onSubmit={handleSubmit}>
              <div className={`form-group mb-3 ${classes.formGroup}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.userName && errors.userName ? (
                  <div className="text-danger">{errors.userName}</div>
                ) : null}
              </div>

              <div className={`form-group mb-3 ${classes.formGroup}`}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>

              <button type="submit" className={`w-100 ${classes.btn}`}>LOG IN</button>
            </form>
          </div>
        </div>

       
        <div className={`col-lg-6 col-md-12 ${classes.rightSection}`}>
          <div className={classes.overlay}></div>
          <div className={classes.rightContent}>
            <h2 className={classes.rightHeading}>Hi User</h2>
            <p className={classes.rightSubheading}>Forget Your Password?</p>
            <button
              className={`btn ${classes.signupBtn}`}
              onClick={() => navigate("/signup")}
            >
              FORGET PASSWORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
