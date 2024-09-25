import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { resetPassword } from '../../axios/Services';

import classes from './Reset.module.css';
import { ResetPasswordFormValues, AuthState } from '../Login/types'; 
function ResetPassword() {
  const reset = useSelector((state: { auth: AuthState }) => state.auth.resetkey); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedResetKey :any= sessionStorage.getItem('reset_key');

  const validationSchema = Yup.object({
    changepassword: Yup.string().required('Enter the new password'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('changepassword')], 'Passwords must match')
      .required('Confirm your password'),
  });

  const formik: FormikProps<ResetPasswordFormValues> = useFormik({
    initialValues: {
      changepassword: '',
      confirmpassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleresetpassword(values),
  });

  const handleresetpassword = (values: ResetPasswordFormValues) => {
    const formData = new FormData();
    formData.append('resetKey',storedResetKey ); 
    formData.append('newPassword', values.changepassword);

    resetPassword(formData )
      .then((res) => {
        // sessionStorage.setItem('reset_key',  res.data.resetKey)
        // dispatch(handleResetKey(res.data.resetKey));
        message.success(res.data.msg);
        navigate('/login');
      })
      .catch((res) => {
        // console.error(err.response?.data || err.message);
        message.error(res.data.msg);
      });
  };

  return (
    <Row
      className={classes.back}
      style={{ height: '100vh' }}
      justify="center"
      align="middle"
    >
      <Col xs={24} sm={16} md={8}>
        <Form
          onFinish={formik.handleSubmit}
          className={classes.resetFormContainer}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <h3 className={classes.formTitle}>Reset Password</h3>

          <Form.Item
            label="New Password"
            className={classes.formItem}
            validateStatus={
              formik.touched.changepassword && formik.errors.changepassword ? 'error' : ''
            }
            help={
              formik.touched.changepassword && formik.errors.changepassword
                ? formik.errors.changepassword
                : ''
            }
          >
            <Input.Password
              name="changepassword"
              value={formik.values.changepassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            className={classes.formItem}
            validateStatus={
              formik.touched.confirmpassword && formik.errors.confirmpassword ? 'error' : ''
            }
            help={
              formik.touched.confirmpassword && formik.errors.confirmpassword
                ? formik.errors.confirmpassword
                : ''
            }
          >
            <Input.Password
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Button className={`${classes.submitButton} mb-2`} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default ResetPassword;
