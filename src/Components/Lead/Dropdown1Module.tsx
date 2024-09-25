import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { UpdateStatus, compettior, changeLeadStatus } from "../../axios/Services";
import { message } from "antd";
import { useFormik } from "formik";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import { useToken } from "../../Utility/hooks";

// Define the props type
interface Dropdown1ModuleProps {
  isOpen: boolean;
  onClose: () => void;
  userid: string;
  selectedLeadId: string;
}

// Define the form values type
interface FormValues {
  leadStatus: string;
  competitor: string;
  competitor_id: string;
  comment: string;
  competitorName: string;
  enquiry_type: string;
  demo_date: string;
  poc_date: string;
  follow_up_date: string;
}

const Dropdown1Module: React.FC<Dropdown1ModuleProps> = ({
  isOpen,
  onClose,
  userid,
  selectedLeadId,
}) => {
  const token = useToken();
  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);
  const [comp, setComp] = useState<any[]>([]);
  const selector = useSelector((state: any) => state.auth); // Adjust the state type as necessary

  useEffect(() => {
    if (isOpen) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("leadId", userid);

      UpdateStatus(formData)
        .then((res) => {
          console.log("UpdateStatus response:", res.data);
          setData(res.data.data || []);
        })
        .catch((res) => {
          // console.error("Error loading status data:", error);
          message.error(res.data.msg);
        });

      compettior(formData)
        .then((res) => {
          console.log("Competitor response:", res.data);
          setComp(res.data.data || []);
        })
        .catch((res) => {
          // console.error("Error loading competitor data:", error);
          message.error(res.data.msg);
        });
    }
  }, [isOpen, userid, token]);

  const validationSchema = Yup.object().shape({
    leadStatus: Yup.string().required("Status is required"),
    comment: Yup.string(),
    competitor: Yup.string(),
    enquiry_type: Yup.string(),
    poc_date: Yup.string(),
    follow_up_date: Yup.string(),
  });

  const formik = useFormik<FormValues>({
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

      if (values.leadStatus == "7") {
        formData.append("competitor", values.competitor);
        formData.append("competitor_id", values.competitor_id);
      }

      if (values.leadStatus == "5") {
        formData.append("enquiry_type", values.enquiry_type);
      }

      if (values.leadStatus == "3") {
        formData.append("demo_date", values.demo_date);
      }

      if (values.leadStatus == "24") {
        formData.append("poc_date", values.poc_date);
      }

      if (values.leadStatus == "5") {
        formData.append("follow_up_date", values.follow_up_date);
      }

      if ([17, 6, 2, 3, 24, 7].includes(Number(values.leadStatus))) {
        formData.append("comment", values.comment);
      }

      changeLeadStatus(formData)
        .then((res) => {
          console.log("Change lead status response:", res.data.data);
          setData(res.data.data);
          onClose();
        })
        .catch((response) => {
          // console.error("Error changing lead status:", error);
          message.error(response.data.msg);
        });
    },
  });

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Modal
      title="Update Status"
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Status" name="leadStatus">
          <Select
            value={formik.values.leadStatus}
            onChange={(value) => formik.setFieldValue("leadStatus", value)}
          >
            {data?.length > 0 ? (
              data?.map((value) => (
                <Select.Option key={value.leadStatusId} value={value.leadStatusId}>
                  {value.leadStatusName}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>No status options available</Select.Option>
            )}
          </Select>
          {formik.touched.leadStatus && formik.errors.leadStatus ? (
            <div>{formik.errors.leadStatus}</div>
          ) : null}
        </Form.Item>

        {formik.values.leadStatus == "7" && (
          <Form.Item label="Competitor" name="competitor_id">
            <Select
              value={formik.values.competitor_id}
              onChange={(value) => formik.setFieldValue("competitor_id", value)}
            >
              {comp?.length > 0 ? (
                comp?.map((value) => (
                  <Select.Option key={value.competitorId} value={value.competitorId}>
                    {value.competitorName}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled>No competitors available</Select.Option>
              )}
            </Select>
          </Form.Item>
        )}

        {formik.values.leadStatus == "3" && (
          <>
            <Form.Item label="Demo Date">
              <DatePicker
                showTime
                name="demo_date"
                value={formik.values.demo_date ? moment(formik.values.demo_date) : null}
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

        {formik.values.leadStatus == "5" && (
          <>
            <Form.Item label="Follow Up Date">
              <DatePicker
                showTime
                name="follow_up_date"
                value={formik.values.follow_up_date ? moment(formik.values.follow_up_date) : null}
                onChange={(date) =>
                  formik.setFieldValue("follow_up_date", date ? date.format() : "")
                }
                onBlur={() => formik.setFieldTouched("follow_up_date", true)}
              />
            </Form.Item>
            <Form.Item label="Enquiry Type">
              <Select
                placeholder="Select Enquiry Type"
                value={formik.values.enquiry_type}
                onChange={(value) =>
                  formik.setFieldValue("enquiry_type", value)
                }
                onBlur={() => formik.setFieldTouched("enquiry_type", true)}
                allowClear
              >
                {selector.enquiryList?.length ? (
                  selector.enquiryList?.map((item: any) => (
                    <Select.Option key={item.enquiryId} value={item.enquiryId}>
                      {item.enquiryName}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>No enquiry types available</Select.Option>
                )}
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

        {formik.values.leadStatus === "24" && (
          <>
            <Form.Item label="POC Date">
              <DatePicker
                showTime
                name="poc_date"
                value={formik.values.poc_date ? moment(formik.values.poc_date) : null}
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

        {(formik.values.leadStatus == "2" ||
          formik.values.leadStatus == "4" ||
          formik.values.leadStatus == "17" ||
          formik.values.leadStatus == "6") && (
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
