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
import {  RootState , DataItem } from '../User Management/types'; 
import { Helmet } from "react-helmet";

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
}

function Dealer() {
  const token = useToken();
  

  const [data, setData] = useState<DataItem[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      loadAdminData(currentPage, 2, {});
    }
  }, [token, currentPage]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleFilter = () => {
    setFilter(!filter);
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

  const handleEditUser = (userId: string) => {
    setUserId(userId);
    const formData = new FormData();
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

  const handleDeleteUser = (userId: number) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("userId", userId.toString());
    deleteCard(formData)
      .then((res) => {
        setData(data.filter((item) => item.userId !== userId));
        message.success(res.data.msg);
      })
      .catch((err) => {
        console.error("API Error:", err);
        message.error(err.data.msg);
      });
  };

  const loadAdminData = (currentPage = 1, size = 2, search?: { userName?: string; phoneNumber?: string; email?: string }) => {
    const formData = new FormData();
    formData.append("token", token);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userValidation = Yup.object({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.number()
      .required("Phone number is required")
      .typeError("Phone number must be a number"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password must contain at least one number"), // Added number validation
    pincode: Yup.number()
      .required("Pincode is required")
      .typeError("Pincode must be a number"),
    landline_Number: Yup.number()
      .required("Landline Number is required")
      .typeError("Landline Number must be a number"),
  });

  const handleSubmitValues = (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("token", token);
    formData.append("userType", "3");

    if (isEditMode) {
      formData.append("userId", userId);
      update(formData).then(() => {
        message.success("Edited Successfully");
        setData(data.map((item) =>
          item.userId === Number(userId) ? { ...item, ...values } : item
        ));
        loadAdminData();
        handleModalClose();
      }).catch((error) => {
        console.error("API Error:", error);
        message.error("Failed to edit data.");
      });
    } else {
      add(formData).then((response) => {
        const newUser = response.data.data;
        message.success("Added Successfully");
        setData([...data, newUser]);
        loadAdminData();
        handleModalClose();
      }).catch((error) => {
        console.error("API Error:", error);
        message.error("Failed to add data.");
      });
    }
  };

  const resetFilters = () => {
    setFilter(false);
    loadAdminData();
  };

  const { handleChange, handleSubmit, errors, touched, values, setValues } = useFormik({
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
      render: (text: string, record: any, index: number) => (currentPage - 1) * 2 + index + 1,
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
      render: (text: string, record: any) => (
        <>
       <div>
      <Button
        type="primary"
        style={{ marginRight: "10px" }} 
        onClick={() => handleEditUser(record.userId)}
      >
      <EditOutlined />
      </Button>

      <Button
        type="primary"
        onClick={() => handleDeleteUser(record.userId)}
      >
         <DeleteOutlined />
      </Button>
    </div>

        </>
      ),
    },
  ];

  return (
    <>


<Helmet>
        <title>Dealer Dashboard</title>
        <meta name="description" content="This is the dealer page " />
        <meta name="keywords" content="dealer ,  React" />
      
      </Helmet>
      <div className={classes.tableContainer}>
        <div className={classes.buttonContainer}>
          <h4> DEALER</h4>
          <Button
            type="primary"
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
          

          <div> {filter && <Filter functioncall={loadAdminData}  />} </div>
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
  <form onSubmit={handleSubmit}>
    <Row gutter={16}>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={values.userName}
            onChange={handleChange}
          />
          {errors.userName && touched.userName && <div className={classes.error}>{errors.userName}</div>}
        </div>
      </Col>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && <div className={classes.error}>{errors.name}</div>}
        </div>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && touched.phoneNumber && <div className={classes.error}>{errors.phoneNumber}</div>}
        </div>
      </Col>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && <div className={classes.error}>{errors.email}</div>}
        </div>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
          {errors.city && touched.city && <div className={classes.error}>{errors.city}</div>}
        </div>
      </Col>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={values.state}
            onChange={handleChange}
          />
          {errors.state && touched.state && <div className={classes.error}>{errors.state}</div>}
        </div>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={values.country}
            onChange={handleChange}
          />
          {errors.country && touched.country && <div className={classes.error}>{errors.country}</div>}
        </div>
      </Col>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && <div className={classes.error}>{errors.password}</div>}
        </div>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={values.pincode}
            onChange={handleChange}
          />
          {errors.pincode && touched.pincode && <div className={classes.error}>{errors.pincode}</div>}
        </div>
      </Col>
      <Col span={12}>
        <div className={classes.formGroup}>
          <label htmlFor="landline_Number">Landline Number</label>
          <input
            type="text"
            id="landline_Number"
            name="landline_Number"
            value={values.landline_Number}
            onChange={handleChange}
          />
          {errors.landline_Number && touched.landline_Number && <div className={classes.error}>{errors.landline_Number}</div>}
        </div>
      </Col>
    </Row>
    <Button type="primary" htmlType="submit">
      {isEditMode ? "Save Changes" : "Add User"}
    </Button>
  </form>
</Modal>

      </div>
    </>
  );
}

export default Dealer;
