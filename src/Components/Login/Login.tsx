import React from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/reducers/AuthReducer";
import { login } from "../../axios/Services";
import { message } from "antd";
import classes from "../Login/Login.module.css";



interface FormValues {
  userName: string;
  password: string;
}


const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const sha1=require("sha1")

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("password", values.password);
      formData.append("device_type", "3");
      formData.append(
        "authcode",
        sha1("lkjfjIHJL@fdj385!jhg" + values.userName)
      );

      login(formData)
        .then((response) => {
          dispatch(handleLogin(response.data.token));
          localStorage.setItem(
            "userdata",
            JSON.stringify(response.data.token)

          );

          sessionStorage.setItem("usertype", response.data.userType)
          sessionStorage.setItem("userId", response.data.userId)
          
          message.success(response.data.msg);
          navigate("/dash");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    },
  });

  return (
    <div className={`container-fluid ${classes.container}`}>
      <div className="row g-0">
        <div className={`col-lg-6 col-md-6 ${classes.leftSection}`}>
          <div className={classes.loginBox}>
            <h3 className={`${classes.heading}`}>
              Welcome Back, Please login to continue
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className={`form-group mb-3 ${classes.formGroup}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-danger">{formik.errors.userName}</div>
                ) : null}
              </div>

              <div className={`form-group mb-3 ${classes.formGroup}`}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>

              <button type="submit" className={`w-100 ${classes.btn}`}>
                LOG IN
              </button>
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
