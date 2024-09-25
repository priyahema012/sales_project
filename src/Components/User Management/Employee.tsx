import React, { useEffect, useState } from "react";
import {
  admin,
  add,
  deleteCard,
  ViewCard,
  updateCard,
  userDropdown,
} from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Employee.module.css";
import {
  message,
  Typography,
  Input,
  Select,
  Form,
  Modal,
  Button,
  Row,
  Col,
  Pagination,
} from "antd";
import {
  FilterOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Filter from "./Filter";
import { useToken, useType } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";
import { Helmet } from "react-helmet";

interface User {
  userId: string;
  userName: string;
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  country: string;
  password: string;
  pincode: string;
  landline_Number: string;
  dealer_id?: string;
}

interface FormValues {
  userName: string;
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  country: string;
  password: string;
  pincode: string;
  landline_Number: string;
  dealer_id?: string;
}

function Employee() {
  const token = useToken();
  const dispatch = useDispatch();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const [data, setData] = useState<User[]>([]);
  const [dropdown, setDropdown] = useState<User[]>([]);
  const dealerId = sessionStorage.getItem("userId");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { Option } = Select;
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const [storeUserId, setStoreUserId] = useState<string>("");
  const userType = useType();

  useEffect(() => {
    if (token) {
      loadAdminData(currentPage, 4, {});
    }
  }, [token, currentPage]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    resetForm();
  };

  const handleEditUser = (userId: string) => {
    setStoreUserId(userId);
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", userId);
    ViewCard(formData).then((response) => {
      const card = response.data.data;
      setValues({
        userName: card.userName || "",
        name: card.name || "",
        phoneNumber: card.phoneNumber || "",
        email: card.email || "",
        city: card.city || "",
        state: card.state || "",
        country: card.country || "",
        password: card.password || "",
        pincode: card.pincode || "",
        landline_Number: card.landline_Number || "",
        dealer_id: card.dealer_id || "",
      });
      setIsModalOpen(true);
      setIsEditMode(true);
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUserId(userId);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", userId);
    deleteCard(formData)
      .then((res) => {
        loadAdminData(currentPage, 5);
        message.success(res.data.msg);
        closeModal();
      })
      .catch((err) => console.log("API Error:", err));
  };

  const closeModal = () => {
    setDeleteModal(false);
  };

  const loadAdminData = (
    currentPage = 1,
    size = 4,
    search?: { userName?: string; phoneNumber?: string; email?: string }
  ) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("type", "4");

    if (search?.userName) {
      formData.append("username", search.userName);
    }
    if (search?.phoneNumber) {
      formData.append("phoneNumber", search.phoneNumber);
    }
    if (search?.email) {
      formData.append("email", search.email);
    }

    admin(formData, currentPage, size)
      .then((res) => {
        setData(res.data.data.items);
        setTotalItems(res.data.data.total_count);
      })
      .catch((err) => console.log("API Error:", err));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[89]\d{9}$/, "Phone number must be 10 digits and start with 8 or 9"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password must contain at least one number"),
    pincode: Yup.number().required("Pincode is required").typeError("Pincode must be a number"),
    landline_Number: Yup.number().required("Landline Number is required").typeError("Landline Number must be a number"),
  });

  const handleSubmitValues = (values: FormValues) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("userName", values.userName);
    if (userType === "2" || userType === "1") {
      formData.append("dealer_id", values.dealer_id || "");
    } else {
      formData.append("dealer_id", dealerId || "");
    }
    formData.append("userType", "4");

    if (isEditMode) {
      formData.append("userId", storeUserId);
      updateCard(formData)
        .then((res) => {
          loadAdminData(currentPage, 3);
          message.success(res.data.msg);
          handleModalClose();
        })
        .catch((err) => message.error("Error updating employee"));
    } else {
      add(formData)
        .then((res) => {
          loadAdminData(currentPage, 3);
          message.success(res.data.msg);
          handleModalClose();
        })
        .catch((err) => message.error("Error adding employee"));
    }
  };

  const { handleChange, handleSubmit, errors, touched, values, setValues, resetForm } =
    useFormik({
      initialValues: {
        userName: "",
        name: "",
        phoneNumber: "",
        email: "",
        city: "",
        state: "",
        country: "",
        password: "",
        pincode: "",
        landline_Number: "",
        dealer_id: "",
      },
      validationSchema: userValidation,
      onSubmit: handleSubmitValues,
    });

  useEffect(() => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      formdata.append("isDealer", "1");

      userDropdown(formdata).then((res) => {
        const users: User[] = res.data.data;
        setDropdown(users);
      });
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Employee Dashboard</title>
        <meta name="description" content="This is the employee page" />
        <meta name="keywords" content="employee, React" />
      </Helmet>

      <div className={classes.tableContainer}>
        <Typography.Title level={3}>EMPLOYEE</Typography.Title>
        <Button
          type="primary"
          className={classes.click}
          onClick={() => setIsModalOpen(true)}
        >
          <UserAddOutlined />
          ADD EMPLOYEE
        </Button>
        <Button
          icon={<FilterOutlined />}
          className={classes.filterButton}
          onClick={handleFilter}
        >
          Filter
        </Button>

        {filter && <Filter functioncall={loadAdminData} />}

        <table className={classes.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditUser(user.userId)}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteUser(user.userId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={4}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        title={isEditMode ? "Edit Employee" : "Add Employee"}
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
         <Button
         key="submit"
         type="primary"
         onClick={(e) => {
           e.preventDefault(); // Prevent the default form submission
           handleSubmit();     // Call your form submission function
         }}
       >
         {isEditMode ? "Update" : "Add"}
       </Button>
       
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username">
                <Input
                  name="userName"
                  onChange={handleChange}
                  value={values.userName}
                  className="custom-input"
                />
                {errors.userName && touched.userName && (
                  <span className={classes.errorMessage}>{errors.userName}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Name">
                <Input
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  className="custom-input"
                />
                {errors.name && touched.name && (
                  <span className={classes.errorMessage}>{errors.name}</span>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone Number">
                <Input
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber}
                  className="custom-input"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <span className={classes.errorMessage}>
                    {errors.phoneNumber}
                  </span>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="custom-input"
                />
                {errors.email && touched.email && (
                  <span className={classes.errorMessage}>{errors.email}</span>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="City">
                <Input
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  className="custom-input"
                />
                {errors.city && touched.city && (
                  <span className={classes.errorMessage}>{errors.city}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="State">
                <Input
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  className="custom-input"
                />
                {errors.state && touched.state && (
                  <span className={classes.errorMessage}>{errors.state}</span>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Country">
                <Input
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                  className="custom-input"
                />
                {errors.country && touched.country && (
                  <span className={classes.errorMessage}>
                    {errors.country}
                  </span>
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Pincode">
                <Input
                  name="pincode"
                  onChange={handleChange}
                  value={values.pincode}
                  className="custom-input"
                />
                {errors.pincode && touched.pincode && (
                  <span className={classes.errorMessage}>
                    {errors.pincode}
                  </span>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Landline Number">
                <Input
                  name="landline_Number"
                  onChange={handleChange}
                  value={values.landline_Number}
                  className="custom-input"
                />
                {errors.landline_Number && touched.landline_Number && (
                  <span className={classes.errorMessage}>
                    {errors.landline_Number}
                  </span>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={deleteModal}
        onOk={confirmDelete}
        onCancel={closeModal}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </>
  );
}

export default Employee;
