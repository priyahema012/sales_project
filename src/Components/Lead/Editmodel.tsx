import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { viewlead, updatelead } from "../../axios/Services";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import classes from "./Lead.module.css";
import { message } from "antd";
import { useToken } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";
// import { LeadItem } from "./UpdateLead";

interface EditModelProps {
  editModel: boolean;
  isModalOpen: boolean;    //
  selectedLeadId: string | null;
  loadAdminData: () => void;  //
  onClose:() => void;  //
  userid: string;    //
  handleModalClose: () => void; 
  leadId : string;
  // leadData :LeadItem;
  closeModal : () => void;
  
}

interface LeadData {
  name: string;
  phone_country_code: string;
  address: string;
  phone: string;
  requirements_id: string;
}

function Editmodel({
  editModel,
  isModalOpen,
  selectedLeadId,
  loadAdminData,
  onClose,
  handleModalClose,
  leadId,
  userid
  // leadData
   // Destructure here
}: EditModelProps) {
  const token = useToken();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const [data, setData] = useState<LeadData>({
    name: "",
    phone_country_code: "",
    address: "",
    phone: "",
    requirements_id: "",
  });

  useEffect(() => {
    if (token && selectedLeadId) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("leadId", selectedLeadId);

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
  }, [token, selectedLeadId]);

  const userValidationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Must contain only alphabets and spaces")
      .required("Name is required"),
    phone_country_code: Yup.string().required("Phone country code is required"),
    address: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Must contain only alphabets and spaces")
      .required("Address is required"),
    requirements_id: Yup.string().required("Requirement ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: data.name,
      phone_country_code: data.phone_country_code,
      address: data.address,
      phone: data.phone,
      requirements_id: data.requirements_id,
    },
    enableReinitialize: true, // Ensure form updates when `data` changes
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  const handleUpdateUser = (values: LeadData) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phone_country_code", values.phone_country_code);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("requirements_id", values.requirements_id);
    formData.append("leadId", selectedLeadId!);

    updatelead(formData)
      .then((response) => {
        message.success(response.data.msg);
        onClose(); // Close modal after successful submission
        loadAdminData();
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  return (
    <div>
      {editModel && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Lead</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleModalClose} // Close button handler
                ></button>
              </div>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editmodel;



// import React, { useState, useEffect } from "react";
// import * as Yup from "yup";
// import { viewlead, updatelead } from "../../axios/Services";
// import { useSelector } from "react-redux";
// import { useFormik } from "formik";
// import classes from "./Lead.module.css";
// import { message } from "antd";
// import { useToken } from "../../Utility/hooks";

// function Editmodel({
//   editModel,
//   isModalOpen,
//   selectedLeadId,
//   loadAdminData,
//   onclose,
// }) {
//   const token = useToken();
//   const selector = useSelector((state) => state.auth);
//   const [data, setData] = useState({
//     name: "",
//     phone_country_code: "",
//     address: "",
//     phone: "",
//     requirements_id: "",
//   });

//   useEffect(() => {
//     if (selector.token && selectedLeadId) {
//       const formData = new FormData();
//       formData.append("token", token);
//       formData.append("leadId", selectedLeadId);

//       viewlead(formData)
//         .then((response) => {
//           const leadData = response.data?.data || {};
//           setData({
//             name: leadData.name || "",
//             phone_country_code: leadData.phone_country_code || "",
//             address: leadData.address || "",
//             phone: leadData.phone || "",
//             requirements_id: leadData.requirements_id || "",
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching lead details", error);
//         });
//     }
//   }, [token, selectedLeadId]);

//   const userValidationSchema = Yup.object({
//     name: Yup.string()
//       .matches(/^[a-zA-Z\s]+$/, "Must contain only alphabets and spaces")
//       .required("Name is required"),
//     phone_country_code: Yup.string().required("Phone country code is required"),
//     address: Yup.string()
//       .matches(/^[a-zA-Z\s]+$/, "Must contain only alphabets and spaces")
//       .required("Address is required"),
//     requirements_id: Yup.string().required("Requirement ID is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: data.name,
//       phone_country_code: data.phone_country_code,
//       address: data.address,
//       phone: data.phone,
//       requirements_id: data.requirements_id,
//     },
//     enableReinitialize: true, // Ensure form updates when `data` changes
//     validationSchema: userValidationSchema,
//     onSubmit: (values) => {
//       handleUpdateUser(values);
//     },
//   });

//   const handleUpdateUser = (values) => {
//     const formData = new FormData();
//     formData.append("token", token);
//     formData.append("name", values.name);
//     formData.append("phone_country_code", values.phone_country_code);
//     formData.append("address", values.address);
//     formData.append("phone", values.phone);
//     formData.append("requirements_id", values.requirements_id);
//     formData.append("leadId", selectedLeadId);

//     updatelead(formData)
//       .then((response) => {
//         message.success("Edited Successfully");
//         onclose(); // Close modal after successful submission
//         loadAdminData();
//       })
//       .catch((err) => {
//         console.error("API error:", err);
//       });
//   };

//   return (
//     <div>
//       {editModel && (
//         <div className="modal show" style={{ display: "block" }} tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Lead</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={onclose} // Close button handler
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form
//                   onSubmit={formik.handleSubmit}
//                   className={classes.formContainer}
//                 >
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className={classes.inputGroup}>
//                         <input
//                           type="text"
//                           name="name"
//                           className={`${classes.formControl} ${
//                             formik.touched.name && formik.errors.name
//                               ? classes.isInvalid
//                               : ""
//                           }`}
//                           placeholder="Enter your name"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.name}
//                         />
//                         {formik.touched.name && formik.errors.name && (
//                           <div className={classes.invalidFeedback}>
//                             {formik.errors.name}
//                           </div>
//                         )}
//                       </div>

//                       <div className={classes.inputGroup}>
//                         <input
//                           type="text"
//                           name="phone"
//                           className={`${classes.formControl} ${
//                             formik.touched.phone && formik.errors.phone
//                               ? classes.isInvalid
//                               : ""
//                           }`}
//                           placeholder="Enter your phone"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.phone}
//                         />
//                         {formik.touched.phone && formik.errors.phone && (
//                           <div className={classes.invalidFeedback}>
//                             {formik.errors.phone}
//                           </div>
//                         )}
//                       </div>

//                       <div className={classes.inputGroup}>
//                         <input
//                           type="text"
//                           name="address"
//                           className={`${classes.formControl} ${
//                             formik.touched.address && formik.errors.address
//                               ? classes.isInvalid
//                               : ""
//                           }`}
//                           placeholder="Enter your address"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.address}
//                         />
//                         {formik.touched.address && formik.errors.address && (
//                           <div className={classes.invalidFeedback}>
//                             {formik.errors.address}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className={classes.inputGroup}>
//                         <input
//                           type="text"
//                           name="phone_country_code"
//                           className={`${classes.formControl} ${
//                             formik.touched.phone_country_code &&
//                             formik.errors.phone_country_code
//                               ? classes.isInvalid
//                               : ""
//                           }`}
//                           placeholder="Enter your phone country code"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.phone_country_code}
//                         />
//                         {formik.touched.phone_country_code &&
//                           formik.errors.phone_country_code && (
//                             <div className={classes.invalidFeedback}>
//                               {formik.errors.phone_country_code}
//                             </div>
//                           )}
//                       </div>

//                       <div className={classes.inputGroup}>
//                         <input
//                           type="text"
//                           name="requirements_id"
//                           className={`${classes.formControl} ${
//                             formik.touched.requirements_id &&
//                             formik.errors.requirements_id
//                               ? classes.isInvalid
//                               : ""
//                           }`}
//                           placeholder="Enter your requirement ID"
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           value={formik.values.requirements_id}
//                         />
//                         {formik.touched.requirements_id &&
//                           formik.errors.requirements_id && (
//                             <div className={classes.invalidFeedback}>
//                               {formik.errors.requirements_id}
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="d-grid gap-2 mt-3">
//                     <button type="submit" className="btn btn-primary">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Editmodel;
