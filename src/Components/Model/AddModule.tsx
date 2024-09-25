import * as Yup from "yup";
import { add } from "../../axios/Services";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { message, Modal, Form, Input, Button, Row, Col } from "antd";
import classes from "./AddModule.module.css";
import { storeDataProps } from "../../Types/reducer";

interface AdminProps {
  closeAdd: () => void;
}

export default function AdminModule({ closeAdd }: AdminProps) {
  const selector = useSelector((state: storeDataProps) => state.auth);

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    state: Yup.string(),
    country: Yup.string(),
    landline_Number: Yup.string().matches(
      /^[0-9]{8,10}$/,
      "Landline number should be 8 to 10 digits"
    ),
    password: Yup.string().required("Password is required"),
    pincode: Yup.string().matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
    city: Yup.string(),
  });

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
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

        add(formData)
          .then((response) => {
            console.log("success");
            closeAdd();
            message.success(response.data.msg);
          })
          .catch((err) => {
            console.log("API Error:", err);
          });
      },
    });

  return (
    <Modal
      title="Add Admin"
      visible={true}
      onCancel={closeAdd}
      footer={null}
      className={classes.modalContainer}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                placeholder="Enter your Name *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Username"
              validateStatus={touched.userName && errors.userName ? "error" : ""}
              help={touched.userName && errors.userName}
            >
              <Input
                name="userName"
                placeholder="Enter your Username *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              validateStatus={touched.phoneNumber && errors.phoneNumber ? "error" : ""}
              help={touched.phoneNumber && errors.phoneNumber}
            >
              <Input
                name="phoneNumber"
                placeholder="Enter your Phone Number *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email}
            >
              <Input
                name="email"
                type="email"
                placeholder="Enter your Email *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Landline Number"
              validateStatus={
                touched.landline_Number && errors.landline_Number ? "error" : ""
              }
              help={touched.landline_Number && errors.landline_Number}
            >
              <Input
                name="landline_Number"
                placeholder="Enter your Landline Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.landline_Number}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State">
              <Input
                name="state"
                placeholder="Enter your State"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="City">
              <Input
                name="city"
                placeholder="Enter your City"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country">
              <Input
                name="country"
                placeholder="Enter your Country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              validateStatus={touched.password && errors.password ? "error" : ""}
              help={touched.password && errors.password}
            >
              <Input.Password
                name="password"
                placeholder="Enter your Password *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Pincode"
              validateStatus={touched.pincode && errors.pincode ? "error" : ""}
              help={touched.pincode && errors.pincode}
            >
              <Input
                name="pincode"
                placeholder="Enter your Pincode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pincode}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className={classes.modalFooter}>
         
          <Button type="primary" htmlType="submit" className={classes.btnSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}






















// import * as Yup from "yup";
// import { add } from "../../axios/Services";
// import {  useSelector } from "react-redux";
// import { useFormik } from "formik";
// import { message } from "antd";
// import classes from "./AddModule.module.css";
// import { storeDataProps } from "../../Types/reducer";

// interface AdminProps {
//   closeAdd : () => void
// }

// export default function AdminModule({  closeAdd }:AdminProps) {
//   const selector = useSelector((state:storeDataProps) => state.auth);

  
//     const userValidation = Yup.object({
//       userName: Yup.string()
//         .required("Username is required"),
//       name: Yup.string()
//         .required("Name is required"),
//       phoneNumber: Yup.string()  
//         .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
//         .required("Phone number is required"),
//       email: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//       state: Yup.string(),  
//       country: Yup.string(),  
//       landline_Number: Yup.string()  
//         .matches(/^[0-9]{8,10}$/, "Landline number should be 8 to 10 digits"), 
//       password: Yup.string()
//         .required("Password is required"),
//       pincode: Yup.string()  
//         .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
//       city: Yup.string(),  
//       // dealer_id: Yup.number()
//       //   .integer("Dealer ID must be an integer")
//       //   .nullable(),  
//     });
  

//   const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
//     useFormik({
//       initialValues: {
//         userName: "",
//         name: "",
//         phoneNumber: "",
//         email: "",
//         landline_Number: "",
//         state: "",
//         country: "",
//         city: "",
//         password: "",
//         pincode: "",
//         dealer_id: "",
//       },
//       validationSchema: userValidation,
//       onSubmit: (values) => {
//         const formData = new FormData();
//         formData.append("token", selector.token);
//         formData.append("name", values.name);
//         formData.append("userName", values.userName);
//         formData.append("phoneNumber", values.phoneNumber);
//         formData.append("email", values.email);
//         formData.append("userType", "2");
//         formData.append("city", values.city);
//         formData.append("landline_number", values.landline_Number);
//         formData.append("state", values.state);
//         formData.append("country", values.country);
//         formData.append("password", values.password);
//         formData.append("pincode", values.pincode);
//         formData.append("dealer_id", values.dealer_id);

//         add(formData)
//           .then((response) => {
//             console.log("success");
//             closeAdd();
//             message.success(response.data.msg);
//           })
//           .catch((err) => {
//             console.log("API Error:", err);
//           });
//       },
//     });

//   return (
//   <div>


//       <div className="modal show" style={{ display: "block" }} >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={closeAdd}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit} className={classes.formContainer}>
//                 <h2>Add Admin</h2>
  
//                 {/* Row 1 */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="text"
//                         name="name"
//                         className={`${classes.formControl} ${
//                           touched.name && errors.name ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your Name *"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.name}
//                       />
//                       {touched.name && errors.name && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.name === "required" ? "Name is required *." : errors.name}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="text"
//                         name="userName"
//                         className={`${classes.formControl} ${
//                           touched.userName && errors.userName
//                             ? classes.isInvalid
//                             : ""
//                         }`}
//                         placeholder="Enter your Username *"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.userName}
//                       />
//                       {touched.userName && errors.userName && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.userName === "required"
//                             ? "Username is required *."
//                             : errors.userName}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* Row 2 */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="number"
//                         name="phoneNumber"
//                         className={`${classes.formControl} ${
//                           touched.phoneNumber && errors.phoneNumber
//                             ? classes.isInvalid
//                             : ""
//                         }`}
//                         placeholder="Enter your Phone Number *"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.phoneNumber}
//                       />
//                       {touched.phoneNumber && errors.phoneNumber && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.phoneNumber === "required"
//                             ? "Phone number is required *."
//                             : errors.phoneNumber}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="email"
//                         name="email"
//                         className={`${classes.formControl} ${
//                           touched.email && errors.email ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your Email *"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.email}
//                       />
//                       {touched.email && errors.email && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.email === "required"
//                             ? "Email is required *."
//                             : errors.email === "invalidEmail"
//                             ? "Please enter a valid email *."
//                             : errors.email}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* Row 3 */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="number"
//                         name="landline_Number"
//                         className={`${classes.formControl} ${
//                           touched.landline_Number && errors.landline_Number
//                             ? classes.isInvalid
//                             : ""
//                         }`}
//                         placeholder="Enter your Landline Number "
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.landline_Number}
//                       />
//                       {touched.landline_Number && errors.landline_Number && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.landline_Number === "required"
//                             ? "Landline number is required *."
//                             : errors.landline_Number}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="text"
//                         name="state"
//                         className={`${classes.formControl} ${
//                           touched.state && errors.state ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your State "
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.state}
//                       />
//                       {touched.state && errors.state && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.state === "required"
//                             ? "State is required "
//                             : errors.state}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* Row 4 */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="text"
//                         name="city"
//                         className={`${classes.formControl} ${
//                           touched.city && errors.city ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your City "
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.city}
//                       />
//                       {touched.city && errors.city && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.city === "required" ? "City is required *." : errors.city}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="text"
//                         name="country"
//                         className={`${classes.formControl} ${
//                           touched.country && errors.country ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your Country "
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.country}
//                       />
//                       {touched.country && errors.country && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.country === "required"
//                             ? "Country is required ."
//                             : errors.country}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* Row 5 */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="password"
//                         name="password"
//                         className={`${classes.formControl} ${
//                           touched.password && errors.password ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your Password *"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.password}
//                       />
//                       {touched.password && errors.password && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.password === "required"
//                             ? "Password is required *."
//                             : errors.password}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className={classes.inputGroup}>
//                       <input
//                         type="number"
//                         name="pincode"
//                         className={`${classes.formControl} ${
//                           touched.pincode && errors.pincode ? classes.isInvalid : ""
//                         }`}
//                         placeholder="Enter your Pincode "
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.pincode}
//                       />
//                       {touched.pincode && errors.pincode && (
//                         <div className={classes.invalidFeedback}>
//                           {errors.pincode === "required"
//                             ? "Pincode is required *."
//                             : errors.pincode}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
  
//                 <div className={classes.modalFooter}>
//                   <button type="button" onClick={closeAdd}>
//                     Close
//                   </button>
//                   <button type="submit" className={classes.btnSubmit}>
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
   







//   </div>
  


//   )}