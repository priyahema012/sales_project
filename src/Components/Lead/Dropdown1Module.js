import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  UpdateStatus,
  compettior,
  changeLeadStatus,
} from "../../axios/Services";
import { message } from "antd";
import { useFormik } from "formik";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment"; 
import { useToken } from "../../Utility/hooks";

const Dropdown1Module = ({ isOpen, onClose, userid, selectedLeadId }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [comp, setComp] = useState([]);
  const [status, setStatus] = useState([]);
  const { Option } = Select;
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("leadId", userid);

      UpdateStatus(formData)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.error("Error loading status data:", error);
          message.error("Failed to load status options");
        });

      compettior(formData)
        .then((res) => {
          setComp(res.data.data);
        })
        .catch((error) => {
          console.error("Error loading competitor data:", error);
          message.error("Failed to load competitor data");
        });
    }
  }, [isOpen, userid, token]);

  const validationSchema = Yup.object({
    leadStatus: Yup.string().required("Status is required"),
    notes: Yup.string().when("leadStatus", {
      is: (val) => [2, 3, 5, 6, 7, 17, 24].includes(val),
      then: Yup.string().required("Notes are required"),
    }),
    competitor: Yup.string(),
    enquiry_type: Yup.string(),
    poc_date: Yup.string(),
    missedDays: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      leadStatus: "",
      competitor: "",
      competitor_id: "",
      comment: "",
      competitorName: "",
      enquiry_type: "",
      demo_date: "",
      poc_date: "",
      follow_up_date: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting with values:", values);

      const formData = new FormData();
      formData.append("token", selector.token);
      formData.append("leadId", selectedLeadId);
      formData.append("leadStatus", values.leadStatus);

      if (values.leadStatus === 7) {
        formData.append("competitor", values.competitor);
        formData.append("competitor_id", values.competitor_id);
      }

      if (values.leadStatus === 5) {
        formData.append("enquiry_type", values.enquiry_type);
      }

      if (values.leadStatus === 3) {
        formData.append("demo_date", values.demo_date);
      }

      if (values.leadStatus === 24) {
        formData.append("poc_date", values.poc_date);
      }

      if (values.leadStatus === 5) {
        formData.append("follow_up_date", values.follow_up_date);
      }

      if ([17, 6, 2, 3, 24, 7].includes(values.leadStatus)) {
        formData.append("comment", values.comment);
      }

      // Fetch status options
      UpdateStatus(formData)
        .then((res) => {
          console.log("Status data:", res.data.data);
          setData(res.data.data);
        })
        .catch((error) => {
          console.error("Error loading status data:", error);
          message.error("Failed to load status options");
        });

      // Fetch competitor data
      compettior(formData)
        .then((res) => {
          console.log("Competitor data:", res.data.data);
          setComp(res.data.data);
        })
        .catch((error) => {
          console.error("Error loading competitor data:", error);
          message.error("Failed to load competitor data");
        });

      // Change lead status
      changeLeadStatus(formData)
        .then((res) => {
          console.log("Change lead status response:", res.data.data);
          setStatus(res.data.data);
        })
        .catch((error) => {
          console.error("Error changing lead status:", error);
          message.error("Failed to change lead status");
        });
    },
  });

  return (
    <Modal
      title="Update Status"
      open={isOpen}
      onCancel={onClose}
      onOk={formik.handleSubmit}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Status">
          <Select
            name="leadStatus"
            value={formik.values.leadStatus}
            onChange={(value) => formik.setFieldValue("leadStatus", value)}
          >
            {data.map((value) => (
              <Option key={value.leadStatusId} value={value.leadStatusId}>
                {value.leadStatusName}
              </Option>
            ))}
          </Select>
          {formik.touched.leadStatus && formik.errors.leadStatus ? (
            <div>{formik.errors.leadStatus}</div>
          ) : null}
        </Form.Item>

        {formik.values.leadStatus === 7 && (
          <Form.Item label="Competitor">
            <Select
              name="competitor_id"
              value={formik.values.competitor_id}
              onChange={(value) => formik.setFieldValue("competitor_id", value)}
            >
              {comp.map((value) => (
                <Option key={value.competitorId} value={value.competitorId}>
                  {value.competitorName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {formik.values.leadStatus === 3 && (
          <>
            <Form.Item label="Demo Date">
              <DatePicker
                showTime
                name="demo_date"
                value={
                  formik.values.demo_date
                    ? moment(formik.values.demo_date)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue("demo_date", date ? date.format() : "")
                }
                onBlur={() => formik.setFieldTouched("demo_date", true)}
              />
            </Form.Item>
            <Form.Item label="Comments">
              <Input
                name="comment"
                placeholder="Enter your comments"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </>
        )}

        {formik.values.leadStatus === 5 && (
          <>
            <Form.Item label="Follow Up Date">
              <DatePicker
                showTime
                name="follow_up_date"
                value={
                  formik.values.follow_up_date
                    ? moment(formik.values.follow_up_date)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "follow_up_date",
                    date ? date.format() : ""
                  )
                }
                onBlur={() => formik.setFieldTouched("follow_up_date", true)}
              />
            </Form.Item>
            <Form.Item label="Enquiry Type">
              <Select
                placeholder="Select Enquiry Type"
                name="enquiry_type"
                value={formik.values.enquiry_type}
                onChange={(value) =>
                  formik.setFieldValue("enquiry_type", value)
                }
                onBlur={() => formik.setFieldTouched("enquiry_type", true)}
                allowClear
              >
                {selector.enquiryList?.map((item) => (
                  <Option key={item.enquiryId} value={item.enquiryId}>
                    {item.enquiryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Comments">
              <Input
                name="comment"
                placeholder="Enter your comments"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </>
        )}

        {formik.values.leadStatus === 24 && (
          <>
            <Form.Item label="POC Date">
              <DatePicker
                showTime
                name="poc_date"
                value={
                  formik.values.poc_date ? moment(formik.values.poc_date) : null
                }
                onChange={(date) =>
                  formik.setFieldValue("poc_date", date ? date.format() : "")
                }
                onBlur={() => formik.setFieldTouched("poc_date", true)}
              />
            </Form.Item>
            <Form.Item label="Comments">
              <Input
                name="comment"
                placeholder="Enter your comments"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </>
        )}

        {(formik.values.leadStatus === 2 ||
          formik.values.leadStatus === 4 ||
          formik.values.leadStatus === 1 ||
          formik.values.leadStatus === 9 ||
          formik.values.leadStatus === 17 ||
          formik.values.leadStatus === 16) && (
          <Form.Item label="Comments">
            <Input
              name="comment"
              placeholder="Enter your comments"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default Dropdown1Module;
