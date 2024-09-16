import React, { useEffect, useState } from "react";
import { admin, add, deleteCard, ViewCard, update } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Dealer.module.css";
import { message, Modal, Button, Popover, Row, Col, Table } from "antd";
import {
  FilterOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Filter from "./Filter";
import { useToken } from "../../Utility/hooks";

function Dealer() {
  const token = useToken();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const search = useSelector((state) => state.auth.filter);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (token) {
      loadAdminData();
    }
  }, [token, currentPage]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleFilter = () => {
    setFilter(true);
  };

  const handleAddUser = () => {
    setValues({
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
    });
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEditUser = (userId) => {
    setUserId(userId);
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
      });
      setIsModalOpen(true);
      setIsEditMode(true);
    });
  };

  const handleDeleteUser = (userId) => {
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("userId", userId);
    deleteCard(formData)
      .then(() => {
        setData(data.filter((item) => item.userId !== userId));
        message.success("Deleted Successfully");
      })
      .catch((err) => {
        console.error("API Error:", err);
        message.error("Failed to delete user.");
      });
  };

  const loadAdminData = (currentPage = 1, size = 2, search , index) => {
    let formData = new FormData( );
    formData.append("token", selector.token);
    formData.append("type", "3");
    

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
        const users = res.data.data.items;
        setData(users);
        setTotalItems(res.data.data.total_count);
        setFilteredData(users);
      })
      .catch((err) => {
        console.error("API Error:", err);
        message.error("Failed to load data.");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string().required("Password is required"),
    pincode: Yup.number().required("Pincode is required"),
    landline_Number: Yup.number().required("Landline Number is required"),
  });

  const handleSubmitValues = (values) => {

    
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", selector.token);
    formData.append("userType", "3");
   
    if (isEditMode) {
      formData.append("userId", userId); // Add userId to formData for updating
      update(formData).then(() => {
        message.success("Edited Successfully");

        // Update the data locally
        setData(data.map((item) =>
          item.userId === userId ? { ...item, ...values } : item
        ));
        loadAdminData(); // Reload the admin data after submit
        handleModalClose();
      }).catch((error) => {
        console.error("API Error:", error);
        message.error("Failed to edit data.");
      });
    } else {
      add(formData).then((response) => {
        const newUser = response.data.data; // Assume response contains new user details

        message.success("Added Successfully");

        // Update the data locally
        setData([...data, newUser]);
        loadAdminData(); // Reload the admin data after submit
        handleModalClose();
      }).catch((error) => {
        console.error("API Error:", error);
        message.error("Failed to add data.");
      });
    }
  };

  const { handleChange, handleSubmit, errors, touched, values, setValues } =
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
      },
      validationSchema: userValidation,
      onSubmit: handleSubmitValues,
    });

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (text, record, index) => (currentPage - 1) * 2 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="button"
            onClick={() => handleEditUser(record.userId)}
            icon={<EditOutlined />}
          />
          <Button
            type="button"
            onClick={() => handleDeleteUser(record.userId)}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className={classes.tableContainer}>
        <div className={classes.buttonContainer}>
          <h4> DEALER</h4>
          <Button
            type="button"
            className={classes.addButton}
            onClick={handleAddUser}
          >
            <UserAddOutlined /> ADD DEALER
          </Button>
          <Popover>
            <Button
              icon={<FilterOutlined />}
              className={classes.filterButton}
              onClick={handleFilter}
            >
              Filter
            </Button>
          </Popover>

          <div>{filter && <Filter functioncall={loadAdminData} />}</div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="userId"
          pagination={{
            current: currentPage,
            pageSize: 2,
            total: totalItems,
            onChange: handlePageChange,
          }}
        />

        <Modal
          title={isEditMode ? "Edit User" : "Add User"}
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
        >
          <form onSubmit={handleSubmit} className={classes.formContainer}>
        
            <Row gutter={16}>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="userName"
                    className={`${classes.formControl} ${
                      touched.userName && errors.userName
                        ? classes.errorInput
                        : ""
                    }`}
                    placeholder="Username"
                    value={values.userName}
                    onChange={handleChange}
                  />
                  {touched.userName && errors.userName ? (
                    <div className={classes.errorMessage}>{errors.userName}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    className={`${classes.formControl} ${
                      touched.name && errors.name ? classes.errorInput : ""
                    }`}
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name ? (
                    <div className={classes.errorMessage}>{errors.name}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="phoneNumber"
                    className={`${classes.formControl} ${
                      touched.phoneNumber && errors.phoneNumber
                        ? classes.errorInput
                        : ""
                    }`}
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <div className={classes.errorMessage}>
                      {errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="email"
                    className={`${classes.formControl} ${
                      touched.email && errors.email ? classes.errorInput : ""
                    }`}
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email ? (
                    <div className={classes.errorMessage}>{errors.email}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="city"
                    className={`${classes.formControl} ${
                      touched.city && errors.city ? classes.errorInput : ""
                    }`}
                    placeholder="City"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {touched.city && errors.city ? (
                    <div className={classes.errorMessage}>{errors.city}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="state"
                    className={`${classes.formControl} ${
                      touched.state && errors.state ? classes.errorInput : ""
                    }`}
                    placeholder="State"
                    value={values.state}
                    onChange={handleChange}
                  />
                  {touched.state && errors.state ? (
                    <div className={classes.errorMessage}>{errors.state}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="country"
                    className={`${classes.formControl} ${
                      touched.country && errors.country
                        ? classes.errorInput
                        : ""
                    }`}
                    placeholder="Country"
                    value={values.country}
                    onChange={handleChange}
                  />
                  {touched.country && errors.country ? (
                    <div className={classes.errorMessage}>{errors.country}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="password"
                    name="password"
                    className={`${classes.formControl} ${
                      touched.password && errors.password
                        ? classes.errorInput
                        : ""
                    }`}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <div className={classes.errorMessage}>{errors.password}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="pincode"
                    className={`${classes.formControl} ${
                      touched.pincode && errors.pincode ? classes.errorInput : ""
                    }`}
                    placeholder="Pincode"
                    value={values.pincode}
                    onChange={handleChange}
                  />
                  {touched.pincode && errors.pincode ? (
                    <div className={classes.errorMessage}>{errors.pincode}</div>
                  ) : null}
                </div>
              </Col>
              <Col span={12}>
                <div className={classes.inputGroup}>
                  <input
                    type="text"
                    name="landline_Number"
                    className={`${classes.formControl} ${
                      touched.landline_Number && errors.landline_Number
                        ? classes.errorInput
                        : ""
                    }`}
                    placeholder="Landline Number"
                    value={values.landline_Number}
                    onChange={handleChange}
                  />
                  {touched.landline_Number && errors.landline_Number ? (
                    <div className={classes.errorMessage}>
                      {errors.landline_Number}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Button
              type="submit"
              className={classes.submitButton}
              onClick={() => handleSubmit()}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Dealer;
