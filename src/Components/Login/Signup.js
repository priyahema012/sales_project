import React from "react";
import { forgotPassword } from "../../axios/Services";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleresetkey } from "../../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userValidation = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      forgotPassword(formData)
        .then((res) => {
          const resetKey = res.data.reset_key;
          dispatch(handleresetkey(resetKey));

        
          sessionStorage.setItem("reset_key", resetKey);

          navigate("/verify-otp");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <div className={classes.signupContainer}>
      <div className={classes.formWrapper}>
        <form onSubmit={formik.handleSubmit} className={classes.signupForm}>
          <h2 className={classes.signupTitle}>Forgot Password</h2>
          <label className={classes.signupLabel}>
            Enter your MailId:
            <input
              type="text"
              name="email"
              placeholder="Enter your MailId"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={classes.signupInput}
            />
          </label>
          {formik.errors.email ? <div className={classes.signupError}>{formik.errors.email}</div> : null}
          <button type="submit" className={classes.signupButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}








































































// import React from "react";
// import { forgotPassword } from "../../axios/Services";
// import { useDispatch } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { handleresetkey } from "../../redux/reducers/AuthReducer";
// import { useNavigate } from "react-router-dom";
// import classes from "./Signup.module.css";

// export default function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userValidation = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: userValidation,
//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append("email", values.email);
//       forgotPassword(formData)
//         .then((res) => {
//           dispatch(handleresetkey(res.data.reset_key));
//           navigate("/verify-otp");
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     },
//   });

//   return (
//     <div className={classes.signupContainer}>
//       <form onSubmit={formik.handleSubmit} className={classes.signupForm}>
//         <h2 className={classes.signupTitle}>Forgot Password</h2>
//         <label className={classes.signupLabel}>
//           Enter your MailId:
//           <input
//             type="text"
//             name="email"
//             placeholder="Enter your MailId"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             className={classes.signupInput}
//           />
//         </label>
//         {formik.errors.email ? <div className={classes.signupError}>{formik.errors.email}</div> : null}
//         <button type="submit" className={classes.signupButton}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


























// //old 
// // import React from "react";
// // import { forgotPassword } from "../../axios/Services";
// // import { useDispatch } from "react-redux";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { handleresetkey } from "../../redux/reducers/AuthReducer";
// // import { useNavigate } from "react-router-dom";
// // import classes from "./Signup.module.css";

// // export default function Signup() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const userValidation = Yup.object({
// //     email: Yup.string().email("Invalid email").required("Email is required"),
// //   });

// //   const formik = useFormik({
// //     initialValues: {
// //       email: "",
// //     },
// //     validationSchema: userValidation,
// //     onSubmit: (values) => {
// //       const formData = new FormData();
// //       formData.append("email", values.email);
// //       forgotPassword(formData)
// //         .then((res) => {
// //           dispatch(handleresetkey(res.data.reset_key));
// //           navigate("/verify-otp");
// //         })
// //         .catch((err) => {
// //           console.error(err);
// //         });
// //     },
// //   });

// //   return (
// //     <div className={classes.signupContainer}>
// //       <h2 className={classes.signupTitle}>Forgot Password</h2>
// //       <form onSubmit={formik.handleSubmit} className={classes.signupForm}>
// //         <label className={classes.signupLabel}>
// //           Enter your MailId:
// //           <input
// //             type="text"
// //             name="email"
// //             placeholder="Enter your MailId"
// //             onChange={formik.handleChange}
// //             value={formik.values.email}
// //             className={classes.signupInput}
// //           />
// //         </label>
// //         {formik.errors.email ? <div className={classes.signupError}>{formik.errors.email}</div> : null}
// //         <button type="submit" className={classes.signupButton}>
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
