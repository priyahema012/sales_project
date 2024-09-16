import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { resetPassword } from '../../axios/Services';
import { handleResetKey } from '../../redux/reducers/AuthReducer'; // Updated import
import classes from './Reset.module.css';

function ResetPassword() {
    const reset = useSelector((state) => state.auth.resetkey);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedResetKey = sessionStorage.getItem('reset_key');
        if (!reset && storedResetKey) {
            dispatch(handleResetKey(storedResetKey)); // Updated usage
        }
    }, [reset, dispatch]);

    const validationSchema = Yup.object({
        changepassword: Yup.string().required('Enter the new password'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('changepassword'), null], 'Passwords must match')
            .required('Confirm your password'),
    });

    const formik = useFormik({
        initialValues: {
            changepassword: '',
            confirmpassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleresetpassword(values),
    });

    const handleresetpassword = (values) => {
        let formData = new FormData();
        formData.append("resetKey", reset);
        formData.append("newPassword", values.changepassword);

        resetPassword(formData)
        .then((res) => {
            sessionStorage.setItem('reset_key', res.reset_key);
            dispatch(handleResetKey(res.reset_key)); // Updated usage
            message.success("Password successfully changed");
            navigate('/login');
        })
        .catch((err) => {
            console.log(err.response?.data || err.message);
            message.error(err.response?.data?.message || "Invalid OTP. Please try again.");
        });
    };

    return (
        <Row
            className={`${classes.back}`}
            style={{ height: '100vh' }}
            justify="center"
            align="middle"
        >
            <Col xs={24} sm={16} md={8}>
                <Form
                    onFinish={formik.handleSubmit}
                    className={`${classes.resetFormContainer}`}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <h3 className={classes.formTitle}>Reset Password</h3>

                    <Form.Item
                        label="New Password"
                        className={classes.formItem}
                        validateStatus={formik.touched.changepassword && formik.errors.changepassword ? 'error' : ''}
                        help={formik.touched.changepassword && formik.errors.changepassword ? formik.errors.changepassword : ''}
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
                        validateStatus={formik.touched.confirmpassword && formik.errors.confirmpassword ? 'error' : ''}
                        help={formik.touched.confirmpassword && formik.errors.confirmpassword ? formik.errors.confirmpassword : ''}
                    >
                        <Input.Password
                            name="confirmpassword"
                            value={formik.values.confirmpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Button
                        className={`${classes.submitButton} mb-2`}
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default ResetPassword;
