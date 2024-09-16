import React, { useEffect, useState } from "react";
import {
  admin,
  add,
  deleteCard,
  ViewCard,
  update,
  userDropdown,
} from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./Employee.module.css";
import { message, Typography, Input, Select, Form, Modal, Button } from "antd";
import { Pagination } from "antd";
import {
  FilterOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Filter from "./Filter";
import { useToken } from "../../Utility/hooks";

function Employee() {
  const token = useToken();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { Option } = Select;
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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

  const handleAddUser = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("isDealer", 1);
    userDropdown(formdata).then((res) => {
      setDropdown(res.data.data);
    });
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
        userId: card.userId || "",
      });
      setIsModalOpen(true);
      setIsEditMode(true);
    });
  };

  const handleDeleteUser = (userId) => {
    setUserId(userId); // Save userId for deletion confirmation
    setDeleteModal(true); // Open delete modal
  };

  const confirmDelete = () => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", userId);
    deleteCard(formData)
      .then(() => {
        setData(data.filter((item) => item.userId !== userId));
        message.success("Deleted Successfully");
        closeModal(); // Close modal after successful deletion
      })
      .catch((err) => console.log("API Error:", err));
  };

  const closeModal = () => {
    setDeleteModal(false); // Close delete modal
  };

  const loadAdminData = (currentPage = 1, size = 3, search) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = () => {
    setFilter(true);
  };

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
    email: Yup.string().required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string().required("Password is required"),
    pincode: Yup.number().required("Pincode is required"),
    landline_Number: Yup.number().required("Landline Number is required"),
    // dealer_id: Yup.number().required("Dealer ID is required"),
  });

  const handleSubmitValues = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", selector.token);
    formData.append("userType", "4");

    const action = isEditMode ? update : add;

    action(formData)
      .then(() => {
        loadAdminData();
        handleModalClose();
        message.success(
          isEditMode ? "Updated Successfully" : "Added Successfully"
        );
      })
      .catch((err) => console.log("API Error:", err));
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
        // dealer_id: "",
      },
      validationSchema: userValidation,
      onSubmit: handleSubmitValues,
    });

  return (
    <>
      <div className={classes.tableContainer}>
        <Typography.Title level={3}>EMPLOYEE</Typography.Title>
        <Button
          type="primary"
          onClick={handleAddUser}
          className={classes.click}
        >
          <UserAddOutlined />
          EMPLOYEE
        </Button>
        <Button
          icon={<FilterOutlined />}
          className={classes.filterButton}
          onClick={handleFilter}
        >
          Filter
        </Button>

        <div>
          {filter && <Filter functioncall={loadAdminData} />}
          {console.log("content", filter)}
        </div>

        <table className={classes.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                     <td>{(currentPage - 1) * 3 + index + 1}</td>{" "}
                  <td>{item.userName}</td>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      type="link"
                      onClick={() => handleEditUser(item.userId)}
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleDeleteUser(item.userId)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          title={isEditMode ? "Edit User" : "Add User"}
          onCancel={handleModalClose}
          footer={null}
          open={isModalOpen}
        >
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <div className={classes.formRow}>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="userName"
                  placeholder="Enter Username * "
                  onChange={handleChange}
                  value={values.userName}
                  className={
                    touched.userName && errors.userName ? classes.isInvalid : ""
                  }
                />
                {touched.userName && errors.userName && (
                  <div className={classes.invalidFeedback}>
                    {errors.userName}
                  </div>
                )}
              </div>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Name  * "
                  onChange={handleChange}
                  value={values.name}
                  className={
                    touched.name && errors.name ? classes.isInvalid : ""
                  }
                />
                {touched.name && errors.name && (
                  <div className={classes.invalidFeedback}>{errors.name}</div>
                )}
              </div>
            </div>

            <div className={classes.formRow}>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter Phone Number  *"
                  onChange={handleChange}
                  value={values.phoneNumber}
                  className={
                    touched.phoneNumber && errors.phoneNumber
                      ? classes.isInvalid
                      : ""
                  }
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className={classes.invalidFeedback}>
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter Email * "
                  onChange={handleChange}
                  value={values.email}
                  className={
                    touched.email && errors.email ? classes.isInvalid : ""
                  }
                />
                {touched.email && errors.email && (
                  <div className={classes.invalidFeedback}>{errors.email}</div>
                )}
              </div>
            </div>

            <div className={classes.formRow}>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter City * "
                  onChange={handleChange}
                  value={values.city}
                  className={
                    touched.city && errors.city ? classes.isInvalid : ""
                  }
                />
                {touched.city && errors.city && (
                  <div className={classes.invalidFeedback}>{errors.city}</div>
                )}
              </div>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="state"
                  placeholder="Enter State * "
                  onChange={handleChange}
                  value={values.state}
                  className={
                    touched.state && errors.state ? classes.isInvalid : ""
                  }
                />
                {touched.state && errors.state && (
                  <div className={classes.invalidFeedback}>{errors.state}</div>
                )}
              </div>
            </div>

            <div className={classes.formRow}>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="country"
                  placeholder="Enter Country * "
                  onChange={handleChange}
                  value={values.country}
                  className={
                    touched.country && errors.country ? classes.isInvalid : ""
                  }
                />
                {touched.country && errors.country && (
                  <div className={classes.invalidFeedback}>
                    {errors.country}
                  </div>
                )}
              </div>
              <div className={classes.column}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password * "
                  onChange={handleChange}
                  value={values.password}
                  className={
                    touched.password && errors.password ? classes.isInvalid : ""
                  }
                />
                {touched.password && errors.password && (
                  <div className={classes.invalidFeedback}>
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            <div className={classes.formRow}>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="pincode"
                  placeholder="Enter Pincode * "
                  onChange={handleChange}
                  value={values.pincode}
                  className={
                    touched.pincode && errors.pincode ? classes.isInvalid : ""
                  }
                />
                {touched.pincode && errors.pincode && (
                  <div className={classes.invalidFeedback}>
                    {errors.pincode}
                  </div>
                )}
              </div>
              <div className={classes.column}>
                <Input
                  type="text"
                  name="landline_Number"
                  placeholder="Enter Landline Number * "
                  onChange={handleChange}
                  value={values.landline_Number}
                  className={
                    touched.landline_Number && errors.landline_Number
                      ? classes.isInvalid
                      : ""
                  }
                />
                {touched.landline_Number && errors.landline_Number && (
                  <div className={classes.invalidFeedback}>
                    {errors.landline_Number}
                  </div>
                )}
              </div>
            </div>
            <Form.Item label="Dealer ">
              <Select
                name="dealer_id"
                value={values.dealer_id}
                onChange={(value) => setValues({ ...values, dealer_id: value })}
                dropdownStyle={{ zIndex: 2500 }}
              >
                {dropdown.map((option) => (
                  <Option key={option.userId} value={option.userId}>
                    {option.userName}
                  </Option>
                ))}
              </Select>
              {touched.dealer_id && errors.dealer_id && (
                <div className={classes.invalidFeedback}>
                  {errors.dealer_id}
                </div>
              )}
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className={classes.submitButton}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </form>
        </Modal>

        <Modal
          title="Delete User"
          visible={deleteModal}
          onOk={confirmDelete}
          onCancel={closeModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>

        <Pagination
          current={currentPage}
          pageSize={3}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </div>
    </>
  );
}

export default Employee;
