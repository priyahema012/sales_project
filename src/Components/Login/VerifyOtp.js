
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOtp, resend } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleResetKey } from '../../redux/reducers/AuthReducer'; 
import { message, Typography, Input } from "antd"; 
import classes from "./VerifyOtp.module.css"; 

const { Title } = Typography;

function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hema = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [resendClicked, setResendClicked] = useState(false); 

  useEffect(() => {
    if (!hema.resetkey) {
      const storedResetKey = sessionStorage.getItem("reset_key");
      if (storedResetKey) {
        dispatch(handleResetKey(storedResetKey));
      }
    }
  }, [dispatch, hema.resetkey]);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const userValidation = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: userValidation,
    onSubmit: (values) => {
      let formdata = new FormData();
      formdata.append("otp", values.otp);
      formdata.append("resetKey", hema.resetkey);

      verifyOtp(formdata)
        .then((res) => {
          dispatch(handleResetKey(res.data.reset_key));
          message.success("OTP verified successfully! Please create a new password.");
          navigate("/reset");
        })
        .catch((err) => {
          console.error(err);
          message.error(err.message || "Invalid OTP. Please try again.");
        });
    },
  });

 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

 
  const handleResend = () => {
    const formdata = new FormData();
    formdata.append("resetKey", hema.resetkey); 

    resend(formdata)
      .then((res) => {
        dispatch(handleResetKey(res.data.reset_key)); 
            sessionStorage.setItem("reset_key", res.data.reset_key);
        message.success("A new OTP has been sent. Please check your email or phone.");
        setResendClicked(true);
        setTimeLeft(60); 
      })
      .catch((err) => {
        console.error("Error sending OTP:", err.response?.data || err.message); 
        message.error(err.message || "Failed to resend OTP. Please try again.");
      });
  };

 
  const handleOtpChange = (value) => {
    formik.setFieldValue("otp", value);
  };

  return (
    <div className={classes.verifyOtpContainer}>
      <h2 className={classes.title}>Verify OTP</h2>
      <p className={classes.timer}>Time Remaining: {formatTime(timeLeft)}</p>
      {timeLeft > 0 ? (
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <label className={classes.label}>
            Enter OTP:
            <Input.OTP
              length={6}
              formatter={(str) => str.toUpperCase()}
              onChange={handleOtpChange}
              className={classes.input}
              placeholder="Enter OTP"
              value={formik.values.otp}
            />
          </label>
          {formik.errors.otp ? <div className={classes.error}>{formik.errors.otp}</div> : null}
          <button type="submit" className={classes.submitButton} disabled={timeLeft === 0}>
            Submit
          </button>
        </form>
      ) : (
        <>
          <p className={classes.error}>OTP expired. Please request a new one.</p>
          <button onClick={handleResend} className={classes.resendButton}>
            Resend OTP
          </button>
        </>
      )}
    </div>
  );
}

export default VerifyOtp;




















// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { verifyOtp, resend } from "../../axios/Services";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { handleresetkey } from "../../redux/reducers/AuthReducer";
// import { message } from "antd"; 
// import classes from "./VerifyOtp.module.css"; 

// function VerifyOtp() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const hema = useSelector((state) => state.auth);

//   const [timeLeft, setTimeLeft] = useState(60); 
//   const [resendClicked, setResendClicked] = useState(false); 

  
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft]);

//   const userValidation = Yup.object({
//     otp: Yup.string()
//       .required("OTP is required")
//       .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       otp: "",
//     },
//     validationSchema: userValidation,
//     onSubmit: (values) => {
//       let formdata = new FormData();
//       formdata.append("otp", values.otp);
//       formdata.append("resetKey", hema.resetkey);

//       verifyOtp(formdata)
//         .then((res) => {
//           dispatch(handleresetkey(res.data.reset_key));
//           message.success("OTP verified successfully! Please create a new password.");
//           navigate("/reset");
//         })
//         .catch((err) => {
//           console.error(err);
//           message.error(err.message || "Invalid OTP. Please try again.");
//         });
//     },
//   });

//   //  (MM:SS)
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//   };

  


//   ///resending otp
// const handleResend = () => {
//   console.log("Resending OTP with resetKey:", hema.resetKey );
//   const formdata = new FormData();
//   formdata.append("resetKey", hema.resetKey ); 
//   resend(formdata) 
//     .then((res) => {
//       console.log("Resend OTP response:", res);
//       dispatch(handleresetkey(res.data.reset_key)); 
//       message.success("A new OTP has been sent. Please check your email or phone.");
//       setResendClicked(true);
//       setTimeLeft(60); 
//     })
//     .catch((err) => {
//       console.error("Error sending OTP:", err.response?.data || err.message); 
//       message.error(err.message || "Failed to resend OTP. Please try again.");
//     });
// };


//   return (
//     <div className={classes.verifyOtpContainer}>
//       <h2 className={classes.title}>Verify OTP</h2>
//       <p className={classes.timer}>Time Remaining: {formatTime(timeLeft)}</p>
//       {timeLeft > 0 ? (
//         <form onSubmit={formik.handleSubmit} className={classes.form}>
//           <label className={classes.label}>
//             Enter OTP:
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               onChange={formik.handleChange}
//               value={formik.values.otp}
//               className={classes.input}
//             />
//           </label>
//           {formik.errors.otp ? <div className={classes.error}>{formik.errors.otp}</div> : null}
//           <button type="submit" className={classes.submitButton} disabled={timeLeft === 0}>
//             Submit
//           </button>
//         </form>
//       ) : (
//         <>
//           <p className={classes.error}>OTP expired. Please request a new one.</p>
//           <button onClick={handleResend} className={classes.resendButton}>
//             Resend OTP
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default VerifyOtp;

























