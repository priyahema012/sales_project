import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';



interface MastersFilterProps {
  listapical: (page: number, pageSize: number, values: any) => void;
}

interface InputFieldProps {
  formik: any;
  name: string;
  type?: string;
  placeholder: string;
}

const MastersFilter = ({listapical  }  : MastersFilterProps)  => {
  
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
    listapical ( 1, 10, {} );
  };

  console.log("values" , formik.values);
  
  return (
    <>
      
      
        <InputField
          formik={formik}
          name="name"
         
          placeholder="Enter Name"
        />

        <Space size="small">
          {/* Search Button */}
          <Button type="primary" onClick={(e)=>
          {
            e.preventDefault()
            formik.handleSubmit()}}
            >
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

function InputField({ formik,  name, type = 'text', placeholder } : InputFieldProps) {
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
