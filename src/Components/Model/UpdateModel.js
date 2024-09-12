import React from 'react'
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Modal, Form, Input } from 'antd';
import { update } from '../../axios/Services';

function UpdateModal ({userdata,editu,onclose}) {


    const token = useSelector((state) => state.auth.token);
    console.log("editmodel vanthuruchu");
    console.log(userdata);
    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
        userName: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
        phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        email: Yup.string().email('Invalid email format').required('email is required'),
        landline_number: Yup.string().matches(/^\d{10}$/, 'Landline number must be 10 digits'),
        state: Yup.string().matches(/^[a-zA-Z\s]+$/, 'State must contain only alphabets and spaces'),
        city: Yup.string().matches(/^[a-zA-Z\s]+$/, 'City must contain only alphabets and spaces'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        userType: Yup.string().required('User type is required'),
        pincode: Yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        dealer_id: Yup.string(),
        userId:Yup.string().required('UserID is required'),
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
      enableReinitialize: true,  
      initialValues: {
          name:userdata?.name,
          userName:userdata?.userName,
          phoneNumber:userdata.phoneNumber,
          email:userdata.email,
          landline_number: '',
          state: '',
          city: '',
          password: '',
          userType:userdata.userType,
          pincode: '',
          dealer_id: '',
          userId:userdata.userId
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleedit(values)
      });

      const handleedit=()=>{
        let formData=new FormData();
formData.append('token',token);
formData.append('userName',values.userName);
formData.append('name',values.name)
formData.append('phoneNumber',values.phoneNumber);
 formData.append('userType',values.userType);
formData.append('userId',values.userId);
formData.append('email',values.email);
update(formData).then((res)=>{
   console.log("updated suceesss");
})
      }
    
  return (
    <div>

<Modal
    title={"EDIT  DETAILS"}
    open={editu}
    onOk={handleSubmit}
   onCancel={onclose}
  >
      <Form  >
        <Form.Item
          label="Name"
          validateStatus={touched.name && errors.name ? 'error' : ''}
          help={touched.name && errors.name ? errors.name : ''}
        >
          <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="UserName"
          validateStatus={touched.userName && errors.userName ? 'error' : ''}
          help={touched.userName && errors.userName ? errors.userName : ''}
        >
          <Input name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="PhoneNumber"
          validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
          help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
        >
          <Input name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={touched.email && errors.email ? 'error' : ''}
          help={touched.email && errors.email ? errors.email : ''}
        >
          <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="Landline Number"
          validateStatus={touched.landline_number && errors.landline_number ? 'error' : ''}
          help={touched.landline_number && errors.landline_number ? errors.landline_number : ''}
        >
          <Input name="landline_number" value={values.landline_number} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="State"
          validateStatus={touched.state && errors.state ? 'error' : ''}
          help={touched.state && errors.state ? errors.state : ''}
        >
          <Input name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="City"
          validateStatus={touched.city && errors.city ? 'error' : ''}
          help={touched.city && errors.city ? errors.city : ''}
        >
          <Input name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={touched.password && errors.password ? 'error' : ''}
          help={touched.password && errors.password ? errors.password : ''}
        >
          <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="User Type"
          validateStatus={touched.userType && errors.userType ? 'error' : ''}
          help={touched.userType && errors.userType ? errors.userType : ''}
        >
          <Input name="userType" value={values.userType} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="Pincode"
          validateStatus={touched.pincode && errors.pincode ? 'error' : ''}
          help={touched.pincode && errors.pincode ? errors.pincode : ''}
        >
          <Input name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        <Form.Item
          label="Dealer ID"
          validateStatus={touched.dealer_id && errors.dealer_id ? 'error' : ''}
          help={touched.dealer_id && errors.dealer_id ? errors.dealer_id : ''}
        >
          <Input name="dealer_id" value={values.dealer_id} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
          label="user ID"
          validateStatus={touched.userId  && errors.userId  ? 'error' : ''}
          help={touched.userId  && errors.userId  ? errors.userId  : ''}
        >
          <Input name="userId " value={values.userId } onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

      </Form>
    </Modal>
    </div>
  )
}

export default UpdateModal;