import React, { useEffect, useState } from "react";
import { Adminsss } from "../../axios/Services";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Admin.module.css";
import AdminModule from "../Model/AddModule";
import { Button, Popover } from "antd";
import { FilterOutlined, UserAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import Filter from "./Filter";
import { handledeleteds } from "../../redux/reducers/AuthReducer";
import DeleteModule from "../Model/DeleteModule";
import { Typography } from "antd";
import { useToken } from "../../Utility/hooks";

const Admin = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userid, setUserid] = useState("");
  const [deletemodel, setDeletemodel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const del = useSelector((state) => state.auth.delete);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (token) {
      handleAdmin(currentPage);
    }
  }, [token, currentPage]);

  const handleFilter = () => {
    setFilter(true);
  };

  const handleAdmin = (currentPage = 1, size = 2, search) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("type", "2");

    if (search?.userName) {
      formData.append("username", search.userName);
    }
    if (search?.phoneNumber) {
      formData.append("phoneNumber", search.phoneNumber);
    }
    if (search?.email) {
      formData.append("email", search.email);
    }

    Adminsss(currentPage, size, formData)
      .then((response) => {
        const users = response.data.data.items;
        setTotalItems(response.data.data.total_count);
        setData(users);
        setFilteredData(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = (values) => {
    setUserid(values);
    dispatch(handledeleteds(true));
  };

  const resetFilters = () => {
    setFilter(false); // Close filter box
    handleAdmin(currentPage); // Fetch the original data without any filters
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography.Title level={3}>ADMIN</Typography.Title>

          <Button
            type="button"
            onClick={() => setShowModal(true)}
            className={classes.addUserButton}
          >
            ADD ADMIN
            <UserAddOutlined />
          </Button>
          <Button
            icon={<FilterOutlined />}
            className={classes.filterButton}
            onClick={handleFilter}
          >
            Filter
          </Button>
        </div>
        <br></br>

        <div>
          {filter && <Filter functioncall={handleAdmin} resetFilters={resetFilters} />}
        </div>

        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>No.</th> {/* Column for the row number */}
                <th>User ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className={classes.tableRow}>
                    <td>{(currentPage - 1) * 2 + index + 1}</td>{" "}
                    <td>{item?.userName}</td>
                    <td>{item?.name}</td>
                    <td>{item?.phoneNumber}</td>
                    <td>{item?.email}</td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => handleDeleteUser(item.userId)}
                        className={classes.deleteButton}
                      >
                        <DeleteOutlined />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={classes.noData}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            current={currentPage}
            pageSize={2}
            total={totalItems}
            onChange={handlePageChange}
            className={classes.pagination}
          />

          {showModal && (
            <AdminModule
              showModal={showModal}
              handleAddClose={() => setShowModal(false)}
              onAddUser={(newUser) => setData((prev) => [...prev, newUser])}
            />
          )}

          {del && (
            <DeleteModule
              deletemodel={del}
              userid={userid}
              listapicall={handleAdmin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
