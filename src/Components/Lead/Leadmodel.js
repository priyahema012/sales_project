import React , {useState} from "react";
import * as Yup from "yup";
import { AddCreate, CreateLeadList ,  LeadList } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import classes from "./Lead.module.css";
import Lead from "./Lead";
import { message, Typography, Input } from "antd"; 

export function Leadmodel({ isModalOpen, handleAddClose, handleModalClose }) {
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleModalCloses = () => {
  //   setIsModalOpen(false); // Logic to close the modal
  // };


  const userValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    remarks: Yup.string(),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string(),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string(),
    contact_person: Yup.string(),
    address: Yup.string().required("enter a Address "),
    area: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string(),
    alternative_no: Yup.string(),
    whatsapp_no: Yup.string(),
    customer_category_id: Yup.number(),
    enquiry_type_id: Yup.string(),
    requirements_id: Yup.number().required("Requirements ID is required"),
  });

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
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
        formData.append("token", selector.token);
       
        formData.append("name", values.name);
        formData.append(
          "phone_country_code",
          values.phone_country_code || "+91"
        );
        formData.append("address", values.address);
        formData.append("phone", values.phone);
        formData.append("requirements_id", values.requirements_id);

        console.log("formdata");
        CreateLeadList(formData)
          .then((res) => {
            console.log("Successfully submitted");
            message.success("Added Successfully ");
            handleModalClose();
          })
          .catch((err) => {
            console.error("API Error:", err);
          });
            

         

          // useEffect(() => {
          //   if (selector.token) {
          //     loadAdminData();
          //   }
          // }, [selector.token]);
        
      },
    });

  return (
    <div>
      {isModalOpen && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog"> <div className="modal-content">     <div className="modal-header">
                <button type="button" className="btn-close" aria-label="Close" onClick={handleAddClose}></button> 
            </div>   
                 
              <div className="modal-body">  <form onSubmit={handleSubmit} className={classes.formContainer}>
              
                  <h2>Add User</h2> <div className="row"><div className="col-md-6">
                  <div className={classes.inputGroup}>
                  <input type="text" name="name"
                     className={`${classes.formControl} ${
                          touched.name && errors.name ? classes.isInvalid : "" }`}  placeholder="Enter your name"
                          onChange={handleChange} onBlur={handleBlur} value={values.name}
                        />
                          {touched.name && errors.name && ( <div className={classes.invalidFeedback}>{errors.name}
                         </div>  )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input type="text" name="remarks"className={`${classes.formControl} ${
                           touched.remarks && errors.remarks
                           ? classes.isInvalid
                           : ""
                          }`}
                            placeholder="Enter your Remarks" onChange={handleChange} onBlur={handleBlur} value={values.remarks}
                        />
                        {touched.remarks && errors.userName && (
                          <div className={classes.invalidFeedback}>
                            {errors.remarks}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input type="text" name="phone" className={`${classes.formControl} ${touched.phone && errors.phone? classes.isInvalid
                           : ""
                          }`}
                          placeholder="Enter your phone" onChange={handleChange} onBlur={handleBlur} value={values.phone}
/>
                        {touched.phone && errors.phone && ( <div className={classes.invalidFeedback}>{errors.phone} </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6"> <div className={classes.inputGroup}> <input type="number" name="landline_number"className={`${classes.formControl} ${
                      touched.landline_number && errors.landline_number
                       ? classes.isInvalid
                           
                              : ""
                          }`}
                           placeholder="Enter your landline_number"  onChange={handleChange}onBlur={handleBlur} value={values.landline_number}
                        />
                        {touched.landline_number && errors.landline_number && ( <div className={classes.invalidFeedback}> {errors.landline_number}
                          </div>
                           )}  </div>
                         <div className={classes.inputGroup}  >
                        <input type="text" name=" whatsapp_country_coder"  className={`${classes.formControl} ${touched.whatsapp_country_code &&
                           errors.whatsapp_country_code ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your landline number" onChange={handleChange} onBlur={handleBlur}value={values.whatsapp_country_code}
                        />
                        {touched.whatsapp_country_code && errors.whatsapp_country_code && (  <div className={classes.invalidFeedback}>  {errors.whatsapp_country_code}
                            </div>
                          )}
                      </div> <div className={classes.inputGroup}><input type="text"name="alter_country_code"className={`${classes.formControl} ${
                            touched.alter_country_code &&  errors.alter_country_code ? classes.isInvalid  : "" 
                          }`}
                          placeholder="Enter your alter_country_code" onChange={handleChange}onBlur={handleBlur} value={values.alter_country_code}                                                                                
                        />
                        {touched.alter_country_code &&errors.alter_country_code && (  <div className={classes.invalidFeedback}> {errors.alter_country_code}
                            </div>
                          )}
                      </div>
                      <div className={classes.inputGroup}>  <input
                       type="text" name="company_name"   className={`${classes.formControl} ${ touched.city && errors.city ? classes.isInvalid : ""
                          }`}
                          placeholder="Enter your company_name" onChange={handleChange} onBlur={handleBlur} value={values.company_name}  
                        />
                        {touched.city && errors.city && ( <div className={classes.invalidFeedback}>{errors.city}
                         </div>
                            )}
                      </div>
                           <div className={classes.inputGroup}> <input  type="text"  name="  contact_person"
                         className={`${classes.formControl} ${  touched.contact_person && errors.contact_person
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  contact_persony"  onChange={handleChange} onBlur={handleBlur} value={values.contact_person}
                        />
                        {touched.country && errors.country && ( <div className={classes.invalidFeedback}> {errors.country}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}> <input type="text"name="address" className={`${classes.formControl} ${ touched.address && errors.address
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your address" onChange={handleChange}  onBlur={handleBlur}  value={values.address}
                        />
                        {touched.address && errors.address && (  <div className={classes.invalidFeedback}> {errors.address}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}><input type="text" name="area"   className={`${classes.formControl} ${  touched.area && errors.area ? classes.isInvalid : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.area}
                        />
                        {touched.area && errors.area && (
                          <div className={classes.invalidFeedback}>
                            {errors.area}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" state"
                          className={`${classes.formControl} ${
                            touched.dealer_id && errors.dealer_id
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter dealer ID"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                        />
                        {touched.state && errors.state && (
                          <div className={classes.invalidFeedback}>
                            {errors.state}
                          </div>
                        )}
                      </div>

                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="country"
                          className={`${classes.formControl} ${
                            touched.country && errors.country
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                        />
                        {touched.country && errors.country && (
                          <div className={classes.invalidFeedback}>
                            {errors.country}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="phone_country_code"
                          className={`${classes.formControl} ${
                            touched.phone_country_code &&
                            errors.phone_country_code
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your phone country code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone_country_code}
                        />
                        {touched.phone_country_code &&
                          errors.phone_country_code && (
                            <div className={classes.invalidFeedback}>
                              {errors.phone_country_code}
                            </div>
                          )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" dealer_id"
                          className={`${classes.formControl} ${
                            touched.dealer_id && errors.dealer_id
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dealer_id}
                        />
                        {touched.dealer_id && errors.dealer_id && (
                          <div className={classes.invalidFeedback}>
                            {errors.dealer_id}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" assignedTo"
                          className={`${classes.formControl} ${
                            touched.assignedTo && errors.assignedTo
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  assignedTo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.assignedTo}
                        />
                        {touched.assignedTo && errors.assignedTo && (
                          <div className={classes.invalidFeedback}>
                            {errors.assignedTo}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" receivedDate"
                          className={`${classes.formControl} ${
                            touched.receivedDate && errors.receivedDate
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  receivedDate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.receivedDate}
                        />
                        {touched.receivedDate && errors.area && (
                          <div className={classes.invalidFeedback}>
                            {errors.receivedDate}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="  email"
                          className={`${classes.formControl} ${
                            touched.email && errors.email
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <div className={classes.invalidFeedback}>
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" referedPhone"
                          className={`${classes.formControl} ${
                            touched.referedPhone && errors.referedPhone
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  referedPhone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.referedPhone}
                        />
                        {touched.area && errors.area && (
                          <div className={classes.invalidFeedback}>
                            {errors.area}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" refer_country_code"
                          className={`${classes.formControl} ${
                            touched.area && errors.area ? classes.isInvalid : ""
                          }`}
                          placeholder="Enter your  refer_country_code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.refer_country_code}
                        />
                        {touched.refer_country_code &&
                          errors.refer_country_code && (
                            <div className={classes.invalidFeedback}>
                              {errors.refer_country_code}
                            </div>
                          )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" notes"
                          className={`${classes.formControl} ${
                            touched.notes && errors.notes
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  notes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.notes}
                        />
                        {touched.notes && errors.notes && (
                          <div className={classes.invalidFeedback}>
                            {errors.notes}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" description"
                          className={`${classes.formControl} ${
                            touched.description && errors.description
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        {touched.description && errors.description && (
                          <div className={classes.invalidFeedback}>
                            {errors.description}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="isNew"
                          className={`${classes.formControl} ${
                            touched.isNew && errors.isNew
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your isNew"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.isNew}
                        />
                        {touched.isNew && errors.isNew && (
                          <div className={classes.invalidFeedback}>
                            {errors.isNew}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="area"
                          className={`${classes.formControl} ${
                            touched.area && errors.area ? classes.isInvalid : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.area}
                        />
                        {touched.area && errors.area && (
                          <div className={classes.invalidFeedback}>
                            {errors.area}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" latitude"
                          className={`${classes.formControl} ${
                            touched.latitude && errors.latitude
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your  latitude"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.latitude}
                        />
                        {touched.latitude && errors.latitude && (
                          <div className={classes.invalidFeedback}>
                            {errors.latitude}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="longitude"
                          className={`${classes.formControl} ${
                            touched.longitude && errors.longitude
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.longitude}
                        />
                        {touched.longitude && errors.longitude && (
                          <div className={classes.invalidFeedback}>
                            {errors.longitude}
                          </div>
                        )}
                      </div>

                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" customerId"
                          className={`${classes.formControl} ${
                            touched.customerId && errors.customerId
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customerId}
                        />
                        {touched.customerId && errors.customerId && (
                          <div className={classes.invalidFeedback}>
                            {errors.customerId}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name=" Pincode"
                          className={`${classes.formControl} ${
                            touched.Pincode && errors.Pincode
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Pincode}
                        />
                        {touched.Pincode && errors.Pincode && (
                          <div className={classes.invalidFeedback}>
                            {errors.Pincode}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="requirements_id"
                          className={`${classes.formControl} ${
                            touched.requirements_id && errors.requirements_id
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.requirements_id}
                        />
                        {touched.requirements_id && errors.requirements_id && (
                          <div className={classes.invalidFeedback}>
                            {errors.requirements_id}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="upload_file"
                          className={`${classes.formControl} ${
                            touched.upload_file && errors.upload_file
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your area"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.upload_file}
                        />
                        {touched.upload_file && errors.upload_file && (
                          <div className={classes.invalidFeedback}>
                            {errors.upload_file}
                          </div>
                        )}
                      </div>
                      <div className={classes.inputGroup}>
                        <input
                          type="text"
                          name="approximate_amount"
                          className={`${classes.formControl} ${
                            touched.approximate_amount &&
                            errors.approximate_amount
                              ? classes.isInvalid
                              : ""
                          }`}
                          placeholder="Enter your approximate_amount"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.approximate_amount}
                        />
                        {touched.approximate_amount &&
                          errors.approximate_amount && (
                            <div className={classes.invalidFeedback}>
                              {errors.approximate_amount}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                      submit
                    </button>

                    {/* <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalCloses}
            >
              Close
            </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Leadmodel;
