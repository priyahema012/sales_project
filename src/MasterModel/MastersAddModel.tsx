import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createMasters, updateMasters } from "../axios/Services";
import { handleShowAddModal, handleShowUpdateModal } from "../redux/reducers/AuthReducer";
import { useToken } from "../Utility/hooks";
import { Requirement, storeDataProps, storedatas } from "../Types/reducer"; // Ensure your types are correctly exported

interface MastersAddModalProps {
  listapical: () => void;
  value:string;
  
}
interface FormValues {
  name: string;
}


const MastersAddModal: React.FC<MastersAddModalProps> = ({ listapical, value }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const selector = useSelector((state:storedatas) => state.auth);

  const handleCancel = () => {
    dispatch(handleShowAddModal(false));
    dispatch(handleShowUpdateModal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  const handleUpdateList = () => {
    let listItem: any;

    if (value === 'category') {
      listItem = selector.categoryList?.find((ele: { customerCategoryId: string }) => ele.customerCategoryId === selector.userId);
      if (listItem) {
        setValues({ name: listItem.customerCategoryName });
      }
    } else if (value === 'Enquiry') {
      listItem = selector.enquiryListData?.find((ele: { enquireId: string }) => ele.enquireId === selector.userId);
      if (listItem) {
        setValues({ name: listItem.enquireTypeName });
      }
    } else if (value === 'requirements') {
      listItem = selector.requirementsList?.find((ele:Requirement) => ele.RequirementsId === selector.userId);
      if (listItem) {
        setValues({ name: listItem.RequirementsName });
      }
    }
  };

  const handleCreateUser = (values: { name: string }) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);

    const action = selector.showAddModal ? createMasters : updateMasters;

    if (selector.showUpdateModal) {
      formData.append("dataId", selector.userId);
    }

    action(formData, value)
      .then((response) => {
        listapical();
        message.success(response.data.msg);
        if (response.data.status) handleCancel();
      })
      .catch((err) => {
        console.error("API error:", err);
        message.error("An error occurred");
      });
  };

  const userValidationSchema = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets").required("Name is required"),
  });

  const {values,touched,errors,handleBlur,handleChange,handleSubmit,setValues} = useFormik<FormValues>({
    initialValues: {
      name: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleCreateUser(values);
    }
  });

  useEffect(() => {
    if (selector.showUpdateModal) {
      handleUpdateList();
    }
  }, [selector.showUpdateModal]);
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    handleSubmit();
              };

  return (
    <Modal
      title={"ADD DETAILS"}
      open={selector.showAddModal || selector.showUpdateModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} style={{ maxWidth: 600 }}>
        <InputField
           value={values.name}
          name="name"
          label="Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          placeholder="Enter Name"
        />
      </Form>
    </Modal>
  );
}

interface InputFieldProps {

  label:string;
  name: string;
  type?: string;
  placeholder: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string | undefined };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;


}

const InputField: React.FC<InputFieldProps> = ({  label, name, type = "text", placeholder,handleChange,handleBlur,touched,errors,value }) => {
  return (
    <Form.Item
      label={label}
      validateStatus={touched[name] && errors[name] ? "error" : ""}
      help={touched.name && errors.name ? errors.name : ""}
    >
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Item>
  );
}

export default MastersAddModal;
