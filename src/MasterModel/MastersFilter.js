import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const MastersFilter = ({listapical}) => {
  
  
 
 
  

  // Validation schema
  const userValidationSchema = Yup.object({
    name: Yup.string(), 
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: '',
      
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log('Form values on submit:', values);
      listapical(1,10,values)
    },
  });

  
  const handleReset = () => {
    formik.resetForm();
    listapical();
  };

  return (
    <>
      
      
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />

        <Space size="small">
          {/* Search Button */}
          <Button type="primary" onClick={formik.handleSubmit}>
            Search
          </Button>

          {/* Clear Button */}
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Space>
      
    </>
  );
};

export default MastersFilter;

function InputField({ formik,  name, type = 'text', placeholder }) {
  return (
    <Form.Item
      
      name={name}
      validateStatus={formik.touched[name] && formik.errors[name] ? 'error' : ''}
      help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : ''}
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
  );
}
